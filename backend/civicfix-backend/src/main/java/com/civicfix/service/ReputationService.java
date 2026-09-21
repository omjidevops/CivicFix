package com.civicfix.service;

import com.civicfix.dto.ReputationSummaryDto;

/**
 * ============================================================================
 * CIVICFIX — DAY 48: REPUTATION SERVICE INTERFACE
 * Package: com.civicfix.service
 * Interface: ReputationService
 *
 * Enforces business rules for civic reputation scoring:
 * - VALID_COMPLAINT      : +10 points
 * - UPVOTE_SUPPORT       : +2 points
 * - RESOLUTION_CONFIRMED : +5 points
 * - FALSE_COMPLAINT      : -20 points
 * ============================================================================
 */
public interface ReputationService {

    int POINTS_VALID_COMPLAINT = 10;
    int POINTS_UPVOTE_SUPPORT = 2;
    int POINTS_RESOLUTION_CONFIRMED = 5;
    int POINTS_FALSE_COMPLAINT = -20;

    boolean awardReputation(Long userId, Long complaintId, int points, String reason);

    boolean deductReputation(Long userId, Long complaintId, int points, String reason);

    void handleUpvoteReputation(Long voterId, Long complaintId, boolean isUpvoting);

    ReputationSummaryDto getUserReputationSummary(Long userId);

    String determineTier(int score);
}
