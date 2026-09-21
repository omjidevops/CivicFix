package com.civicfix.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 32: COMPLAINT JPA ENTITY
 * Package: com.civicfix.entity
 * Class: Complaint
 *
 * Annotations:
 * @Entity -> Declares this class as a JPA entity mapped to a database table.
 * @Table  -> Specifies table name in the relational database ("complaints").
 * @Id     -> Marks the primary key attribute.
 * @GeneratedValue -> Specifies automatic generation strategy (IDENTITY = AUTO_INCREMENT).
 * @Column -> Customizes column properties (nullability, length, column names).
 * ============================================================================
 */
@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "citizen_id", nullable = false)
    private Long citizenId = 1L; // Default to citizen 1 until auth is connected

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "category", nullable = false, length = 50)
    private String category;

    @Column(name = "severity", nullable = false)
    private Integer severity; // 1 to 5

    @Column(name = "priority_score", precision = 5, scale = 2)
    private BigDecimal priorityScore = BigDecimal.ZERO;

    @Column(name = "priority_level", length = 20)
    private String priorityLevel = "LOW"; // LOW, MEDIUM, HIGH, CRITICAL

    @Column(name = "status", nullable = false, length = 30)
    private String status = "SUBMITTED"; // SUBMITTED, VERIFIED, IN_PROGRESS, RESOLVED

    @Column(name = "latitude", precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 11, scale = 8)
    private BigDecimal longitude;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "resolution_notes", columnDefinition = "TEXT")
    private String resolutionNotes;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Column(name = "assigned_officer_id")
    private Long assignedOfficerId;

    @Column(name = "resolution_confirmed")
    private Boolean resolutionConfirmed = false;

    @Column(name = "resolution_confirmed_at")
    private LocalDateTime resolutionConfirmedAt;

    // Default No-Arg Constructor (Required by JPA/Hibernate proxy mechanism)
    public Complaint() {}

    // Lifecycle Callbacks to automatically populate timestamps
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "SUBMITTED";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCitizenId() { return citizenId; }
    public void setCitizenId(Long citizenId) { this.citizenId = citizenId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getSeverity() { return severity; }
    public void setSeverity(Integer severity) { this.severity = severity; }

    public BigDecimal getPriorityScore() { return priorityScore; }
    public void setPriorityScore(BigDecimal priorityScore) { this.priorityScore = priorityScore; }

    public String getPriorityLevel() { return priorityLevel; }
    public void setPriorityLevel(String priorityLevel) { this.priorityLevel = priorityLevel; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getResolutionNotes() { return resolutionNotes; }
    public void setResolutionNotes(String resolutionNotes) { this.resolutionNotes = resolutionNotes; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public Long getAssignedOfficerId() { return assignedOfficerId; }
    public void setAssignedOfficerId(Long assignedOfficerId) { this.assignedOfficerId = assignedOfficerId; }

    public Boolean getResolutionConfirmed() { return resolutionConfirmed != null && resolutionConfirmed; }
    public void setResolutionConfirmed(Boolean resolutionConfirmed) { this.resolutionConfirmed = resolutionConfirmed; }

    public LocalDateTime getResolutionConfirmedAt() { return resolutionConfirmedAt; }
    public void setResolutionConfirmedAt(LocalDateTime resolutionConfirmedAt) { this.resolutionConfirmedAt = resolutionConfirmedAt; }
}
