package com.civicfix.service;

import com.civicfix.dto.CommentRequestDto;
import com.civicfix.dto.CommentResponseDto;
import com.civicfix.entity.Comment;
import com.civicfix.entity.Complaint;
import com.civicfix.entity.Role;
import com.civicfix.entity.User;
import com.civicfix.repository.CommentRepository;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.repository.UserRepository;
import com.civicfix.service.impl.CommentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private ComplaintRepository complaintRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CommentServiceImpl commentService;

    private User sampleUser;
    private Complaint sampleComplaint;

    @BeforeEach
    void setUp() {
        sampleUser = new User();
        sampleUser.setId(3L);
        sampleUser.setName("Sunil Kumar");
        sampleUser.setEmail("sunil@civicfix.gov");
        sampleUser.setRole(Role.CITIZEN);

        sampleComplaint = new Complaint();
        sampleComplaint.setId(10L);
    }

    @Test
    @DisplayName("Add comment successfully saves and maps user details")
    void testAddCommentSuccess() {
        CommentRequestDto dto = new CommentRequestDto("Work crew has arrived on site.");
        Comment comment = new Comment(sampleComplaint, sampleUser, "Work crew has arrived on site.");
        comment.setId(1L);

        when(complaintRepository.findById(10L)).thenReturn(Optional.of(sampleComplaint));
        when(userRepository.findById(3L)).thenReturn(Optional.of(sampleUser));
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        CommentResponseDto response = commentService.addComment(10L, 3L, dto);

        assertNotNull(response);
        assertEquals("Work crew has arrived on site.", response.getCommentText());
        assertEquals("Sunil Kumar", response.getUserName());
        assertEquals("CITIZEN", response.getUserRole());
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    @DisplayName("Get comments returns formatted list")
    void testGetCommentsByComplaint() {
        Comment comment = new Comment(sampleComplaint, sampleUser, "Checking update.");
        comment.setId(1L);

        when(complaintRepository.existsById(10L)).thenReturn(true);
        when(commentRepository.findByComplaintIdOrderByCreatedAtAsc(10L)).thenReturn(List.of(comment));

        List<CommentResponseDto> list = commentService.getCommentsByComplaint(10L);

        assertNotNull(list);
        assertEquals(1, list.size());
        assertEquals("Checking update.", list.get(0).getCommentText());
    }
}
