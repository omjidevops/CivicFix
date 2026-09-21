package com.civicfix.controller;

import com.civicfix.dto.ReputationSummaryDto;
import com.civicfix.security.CustomUserDetails;
import com.civicfix.service.ReputationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ============================================================================
 * CIVICFIX — DAY 48: REPUTATION REST CONTROLLER
 * Package: com.civicfix.controller
 * Class: ReputationController
 *
 * Exposes read-only civic reputation endpoints for authenticated citizens.
 * Enforces strict user isolation: citizens can only view their own reputation!
 * ============================================================================
 */
@RestController
@RequestMapping("/api/reputation")
public class ReputationController {

    private final ReputationService reputationService;

    public ReputationController(ReputationService reputationService) {
        this.reputationService = reputationService;
    }

    /**
     * Get Current Authenticated User's Reputation Score & History
     * GET /api/reputation/me
     */
    @GetMapping("/me")
    public ResponseEntity<ReputationSummaryDto> getMyReputation(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails.getUser().getId();
        ReputationSummaryDto summary = reputationService.getUserReputationSummary(userId);
        return ResponseEntity.ok(summary);
    }
}
