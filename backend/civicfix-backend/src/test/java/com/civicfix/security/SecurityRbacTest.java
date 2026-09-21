package com.civicfix.security;

import com.civicfix.CivicFixApplication;
import com.civicfix.entity.User;
import com.civicfix.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = CivicFixApplication.class)
@AutoConfigureMockMvc
class SecurityRbacTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    private String citizenToken;
    private String employeeToken;
    private String adminToken;

    @BeforeEach
    void setUp() {
        User citizen = userRepository.findByEmail("citizen@civicfix.gov").orElseThrow();
        citizenToken = jwtService.generateToken(citizen);

        User officer = userRepository.findByEmail("officer@civicfix.gov").orElseThrow();
        employeeToken = jwtService.generateToken(officer);

        User admin = userRepository.findByEmail("admin@civicfix.gov").orElseThrow();
        adminToken = jwtService.generateToken(admin);
    }

    @Test
    @DisplayName("Public health endpoint is accessible without authentication (200 OK)")
    void testPublicHealthEndpointAccessible() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Admin stats endpoint without authentication returns 401 Unauthorized")
    void testAdminStatsUnauthenticated() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard/stats"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Admin stats endpoint accessed by CITIZEN returns 403 Forbidden")
    void testAdminStatsForbiddenForCitizen() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard/stats")
                        .header("Authorization", "Bearer " + citizenToken))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Employee stats endpoint accessed by CITIZEN returns 403 Forbidden")
    void testEmployeeStatsForbiddenForCitizen() throws Exception {
        mockMvc.perform(get("/api/employee/dashboard/stats")
                        .header("Authorization", "Bearer " + citizenToken))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Admin stats endpoint accessed by ADMIN returns 200 OK")
    void testAdminStatsPermittedForAdmin() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard/stats")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Employee stats endpoint accessed by EMPLOYEE returns 200 OK")
    void testEmployeeStatsPermittedForEmployee() throws Exception {
        mockMvc.perform(get("/api/employee/dashboard/stats")
                        .header("Authorization", "Bearer " + employeeToken))
                .andExpect(status().isOk());
    }
}
