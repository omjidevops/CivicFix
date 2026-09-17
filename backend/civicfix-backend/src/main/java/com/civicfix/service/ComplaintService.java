package com.civicfix.service;

import com.civicfix.dto.ComplaintRequestDto;
import com.civicfix.dto.ComplaintResponseDto;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 33: COMPLAINT SERVICE INTERFACE
 * Package: com.civicfix.service
 * Interface: ComplaintService
 *
 * Defines the business contract for grievance operations. Decouples controllers
 * from data access logic, enabling testability and loose coupling.
 * ============================================================================
 */
public interface ComplaintService {

    ComplaintResponseDto createComplaint(ComplaintRequestDto requestDto);

    List<ComplaintResponseDto> getAllComplaints();

    ComplaintResponseDto getComplaintById(Long id);

    ComplaintResponseDto updateComplaint(Long id, ComplaintRequestDto requestDto);

    void deleteComplaint(Long id);
}
