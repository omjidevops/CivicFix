package com.civicfix.service;

import com.civicfix.dto.DuplicateCheckResultDto;
import com.civicfix.entity.Complaint;
import com.civicfix.repository.ComplaintRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DuplicateDetectionServiceTest {

    @Mock
    private ComplaintRepository complaintRepository;

    @InjectMocks
    private DuplicateDetectionService duplicateDetectionService;

    private Complaint existingComplaint;

    @BeforeEach
    void setUp() {
        existingComplaint = new Complaint();
        existingComplaint.setId(101L);
        existingComplaint.setTitle("Large pothole near MG Road signal");
        existingComplaint.setCategory("Roads");
        existingComplaint.setStatus("SUBMITTED");
        existingComplaint.setLatitude(BigDecimal.valueOf(12.9716));
        existingComplaint.setLongitude(BigDecimal.valueOf(77.5946));
    }

    @Test
    @DisplayName("Detects duplicate when location is very close (<40m) in same category")
    void testImmediateDuplicateUnder40Meters() {
        when(complaintRepository.findAll()).thenReturn(List.of(existingComplaint));

        // Very tiny offset (~10 meters away)
        BigDecimal newLat = BigDecimal.valueOf(12.97165);
        BigDecimal newLon = BigDecimal.valueOf(77.59462);

        DuplicateCheckResultDto result = duplicateDetectionService.checkForDuplicate(
                "Roads", newLat, newLon, "Broken asphalt", null
        );

        assertTrue(result.isDuplicateFound());
        assertEquals(101L, result.getMatchedComplaintId());
        assertTrue(result.getDistanceMeters() < 40.0);
    }

    @Test
    @DisplayName("Detects duplicate when location is within 150m and titles have keyword overlap")
    void testSemanticDuplicateWithin150Meters() {
        when(complaintRepository.findAll()).thenReturn(List.of(existingComplaint));

        // ~80 meters away
        BigDecimal newLat = BigDecimal.valueOf(12.9722);
        BigDecimal newLon = BigDecimal.valueOf(77.5948);

        DuplicateCheckResultDto result = duplicateDetectionService.checkForDuplicate(
                "Roads", newLat, newLon, "Deep pothole MG Road intersection", null
        );

        assertTrue(result.isDuplicateFound());
        assertEquals(101L, result.getMatchedComplaintId());
    }

    @Test
    @DisplayName("Does NOT flag duplicate if categories differ at exact same location")
    void testDifferentCategoryNotDuplicate() {
        when(complaintRepository.findAll()).thenReturn(List.of(existingComplaint));

        // Same location, but Electricity category instead of Roads
        DuplicateCheckResultDto result = duplicateDetectionService.checkForDuplicate(
                "Electricity", existingComplaint.getLatitude(), existingComplaint.getLongitude(),
                "Broken street light post", null
        );

        assertFalse(result.isDuplicateFound());
        assertNull(result.getMatchedComplaintId());
    }

    @Test
    @DisplayName("Does NOT flag duplicate if location is distant (>150m) despite same category")
    void testDistantLocationNotDuplicate() {
        when(complaintRepository.findAll()).thenReturn(List.of(existingComplaint));

        // ~2 kilometers away
        BigDecimal distantLat = BigDecimal.valueOf(12.9900);
        BigDecimal distantLon = BigDecimal.valueOf(77.6100);

        DuplicateCheckResultDto result = duplicateDetectionService.checkForDuplicate(
                "Roads", distantLat, distantLon, "Large pothole near MG Road signal", null
        );

        assertFalse(result.isDuplicateFound());
        assertNull(result.getMatchedComplaintId());
    }

    @Test
    @DisplayName("Does NOT flag duplicate if existing complaint is already RESOLVED (false duplicate prevention)")
    void testResolvedComplaintNotFlagged() {
        existingComplaint.setStatus("RESOLVED");
        when(complaintRepository.findAll()).thenReturn(List.of(existingComplaint));

        DuplicateCheckResultDto result = duplicateDetectionService.checkForDuplicate(
                "Roads", existingComplaint.getLatitude(), existingComplaint.getLongitude(),
                "Large pothole near MG Road signal", null
        );

        assertFalse(result.isDuplicateFound());
    }

    @Test
    @DisplayName("Excludes current complaint ID when updating existing complaint")
    void testExcludeCurrentComplaintId() {
        when(complaintRepository.findAll()).thenReturn(List.of(existingComplaint));

        DuplicateCheckResultDto result = duplicateDetectionService.checkForDuplicate(
                "Roads", existingComplaint.getLatitude(), existingComplaint.getLongitude(),
                "Large pothole near MG Road signal", 101L // same ID excluded
        );

        assertFalse(result.isDuplicateFound());
    }
}
