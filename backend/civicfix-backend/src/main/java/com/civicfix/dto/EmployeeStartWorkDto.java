package com.civicfix.dto;

import jakarta.validation.constraints.Size;

/**
 * ============================================================================
 * CIVICFIX — DAY 47: EMPLOYEE START WORK DTO
 * Package: com.civicfix.dto
 * Class: EmployeeStartWorkDto
 * ============================================================================
 */
public class EmployeeStartWorkDto {

    @Size(max = 1000, message = "Remarks cannot exceed 1000 characters")
    private String remarks;

    public EmployeeStartWorkDto() {}

    public EmployeeStartWorkDto(String remarks) {
        this.remarks = remarks;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
