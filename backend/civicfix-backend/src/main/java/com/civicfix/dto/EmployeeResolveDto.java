package com.civicfix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * ============================================================================
 * CIVICFIX — DAY 47: EMPLOYEE RESOLVE DTO
 * Package: com.civicfix.dto
 * Class: EmployeeResolveDto
 * ============================================================================
 */
public class EmployeeResolveDto {

    @NotBlank(message = "Resolution notes are required to document field completion")
    @Size(min = 10, max = 2000, message = "Resolution notes must be between 10 and 2000 characters")
    private String resolutionNotes;

    public EmployeeResolveDto() {}

    public EmployeeResolveDto(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
    }

    public String getResolutionNotes() {
        return resolutionNotes;
    }

    public void setResolutionNotes(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
    }
}
