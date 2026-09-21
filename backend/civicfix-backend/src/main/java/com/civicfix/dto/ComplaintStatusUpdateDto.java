package com.civicfix.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * ============================================================================
 * CIVICFIX — DAY 45: COMPLAINT STATUS UPDATE DTO
 * Package: com.civicfix.dto
 * Class: ComplaintStatusUpdateDto
 *
 * Enforces valid municipal resolution workflow transitions:
 * Allowed statuses: SUBMITTED, IN_PROGRESS, RESOLVED, REJECTED
 * ============================================================================
 */
public class ComplaintStatusUpdateDto {

    @NotBlank(message = "Status cannot be blank")
    @Pattern(
            regexp = "SUBMITTED|IN_PROGRESS|RESOLVED|REJECTED",
            message = "Invalid status. Allowed values: SUBMITTED, IN_PROGRESS, RESOLVED, REJECTED"
    )
    private String status;

    @Size(max = 1000, message = "Resolution notes cannot exceed 1000 characters")
    private String resolutionNotes;

    public ComplaintStatusUpdateDto() {}

    public ComplaintStatusUpdateDto(String status, String resolutionNotes) {
        this.status = status;
        this.resolutionNotes = resolutionNotes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResolutionNotes() {
        return resolutionNotes;
    }

    public void setResolutionNotes(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
    }
}
