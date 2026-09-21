package com.civicfix.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * ============================================================================
 * CIVICFIX — DAY 34: COMPLAINT REQUEST DATA TRANSFER OBJECT (DTO)
 * Package: com.civicfix.dto
 * Class: ComplaintRequestDto
 *
 * Enforces strong input validation before requests reach the Service layer:
 * - Prevents client from tampering with auto-generated fields (id, createdAt)
 * - Validates required non-blank text
 * - Restricts severity to valid business range (1 to 5)
 * ============================================================================
 */
public class ComplaintRequestDto {

    @NotBlank(message = "Title is required and cannot be empty")
    @Size(min = 5, max = 150, message = "Title must be between 5 and 150 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000, message = "Description must provide at least 10 characters")
    private String description;

    @NotBlank(message = "Category is required (e.g., Road Damage, Sanitation, Water Supply)")
    private String category;

    @NotNull(message = "Severity is required")
    @Min(value = 1, message = "Severity must be at least 1 (Low)")
    @Max(value = 5, message = "Severity cannot exceed 5 (Critical)")
    private Integer severity;

    @NotBlank(message = "Address is required for field inspection")
    private String address;

    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90 degrees")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90 degrees")
    private BigDecimal latitude;

    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180 degrees")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180 degrees")
    private BigDecimal longitude;

    // Constructors
    public ComplaintRequestDto() {}

    public ComplaintRequestDto(String title, String description, String category,
                               Integer severity, String address, BigDecimal latitude, BigDecimal longitude) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.severity = severity;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getSeverity() { return severity; }
    public void setSeverity(Integer severity) { this.severity = severity; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }
}
