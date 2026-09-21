package com.civicfix.service;

import com.civicfix.dto.*;
import com.civicfix.entity.User;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 47: EMPLOYEE FIELD OPERATIONS SERVICE
 * Package: com.civicfix.service
 * Interface: EmployeeService
 *
 * Defines business operations for field officers and municipal workers:
 * - Real-time workload & SLA statistics
 * - Isolated view of assigned grievance tasks
 * - 360-degree task inspection with citizen contact info & audit logs
 * - Status transition: ASSIGNED -> IN_PROGRESS (On-site dispatch)
 * - Status transition: IN_PROGRESS -> RESOLVED (Completion notes & proof)
 * ============================================================================
 */
public interface EmployeeService {

    EmployeeDashboardStatsDto getDashboardStats(User employee);

    List<EmployeeAssignmentDetailDto> getMyAssignments(User employee, String statusFilter);

    EmployeeAssignmentDetailDto getAssignmentDetails(User employee, Long complaintId);

    ComplaintResponseDto startWork(User employee, Long complaintId, EmployeeStartWorkDto dto);

    ComplaintResponseDto resolveWork(User employee, Long complaintId, EmployeeResolveDto dto);
}
