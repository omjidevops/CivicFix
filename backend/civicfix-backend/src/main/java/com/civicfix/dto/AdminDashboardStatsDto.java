package com.civicfix.dto;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN DASHBOARD STATS DTO
 * Package: com.civicfix.dto
 * Class: AdminDashboardStatsDto
 * ============================================================================
 */
public class AdminDashboardStatsDto {

    private long totalComplaints;
    private long pendingVerification;
    private long verified;
    private long assigned;
    private long inProgress;
    private long resolved;
    private long critical;
    private String resolutionRate;

    public AdminDashboardStatsDto() {}

    public long getTotalComplaints() {
        return totalComplaints;
    }

    public void setTotalComplaints(long totalComplaints) {
        this.totalComplaints = totalComplaints;
    }

    public long getPendingVerification() {
        return pendingVerification;
    }

    public void setPendingVerification(long pendingVerification) {
        this.pendingVerification = pendingVerification;
    }

    public long getVerified() {
        return verified;
    }

    public void setVerified(long verified) {
        this.verified = verified;
    }

    public long getAssigned() {
        return assigned;
    }

    public void setAssigned(long assigned) {
        this.assigned = assigned;
    }

    public long getInProgress() {
        return inProgress;
    }

    public void setInProgress(long inProgress) {
        this.inProgress = inProgress;
    }

    public long getResolved() {
        return resolved;
    }

    public void setResolved(long resolved) {
        this.resolved = resolved;
    }

    public long getCritical() {
        return critical;
    }

    public void setCritical(long critical) {
        this.critical = critical;
    }

    public String getResolutionRate() {
        return resolutionRate;
    }

    public void setResolutionRate(String resolutionRate) {
        this.resolutionRate = resolutionRate;
    }
}
