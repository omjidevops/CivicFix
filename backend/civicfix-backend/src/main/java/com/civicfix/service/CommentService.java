package com.civicfix.service;

import com.civicfix.dto.CommentRequestDto;
import com.civicfix.dto.CommentResponseDto;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: COMMENT SERVICE CONTRACT
 * Package: com.civicfix.service
 * Interface: CommentService
 * ============================================================================
 */
public interface CommentService {

    CommentResponseDto addComment(Long complaintId, Long userId, CommentRequestDto requestDto);

    List<CommentResponseDto> getCommentsByComplaint(Long complaintId);
}
