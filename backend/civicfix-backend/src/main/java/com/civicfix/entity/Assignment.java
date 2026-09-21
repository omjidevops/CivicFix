package com.civicfix.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ASSIGNMENT JPA ENTITY
 * Package: com.civicfix.entity
 * Class: Assignment
 *
 * Mapped to the 'assignments' table defined in schema.sql.
 * Represents official delegation of grievance tasks to municipal employees.
 * ============================================================================
 */
@Entity
@Table(name = "assignments")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "complaint_id", nullable = false)
    private Long complaintId;

    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    @Column(name = "department_id", nullable = false)
    private Integer departmentId;

    @Column(name = "assigned_at", updatable = false)
    private LocalDateTime assignedAt;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "accepted_at")
    private LocalDateTime acceptedAt;

    public Assignment() {}

    public Assignment(Long complaintId, Long employeeId, Integer departmentId, LocalDateTime deadline) {
        this.complaintId = complaintId;
        this.employeeId = employeeId;
        this.departmentId = departmentId;
        this.deadline = deadline;
    }

    @PrePersist
    protected void onCreate() {
        this.assignedAt = LocalDateTime.now();
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

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }

    public LocalDateTime getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDateTime deadline) {
        this.deadline = deadline;
    }

    public LocalDateTime getAcceptedAt() {
        return acceptedAt;
    }

    public void setAcceptedAt(LocalDateTime acceptedAt) {
        this.acceptedAt = acceptedAt;
    }
}
