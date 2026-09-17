package com.civicfix.dto;

/**
 * ============================================================================
 * CIVICFIX — DAY 38: LOGIN RESPONSE DTO (JWT BEARER TOKEN CONTRACT)
 * Package: com.civicfix.dto
 * Class: LoginResponseDto
 *
 * Returned upon successful authentication containing:
 * - token: Signed HMAC-SHA256 JSON Web Token
 * - tokenType: "Bearer" (Standard OAuth2/RFC 6750 authorization scheme)
 * - user: Safe profile summary of the authenticated user
 * ============================================================================
 */
public class LoginResponseDto {

    private String token;
    private String tokenType = "Bearer";
    private UserSummaryDto user;

    public LoginResponseDto() {
    }

    public LoginResponseDto(String token, UserSummaryDto user) {
        this.token = token;
        this.tokenType = "Bearer";
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public UserSummaryDto getUser() {
        return user;
    }

    public void setUser(UserSummaryDto user) {
        this.user = user;
    }
}
