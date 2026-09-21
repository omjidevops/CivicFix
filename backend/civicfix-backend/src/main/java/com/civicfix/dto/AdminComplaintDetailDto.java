package com.civicfix.dto;

import com.civicfix.entity.ComplaintMedia;
import com.civicfix.entity.StatusHistory;

import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN COMPLAINT DETAIL DTO
 * Package: com.civicfix.dto
 * Class: AdminComplaintDetailDto
 *
 * Full 360-degree audit representation of a grievance for Municipal Admin:
 * Includes citizen credentials, status history timeline, media, and comments.
 * ============================================================================
 */
public class AdminComplaintDetailDto {

    private ComplaintResponseDto complaint;
    private String citizenName;
    private String citizenEmail;
    private String citizenPhone;
    private String departmentName;
    private String assignedEmployeeName;
    private List<StatusHistory> statusHistory = new ArrayList<>();
    private List<ComplaintMedia> mediaList = new ArrayList<>();
    private List<CommentResponseDto> comments = new ArrayList<>();

    public AdminComplaintDetailDto() {}

    public ComplaintResponseDto getComplaint() {
        return complaint;
    }

    public void setComplaint(ComplaintResponseDto complaint) {
        this.complaint = complaint;
    }

    public String getCitizenName() {
        return citizenName;
    }

    public void setCitizenName(String citizenName) {
        this.citizenName = citizenName;
    }

    public String getCitizenEmail() {
        return citizenEmail;
    }

    public void setCitizenEmail(String citizenEmail) {
        this.citizenEmail = citizenEmail;
    }

    public String getCitizenPhone() {
        return citizenPhone;
    }

    public void setCitizenPhone(String citizenPhone) {
        this.citizenPhone = citizenPhone;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getAssignedEmployeeName() {
        return assignedEmployeeName;
    }

    public void setAssignedEmployeeName(String assignedEmployeeName) {
        this.assignedEmployeeName = assignedEmployeeName;
    }

    public List<StatusHistory> getStatusHistory() {
        return statusHistory;
    }

    public void setStatusHistory(List<StatusHistory> statusHistory) {
        this.statusHistory = statusHistory;
    }

    public List<ComplaintMedia> getMediaList() {
        return mediaList;
    }

    public void setMediaList(List<ComplaintMedia> mediaList) {
        this.mediaList = mediaList;
    }

    public List<CommentResponseDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentResponseDto> comments) {
        this.comments = comments;
    }
}
