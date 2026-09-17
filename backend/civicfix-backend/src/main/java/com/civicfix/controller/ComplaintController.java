package com.civicfix.controller;

import com.civicfix.dto.ComplaintRequestDto;
import com.civicfix.dto.ComplaintResponseDto;
import com.civicfix.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAYS 31 & 35: COMPLAINT REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: ComplaintController
 *
 * Exposes standard RESTful API endpoints for civic issue lifecycle management:
 * - POST   /api/complaints       -> 201 Created (Lodges new grievance)
 * - GET    /api/complaints       -> 200 OK (Lists all grievances)
 * - GET    /api/complaints/{id}  -> 200 OK (Fetches grievance details)
 * - PUT    /api/complaints/{id}  -> 200 OK (Updates grievance)
 * - DELETE /api/complaints/{id}  -> 204 No Content (Removes grievance)
 * - GET    /api/complaints/test  -> 200 OK (Day 31 practice sample data)
 * ============================================================================
 */
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    // Constructor Injection of business service layer
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    /**
     * Day 31 Learning Test Endpoint
     * GET /api/complaints/test
     * Returns static sample data for initial REST controller practice.
     */
    @GetMapping("/test")
    public ResponseEntity<List<ComplaintResponseDto>> getTestComplaints() {
        List<ComplaintResponseDto> list = new ArrayList<>();

        ComplaintResponseDto c1 = new ComplaintResponseDto();
        c1.setId(9901L);
        c1.setTitle("Test Pothole on Sector 4 Main Road");
        c1.setCategory("Road Damage");
        c1.setSeverity(5);
        c1.setStatus("SUBMITTED");
        c1.setPriorityLevel("CRITICAL");
        c1.setAddress("Ward 4 Central Crossroad");
        c1.setCreatedAt(LocalDateTime.now());

        ComplaintResponseDto c2 = new ComplaintResponseDto();
        c2.setId(9902L);
        c2.setTitle("Test Broken Streetlight");
        c2.setCategory("Street Light");
        c2.setSeverity(3);
        c2.setStatus("IN_PROGRESS");
        c2.setPriorityLevel("MEDIUM");
        c2.setAddress("Green Park Lane 2");
        c2.setCreatedAt(LocalDateTime.now());

        list.add(c1);
        list.add(c2);
        return ResponseEntity.ok(list);
    }

    /**
     * CREATE Complaint
     * POST /api/complaints
     * Status: 201 Created
     */
    @PostMapping
    public ResponseEntity<ComplaintResponseDto> createComplaint(
            @Valid @RequestBody ComplaintRequestDto requestDto) {
        ComplaintResponseDto response = complaintService.createComplaint(requestDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * READ All Complaints
     * GET /api/complaints
     * Status: 200 OK
     */
    @GetMapping
    public ResponseEntity<List<ComplaintResponseDto>> getAllComplaints() {
        List<ComplaintResponseDto> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }

    /**
     * READ Complaint By ID
     * GET /api/complaints/{id}
     * Status: 200 OK (or 404 handled by GlobalExceptionHandler)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponseDto> getComplaintById(@PathVariable Long id) {
        ComplaintResponseDto complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(complaint);
    }

    /**
     * UPDATE Complaint
     * PUT /api/complaints/{id}
     * Status: 200 OK
     */
    @PutMapping("/{id}")
    public ResponseEntity<ComplaintResponseDto> updateComplaint(
            @PathVariable Long id,
            @Valid @RequestBody ComplaintRequestDto requestDto) {
        ComplaintResponseDto updated = complaintService.updateComplaint(id, requestDto);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE Complaint
     * DELETE /api/complaints/{id}
     * Status: 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.noContent().build();
    }
}
