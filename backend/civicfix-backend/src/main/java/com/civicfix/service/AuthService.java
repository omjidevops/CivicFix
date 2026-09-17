package com.civicfix.service;

import com.civicfix.dto.LoginRequestDto;
import com.civicfix.dto.LoginResponseDto;
import com.civicfix.dto.RegisterRequestDto;
import com.civicfix.dto.RegisterResponseDto;

/**
 * ============================================================================
 * CIVICFIX — DAYS 36–38: AUTHENTICATION SERVICE INTERFACE
 * Package: com.civicfix.service
 * Interface: AuthService
 *
 * Defines business operations for citizen registration and login authentication.
 * ============================================================================
 */
public interface AuthService {

    /**
     * Register a new citizen with BCrypt password hashing
     */
    RegisterResponseDto register(RegisterRequestDto requestDto);

    /**
     * Authenticate credentials and return signed JWT Bearer token
     */
    LoginResponseDto login(LoginRequestDto requestDto);
}
