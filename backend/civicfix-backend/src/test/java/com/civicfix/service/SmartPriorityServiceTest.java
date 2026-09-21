package com.civicfix.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class SmartPriorityServiceTest {

    private SmartPriorityService smartPriorityService;

    @BeforeEach
    void setUp() {
        smartPriorityService = new SmartPriorityService();
    }

    @Test
    @DisplayName("Severity 1 grievance has LOW priority")
    void testSeverityOneLowPriority() {
        BigDecimal score = smartPriorityService.calculatePriorityScore(1, 0, LocalDateTime.now(), "Minor scratch", "Small cosmetic issue");
        assertEquals(15.00, score.doubleValue());
        assertEquals("LOW", smartPriorityService.calculatePriorityLevel(score));
    }

    @Test
    @DisplayName("Severity 3 grievance has MEDIUM priority")
    void testSeverityThreeMediumPriority() {
        BigDecimal score = smartPriorityService.calculatePriorityScore(3, 0, LocalDateTime.now(), "Flickering street light", "Lamp post flickering at night");
        assertEquals(50.00, score.doubleValue());
        assertEquals("MEDIUM", smartPriorityService.calculatePriorityLevel(score));
    }

    @Test
    @DisplayName("Severity 4 grievance has HIGH priority")
    void testSeverityFourHighPriority() {
        BigDecimal score = smartPriorityService.calculatePriorityScore(4, 0, LocalDateTime.now(), "Deep road pothole", "Pothole damaging vehicle tires");
        assertEquals(75.00, score.doubleValue());
        assertEquals("HIGH", smartPriorityService.calculatePriorityLevel(score));
    }

    @Test
    @DisplayName("Severity 5 grievance has CRITICAL priority")
    void testSeverityFiveCriticalPriority() {
        BigDecimal score = smartPriorityService.calculatePriorityScore(5, 0, LocalDateTime.now(), "Broken water pipeline", "Water flooding entire street");
        assertEquals(90.00, score.doubleValue());
        assertEquals("CRITICAL", smartPriorityService.calculatePriorityLevel(score));
    }

    @Test
    @DisplayName("Upvotes boost priority score up to +10 cap")
    void testUpvotesBoost() {
        // Base severity 3 = 50.0. 3 upvotes = +6.0 -> 56.0
        BigDecimal scoreWith3Votes = smartPriorityService.calculatePriorityScore(3, 3, LocalDateTime.now(), "Trash accumulation", "Garbage not picked up");
        assertEquals(56.00, scoreWith3Votes.doubleValue());

        // 10 upvotes = +10.0 max cap -> 60.0
        BigDecimal scoreWith10Votes = smartPriorityService.calculatePriorityScore(3, 10, LocalDateTime.now(), "Trash accumulation", "Garbage not picked up");
        assertEquals(60.00, scoreWith10Votes.doubleValue());
    }

    @Test
    @DisplayName("Urgent keywords add +5 emergency boost")
    void testUrgentKeywordBoost() {
        // Base severity 4 = 75.0 + urgent keyword ("danger") = 80.0
        BigDecimal score = smartPriorityService.calculatePriorityScore(4, 0, LocalDateTime.now(), "Dangerous hanging live wire", "Live wire sparking above footpath");
        assertEquals(80.00, score.doubleValue());
        assertEquals("HIGH", smartPriorityService.calculatePriorityLevel(score));
    }

    @ParameterizedTest(name = "Score {0} maps to level {1}")
    @CsvSource({
            "10.00, LOW",
            "34.99, LOW",
            "35.00, MEDIUM",
            "50.00, MEDIUM",
            "64.99, MEDIUM",
            "65.00, HIGH",
            "84.99, HIGH",
            "85.00, CRITICAL",
            "100.00, CRITICAL"
    })
    @DisplayName("Boundary tests for all priority levels")
    void testPriorityBoundaries(double scoreVal, String expectedLevel) {
        BigDecimal score = BigDecimal.valueOf(scoreVal);
        assertEquals(expectedLevel, smartPriorityService.calculatePriorityLevel(score));
    }

    @Test
    @DisplayName("Score never exceeds 100.00 even with all boosts applied")
    void testScoreClampingAt100() {
        // Severity 5 (90) + 10 votes (10) + 20 days pending (10) + urgent keyword (5) = 115 -> clamped to 100.00
        BigDecimal score = smartPriorityService.calculatePriorityScore(
                5, 10, LocalDateTime.now().minusDays(20), "Emergency gas leakage", "Dangerous hazard"
        );
        assertEquals(100.00, score.doubleValue());
        assertEquals("CRITICAL", smartPriorityService.calculatePriorityLevel(score));
    }
}
