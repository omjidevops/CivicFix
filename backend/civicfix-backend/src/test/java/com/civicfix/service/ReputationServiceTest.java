package com.civicfix.service;

import com.civicfix.dto.ReputationSummaryDto;
import com.civicfix.entity.ReputationTransaction;
import com.civicfix.entity.User;
import com.civicfix.repository.ReputationTransactionRepository;
import com.civicfix.repository.UserRepository;
import com.civicfix.service.impl.ReputationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReputationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReputationTransactionRepository reputationTransactionRepository;

    @InjectMocks
    private ReputationServiceImpl reputationService;

    private User sampleCitizen;

    @BeforeEach
    void setUp() {
        sampleCitizen = new User();
        sampleCitizen.setId(10L);
        sampleCitizen.setName("Ananya Roy");
        sampleCitizen.setEmail("ananya@civicfix.gov");
        sampleCitizen.setReputationScore(10);
    }

    @Test
    @DisplayName("Award +10 points for VALID_COMPLAINT and log ledger transaction")
    void testAwardValidComplaintPoints() {
        when(reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(10L, 100L, "VALID_COMPLAINT"))
                .thenReturn(false);
        when(userRepository.findById(10L)).thenReturn(Optional.of(sampleCitizen));

        reputationService.awardReputation(10L, 100L, 10, "VALID_COMPLAINT");

        assertEquals(20, sampleCitizen.getReputationScore());
        verify(reputationTransactionRepository, times(1)).save(any(ReputationTransaction.class));
        verify(userRepository, times(1)).save(sampleCitizen);
    }

    @Test
    @DisplayName("Idempotency: Do not duplicate points if VALID_COMPLAINT already logged")
    void testIdempotentReputationAward() {
        when(reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(10L, 100L, "VALID_COMPLAINT"))
                .thenReturn(true);

        reputationService.awardReputation(10L, 100L, 10, "VALID_COMPLAINT");

        assertEquals(10, sampleCitizen.getReputationScore()); // unchanged
        verify(reputationTransactionRepository, never()).save(any());
        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Upvoting awards +2 points, unvoting deducts -2 points (anti-farming)")
    void testUpvoteAndUnvotePoints() {
        when(userRepository.findById(10L)).thenReturn(Optional.of(sampleCitizen));
        when(reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(10L, 100L, "UPVOTE_SUPPORT"))
                .thenReturn(false) // First check during upvote award
                .thenReturn(true);  // Second check during unvote
        when(reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(10L, 100L, "UPVOTE_REMOVED"))
                .thenReturn(false);

        // Upvote (+2)
        reputationService.handleUpvoteReputation(10L, 100L, true);
        assertEquals(12, sampleCitizen.getReputationScore());

        // Unvote (-2)
        reputationService.handleUpvoteReputation(10L, 100L, false);
        assertEquals(10, sampleCitizen.getReputationScore());
    }

    @Test
    @DisplayName("Penalty never drops score below 0 (Floor protection)")
    void testFloorProtectionAtZero() {
        sampleCitizen.setReputationScore(5);
        when(reputationTransactionRepository.existsByUserIdAndComplaintIdAndReason(10L, 100L, "FALSE_COMPLAINT"))
                .thenReturn(false);
        when(userRepository.findById(10L)).thenReturn(Optional.of(sampleCitizen));

        // Penalty 20 on score 5 -> clamped to 0, not -15
        reputationService.deductReputation(10L, 100L, 20, "FALSE_COMPLAINT");

        assertEquals(0, sampleCitizen.getReputationScore());
    }

    @Test
    @DisplayName("Verify tier calculation thresholds")
    void testTierThresholds() {
        assertEquals("Novice Citizen", reputationService.determineTier(0));
        assertEquals("Novice Citizen", reputationService.determineTier(49));
        assertEquals("Active Contributor", reputationService.determineTier(50));
        assertEquals("Active Contributor", reputationService.determineTier(149));
        assertEquals("Civic Champion", reputationService.determineTier(150));
        assertEquals("Civic Champion", reputationService.determineTier(299));
        assertEquals("Community Leader", reputationService.determineTier(300));
        assertEquals("Community Leader", reputationService.determineTier(1000));
    }
}
