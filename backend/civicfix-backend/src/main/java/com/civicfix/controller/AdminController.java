package com.civicfix.controller;

import com.civicfix.dto.*;
import com.civicfix.entity.Department;
import com.civicfix.entity.User;
import com.civicfix.security.CustomUserDetails;
import com.civicfix.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: AdminController
 *
 * Exposes administrative endpoints for the Municipal Commissioner:
 * All endpoints strictly require ROLE_ADMIN!
 * ============================================================================
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    /**
     * 1. Real aggregated KPI metrics
     * GET /api/admin/dashboard/stats
     */
    @GetMapping("/dashboard/stats")
    public ResponseEntity<AdminDashboardStatsDto> getDashboardStats() {
        AdminDashboardStatsDto stats = adminService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * 2. Filterable grievance queue
     * GET /api/admin/complaints
     */
    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintResponseDto>> getComplaints(
            @RequestParam(required = false, defaultValue = "ALL") String status,
            @RequestParam(required = false, defaultValue = "ALL") String category,
            @RequestParam(required = false, defaultValue = "ALL") String priority,
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) String search
    ) {
        List<ComplaintResponseDto> list = adminService.getComplaints(status, category, priority, departmentId, search);
        return ResponseEntity.ok(list);
    }

    /**
     * 3. Complete 360-degree grievance details
     * GET /api/admin/complaints/{id}
     */
    @GetMapping("/complaints/{id}")
    public ResponseEntity<AdminComplaintDetailDto> getComplaintDetails(@PathVariable Long id) {
        AdminComplaintDetailDto details = adminService.getComplaintDetails(id);
        return ResponseEntity.ok(details);
    }

    /**
     * 4. Verify a submitted complaint
     * PUT /api/admin/complaints/{id}/verify
     */
    @PutMapping("/complaints/{id}/verify")
    public ResponseEntity<ComplaintResponseDto> verifyComplaint(
            @PathVariable Long id,
            @RequestBody(required = false) AdminVerificationDto verificationDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long adminId = (userDetails != null && userDetails.getUser() != null) ? userDetails.getUser().getId() : 1L;
        ComplaintResponseDto updated = adminService.verifyComplaint(id, verificationDto, adminId);
        return ResponseEntity.ok(updated);
    }

    /**
     * 5. Get all municipal departments
     * GET /api/admin/departments
     */
    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getDepartments() {
        return ResponseEntity.ok(adminService.getAllDepartments());
    }

    /**
     * 6. Get all municipal field officers
     * GET /api/admin/employees
     */
    @GetMapping("/employees")
    public ResponseEntity<List<User>> getEmployees() {
        return ResponseEntity.ok(adminService.getAllEmployees());
    }

    /**
     * 7. Assign department and officer
     * POST /api/admin/complaints/{id}/assign
     */
    @PostMapping("/complaints/{id}/assign")
    public ResponseEntity<ComplaintResponseDto> assignComplaint(
            @PathVariable Long id,
            @Valid @RequestBody AdminAssignmentDto assignmentDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long adminId = (userDetails != null && userDetails.getUser() != null) ? userDetails.getUser().getId() : 1L;
        ComplaintResponseDto assigned = adminService.assignComplaint(id, assignmentDto, adminId);
        return ResponseEntity.ok(assigned);
    }

    /**
     * 8. Municipal analytics
     * GET /api/admin/analytics
     */
    @GetMapping("/analytics")
    public ResponseEntity<AdminAnalyticsDto> getAnalytics() {
        return ResponseEntity.ok(adminService.getAnalytics());
    }
}
