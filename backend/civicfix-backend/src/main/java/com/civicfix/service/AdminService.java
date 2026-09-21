package com.civicfix.service;

import com.civicfix.dto.*;
import com.civicfix.entity.Department;
import com.civicfix.entity.User;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN SERVICE INTERFACE
 * Package: com.civicfix.service
 * Interface: AdminService
 *
 * Defines business operations for Municipal Commissioner / Admin:
 * - Real-time KPI dashboard metrics
 * - Complaint triage, verification, and status history audit trails
 * - Department and employee delegation
 * - Municipal analytics aggregations
 * ============================================================================
 */
public interface AdminService {

    AdminDashboardStatsDto getDashboardStats();

    List<ComplaintResponseDto> getComplaints(String status, String category, String priority, Integer departmentId, String search);

    AdminComplaintDetailDto getComplaintDetails(Long complaintId);

    ComplaintResponseDto verifyComplaint(Long complaintId, AdminVerificationDto verificationDto, Long adminId);

    List<Department> getAllDepartments();

    List<User> getAllEmployees();

    ComplaintResponseDto assignComplaint(Long complaintId, AdminAssignmentDto assignmentDto, Long adminId);

    AdminAnalyticsDto getAnalytics();
}
