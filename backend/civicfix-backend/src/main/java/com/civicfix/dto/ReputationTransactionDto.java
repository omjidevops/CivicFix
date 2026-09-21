package com.civicfix.dto;

import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 48: REPUTATION TRANSACTION DTO
 * Package: com.civicfix.dto
 * Class: ReputationTransactionDto
 * ============================================================================
 */
public class ReputationTransactionDto {

    private Long id;
    private Long complaintId;
    private Integer points;
    private String reason;
    private LocalDateTime createdAt;

    public ReputationTransactionDto() {}

    public ReputationTransactionDto(Long id, Long complaintId, Integer points, String reason, LocalDateTime createdAt) {
        this.id = id;
        this.complaintId = complaintId;
        this.points = points;
        this.reason = reason;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
