package com.civicfix.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ============================================================================
 * CIVICFIX — DAYS 39 & 40: SPRING SECURITY 6 & RBAC CONFIGURATION
 * Package: com.civicfix.security
 * Class: SecurityConfig
 *
 * Core Security Architecture:
 * 1. Stateless session management (No HTTP sessions, pure JWT Bearer authentication)
 * 2. Disabled CSRF (Safe for token-based REST APIs where browsers do not auto-send credentials)
 * 3. Integrated CORS support matching React frontend dev ports (5173 & 5174)
 * 4. Structured JSON error responses for 401 Unauthorized and 403 Forbidden
 * 5. Strict Role-Based Access Control (RBAC):
 *    - /api/auth/**, /api/health -> Public (permitAll)
 *    - /api/admin/**             -> Restricted to ROLE_ADMIN
 *    - /api/employee/**          -> Restricted to ROLE_EMPLOYEE or ROLE_ADMIN
 *    - /api/complaints/**        -> Authenticated users
 * 6. Injects JwtAuthenticationFilter before UsernamePasswordAuthenticationFilter
 * ============================================================================
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ObjectMapper objectMapper;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, ObjectMapper objectMapper) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.objectMapper = objectMapper;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Industry-standard BCrypt adaptive hashing with internal salt
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @org.springframework.beans.factory.annotation.Value("${app.cors.allowed-origins:http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174}")
    private String corsAllowedOrigins;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        List<String> origins = Arrays.stream(corsAllowedOrigins.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
        config.setAllowedOrigins(origins);
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Configure CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. Disable CSRF for stateless REST APIs using Bearer tokens
                .csrf(csrf -> csrf.disable())

                // 3. Configure Stateless Session Management
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 4. Custom JSON Exception Handlers for 401 and 403
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(401);
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                            Map<String, Object> body = new HashMap<>();
                            body.put("status", 401);
                            body.put("error", "Unauthorized");
                            body.put("message", "Authentication required or token invalid");
                            body.put("timestamp", LocalDateTime.now().toString());
                            objectMapper.writeValue(response.getOutputStream(), body);
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(403);
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                            Map<String, Object> body = new HashMap<>();
                            body.put("status", 403);
                            body.put("error", "Forbidden");
                            body.put("message", "Access denied: insufficient permissions for this resource");
                            body.put("timestamp", LocalDateTime.now().toString());
                            objectMapper.writeValue(response.getOutputStream(), body);
                        })
                )

                // 5. URL Authorization Rules (RBAC)
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/health").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/media/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/complaints/**").permitAll()

                        // Role-Based Endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/employee/**").hasAnyRole("EMPLOYEE", "ADMIN")

                        // Authenticated Resource Endpoints
                        .requestMatchers("/api/complaints/**").authenticated()

                        // All other endpoints require authentication
                        .anyRequest().authenticated()
                )

                // 6. Register JWT Filter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
