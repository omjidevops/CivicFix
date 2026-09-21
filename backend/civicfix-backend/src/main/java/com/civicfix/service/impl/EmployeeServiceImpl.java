package com.civicfix.service.impl;

import com.civicfix.dto.*;
import com.civicfix.entity.*;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.repository.*;
import com.civicfix.service.EmployeeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * ============================================================================
 * CIVICFIX — DAY 47: EMPLOYEE SERVICE IMPLEMENTATION
 * Package: com.civicfix.service.impl
 * Class: EmployeeServiceImpl
 * ============================================================================
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final ComplaintRepository complaintRepository;
    private final AssignmentRepository assignmentRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final NotificationRepository notificationRepository;
    private final ComplaintMediaRepository complaintMediaRepository;

    public EmployeeServiceImpl(
            ComplaintRepository complaintRepository,
            AssignmentRepository assignmentRepository,
            DepartmentRepository departmentRepository,
            UserRepository userRepository,
            StatusHistoryRepository statusHistoryRepository,
            NotificationRepository notificationRepository,
            ComplaintMediaRepository complaintMediaRepository
    ) {
        this.complaintRepository = complaintRepository;
        this.assignmentRepository = assignmentRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.notificationRepository = notificationRepository;
        this.complaintMediaRepository = complaintMediaRepository;
    }

    @Override
    public EmployeeDashboardStatsDto getDashboardStats(User employee) {
        List<Assignment> assignments = assignmentRepository.findByEmployeeId(employee.getId());

        List<Long> complaintIds = assignments.stream()
                .map(Assignment::getComplaintId)
                .collect(Collectors.toList());

        List<Complaint> myComplaints = complaintIds.isEmpty()
                ? Collections.emptyList()
                : complaintRepository.findAllById(complaintIds);

        long totalAssigned = myComplaints.size();
        long pendingStart = myComplaints.stream().filter(c -> "ASSIGNED".equalsIgnoreCase(c.getStatus())).count();
        long inProgress = myComplaints.stream().filter(c -> "IN_PROGRESS".equalsIgnoreCase(c.getStatus())).count();
        long resolved = myComplaints.stream().filter(c -> "RESOLVED".equalsIgnoreCase(c.getStatus())).count();

        LocalDateTime now = LocalDateTime.now();
        long overdueCount = assignments.stream()
                .filter(a -> a.getDeadline() != null && a.getDeadline().isBefore(now))
                .filter(a -> {
                    Optional<Complaint> match = myComplaints.stream()
                            .filter(c -> c.getId().equals(a.getComplaintId()))
                            .findFirst();
                    return match.isPresent() && !"RESOLVED".equalsIgnoreCase(match.get().getStatus());
                })
                .count();

        String deptName = "Municipal Field Operations";
        if (!assignments.isEmpty()) {
            Integer deptId = assignments.get(0).getDepartmentId();
            deptName = departmentRepository.findById(deptId)
                    .map(Department::getName)
                    .orElse("Municipal Field Operations");
        }

        return new EmployeeDashboardStatsDto(
                totalAssigned,
                pendingStart,
                inProgress,
                resolved,
                overdueCount,
                employee.getName(),
                deptName
        );
    }

    @Override
    public List<EmployeeAssignmentDetailDto> getMyAssignments(User employee, String statusFilter) {
        List<Assignment> assignments = assignmentRepository.findByEmployeeId(employee.getId());
        if (assignments.isEmpty()) {
            return Collections.emptyList();
        }

        List<Long> complaintIds = assignments.stream()
                .map(Assignment::getComplaintId)
                .collect(Collectors.toList());

        Map<Long, Complaint> complaintMap = complaintRepository.findAllById(complaintIds)
                .stream()
                .collect(Collectors.toMap(Complaint::getId, c -> c));

        Map<Integer, Department> deptMap = departmentRepository.findAll()
                .stream()
                .collect(Collectors.toMap(Department::getId, d -> d));

        List<EmployeeAssignmentDetailDto> dtos = new ArrayList<>();

        for (Assignment assignment : assignments) {
            Complaint complaint = complaintMap.get(assignment.getComplaintId());
            if (complaint == null) continue;

            // Optional status filtering
            if (statusFilter != null && !statusFilter.trim().isEmpty() && !"ALL".equalsIgnoreCase(statusFilter)) {
                if (!statusFilter.equalsIgnoreCase(complaint.getStatus())) {
                    continue;
                }
            }

            Department dept = deptMap.get(assignment.getDepartmentId());
            String deptName = dept != null ? dept.getName() : "Public Works";

            // Citizen details
            User citizen = userRepository.findById(complaint.getCitizenId()).orElse(null);

            // Instructions from status history
            List<StatusHistory> histories = statusHistoryRepository.findByComplaintIdOrderByCreatedAtDesc(complaint.getId());
            String instructions = histories.stream()
                    .filter(h -> "ASSIGNED".equalsIgnoreCase(h.getNewStatus()))
                    .map(StatusHistory::getRemarks)
                    .findFirst()
                    .orElse("Inspect and address grievance on-site as per municipal standard operating procedures.");

            EmployeeAssignmentDetailDto dto = new EmployeeAssignmentDetailDto();
            dto.setComplaintId(complaint.getId());
            dto.setTitle(complaint.getTitle());
            dto.setDescription(complaint.getDescription());
            dto.setCategory(complaint.getCategory());
            dto.setSeverity(complaint.getSeverity());
            dto.setPriority(complaint.getPriorityLevel());
            dto.setStatus(complaint.getStatus());
            dto.setAddress(complaint.getAddress());
            dto.setLatitude(complaint.getLatitude());
            dto.setLongitude(complaint.getLongitude());

            if (citizen != null) {
                dto.setCitizenName(citizen.getName());
                dto.setCitizenPhone(citizen.getPhone());
                dto.setCitizenEmail(citizen.getEmail());
            }

            dto.setDepartmentName(deptName);
            dto.setAssignedAt(assignment.getAssignedAt());
            dto.setAcceptedAt(assignment.getAcceptedAt());
            dto.setDeadline(assignment.getDeadline());
            dto.setInstructions(instructions);
            dto.setResolutionNotes(complaint.getResolutionNotes());
            dto.setResolvedAt(complaint.getResolvedAt());
            dto.setStatusHistory(histories);

            dtos.add(dto);
        }

        // Sort: newest assigned first
        dtos.sort((a, b) -> {
            if (a.getAssignedAt() == null || b.getAssignedAt() == null) return 0;
            return b.getAssignedAt().compareTo(a.getAssignedAt());
        });

        return dtos;
    }

    @Override
    public EmployeeAssignmentDetailDto getAssignmentDetails(User employee, Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint ID " + complaintId + " not found."));

        Assignment assignment = assignmentRepository.findByComplaintId(complaintId)
                .orElseThrow(() -> new IllegalArgumentException("Complaint ID " + complaintId + " is not currently assigned."));

        // Verify task is assigned to this employee (Admins can view all)
        if (employee.getRole() != Role.ADMIN && !assignment.getEmployeeId().equals(employee.getId())) {
            throw new SecurityException("Access denied: You are not authorized to inspect this assigned task.");
        }

        Department dept = departmentRepository.findById(assignment.getDepartmentId()).orElse(null);
        String deptName = dept != null ? dept.getName() : "Public Works";

        User citizen = userRepository.findById(complaint.getCitizenId()).orElse(null);
        List<StatusHistory> histories = statusHistoryRepository.findByComplaintIdOrderByCreatedAtDesc(complaintId);
        List<ComplaintMedia> mediaList = complaintMediaRepository.findByComplaintId(complaintId);

        String instructions = histories.stream()
                .filter(h -> "ASSIGNED".equalsIgnoreCase(h.getNewStatus()))
                .map(StatusHistory::getRemarks)
                .findFirst()
                .orElse("Standard municipal resolution protocols apply.");

        EmployeeAssignmentDetailDto dto = new EmployeeAssignmentDetailDto();
        dto.setComplaintId(complaint.getId());
        dto.setTitle(complaint.getTitle());
        dto.setDescription(complaint.getDescription());
        dto.setCategory(complaint.getCategory());
        dto.setSeverity(complaint.getSeverity());
        dto.setPriority(complaint.getPriorityLevel());
        dto.setStatus(complaint.getStatus());
        dto.setAddress(complaint.getAddress());
        dto.setLatitude(complaint.getLatitude());
        dto.setLongitude(complaint.getLongitude());

        if (citizen != null) {
            dto.setCitizenName(citizen.getName());
            dto.setCitizenPhone(citizen.getPhone());
            dto.setCitizenEmail(citizen.getEmail());
        }

        dto.setDepartmentName(deptName);
        dto.setAssignedAt(assignment.getAssignedAt());
        dto.setAcceptedAt(assignment.getAcceptedAt());
        dto.setDeadline(assignment.getDeadline());
        dto.setInstructions(instructions);
        dto.setResolutionNotes(complaint.getResolutionNotes());
        dto.setResolvedAt(complaint.getResolvedAt());
        dto.setStatusHistory(histories);
        dto.setMediaList(mediaList);

        return dto;
    }

    @Override
    @Transactional
    public ComplaintResponseDto startWork(User employee, Long complaintId, EmployeeStartWorkDto dto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint ID " + complaintId + " not found."));

        Assignment assignment = assignmentRepository.findByComplaintId(complaintId)
                .orElseThrow(() -> new IllegalArgumentException("Complaint ID " + complaintId + " has no active assignment."));

        if (employee.getRole() != Role.ADMIN && !assignment.getEmployeeId().equals(employee.getId())) {
            throw new SecurityException("Access denied: You cannot modify a task not assigned to you.");
        }

        if (!"ASSIGNED".equalsIgnoreCase(complaint.getStatus())) {
            throw new IllegalStateException("Cannot start work on a complaint in '" + complaint.getStatus() + "' status. Must be 'ASSIGNED'.");
        }

        String oldStatus = complaint.getStatus();
        complaint.setStatus("IN_PROGRESS");
        Complaint updated = complaintRepository.save(complaint);

        assignment.setAcceptedAt(LocalDateTime.now());
        assignmentRepository.save(assignment);

        String remarks = (dto != null && dto.getRemarks() != null && !dto.getRemarks().trim().isEmpty())
                ? dto.getRemarks().trim()
                : "Field crew (" + employee.getName() + ") deployed on-site to initiate repair.";

        // Record status history
        StatusHistory history = new StatusHistory(complaintId, employee.getId(), oldStatus, "IN_PROGRESS", remarks);
        statusHistoryRepository.save(history);

        // Notify Citizen
        String msg = "Work has commenced on your grievance #" + complaintId + " (\"" + complaint.getTitle() + "\") by field officer " + employee.getName() + ".";
        notificationRepository.save(new Notification(complaint.getCitizenId(), complaintId, msg));

        return mapToResponseDto(updated);
    }

    @Override
    @Transactional
    public ComplaintResponseDto resolveWork(User employee, Long complaintId, EmployeeResolveDto dto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint ID " + complaintId + " not found."));

        Assignment assignment = assignmentRepository.findByComplaintId(complaintId)
                .orElseThrow(() -> new IllegalArgumentException("Complaint ID " + complaintId + " has no active assignment."));

        if (employee.getRole() != Role.ADMIN && !assignment.getEmployeeId().equals(employee.getId())) {
            throw new SecurityException("Access denied: You cannot resolve a task not assigned to you.");
        }

        if (!"IN_PROGRESS".equalsIgnoreCase(complaint.getStatus()) && !"ASSIGNED".equalsIgnoreCase(complaint.getStatus())) {
            throw new IllegalStateException("Complaint cannot be resolved from '" + complaint.getStatus() + "' status.");
        }

        String oldStatus = complaint.getStatus();
        complaint.setStatus("RESOLVED");
        complaint.setResolvedAt(LocalDateTime.now());
        complaint.setResolutionNotes(dto.getResolutionNotes().trim());
        Complaint updated = complaintRepository.save(complaint);

        String remarks = "Field resolution completed: " + dto.getResolutionNotes().trim();

        // Record status history
        StatusHistory history = new StatusHistory(complaintId, employee.getId(), oldStatus, "RESOLVED", remarks);
        statusHistoryRepository.save(history);

        // Notify Citizen
        String msg = "Your grievance #" + complaintId + " (\"" + complaint.getTitle() + "\") has been successfully resolved. Resolution details: " + dto.getResolutionNotes().trim();
        notificationRepository.save(new Notification(complaint.getCitizenId(), complaintId, msg));

        return mapToResponseDto(updated);
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
