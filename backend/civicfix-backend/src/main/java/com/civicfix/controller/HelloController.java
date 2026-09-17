package com.civicfix.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * ============================================================================
 * CIVICFIX — DAY 30: PRACTICE REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: HelloController
 *
 * Annotations:
 * @RestController -> Specialized Spring MVC annotation combining @Controller and
 *   @ResponseBody. Indicates that incoming HTTP requests will be mapped to handler
 *   methods whose return values are automatically serialized into HTTP response
 *   bodies (typically JSON or plain text) without needing a view resolver.
 *
 * @GetMapping -> Shortcut annotation for @RequestMapping(method = RequestMethod.GET).
 *   Maps HTTP GET requests matching the specified URI path to the handler method.
 * ============================================================================
 */
@RestController
public class HelloController {

    /**
     * Root endpoint
     * HTTP GET http://localhost:8080/
     * Response: "CivicFix Backend is running"
     */
    @GetMapping("/")
    public String root() {
        return "CivicFix Backend is running";
    }

    /**
     * Mini API Greeting endpoint
     * HTTP GET http://localhost:8080/api/hello
     * Response: JSON {"message": "Welcome to CivicFix Backend"}
     */
    @GetMapping("/api/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to CivicFix Backend");
        return response;
    }

    /**
     * Health and Status endpoint
     * HTTP GET http://localhost:8080/api/status
     * Response: JSON with system status indicators
     */
    @GetMapping("/api/status")
    public Map<String, Object> status() {
        Map<String, Object> statusMap = new HashMap<>();
        statusMap.put("status", "UP");
        statusMap.put("service", "CivicFix Backend API");
        statusMap.put("framework", "Spring Boot 3.4.3");
        statusMap.put("javaVersion", "21");
        statusMap.put("timestamp", System.currentTimeMillis());
        return statusMap;
    }
}
