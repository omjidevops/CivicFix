package com.civicfix.dto;

import com.civicfix.entity.Role;

/**
 * ============================================================================
 * CIVICFIX — DAY 36: REGISTRATION RESPONSE DTO
 * Package: com.civicfix.dto
 * Class: RegisterResponseDto
 *
 * Safe response payload sent back to client upon successful registration.
 * CRITICAL SECURITY RULE:
 * NEVER return password or password_hash in any API response!
 * ============================================================================
 */
public class RegisterResponseDto {

    private String message;
    private Long userId;
    private String name;
    private String email;
    private Role role;

    public RegisterResponseDto() {
    }

    public RegisterResponseDto(String message, Long userId, String name, String email, Role role) {
        this.message = message;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
