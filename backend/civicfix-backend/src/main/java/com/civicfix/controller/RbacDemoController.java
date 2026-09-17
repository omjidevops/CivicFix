package com.civicfix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * ============================================================================
 * CIVICFIX — DAY 40: ROLE-BASED ACCESS CONTROL (RBAC) DEMO CONTROLLER
 * Package: com.civicfix.controller
 * Class: RbacDemoController
 *
 * Exposes role-restricted endpoints to test and verify RBAC enforcement:
 * - GET /api/admin/dashboard     -> Requires ROLE_ADMIN
 * - GET /api/employee/complaints -> Requires ROLE_EMPLOYEE or ROLE_ADMIN
 * ============================================================================
 */
@RestController
@RequestMapping("/api")
public class RbacDemoController {

    /**
     * Admin Dashboard Endpoint
     * Accessible ONLY by users with ROLE_ADMIN
     */
    @GetMapping("/admin/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalComplaints", 1240);
        stats.put("pendingVerification", 18);
        stats.put("activeWardOfficers", 45);
        stats.put("resolutionRate", "92.4%");
        stats.put("accessGrantedRole", "ADMIN");
        return ResponseEntity.ok(stats);
    }

    /**
     * Employee Task Queue Endpoint
     * Accessible by users with ROLE_EMPLOYEE or ROLE_ADMIN
     */
    @GetMapping("/employee/complaints")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getEmployeeComplaints() {
        Map<String, Object> tasks = new HashMap<>();
        tasks.put("assignedGrievancesCount", 7);
        tasks.put("department", "Roads & Stormwater Infrastructure");
        tasks.put("activeSlaWarnings", 1);
        tasks.put("accessGrantedRole", "EMPLOYEE_OR_ADMIN");
        return ResponseEntity.ok(tasks);
    }
}
