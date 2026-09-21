package com.civicfix.dto;

import com.civicfix.entity.ComplaintMedia;
import com.civicfix.entity.StatusHistory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 47: EMPLOYEE ASSIGNMENT DETAIL DTO
 * Package: com.civicfix.dto
 * Class: EmployeeAssignmentDetailDto
 *
 * Full field inspection model presenting grievance data to the assigned officer.
 * ============================================================================
 */
public class EmployeeAssignmentDetailDto {

    private Long complaintId;
    private String title;
    private String description;
    private String category;
    private Integer severity;
    private String priority;
    private String status;
    private String address;
    private BigDecimal latitude;
    private BigDecimal longitude;

    // Citizen Contact for Field Navigation
    private String citizenName;
    private String citizenPhone;
    private String citizenEmail;

    // Delegation Metadata
    private String departmentName;
    private LocalDateTime assignedAt;
    private LocalDateTime acceptedAt;
    private LocalDateTime deadline;
    private String instructions;

    // Resolution Details
    private String resolutionNotes;
    private LocalDateTime resolvedAt;

    // Attachments & Timeline
    private List<ComplaintMedia> mediaList = new ArrayList<>();
    private List<StatusHistory> statusHistory = new ArrayList<>();

    public EmployeeAssignmentDetailDto() {}

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getSeverity() {
        return severity;
    }

    public void setSeverity(Integer severity) {
        this.severity = severity;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getCitizenName() {
        return citizenName;
    }

    public void setCitizenName(String citizenName) {
        this.citizenName = citizenName;
    }

    public String getCitizenPhone() {
        return citizenPhone;
    }

    public void setCitizenPhone(String citizenPhone) {
        this.citizenPhone = citizenPhone;
    }

    public String getCitizenEmail() {
        return citizenEmail;
    }

    public void setCitizenEmail(String citizenEmail) {
        this.citizenEmail = citizenEmail;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public LocalDateTime getAcceptedAt() {
        return acceptedAt;
    }

    public void setAcceptedAt(LocalDateTime acceptedAt) {
        this.acceptedAt = acceptedAt;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getResolutionNotes() {
        return resolutionNotes;
    }

    public void setResolutionNotes(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }

    public List<ComplaintMedia> getMediaList() {
        return mediaList;
    }

    public void setMediaList(List<ComplaintMedia> mediaList) {
        this.mediaList = mediaList;
    }

    public List<StatusHistory> getStatusHistory() {
        return statusHistory;
    }

    public void setStatusHistory(List<StatusHistory> statusHistory) {
        this.statusHistory = statusHistory;
    }
}
