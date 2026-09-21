package com.civicfix.dto;

import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: COMMENT RESPONSE DTO
 * Package: com.civicfix.dto
 * Class: CommentResponseDto
 *
 * Exposes comment details back to API clients safely without leaking user passwords.
 * ============================================================================
 */
public class CommentResponseDto {

    private Long id;
    private Long complaintId;
    private Long userId;
    private String userName;
    private String userRole;
    private String commentText;
    private LocalDateTime createdAt;

    public CommentResponseDto() {}

    public CommentResponseDto(Long id, Long complaintId, Long userId, String userName, String userRole, String commentText, LocalDateTime createdAt) {
        this.id = id;
        this.complaintId = complaintId;
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
        this.commentText = commentText;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }

    public String getCommentText() { return commentText; }
    public void setCommentText(String commentText) { this.commentText = commentText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
