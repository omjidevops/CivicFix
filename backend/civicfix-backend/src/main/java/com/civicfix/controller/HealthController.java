package com.civicfix.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * ============================================================================
 * CIVICFIX — DAY 31: HEALTH CHECK REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: HealthController
 *
 * Provides a lightweight health check endpoint for monitoring, load balancers,
 * and automated connectivity probes.
 * ============================================================================
 */
@RestController
public class HealthController {

    /**
     * Health check endpoint
     * HTTP GET http://localhost:8081/api/health
     * Response: JSON {"status": "CivicFix backend is running"}
     */
    @GetMapping("/api/health")
    public Map<String, String> getHealthStatus() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "CivicFix backend is running");
        return response;
    }
}
