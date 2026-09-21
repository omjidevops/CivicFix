package com.civicfix.service.impl;

import com.civicfix.dto.*;
import com.civicfix.entity.*;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.repository.*;
import com.civicfix.service.AdminService;
import com.civicfix.service.CommentService;
import com.civicfix.service.ReputationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * ============================================================================
 * CIVICFIX — DAY 46: ADMIN SERVICE IMPLEMENTATION
 * Package: com.civicfix.service.impl
 * Class: AdminServiceImpl
 * ============================================================================
 */
@Service
public class AdminServiceImpl implements AdminService {

    private final ComplaintRepository complaintRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final AssignmentRepository assignmentRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final NotificationRepository notificationRepository;
    private final ComplaintMediaRepository complaintMediaRepository;
    private final CommentService commentService;
    private final ReputationService reputationService;

    public AdminServiceImpl(
            ComplaintRepository complaintRepository,
            DepartmentRepository departmentRepository,
            UserRepository userRepository,
            AssignmentRepository assignmentRepository,
            StatusHistoryRepository statusHistoryRepository,
            NotificationRepository notificationRepository,
            ComplaintMediaRepository complaintMediaRepository,
            CommentService commentService,
            ReputationService reputationService
    ) {
        this.complaintRepository = complaintRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.assignmentRepository = assignmentRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.notificationRepository = notificationRepository;
        this.complaintMediaRepository = complaintMediaRepository;
        this.commentService = commentService;
        this.reputationService = reputationService;
    }

    @Override
    public AdminDashboardStatsDto getDashboardStats() {
        List<Complaint> all = complaintRepository.findAll();
        long total = all.size();
        long pending = all.stream().filter(c -> "SUBMITTED".equalsIgnoreCase(c.getStatus())).count();
        long verified = all.stream().filter(c -> "VERIFIED".equalsIgnoreCase(c.getStatus())).count();
        long assigned = all.stream().filter(c -> "ASSIGNED".equalsIgnoreCase(c.getStatus())).count();
        long inProgress = all.stream().filter(c -> "IN_PROGRESS".equalsIgnoreCase(c.getStatus())).count();
        long resolved = all.stream().filter(c -> "RESOLVED".equalsIgnoreCase(c.getStatus())).count();
        long critical = all.stream().filter(c -> (c.getSeverity() != null && c.getSeverity() >= 4) || "CRITICAL".equalsIgnoreCase(c.getPriorityLevel())).count();

        String rate = total > 0 ? String.format("%.1f%%", ((double) resolved / total) * 100.0) : "0.0%";

        AdminDashboardStatsDto stats = new AdminDashboardStatsDto();
        stats.setTotalComplaints(total);
        stats.setPendingVerification(pending);
        stats.setVerified(verified);
        stats.setAssigned(assigned);
        stats.setInProgress(inProgress);
        stats.setResolved(resolved);
        stats.setCritical(critical);
        stats.setResolutionRate(rate);

        return stats;
    }

    @Override
    public List<ComplaintResponseDto> getComplaints(String status, String category, String priority, Integer departmentId, String search) {
        List<Complaint> all = complaintRepository.findAll();

        return all.stream()
                .filter(c -> status == null || "ALL".equalsIgnoreCase(status) || status.equalsIgnoreCase(c.getStatus()))
                .filter(c -> category == null || "ALL".equalsIgnoreCase(category) || category.equalsIgnoreCase(c.getCategory()))
                .filter(c -> priority == null || "ALL".equalsIgnoreCase(priority) || priority.equalsIgnoreCase(c.getPriorityLevel()))
                .filter(c -> {
                    if (search == null || search.trim().isEmpty()) return true;
                    String q = search.trim().toLowerCase();
                    return String.valueOf(c.getId()).contains(q)
                            || (c.getTitle() != null && c.getTitle().toLowerCase().contains(q))
                            || (c.getAddress() != null && c.getAddress().toLowerCase().contains(q))
                            || (c.getCategory() != null && c.getCategory().toLowerCase().contains(q));
                })
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public AdminComplaintDetailDto getComplaintDetails(Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint ID " + complaintId + " not found."));

        AdminComplaintDetailDto dto = new AdminComplaintDetailDto();
        dto.setComplaint(mapToResponseDto(complaint));

        // Attach citizen info
        userRepository.findById(complaint.getCitizenId()).ifPresent(u -> {
            dto.setCitizenName(u.getName());
            dto.setCitizenEmail(u.getEmail());
            dto.setCitizenPhone(u.getPhone());
        });

        // Attach assignment & department info
        assignmentRepository.findByComplaintId(complaintId).ifPresent(a -> {
            departmentRepository.findById(a.getDepartmentId()).ifPresent(d -> dto.setDepartmentName(d.getName()));
            userRepository.findById(a.getEmployeeId()).ifPresent(e -> dto.setAssignedEmployeeName(e.getName()));
        });

        // Attach history, media, and comments
        dto.setStatusHistory(statusHistoryRepository.findByComplaintIdOrderByCreatedAtDesc(complaintId));
        dto.setMediaList(complaintMediaRepository.findByComplaintId(complaintId));
        dto.setComments(commentService.getCommentsByComplaint(complaintId));

        return dto;
    }

    @Override
    @Transactional
    public ComplaintResponseDto verifyComplaint(Long complaintId, AdminVerificationDto verificationDto, Long adminId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint ID " + complaintId + " not found."));

        String oldStatus = complaint.getStatus();
        complaint.setStatus("VERIFIED");
        Complaint updated = complaintRepository.save(complaint);

        String remarks = (verificationDto != null && verificationDto.getRemarks() != null && !verificationDto.getRemarks().trim().isEmpty())
                ? verificationDto.getRemarks().trim()
                : "Grievance verified by municipal administrative triage.";

        // Record status history
        StatusHistory history = new StatusHistory(complaintId, adminId, oldStatus, "VERIFIED", remarks);
        statusHistoryRepository.save(history);

        // Notify Citizen
        String notifMsg = "Your grievance #" + complaintId + " (\"" + complaint.getTitle() + "\") has been verified and queued for dispatch. +10 reputation points awarded!";
        notificationRepository.save(new Notification(complaint.getCitizenId(), complaintId, notifMsg));

        // Award +10 Reputation points to citizen (idempotent, won't duplicate if already awarded)
        reputationService.awardReputation(complaint.getCitizenId(), complaintId, ReputationService.POINTS_VALID_COMPLAINT, "VALID_COMPLAINT");

        return mapToResponseDto(updated);
    }

    @Override
    public List<Department> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        if (departments.isEmpty()) {
            // Seed common municipal departments if none exist
            departments = List.of(
                    new Department("Roads & Stormwater Infrastructure", "Pothole repair, road paving, bridge & drainage maintenance"),
                    new Department("Sanitation & Solid Waste Management", "Garbage collection, community dumpster clearance, street sweeping"),
                    new Department("Electricity & Street Lighting", "Streetlight repair, pole maintenance, municipal power distribution"),
                    new Department("Water Supply & Sewerage Board", "Drinking water pipeline leakages, valve maintenance, sewer overflows"),
                    new Department("Public Safety & Urban Forestry", "Fallen tree clearance, municipal park maintenance, pedestrian safety")
            );
            departments = departmentRepository.saveAll(departments);
        }
        return departments;
    }

    @Override
    public List<User> getAllEmployees() {
        return userRepository.findByRole(Role.EMPLOYEE);
    }

    @Override
    @Transactional
    public ComplaintResponseDto assignComplaint(Long complaintId, AdminAssignmentDto assignmentDto, Long adminId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint ID " + complaintId + " not found."));

        Department department = departmentRepository.findById(assignmentDto.getDepartmentId())
                .orElseThrow(() -> new IllegalArgumentException("Department ID " + assignmentDto.getDepartmentId() + " does not exist."));

        User employee = userRepository.findById(assignmentDto.getEmployeeId())
                .orElseThrow(() -> new IllegalArgumentException("Employee ID " + assignmentDto.getEmployeeId() + " does not exist."));

        if (employee.getRole() != Role.EMPLOYEE && employee.getRole() != Role.ADMIN) {
            throw new IllegalArgumentException("Selected assignee must have municipal employee credentials.");
        }

        String oldStatus = complaint.getStatus();
        complaint.setStatus("ASSIGNED");
        complaint.setAssignedOfficerId(employee.getId());
        Complaint updated = complaintRepository.save(complaint);

        // Create or update assignment
        Assignment assignment = assignmentRepository.findByComplaintId(complaintId)
                .orElse(new Assignment());
        assignment.setComplaintId(complaintId);
        assignment.setDepartmentId(department.getId());
        assignment.setEmployeeId(employee.getId());
        assignment.setDeadline(assignmentDto.getDeadline());
        assignmentRepository.save(assignment);

        // Record status history
        String remarks = "Assigned to " + department.getName() + " (Field Officer: " + employee.getName() + "). "
                + (assignmentDto.getInstructions() != null ? assignmentDto.getInstructions() : "");
        statusHistoryRepository.save(new StatusHistory(complaintId, adminId, oldStatus, "ASSIGNED", remarks));

        // Notify Assigned Employee
        String empNotif = "Task Assigned: Grievance #" + complaintId + " (\"" + complaint.getTitle() + "\") at " + complaint.getAddress();
        notificationRepository.save(new Notification(employee.getId(), complaintId, empNotif));

        // Notify Citizen
        String citizenNotif = "Your grievance #" + complaintId + " has been assigned to " + department.getName() + " for field action.";
        notificationRepository.save(new Notification(complaint.getCitizenId(), complaintId, citizenNotif));

        return mapToResponseDto(updated);
    }

    @Override
    public AdminAnalyticsDto getAnalytics() {
        List<Complaint> all = complaintRepository.findAll();
        long total = all.size();
        long resolved = all.stream().filter(c -> "RESOLVED".equalsIgnoreCase(c.getStatus())).count();

        Map<String, Long> byCategory = all.stream()
                .filter(c -> c.getCategory() != null)
                .collect(Collectors.groupingBy(Complaint::getCategory, Collectors.counting()));

        Map<String, Long> byStatus = all.stream()
                .filter(c -> c.getStatus() != null)
                .collect(Collectors.groupingBy(Complaint::getStatus, Collectors.counting()));

        Map<String, Long> byPriority = all.stream()
                .filter(c -> c.getPriorityLevel() != null)
                .collect(Collectors.groupingBy(Complaint::getPriorityLevel, Collectors.counting()));

        return new AdminAnalyticsDto(byCategory, byStatus, byPriority, total, resolved);
    }

    private ComplaintResponseDto mapToResponseDto(Complaint entity) {
        ComplaintResponseDto dto = new ComplaintResponseDto();
        dto.setId(entity.getId());
        dto.setCitizenId(entity.getCitizenId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        dto.setSeverity(entity.getSeverity());
        dto.setStatus(entity.getStatus());
        dto.setPriorityLevel(entity.getPriorityLevel());
        dto.setPriorityScore(entity.getPriorityScore());
        dto.setAddress(entity.getAddress());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setResolutionNotes(entity.getResolutionNotes());
        dto.setResolvedAt(entity.getResolvedAt());
        dto.setAssignedOfficerId(entity.getAssignedOfficerId());
        return dto;
    }
}
