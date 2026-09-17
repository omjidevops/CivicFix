package com.civicfix.controller;

import com.civicfix.dto.LoginRequestDto;
import com.civicfix.dto.LoginResponseDto;
import com.civicfix.dto.RegisterRequestDto;
import com.civicfix.dto.RegisterResponseDto;
import com.civicfix.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * ============================================================================
 * CIVICFIX — DAYS 36–38: AUTHENTICATION REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: AuthController
 *
 * Exposes authentication endpoints:
 * - POST /api/auth/register : Public citizen registration with BCrypt hashing
 * - POST /api/auth/login    : Authenticates credentials & returns signed JWT
 * ============================================================================
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Day 36: Citizen Registration Endpoint
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@Valid @RequestBody RegisterRequestDto requestDto) {
        RegisterResponseDto response = authService.register(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Days 37 & 38: Login & JWT Issuance Endpoint
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto requestDto) {
        LoginResponseDto response = authService.login(requestDto);
        return ResponseEntity.ok(response);
    }
}
