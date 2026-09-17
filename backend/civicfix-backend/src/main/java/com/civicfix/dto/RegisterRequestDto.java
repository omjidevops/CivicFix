package com.civicfix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * ============================================================================
 * CIVICFIX — DAY 36: REGISTRATION REQUEST DTO
 * Package: com.civicfix.dto
 * Class: RegisterRequestDto
 *
 * Security Architecture:
 * Notice that there is NO 'role' field in this DTO.
 * Allowing users to pass `{"role": "ADMIN"}` in a public registration endpoint
 * is a severe Mass Assignment / Privilege Escalation vulnerability.
 * Public registration ALWAYS defaults securely to Role.CITIZEN on the backend.
 * ============================================================================
 */
public class RegisterRequestDto {

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email format (e.g. citizen@example.com)")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Phone number is required for SMS grievance updates")
    @Size(min = 7, max = 20, message = "Phone number must be between 7 and 20 digits")
    private String phone;

    public RegisterRequestDto() {
    }

    public RegisterRequestDto(String name, String email, String password, String phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
