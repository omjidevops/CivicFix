package com.civicfix.dto;

import com.civicfix.entity.Role;

/**
 * ============================================================================
 * CIVICFIX — DAY 37 & 38: USER SUMMARY DTO
 * Package: com.civicfix.dto
 * Class: UserSummaryDto
 *
 * Public client-facing user profile information without credential leaks.
 * ============================================================================
 */
public class UserSummaryDto {

    private Long id;
    private String name;
    private String email;
    private Role role;
    private Integer reputationScore;

    public UserSummaryDto() {
    }

    public UserSummaryDto(Long id, String name, String email, Role role, Integer reputationScore) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.reputationScore = reputationScore;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getReputationScore() {
        return reputationScore;
    }

    public void setReputationScore(Integer reputationScore) {
        this.reputationScore = reputationScore;
    }
}
