package com.civicfix.service;

import com.civicfix.dto.LoginRequestDto;
import com.civicfix.dto.LoginResponseDto;
import com.civicfix.dto.RegisterRequestDto;
import com.civicfix.dto.RegisterResponseDto;
import com.civicfix.entity.Role;
import com.civicfix.entity.User;
import com.civicfix.exception.DuplicateEmailException;
import com.civicfix.repository.UserRepository;
import com.civicfix.security.JwtService;
import com.civicfix.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthServiceImpl authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = new User();
        sampleUser.setId(1L);
        sampleUser.setName("Citizen Ramesh");
        sampleUser.setEmail("ramesh@civicfix.gov");
        sampleUser.setPasswordHash("$2a$10$HashedPassword");
        sampleUser.setPhone("9876543210");
        sampleUser.setRole(Role.CITIZEN);
        sampleUser.setReputationScore(10);
    }

    @Test
    @DisplayName("Registration succeeds when email is unique")
    void testRegisterSuccess() {
        RegisterRequestDto dto = new RegisterRequestDto("Citizen Ramesh", "ramesh@civicfix.gov", "Secret123", "9876543210");

        when(userRepository.existsByEmail("ramesh@civicfix.gov")).thenReturn(false);
        when(passwordEncoder.encode("Secret123")).thenReturn("$2a$10$HashedPassword");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        RegisterResponseDto response = authService.register(dto);

        assertNotNull(response);
        assertEquals("User registered successfully", response.getMessage());
        assertEquals("ramesh@civicfix.gov", response.getEmail());
        assertEquals(Role.CITIZEN, response.getRole());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Registration throws DuplicateEmailException on duplicate email")
    void testRegisterDuplicateEmail() {
        RegisterRequestDto dto = new RegisterRequestDto("Citizen Ramesh", "ramesh@civicfix.gov", "Secret123", "9876543210");

        when(userRepository.existsByEmail("ramesh@civicfix.gov")).thenReturn(true);

        assertThrows(DuplicateEmailException.class, () -> authService.register(dto));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Login succeeds with correct credentials")
    void testLoginSuccess() {
        LoginRequestDto dto = new LoginRequestDto("ramesh@civicfix.gov", "Secret123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(mock(Authentication.class));
        when(userRepository.findByEmail("ramesh@civicfix.gov")).thenReturn(Optional.of(sampleUser));
        when(jwtService.generateToken(any(User.class))).thenReturn("mocked.jwt.token");

        LoginResponseDto response = authService.login(dto);

        assertNotNull(response);
        assertEquals("mocked.jwt.token", response.getToken());
        assertEquals("Bearer", response.getTokenType());
        assertEquals(sampleUser.getEmail(), response.getUser().getEmail());
        assertEquals(Role.CITIZEN, response.getUser().getRole());
    }

    @Test
    @DisplayName("Login throws BadCredentialsException when authenticationManager fails")
    void testLoginWrongPassword() {
        LoginRequestDto dto = new LoginRequestDto("ramesh@civicfix.gov", "WrongPassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThrows(BadCredentialsException.class, () -> authService.login(dto));
        verify(jwtService, never()).generateToken(any());
    }
}
