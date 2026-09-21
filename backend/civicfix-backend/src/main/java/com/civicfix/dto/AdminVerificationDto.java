package com.civicfix.dto;

import jakarta.validation.constraints.Size;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN VERIFICATION DTO
 * Package: com.civicfix.dto
 * Class: AdminVerificationDto
 * ============================================================================
 */
public class AdminVerificationDto {

    @Size(max = 1000, message = "Verification remarks cannot exceed 1000 characters")
    private String remarks;

    public AdminVerificationDto() {}

    public AdminVerificationDto(String remarks) {
        this.remarks = remarks;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
