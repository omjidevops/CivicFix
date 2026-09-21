package com.civicfix.dto;

/**
 * ============================================================================
 * CIVICFIX — DAY 47: EMPLOYEE DASHBOARD STATS DTO
 * Package: com.civicfix.dto
 * Class: EmployeeDashboardStatsDto
 *
 * Encapsulates performance and workload metrics for the authenticated field officer:
 * - totalAssigned: Total complaints delegated to this officer
 * - pendingStart : Complaints in ASSIGNED status awaiting crew dispatch
 * - inProgress   : Active complaints currently being worked on-site
 * - resolved     : Complaints successfully resolved by this officer
 * - overdueCount : Tasks past the admin deadline
 * ============================================================================
 */
public class EmployeeDashboardStatsDto {

    private long totalAssigned;
    private long pendingStart;
    private long inProgress;
    private long resolved;
    private long overdueCount;
    private String officerName;
    private String departmentName;

    public EmployeeDashboardStatsDto() {}

    public EmployeeDashboardStatsDto(long totalAssigned, long pendingStart, long inProgress,
                                     long resolved, long overdueCount, String officerName, String departmentName) {
        this.totalAssigned = totalAssigned;
        this.pendingStart = pendingStart;
        this.inProgress = inProgress;
        this.resolved = resolved;
        this.overdueCount = overdueCount;
        this.officerName = officerName;
        this.departmentName = departmentName;
    }

    public long getTotalAssigned() {
        return totalAssigned;
    }

    public void setTotalAssigned(long totalAssigned) {
        this.totalAssigned = totalAssigned;
    }

    public long getPendingStart() {
        return pendingStart;
    }

    public void setPendingStart(long pendingStart) {
        this.pendingStart = pendingStart;
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

    public long getOverdueCount() {
        return overdueCount;
    }

    public void setOverdueCount(long overdueCount) {
        this.overdueCount = overdueCount;
    }

    public String getOfficerName() {
        return officerName;
    }

    public void setOfficerName(String officerName) {
        this.officerName = officerName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}
