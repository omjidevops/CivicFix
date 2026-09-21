package com.civicfix.dto;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: VOTE RESPONSE DTO
 * Package: com.civicfix.dto
 * Class: VoteResponseDto
 *
 * Exposes current total votes for a complaint, whether the authenticated user has voted,
 * and a status message.
 * ============================================================================
 */
public class VoteResponseDto {

    private Long complaintId;
    private long totalVotes;
    private boolean hasVoted;
    private String message;

    public VoteResponseDto() {}

    public VoteResponseDto(Long complaintId, long totalVotes, boolean hasVoted, String message) {
        this.complaintId = complaintId;
        this.totalVotes = totalVotes;
        this.hasVoted = hasVoted;
        this.message = message;
    }

    // Getters and Setters
    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }

    public long getTotalVotes() { return totalVotes; }
    public void setTotalVotes(long totalVotes) { this.totalVotes = totalVotes; }

    public boolean isHasVoted() { return hasVoted; }
    public void setHasVoted(boolean hasVoted) { this.hasVoted = hasVoted; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
