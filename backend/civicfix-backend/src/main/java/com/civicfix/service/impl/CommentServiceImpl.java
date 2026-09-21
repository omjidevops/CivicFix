package com.civicfix.service.impl;

import com.civicfix.dto.CommentRequestDto;
import com.civicfix.dto.CommentResponseDto;
import com.civicfix.entity.Comment;
import com.civicfix.entity.Complaint;
import com.civicfix.entity.User;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.repository.CommentRepository;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.repository.UserRepository;
import com.civicfix.service.CommentService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: COMMENT SERVICE IMPLEMENTATION
 * Package: com.civicfix.service.impl
 * Class: CommentServiceImpl
 * ============================================================================
 */
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public CommentServiceImpl(
            CommentRepository commentRepository,
            ComplaintRepository complaintRepository,
            UserRepository userRepository
    ) {
        this.commentRepository = commentRepository;
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public CommentResponseDto addComment(Long complaintId, Long userId, CommentRequestDto requestDto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint with ID " + complaintId + " was not found."));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Authenticated user with ID " + userId + " does not exist."));

        Comment comment = new Comment();
        comment.setComplaint(complaint);
        comment.setUser(user);
        comment.setCommentText(requestDto.getCommentText().trim());

        Comment saved = commentRepository.save(comment);
        return mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentsByComplaint(Long complaintId) {
        if (!complaintRepository.existsById(complaintId)) {
            throw new ComplaintNotFoundException("Complaint with ID " + complaintId + " was not found.");
        }

        List<Comment> comments = commentRepository.findByComplaintIdOrderByCreatedAtAsc(complaintId);
        List<CommentResponseDto> dtos = new ArrayList<>();
        for (Comment c : comments) {
            dtos.add(mapToDto(c));
        }
        return dtos;
    }

    private CommentResponseDto mapToDto(Comment comment) {
        return new CommentResponseDto(
                comment.getId(),
                comment.getComplaint().getId(),
                comment.getUser().getId(),
                comment.getUser().getName(),
                comment.getUser().getRole() != null ? comment.getUser().getRole().name() : "CITIZEN",
                comment.getCommentText(),
                comment.getCreatedAt()
        );
    }
}
