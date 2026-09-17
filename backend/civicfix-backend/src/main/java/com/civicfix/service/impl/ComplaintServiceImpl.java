package com.civicfix.service.impl;

import com.civicfix.dto.ComplaintRequestDto;
import com.civicfix.dto.ComplaintResponseDto;
import com.civicfix.entity.Complaint;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.service.ComplaintService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 33: COMPLAINT SERVICE IMPLEMENTATION
 * Package: com.civicfix.service.impl
 * Class: ComplaintServiceImpl
 *
 * Annotations:
 * @Service -> Marks this class as a Spring-managed Service component containing
 *   core business logic, lifecycle rules, and transaction boundaries.
 *
 * Design Pattern:
 * Uses Constructor Injection (promotes immutability, testability, and clarity).
 * ============================================================================
 */
@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;

    // Constructor Injection (Spring automatically injects ComplaintRepository bean)
    public ComplaintServiceImpl(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @Override
    @Transactional
    public ComplaintResponseDto createComplaint(ComplaintRequestDto requestDto) {
        Complaint complaint = new Complaint();
        complaint.setTitle(requestDto.getTitle().trim());
        complaint.setDescription(requestDto.getDescription().trim());
        complaint.setCategory(requestDto.getCategory().trim());
        complaint.setSeverity(requestDto.getSeverity());
        complaint.setAddress(requestDto.getAddress().trim());
        complaint.setLatitude(requestDto.getLatitude());
        complaint.setLongitude(requestDto.getLongitude());

        // Business Rule 1: Initial lifecycle status is SUBMITTED
        complaint.setStatus("SUBMITTED");

        // Business Rule 2: Derive introductory priority level from severity score
        String initialPriority;
        BigDecimal score;
        if (requestDto.getSeverity() >= 4) {
            initialPriority = requestDto.getSeverity() == 5 ? "CRITICAL" : "HIGH";
            score = BigDecimal.valueOf(80.00);
        } else if (requestDto.getSeverity() == 3) {
            initialPriority = "MEDIUM";
            score = BigDecimal.valueOf(50.00);
        } else {
            initialPriority = "LOW";
            score = BigDecimal.valueOf(25.00);
        }
        complaint.setPriorityLevel(initialPriority);
        complaint.setPriorityScore(score);

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
        return dto;
    }
}
