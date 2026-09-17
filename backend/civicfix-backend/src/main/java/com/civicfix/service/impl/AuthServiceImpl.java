package com.civicfix.service.impl;

import com.civicfix.dto.*;
import com.civicfix.entity.Role;
import com.civicfix.entity.User;
import com.civicfix.exception.DuplicateEmailException;
import com.civicfix.repository.UserRepository;
import com.civicfix.security.JwtService;
import com.civicfix.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * ============================================================================
 * CIVICFIX — DAYS 36–38: AUTHENTICATION SERVICE IMPLEMENTATION
 * Package: com.civicfix.service.impl
 * Class: AuthServiceImpl
 *
 * Implements registration with BCrypt hashing and login with JWT generation.
 * Enforces:
 * - Duplicate email prevention
 * - Adaptive BCrypt hashing (no plaintext passwords ever stored or logged)
 * - Safe role assignment (public registration strictly defaults to CITIZEN)
 * - AuthenticationManager verification
 * - JWT issuance with claims
 * ============================================================================
 */
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    @Transactional
    public RegisterResponseDto register(RegisterRequestDto requestDto) {
        String normalizedEmail = requestDto.getEmail().trim().toLowerCase();

        // 1. Check for duplicate email
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new DuplicateEmailException("Email is already registered: " + normalizedEmail);
        }

        // 2. Hash password with BCrypt (generates unique salt per hash)
        String hashedPassword = passwordEncoder.encode(requestDto.getPassword());

        // 3. Create User entity with safe default role (CITIZEN)
        User user = new User();
        user.setName(requestDto.getName().trim());
        user.setEmail(normalizedEmail);
        user.setPasswordHash(hashedPassword);
        user.setPhone(requestDto.getPhone().trim());
        user.setRole(Role.CITIZEN); // Strict server-side role assignment
        user.setReputationScore(10);

        User savedUser = userRepository.save(user);

        return new RegisterResponseDto(
                "User registered successfully",
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    @Override
    public LoginResponseDto login(LoginRequestDto requestDto) {
        String normalizedEmail = requestDto.getEmail().trim().toLowerCase();

        // 1. Authenticate user credentials via Spring Security AuthenticationManager
        // If password does not match BCrypt hash, throws BadCredentialsException
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        normalizedEmail,
                        requestDto.getPassword()
                )
        );

        // 2. Retrieve user record
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + normalizedEmail));

        // 3. Generate stateless JWT Bearer token
        String jwtToken = jwtService.generateToken(user);

        // 4. Construct safe response
        UserSummaryDto userSummary = new UserSummaryDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getReputationScore()
        );

        return new LoginResponseDto(jwtToken, userSummary);
    }
}
