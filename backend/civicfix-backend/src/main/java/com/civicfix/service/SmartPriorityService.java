package com.civicfix.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — SMART PRIORITY SERVICE
 * Package: com.civicfix.service
 * Class: SmartPriorityService
 *
 * Algorithm Architecture:
 * 1. Base Score from Severity (1 to 5):
 *    - Severity 1 -> 15.00
 *    - Severity 2 -> 30.00
 *    - Severity 3 -> 50.00
 *    - Severity 4 -> 75.00
 *    - Severity 5 -> 90.00
 * 2. Crowdsourced Urgency (Upvotes):
 *    - Each upvote adds +2.00 points (capped at +10.00 points)
 * 3. Pending Aging Factor:
 *    - Each day pending adds +1.00 point (capped at +10.00 points)
 * 4. Safety & Critical Keywords:
 *    - Urgent keywords ("urgent", "danger", "dangerous", "hazard", "overflow", "collapse", "emergency", "fire", "leakage", "live wire", "sewage") add +5.00 points
 * 5. Level Classification:
 *    - 85.00 – 100.00 -> CRITICAL
 *    - 65.00 – 84.99  -> HIGH
 *    - 35.00 – 64.99  -> MEDIUM
 *    - 0.00 – 34.99   -> LOW
 * ============================================================================
 */
@Service
public class SmartPriorityService {

    private static final List<String> URGENT_KEYWORDS = Arrays.asList(
            "urgent", "danger", "dangerous", "hazard", "overflow",
            "collapse", "emergency", "fire", "leakage", "live wire", "sewage"
    );

    /**
     * Calculates the numerical priority score between 0.00 and 100.00
     */
    public BigDecimal calculatePriorityScore(
            Integer severity,
            Integer upvotes,
            LocalDateTime createdAt,
            String title,
            String description
    ) {
        double score = 0.0;

        // 1. Severity Base
        int sev = (severity != null) ? severity : 3;
        switch (sev) {
            case 5:
                score += 90.0;
                break;
            case 4:
                score += 75.0;
                break;
            case 3:
                score += 50.0;
                break;
            case 2:
                score += 30.0;
                break;
            case 1:
            default:
                score += 15.0;
                break;
        }

        // 2. Upvote Boost (Crowdsourced civic validation)
        if (upvotes != null && upvotes > 0) {
            double voteBonus = Math.min(10.0, upvotes * 2.0);
            score += voteBonus;
        }

        // 3. Aging Bonus (Pending grievances gain priority over time)
        if (createdAt != null) {
            long days = Duration.between(createdAt, LocalDateTime.now()).toDays();
            double ageBonus = Math.min(10.0, days * 1.0);
            score += ageBonus;
        }

        // 4. Keyword Urgency Factor
        String combinedText = ((title != null ? title : "") + " " + (description != null ? description : "")).toLowerCase();
        boolean hasUrgentKeyword = URGENT_KEYWORDS.stream().anyMatch(combinedText::contains);
        if (hasUrgentKeyword) {
            score += 5.0;
        }

        // Clamp between 0.00 and 100.00
        double clamped = Math.min(100.0, Math.max(0.0, score));
        return BigDecimal.valueOf(clamped).setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Maps priority score to enum level: LOW, MEDIUM, HIGH, CRITICAL
     */
    public String calculatePriorityLevel(BigDecimal score) {
        if (score == null) return "LOW";
        double val = score.doubleValue();
        if (val >= 85.0) {
            return "CRITICAL";
        } else if (val >= 65.0) {
            return "HIGH";
        } else if (val >= 35.0) {
            return "MEDIUM";
        } else {
            return "LOW";
        }
    }
}
