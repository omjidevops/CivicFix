package com.civicfix.service.impl;

import com.civicfix.dto.ComplaintRequestDto;
import com.civicfix.dto.ComplaintResponseDto;
import com.civicfix.entity.Complaint;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.entity.Notification;
import com.civicfix.entity.StatusHistory;
import com.civicfix.repository.NotificationRepository;
import com.civicfix.repository.StatusHistoryRepository;
import com.civicfix.service.ComplaintService;
import com.civicfix.service.ReputationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final NotificationRepository notificationRepository;
    private final ReputationService reputationService;
    private final com.civicfix.service.SmartPriorityService smartPriorityService;

    public ComplaintServiceImpl(
            ComplaintRepository complaintRepository,
            StatusHistoryRepository statusHistoryRepository,
            NotificationRepository notificationRepository,
            ReputationService reputationService,
            com.civicfix.service.SmartPriorityService smartPriorityService
    ) {
        this.complaintRepository = complaintRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.notificationRepository = notificationRepository;
        this.reputationService = reputationService;
        this.smartPriorityService = smartPriorityService;
    }

    @Override
    @Transactional
    public ComplaintResponseDto createComplaint(ComplaintRequestDto requestDto, Long citizenId) {
        Complaint complaint = new Complaint();
        complaint.setCitizenId(citizenId != null ? citizenId : 1L);
        complaint.setTitle(requestDto.getTitle().trim());
        complaint.setDescription(requestDto.getDescription().trim());
        complaint.setCategory(requestDto.getCategory().trim());
        complaint.setSeverity(requestDto.getSeverity());
        complaint.setAddress(requestDto.getAddress().trim());
        complaint.setLatitude(requestDto.getLatitude());
        complaint.setLongitude(requestDto.getLongitude());

        // Business Rule 1: Initial lifecycle status is SUBMITTED
        complaint.setStatus("SUBMITTED");

        // Business Rule 2: Compute dynamic Smart Priority score and level
        BigDecimal score = smartPriorityService.calculatePriorityScore(
                requestDto.getSeverity(),
                0,
                LocalDateTime.now(),
                requestDto.getTitle(),
                requestDto.getDescription()
        );
        String priorityLevel = smartPriorityService.calculatePriorityLevel(score);
        complaint.setPriorityScore(score);
        complaint.setPriorityLevel(priorityLevel);

        // Save entity via JPA Repository
        Complaint saved = complaintRepository.save(complaint);
        return mapToResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ComplaintResponseDto> getAllComplaints() {
        List<Complaint> complaints = complaintRepository.findAll();
        List<ComplaintResponseDto> dtoList = new ArrayList<>();
        for (Complaint complaint : complaints) {
            dtoList.add(mapToResponseDto(complaint));
        }
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public ComplaintResponseDto getComplaintById(Long id) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint with ID " + id + " was not found."));
        return mapToResponseDto(complaint);
    }

    @Override
    @Transactional
    public ComplaintResponseDto updateComplaint(Long id, ComplaintRequestDto requestDto) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException("Cannot update: Complaint ID " + id + " does not exist."));

        complaint.setTitle(requestDto.getTitle().trim());
        complaint.setDescription(requestDto.getDescription().trim());
        complaint.setCategory(requestDto.getCategory().trim());
        complaint.setSeverity(requestDto.getSeverity());
        complaint.setAddress(requestDto.getAddress().trim());
        if (requestDto.getLatitude() != null) complaint.setLatitude(requestDto.getLatitude());
        if (requestDto.getLongitude() != null) complaint.setLongitude(requestDto.getLongitude());

        Complaint updated = complaintRepository.save(complaint);
        return mapToResponseDto(updated);
    }

    @Override
    @Transactional
    public void deleteComplaint(Long id) {
        if (!complaintRepository.existsById(id)) {
            throw new ComplaintNotFoundException("Cannot delete: Complaint ID " + id + " does not exist.");
        }
        complaintRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ComplaintResponseDto updateComplaintStatus(Long id, com.civicfix.dto.ComplaintStatusUpdateDto statusDto, Long officerId) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException("Cannot update status: Complaint ID " + id + " does not exist."));

        String newStatus = statusDto.getStatus().toUpperCase();
        complaint.setStatus(newStatus);

        if ("RESOLVED".equals(newStatus)) {
            complaint.setResolvedAt(LocalDateTime.now());
        } else if ("IN_PROGRESS".equals(newStatus) || "SUBMITTED".equals(newStatus)) {
            complaint.setResolvedAt(null);
        }

        if (statusDto.getResolutionNotes() != null) {
            complaint.setResolutionNotes(statusDto.getResolutionNotes().trim());
        }

        if (officerId != null) {
            complaint.setAssignedOfficerId(officerId);
        }

        Complaint updated = complaintRepository.save(complaint);
        return mapToResponseDto(updated);
    }

    @Override
    @Transactional
    public ComplaintResponseDto confirmResolution(Long id, Long citizenId) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint ID " + id + " was not found."));

        // Security check: Must be the owner of the complaint
        if (!complaint.getCitizenId().equals(citizenId)) {
            throw new SecurityException("Access denied: You can only confirm resolution for complaints you submitted.");
        }

        // Duplicate action check
        if (Boolean.TRUE.equals(complaint.getResolutionConfirmed())) {
            throw new IllegalStateException("Resolution for grievance #" + id + " has already been confirmed.");
        }

        // Must be in RESOLVED status
        if (!"RESOLVED".equalsIgnoreCase(complaint.getStatus())) {
            throw new IllegalStateException("Cannot confirm resolution on complaint #" + id + " because it is currently '" + complaint.getStatus() + "'.");
        }

        String oldStatus = complaint.getStatus();
        complaint.setStatus("RESOLUTION_CONFIRMED");
        complaint.setResolutionConfirmed(true);
        complaint.setResolutionConfirmedAt(LocalDateTime.now());
        Complaint updated = complaintRepository.save(complaint);

        // 1. Immutable status history transition
        StatusHistory history = new StatusHistory(
                id,
                citizenId,
                oldStatus,
                "RESOLUTION_CONFIRMED",
                "Citizen verified and confirmed successful resolution of the grievance on-site."
        );
        statusHistoryRepository.save(history);

        // 2. Award +5 Reputation points to the citizen (idempotent)
        reputationService.awardReputation(citizenId, id, ReputationService.POINTS_RESOLUTION_CONFIRMED, "RESOLUTION_CONFIRMED");

        // 3. Notify Citizen
        notificationRepository.save(new Notification(
                citizenId,
                id,
                "Thank you for confirming resolution for grievance #" + id + "! You earned +5 reputation points."
        ));

        // 4. Notify Assigned Officer (if present)
        if (complaint.getAssignedOfficerId() != null) {
            notificationRepository.save(new Notification(
                    complaint.getAssignedOfficerId(),
                    id,
                    "Citizen confirmed your resolution for grievance #" + id + "! Well done."
            ));
        }

        return mapToResponseDto(updated);
    }

    // Helper mapper: Converts JPA Entity to output Response DTO
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
        dto.setResolutionConfirmed(entity.getResolutionConfirmed());
        dto.setResolutionConfirmedAt(entity.getResolutionConfirmedAt());
        return dto;
    }
}
