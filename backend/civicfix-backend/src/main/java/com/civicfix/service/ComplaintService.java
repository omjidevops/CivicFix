package com.civicfix.service;

import com.civicfix.dto.ComplaintRequestDto;
import com.civicfix.dto.ComplaintResponseDto;
import com.civicfix.dto.ComplaintStatusUpdateDto;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAYS 33 & 45: COMPLAINT SERVICE INTERFACE
 * Package: com.civicfix.service
 * Interface: ComplaintService
 *
 * Defines the business contract for grievance operations. Decouples controllers
 * from data access logic, enabling testability and loose coupling.
 * ============================================================================
 */
public interface ComplaintService {

    ComplaintResponseDto createComplaint(ComplaintRequestDto requestDto, Long citizenId);

    default ComplaintResponseDto createComplaint(ComplaintRequestDto requestDto) {
        return createComplaint(requestDto, 1L);
    }

    List<ComplaintResponseDto> getAllComplaints();

    ComplaintResponseDto getComplaintById(Long id);

    ComplaintResponseDto updateComplaint(Long id, ComplaintRequestDto requestDto);

    ComplaintResponseDto updateComplaintStatus(Long id, ComplaintStatusUpdateDto statusDto, Long officerId);

    ComplaintResponseDto confirmResolution(Long id, Long citizenId);

    void deleteComplaint(Long id);
}
