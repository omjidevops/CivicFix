package com.civicfix.service;

import com.civicfix.dto.DuplicateCheckResultDto;
import com.civicfix.entity.Complaint;
import com.civicfix.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * ============================================================================
 * CIVICFIX — DUPLICATE DETECTION SERVICE
 * Package: com.civicfix.service
 * Class: DuplicateDetectionService
 *
 * Algorithm Architecture:
 * 1. Category Matching:
 *    - Only grievances within the same category are candidates (e.g. Roads vs Roads).
 * 2. Lifecycle Status Filter:
 *    - Only active grievances (SUBMITTED, VERIFIED, ASSIGNED, IN_PROGRESS) are flagged.
 *    - RESOLVED or REJECTED complaints do NOT trigger duplicate warnings.
 * 3. Geospatial Proximity (Haversine Formula):
 *    - Computes great-circle distance in meters between two coordinates.
 *    - If distance <= 40 meters -> Immediate high-confidence duplicate match.
 *    - If distance <= 150 meters -> Checked against text keyword similarity.
 * 4. Semantic Text Similarity (Jaccard Index on Token Sets):
 *    - Evaluates word overlap between grievance titles.
 *    - Similarity > 0.25 within 150m flags a duplicate warning.
 * ============================================================================
 */
@Service
public class DuplicateDetectionService {

    private static final double MAX_PROXIMITY_METERS = 150.0;
    private static final double IMMEDIATE_DUPLICATE_METERS = 40.0;
    private static final double SIMILARITY_THRESHOLD = 0.25;

    private final ComplaintRepository complaintRepository;

    public DuplicateDetectionService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    /**
     * Checks if a grievance is a potential duplicate of an existing active complaint.
     */
    public DuplicateCheckResultDto checkForDuplicate(
            String category,
            BigDecimal latitude,
            BigDecimal longitude,
            String title,
            Long excludeId
    ) {
        if (category == null || latitude == null || longitude == null) {
            return new DuplicateCheckResultDto(false, null, null, null, "Insufficient data for duplicate check.");
        }

        List<Complaint> candidates = complaintRepository.findAll().stream()
                .filter(c -> excludeId == null || !c.getId().equals(excludeId))
                .filter(c -> category.equalsIgnoreCase(c.getCategory()))
                .filter(c -> isActiveStatus(c.getStatus()))
                .filter(c -> c.getLatitude() != null && c.getLongitude() != null)
                .collect(Collectors.toList());

        double targetLat = latitude.doubleValue();
        double targetLon = longitude.doubleValue();

        for (Complaint candidate : candidates) {
            double distance = calculateDistanceMeters(
                    targetLat, targetLon,
                    candidate.getLatitude().doubleValue(), candidate.getLongitude().doubleValue()
            );

            // Case A: Ultra-close proximity (< 40m) in same category
            if (distance <= IMMEDIATE_DUPLICATE_METERS) {
                return new DuplicateCheckResultDto(
                        true,
                        candidate.getId(),
                        candidate.getTitle(),
                        Math.round(distance * 10.0) / 10.0,
                        String.format("Potential duplicate: Grievance #%d ('%s') was reported %.0fm away in '%s'.",
                                candidate.getId(), candidate.getTitle(), distance, category)
                );
            }

            // Case B: Nearby proximity (<= 150m) with semantic keyword overlap
            if (distance <= MAX_PROXIMITY_METERS) {
                double textSim = calculateTextSimilarity(title, candidate.getTitle());
                if (textSim >= SIMILARITY_THRESHOLD) {
                    return new DuplicateCheckResultDto(
                            true,
                            candidate.getId(),
                            candidate.getTitle(),
                            Math.round(distance * 10.0) / 10.0,
                            String.format("Similar issue detected: Grievance #%d ('%s') is located %.0fm away (similarity: %.0f%%).",
                                    candidate.getId(), candidate.getTitle(), distance, textSim * 100.0)
                    );
                }
            }
        }

        return new DuplicateCheckResultDto(false, null, null, null, "No duplicate grievances detected.");
    }

    /**
     * Calculates great-circle distance between two points in meters using Haversine formula.
     */
    public double calculateDistanceMeters(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371000; // Radius of Earth in meters
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Calculates Jaccard similarity index on non-trivial words between two titles.
     */
    public double calculateTextSimilarity(String s1, String s2) {
        if (s1 == null || s2 == null) return 0.0;
        Set<String> words1 = extractSignificantWords(s1);
        Set<String> words2 = extractSignificantWords(s2);
        if (words1.isEmpty() || words2.isEmpty()) return 0.0;

        Set<String> intersection = new HashSet<>(words1);
        intersection.retainAll(words2);

        Set<String> union = new HashSet<>(words1);
        union.addAll(words2);

        return (double) intersection.size() / union.size();
    }

    private Set<String> extractSignificantWords(String text) {
        return Arrays.stream(text.toLowerCase().split("[^a-zA-Z0-9]+"))
                .filter(w -> w.length() > 2)
                .collect(Collectors.toSet());
    }

    private boolean isActiveStatus(String status) {
        if (status == null) return false;
        String s = status.toUpperCase();
        return "SUBMITTED".equals(s) || "VERIFIED".equals(s) || "ASSIGNED".equals(s) || "IN_PROGRESS".equals(s);
    }
}
