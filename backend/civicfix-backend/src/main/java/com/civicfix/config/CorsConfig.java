package com.civicfix.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * ============================================================================
 * CIVICFIX — DAY 35: CROSS-ORIGIN RESOURCE SHARING (CORS) CONFIGURATION
 * Package: com.civicfix.config
 * Class: CorsConfig
 *
 * Configures explicit CORS policies for development:
 * Allows the React frontend running on http://localhost:5173 to communicate
 * with this Spring Boot REST backend without browser security blocks.
 * ============================================================================
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://127.0.0.1:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
