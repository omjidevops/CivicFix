package com.civicfix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: COMMENT REQUEST DTO
 * Package: com.civicfix.dto
 * Class: CommentRequestDto
 *
 * Enforces strong validation for comment submissions:
 * - Prevents blank or whitespace-only comments
 * - Limits length between 2 and 1000 characters
 * ============================================================================
 */
public class CommentRequestDto {

    @NotBlank(message = "Comment text cannot be empty")
    @Size(min = 2, max = 1000, message = "Comment must be between 2 and 1000 characters")
    private String commentText;

    public CommentRequestDto() {}

    public CommentRequestDto(String commentText) {
        this.commentText = commentText;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }
}
