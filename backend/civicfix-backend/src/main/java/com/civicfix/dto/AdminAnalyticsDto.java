package com.civicfix.dto;

import java.util.Map;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN ANALYTICS DTO
 * Package: com.civicfix.dto
 * Class: AdminAnalyticsDto
 * ============================================================================
 */
public class AdminAnalyticsDto {

    private Map<String, Long> complaintsByCategory;
    private Map<String, Long> complaintsByStatus;
    private Map<String, Long> complaintsByPriority;
    private long totalGrievances;
    private long resolvedGrievances;

    public AdminAnalyticsDto() {}

    public AdminAnalyticsDto(
            Map<String, Long> complaintsByCategory,
            Map<String, Long> complaintsByStatus,
            Map<String, Long> complaintsByPriority,
            long totalGrievances,
            long resolvedGrievances
    ) {
        this.complaintsByCategory = complaintsByCategory;
        this.complaintsByStatus = complaintsByStatus;
        this.complaintsByPriority = complaintsByPriority;
        this.totalGrievances = totalGrievances;
        this.resolvedGrievances = resolvedGrievances;
    }

    public Map<String, Long> getComplaintsByCategory() {
        return complaintsByCategory;
    }

    public void setComplaintsByCategory(Map<String, Long> complaintsByCategory) {
        this.complaintsByCategory = complaintsByCategory;
    }

    public Map<String, Long> getComplaintsByStatus() {
        return complaintsByStatus;
    }

    public void setComplaintsByStatus(Map<String, Long> complaintsByStatus) {
        this.complaintsByStatus = complaintsByStatus;
    }

    public Map<String, Long> getComplaintsByPriority() {
        return complaintsByPriority;
    }

    public void setComplaintsByPriority(Map<String, Long> complaintsByPriority) {
        this.complaintsByPriority = complaintsByPriority;
    }

    public long getTotalGrievances() {
        return totalGrievances;
    }

    public void setTotalGrievances(long totalGrievances) {
        this.totalGrievances = totalGrievances;
    }

    public long getResolvedGrievances() {
        return resolvedGrievances;
    }

    public void setResolvedGrievances(long resolvedGrievances) {
        this.resolvedGrievances = resolvedGrievances;
    }
}
