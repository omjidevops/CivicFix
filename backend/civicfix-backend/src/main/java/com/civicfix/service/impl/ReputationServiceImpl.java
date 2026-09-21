package com.civicfix.service.impl;

import com.civicfix.dto.ReputationSummaryDto;
import com.civicfix.dto.ReputationTransactionDto;
import com.civicfix.entity.ReputationTransaction;
import com.civicfix.entity.User;
import com.civicfix.repository.ReputationTransactionRepository;
import com.civicfix.repository.UserRepository;
import com.civicfix.service.ReputationService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ============================================================================
 * CIVICFIX — DAY 48: REPUTATION SERVICE IMPLEMENTATION
 * Package: com.civicfix.service.impl
 * Class: ReputationServiceImpl
 *
 * Atomically records transactions and updates users.reputation_score.
 * Enforces strict idempotency and anti-farming guards.
 * ============================================================================
 */
@Service
public class ReputationServiceImpl implements ReputationService {

    private final ReputationTransactionRepository reputationTransactionRepository;
    private final UserRepository userRepository;

    public ReputationServiceImpl(
            ReputationTransactionRepository reputationTransactionRepository,
            UserRepository userRepository
    ) {
        this.reputationTransactionRepository = reputationTransactionRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public boolean awardReputation(Long userId, Long complaintId, int points, String reason) {
        if (points <= 0) {
            throw new IllegalArgumentException("Award points must be strictly positive.");
        }

        // Idempotency check: Don't award twice for the same complaint and reason
        if (complaintId != null && reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(userId, complaintId, reason)) {
            return false; // Already credited
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User ID " + userId + " not found."));

        // 1. Record immutable transaction log
        ReputationTransaction tx = new ReputationTransaction(userId, complaintId, points, reason);
        reputationTransactionRepository.save(tx);

        // 2. Atomically update user score
        int currentScore = user.getReputationScore() != null ? user.getReputationScore() : 0;
        user.setReputationScore(currentScore + points);
        userRepository.save(user);

        return true;
    }

    @Override
    @Transactional
    public boolean deductReputation(Long userId, Long complaintId, int points, String reason) {
        int penalty = points > 0 ? -points : points; // Ensure negative points in transaction

        // Idempotency check: Don't penalize repeatedly for same complaint
        if (complaintId != null && reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(userId, complaintId, reason)) {
            return false;
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User ID " + userId + " not found."));

        ReputationTransaction tx = new ReputationTransaction(userId, complaintId, penalty, reason);
        reputationTransactionRepository.save(tx);

        int currentScore = user.getReputationScore() != null ? user.getReputationScore() : 0;
        user.setReputationScore(Math.max(0, currentScore + penalty)); // Floor score at 0
        userRepository.save(user);

        return true;
    }

    @Override
    @Transactional
    public void handleUpvoteReputation(Long voterId, Long complaintId, boolean isUpvoting) {
        if (isUpvoting) {
            // Check if UPVOTE_REMOVED exists previously to avoid re-awarding if voted before
            awardReputation(voterId, complaintId, POINTS_UPVOTE_SUPPORT, "UPVOTE_SUPPORT");
        } else {
            // Citizen removed their vote: deduct +2 to prevent vote/unvote farming
            boolean hadVoted = reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(voterId, complaintId, "UPVOTE_SUPPORT");
            boolean alreadyDeducted = reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(voterId, complaintId, "UPVOTE_REMOVED");

            if (hadVoted && !alreadyDeducted) {
                User user = userRepository.findById(voterId).orElse(null);
                if (user != null) {
                    ReputationTransaction tx = new ReputationTransaction(voterId, complaintId, -POINTS_UPVOTE_SUPPORT, "UPVOTE_REMOVED");
                    reputationTransactionRepository.save(tx);

                    int current = user.getReputationScore() != null ? user.getReputationScore() : 0;
                    user.setReputationScore(Math.max(0, current - POINTS_UPVOTE_SUPPORT));
                    userRepository.save(user);
                }
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ReputationSummaryDto getUserReputationSummary(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User ID " + userId + " not found."));

        int score = user.getReputationScore() != null ? user.getReputationScore() : 0;
        String tier = determineTier(score);

        List<ReputationTransaction> transactions = reputationTransactionRepository.findByUserIdOrderByCreatedAtDesc(userId);
        long totalCount = transactions.size();

        List<ReputationTransactionDto> dtos = transactions.stream()
                .limit(20) // Most recent 20 events
                .map(t -> new ReputationTransactionDto(
                        t.getId(),
                        t.getComplaintId(),
                        t.getPoints(),
                        t.getReason(),
                        t.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return new ReputationSummaryDto(score, tier, totalCount, dtos);
    }

    @Override
    public String determineTier(int score) {
        if (score >= 300) return "Community Leader";
        if (score >= 150) return "Civic Champion";
        if (score >= 50) return "Active Contributor";
        return "Novice Citizen";
    }
}
