package com.civicfix.security;

import com.civicfix.entity.Role;
import com.civicfix.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtServiceTest {

    private JwtService jwtService;
    private User sampleUser;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        ReflectionTestUtils.setField(jwtService, "jwtSecret", "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(jwtService, "jwtExpirationMs", 3600000L); // 1 hour

        sampleUser = new User();
        sampleUser.setId(42L);
        sampleUser.setName("Priya Sharma");
        sampleUser.setEmail("priya@civicfix.gov");
        sampleUser.setRole(Role.CITIZEN);
    }

    @Test
    @DisplayName("Generate token and extract correct claims")
    void testGenerateTokenAndExtractClaims() {
        String token = jwtService.generateToken(sampleUser);

        assertNotNull(token);
        assertTrue(token.split("\\.").length == 3);

        String username = jwtService.extractUsername(token);
        assertEquals("priya@civicfix.gov", username);

        var claims = jwtService.extractAllClaims(token);
        assertEquals(42, claims.get("userId"));
        assertEquals("CITIZEN", claims.get("role"));
        assertEquals("Priya Sharma", claims.get("name"));
    }

    @Test
    @DisplayName("Validate token against matching UserDetails returns true")
    void testValidateTokenSuccess() {
        String token = jwtService.generateToken(sampleUser);

        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("priya@civicfix.gov");

        boolean isValid = jwtService.validateToken(token, userDetails);
        assertTrue(isValid);
    }

    @Test
    @DisplayName("Validate token against mismatched username returns false")
    void testValidateTokenMismatchedUser() {
        String token = jwtService.generateToken(sampleUser);

        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("different@civicfix.gov");

        boolean isValid = jwtService.validateToken(token, userDetails);
        assertFalse(isValid);
    }

    @Test
    @DisplayName("Validate malformed token returns false without throwing unhandled exception")
    void testValidateMalformedToken() {
        UserDetails userDetails = mock(UserDetails.class);
        boolean isValid = jwtService.validateToken("malformed.token.string", userDetails);
        assertFalse(isValid);
    }
}
