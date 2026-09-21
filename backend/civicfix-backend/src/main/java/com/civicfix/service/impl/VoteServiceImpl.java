package com.civicfix.service.impl;

import com.civicfix.dto.VoteResponseDto;
import com.civicfix.entity.Complaint;
import com.civicfix.entity.User;
import com.civicfix.entity.Vote;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.exception.DuplicateVoteException;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.repository.UserRepository;
import com.civicfix.repository.VoteRepository;
import com.civicfix.service.VoteService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: VOTE SERVICE IMPLEMENTATION
 * Package: com.civicfix.service.impl
 * Class: VoteServiceImpl
 *
 * Implements business logic for crowdsourced upvoting:
 * - Prevents duplicate votes from the same citizen
 * - Allows removing votes
 * - Returns accurate total counts
 * ============================================================================
 */
@Service
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final com.civicfix.service.ReputationService reputationService;

    public VoteServiceImpl(
            VoteRepository voteRepository,
            ComplaintRepository complaintRepository,
            UserRepository userRepository,
            com.civicfix.service.ReputationService reputationService
    ) {
        this.voteRepository = voteRepository;
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.reputationService = reputationService;
    }

    @Override
    @Transactional
    public VoteResponseDto castVote(Long complaintId, Long userId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint with ID " + complaintId + " was not found."));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Authenticated user with ID " + userId + " does not exist."));

        // 1. Check for duplicate vote in Service layer
        if (voteRepository.existsByComplaintIdAndUserId(complaintId, userId)) {
            throw new DuplicateVoteException("Citizen has already voted for this complaint.");
        }

        // 2. Save vote entity (database unique constraint provides secondary concurrency defense)
        Vote vote = new Vote(complaint, user);
        voteRepository.save(vote);

        // 3. Award +2 reputation points to the citizen (anti-farming protected)
        reputationService.handleUpvoteReputation(userId, complaintId, true);

        long totalVotes = voteRepository.countByComplaintId(complaintId);
        return new VoteResponseDto(complaintId, totalVotes, true, "Upvote registered successfully");
    }

    @Override
    @Transactional
    public VoteResponseDto removeVote(Long complaintId, Long userId) {
        if (!complaintRepository.existsById(complaintId)) {
            throw new ComplaintNotFoundException("Complaint with ID " + complaintId + " was not found.");
        }

        if (voteRepository.existsByComplaintIdAndUserId(complaintId, userId)) {
            voteRepository.deleteByComplaintIdAndUserId(complaintId, userId);

            // Reverses the +2 points to prevent infinite vote-unvote farming
            reputationService.handleUpvoteReputation(userId, complaintId, false);
        }

        long totalVotes = voteRepository.countByComplaintId(complaintId);
        return new VoteResponseDto(complaintId, totalVotes, false, "Upvote removed successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public VoteResponseDto getVoteStatus(Long complaintId, Long userId) {
        if (!complaintRepository.existsById(complaintId)) {
            throw new ComplaintNotFoundException("Complaint with ID " + complaintId + " was not found.");
        }

        long totalVotes = voteRepository.countByComplaintId(complaintId);
        boolean hasVoted = false;
        if (userId != null) {
            hasVoted = voteRepository.existsByComplaintIdAndUserId(complaintId, userId);
        }

        return new VoteResponseDto(complaintId, totalVotes, hasVoted, "Vote status fetched");
    }
}
