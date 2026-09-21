package com.civicfix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 48: REPUTATION TRANSACTION JPA ENTITY
 * Package: com.civicfix.entity
 * Class: ReputationTransaction
 *
 * Mapped to existing 'reputation_transactions' table defined in schema.sql.
 * Represents an immutable ledger of civic reputation awards and deductions:
 * - VALID_COMPLAINT      : +10 points (Awarded when Admin verifies complaint)
 * - UPVOTE_SUPPORT       : +2 points  (Awarded when citizen supports another complaint)
 * - UPVOTE_REMOVED       : -2 points  (Reversed when vote is removed, anti-farming)
 * - RESOLUTION_CONFIRMED : +5 points  (Awarded when citizen confirms field repair)
 * - FALSE_COMPLAINT      : -20 points (Deducted if Admin rejects false report)
 * ============================================================================
 */
@Entity
@Table(name = "reputation_transactions")
public class ReputationTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "complaint_id")
    private Long complaintId;

    @Column(name = "points", nullable = false)
    private Integer points;

    @Column(name = "reason", nullable = false, length = 150)
    private String reason;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public ReputationTransaction() {}

    public ReputationTransaction(Long userId, Long complaintId, Integer points, String reason) {
        this.userId = userId;
        this.complaintId = complaintId;
        this.points = points;
        this.reason = reason;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
