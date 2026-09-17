package com.civicfix.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * ============================================================================
 * CIVICFIX — DAY 37: LOGIN REQUEST DTO
 * Package: com.civicfix.dto
 * Class: LoginRequestDto
 *
 * Incoming credentials payload for user authentication.
 * ============================================================================
 */
public class LoginRequestDto {

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public LoginRequestDto() {
    }

    public LoginRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
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
}
