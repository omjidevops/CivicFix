package com.civicfix.service;

import com.civicfix.dto.VoteResponseDto;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: VOTE SERVICE CONTRACT
 * Package: com.civicfix.service
 * Interface: VoteService
 * ============================================================================
 */
public interface VoteService {

    VoteResponseDto castVote(Long complaintId, Long userId);

    VoteResponseDto removeVote(Long complaintId, Long userId);

    VoteResponseDto getVoteStatus(Long complaintId, Long userId);
}
