package com.civicfix.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN ASSIGNMENT DTO
 * Package: com.civicfix.dto
 * Class: AdminAssignmentDto
 * ============================================================================
 */
public class AdminAssignmentDto {

    @NotNull(message = "Department ID is required")
    private Integer departmentId;

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    private LocalDateTime deadline;

    @Size(max = 1000, message = "Instructions cannot exceed 1000 characters")
    private String instructions;

    public AdminAssignmentDto() {}

    public AdminAssignmentDto(Integer departmentId, Long employeeId, LocalDateTime deadline, String instructions) {
        this.departmentId = departmentId;
        this.employeeId = employeeId;
        this.deadline = deadline;
        this.instructions = instructions;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
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
}
