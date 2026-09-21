package com.civicfix.controller;

import com.civicfix.dto.CommentRequestDto;
import com.civicfix.dto.CommentResponseDto;
import com.civicfix.dto.VoteResponseDto;
import com.civicfix.service.CommentService;
import com.civicfix.service.VoteService;
import com.civicfix.dto.ComplaintRequestDto;
import com.civicfix.dto.ComplaintResponseDto;
import com.civicfix.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.civicfix.dto.ComplaintStatusUpdateDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.civicfix.security.CustomUserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAYS 31, 35 & 44: COMPLAINT REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: ComplaintController
 *
 * Exposes standard RESTful API endpoints for civic issue lifecycle management:
 * - Grievance CRUD: /api/complaints
 * - Day 44 Comments: GET/POST /api/complaints/{id}/comments
 * - Day 44 Upvoting: GET/POST/DELETE /api/complaints/{id}/vote(s)
 * ============================================================================
 */
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;
    private final CommentService commentService;
    private final VoteService voteService;
    private final com.civicfix.service.DuplicateDetectionService duplicateDetectionService;

    // Constructor Injection of business services
    public ComplaintController(
            ComplaintService complaintService,
            CommentService commentService,
            VoteService voteService,
            com.civicfix.service.DuplicateDetectionService duplicateDetectionService
    ) {
        this.complaintService = complaintService;
        this.commentService = commentService;
        this.voteService = voteService;
        this.duplicateDetectionService = duplicateDetectionService;
    }

    /**
     * Check for potential duplicate complaints
     * GET /api/complaints/check-duplicate
     */
    @GetMapping("/check-duplicate")
    public ResponseEntity<com.civicfix.dto.DuplicateCheckResultDto> checkDuplicate(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) java.math.BigDecimal latitude,
            @RequestParam(required = false) java.math.BigDecimal longitude,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long excludeId) {
        com.civicfix.dto.DuplicateCheckResultDto result = duplicateDetectionService.checkForDuplicate(
                category, latitude, longitude, title, excludeId);
        return ResponseEntity.ok(result);
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
            @Valid @RequestBody ComplaintRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        // Associate complaint securely with authenticated citizen from JWT context
        Long citizenId = (userDetails != null && userDetails.getUser() != null)
                ? userDetails.getUser().getId()
                : 1L;
        ComplaintResponseDto response = complaintService.createComplaint(requestDto, citizenId);
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

    /**
     * DAY 45: UPDATE COMPLAINT STATUS (Officer / Admin Only)
     * PATCH /api/complaints/{id}/status
     * Status: 200 OK
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('EMPLOYEE', 'ADMIN')")
    public ResponseEntity<ComplaintResponseDto> updateComplaintStatus(
            @PathVariable Long id,
            @Valid @RequestBody ComplaintStatusUpdateDto statusDto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long officerId = (userDetails != null && userDetails.getUser() != null)
                ? userDetails.getUser().getId()
                : null;
        ComplaintResponseDto response = complaintService.updateComplaintStatus(id, statusDto, officerId);
        return ResponseEntity.ok(response);
    }

    /**
     * DAY 48: CONFIRM RESOLUTION (Citizen Only)
     * POST /api/complaints/{id}/confirm-resolution
     * Status: 200 OK
     */
    @PostMapping("/{id}/confirm-resolution")
    @PreAuthorize("hasRole('CITIZEN')")
    public ResponseEntity<ComplaintResponseDto> confirmResolution(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long citizenId = userDetails.getUser().getId();
        ComplaintResponseDto response = complaintService.confirmResolution(id, citizenId);
        return ResponseEntity.ok(response);
    }

    // ========================================================================
    // DAY 44: COMMENTS REST ENDPOINTS
    // ========================================================================

    /**
     * READ All Comments for a Complaint
     * GET /api/complaints/{id}/comments
     * Status: 200 OK
     */
    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Long id) {
        List<CommentResponseDto> comments = commentService.getCommentsByComplaint(id);
        return ResponseEntity.ok(comments);
    }

    /**
     * CREATE Comment for a Complaint
     * POST /api/complaints/{id}/comments
     * Status: 201 Created
     */
    @PostMapping("/{id}/comments")
    public ResponseEntity<CommentResponseDto> addComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = (userDetails != null && userDetails.getUser() != null)
                ? userDetails.getUser().getId()
                : 1L;
        CommentResponseDto response = commentService.addComment(id, userId, requestDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ========================================================================
    // DAY 44: UPVOTES REST ENDPOINTS
    // ========================================================================

    /**
     * READ Vote Status for a Complaint
     * GET /api/complaints/{id}/votes
     * Status: 200 OK
     */
    @GetMapping("/{id}/votes")
    public ResponseEntity<VoteResponseDto> getVotes(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = (userDetails != null && userDetails.getUser() != null)
                ? userDetails.getUser().getId()
                : null;
        VoteResponseDto response = voteService.getVoteStatus(id, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * CAST Upvote for a Complaint
     * POST /api/complaints/{id}/vote
     * Status: 201 Created
     */
    @PostMapping("/{id}/vote")
    public ResponseEntity<VoteResponseDto> castVote(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = (userDetails != null && userDetails.getUser() != null)
                ? userDetails.getUser().getId()
                : 1L;
        VoteResponseDto response = voteService.castVote(id, userId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * REMOVE Upvote for a Complaint
     * DELETE /api/complaints/{id}/vote
     * Status: 200 OK
     */
    @DeleteMapping("/{id}/vote")
    public ResponseEntity<VoteResponseDto> removeVote(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = (userDetails != null && userDetails.getUser() != null)
                ? userDetails.getUser().getId()
                : 1L;
        VoteResponseDto response = voteService.removeVote(id, userId);
        return ResponseEntity.ok(response);
    }
}

