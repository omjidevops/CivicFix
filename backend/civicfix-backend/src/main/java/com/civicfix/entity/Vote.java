package com.civicfix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: VOTE JPA ENTITY
 * Package: com.civicfix.entity
 * Class: Vote
 *
 * Mapped to the `votes` relational table.
 * Enforces strict composite unique constraint: uk_user_complaint_vote (complaint_id, user_id).
 * Guarantees that each citizen can vote at most once on a complaint.
 * ============================================================================
 */
@Entity
@Table(
    name = "votes",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_user_complaint_vote", columnNames = {"complaint_id", "user_id"})
    }
)
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Vote() {}

    public Vote(Complaint complaint, User user) {
        this.complaint = complaint;
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
