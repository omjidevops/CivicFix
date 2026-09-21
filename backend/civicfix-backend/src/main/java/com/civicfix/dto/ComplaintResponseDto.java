package com.civicfix.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 34: COMPLAINT RESPONSE DTO
 * Package: com.civicfix.dto
 * Class: ComplaintResponseDto
 *
 * Controls exactly what data is exposed back to API clients / frontend dashboards.
 * Protects internal entity state and formats output safely.
 * ============================================================================
 */
public class ComplaintResponseDto {

    private Long id;
    private Long citizenId;
    private String title;
    private String description;
    private String category;
    private Integer severity;
    private String priorityLevel;
    private BigDecimal priorityScore;
    private String status;
    private String address;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String resolutionNotes;
    private LocalDateTime resolvedAt;
    private Long assignedOfficerId;
    private Boolean resolutionConfirmed;
    private LocalDateTime resolutionConfirmedAt;

    public ComplaintResponseDto() {}

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

    public String getPriorityLevel() { return priorityLevel; }
    public void setPriorityLevel(String priorityLevel) { this.priorityLevel = priorityLevel; }

    public BigDecimal getPriorityScore() { return priorityScore; }
    public void setPriorityScore(BigDecimal priorityScore) { this.priorityScore = priorityScore; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

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
