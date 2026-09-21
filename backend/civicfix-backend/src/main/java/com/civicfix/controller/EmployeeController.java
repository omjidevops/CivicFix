package com.civicfix.controller;

import com.civicfix.dto.*;
import com.civicfix.entity.User;
import com.civicfix.security.CustomUserDetails;
import com.civicfix.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 47: EMPLOYEE FIELD OPERATIONS REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: EmployeeController
 *
 * Exposes field operational endpoints for municipal officers:
 * - Guarded strictly by ROLE_EMPLOYEE and ROLE_ADMIN
 * - Isolated view of assigned grievance tasks
 * - Status transition: ASSIGNED -> IN_PROGRESS -> RESOLVED
 * ============================================================================
 */
@RestController
@RequestMapping("/api/employee")
@PreAuthorize("hasAnyRole('EMPLOYEE', 'ADMIN')")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     * 1. Get Employee Dashboard KPIs
     * GET /api/employee/dashboard/stats
     */
    @GetMapping("/dashboard/stats")
    public ResponseEntity<EmployeeDashboardStatsDto> getDashboardStats(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        User employee = userDetails.getUser();
        EmployeeDashboardStatsDto stats = employeeService.getDashboardStats(employee);
        return ResponseEntity.ok(stats);
    }

    /**
     * 2. Get Employee Assigned Complaints Queue
     * GET /api/employee/assignments
     */
    @GetMapping("/assignments")
    public ResponseEntity<List<EmployeeAssignmentDetailDto>> getMyAssignments(
            @RequestParam(required = false, defaultValue = "ALL") String status,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        User employee = userDetails.getUser();
        List<EmployeeAssignmentDetailDto> list = employeeService.getMyAssignments(employee, status);
        return ResponseEntity.ok(list);
    }

    /**
     * 3. Get 360° Field Task Details
     * GET /api/employee/assignments/{complaintId}
     */
    @GetMapping("/assignments/{complaintId}")
    public ResponseEntity<EmployeeAssignmentDetailDto> getAssignmentDetails(
            @PathVariable Long complaintId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        User employee = userDetails.getUser();
        EmployeeAssignmentDetailDto details = employeeService.getAssignmentDetails(employee, complaintId);
        return ResponseEntity.ok(details);
    }

    /**
     * 4. Start Work on Assigned Grievance (ASSIGNED -> IN_PROGRESS)
     * PUT /api/employee/assignments/{complaintId}/start
     */
    @PutMapping("/assignments/{complaintId}/start")
    public ResponseEntity<ComplaintResponseDto> startWork(
            @PathVariable Long complaintId,
            @RequestBody(required = false) EmployeeStartWorkDto startWorkDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        User employee = userDetails.getUser();
        ComplaintResponseDto response = employeeService.startWork(employee, complaintId, startWorkDto);
        return ResponseEntity.ok(response);
    }

    /**
     * 5. Submit Resolution Proof & Notes (IN_PROGRESS -> RESOLVED)
     * PUT /api/employee/assignments/{complaintId}/resolve
     */
    @PutMapping("/assignments/{complaintId}/resolve")
    public ResponseEntity<ComplaintResponseDto> resolveWork(
            @PathVariable Long complaintId,
            @Valid @RequestBody EmployeeResolveDto resolveDto,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        User employee = userDetails.getUser();
        ComplaintResponseDto response = employeeService.resolveWork(employee, complaintId, resolveDto);
        return ResponseEntity.ok(response);
    }
}
