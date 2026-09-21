package com.civicfix.service;

import com.civicfix.dto.ComplaintRequestDto;
import com.civicfix.dto.ComplaintResponseDto;
import com.civicfix.dto.ComplaintStatusUpdateDto;
import com.civicfix.entity.Complaint;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.repository.NotificationRepository;
import com.civicfix.repository.StatusHistoryRepository;
import com.civicfix.service.impl.ComplaintServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ComplaintServiceTest {

    @Mock
    private ComplaintRepository complaintRepository;

    @Mock
    private StatusHistoryRepository statusHistoryRepository;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private ReputationService reputationService;

    @Mock
    private SmartPriorityService smartPriorityService;

    @InjectMocks
    private ComplaintServiceImpl complaintService;

    private Complaint sampleComplaint;

    @BeforeEach
    void setUp() {
        sampleComplaint = new Complaint();
        sampleComplaint.setId(100L);
        sampleComplaint.setCitizenId(1L);
        sampleComplaint.setTitle("Damaged Stormwater Drain");
        sampleComplaint.setDescription("Drain cover collapsed on footpath");
        sampleComplaint.setCategory("Roads");
        sampleComplaint.setSeverity(4);
        sampleComplaint.setStatus("SUBMITTED");
        sampleComplaint.setAddress("Sector 15 Main Road");
        sampleComplaint.setPriorityLevel("HIGH");
        sampleComplaint.setPriorityScore(BigDecimal.valueOf(75.00));
    }

    @Test
    @DisplayName("Create complaint computes priority and persists SUBMITTED status")
    void testCreateComplaintSuccess() {
        ComplaintRequestDto dto = new ComplaintRequestDto(
                "Damaged Stormwater Drain",
                "Drain cover collapsed on footpath",
                "Roads",
                4,
                "Sector 15 Main Road",
                BigDecimal.valueOf(12.9716),
                BigDecimal.valueOf(77.5946)
        );

        when(smartPriorityService.calculatePriorityScore(eq(4), eq(0), any(), anyString(), anyString()))
                .thenReturn(BigDecimal.valueOf(75.00));
        when(smartPriorityService.calculatePriorityLevel(BigDecimal.valueOf(75.00)))
                .thenReturn("HIGH");
        when(complaintRepository.save(any(Complaint.class))).thenReturn(sampleComplaint);

        ComplaintResponseDto response = complaintService.createComplaint(dto, 1L);

        assertNotNull(response);
        assertEquals("SUBMITTED", response.getStatus());
        assertEquals("HIGH", response.getPriorityLevel());
        assertEquals("Damaged Stormwater Drain", response.getTitle());
        verify(complaintRepository, times(1)).save(any(Complaint.class));
    }

    @Test
    @DisplayName("Get complaint by ID returns valid DTO")
    void testGetComplaintByIdSuccess() {
        when(complaintRepository.findById(100L)).thenReturn(Optional.of(sampleComplaint));

        ComplaintResponseDto response = complaintService.getComplaintById(100L);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("Damaged Stormwater Drain", response.getTitle());
    }

    @Test
    @DisplayName("Get complaint by non-existent ID throws ComplaintNotFoundException")
    void testGetComplaintByIdNotFound() {
        when(complaintRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ComplaintNotFoundException.class, () -> complaintService.getComplaintById(999L));
    }

    @Test
    @DisplayName("Update complaint status to RESOLVED sets resolvedAt timestamp")
    void testUpdateComplaintStatusResolved() {
        when(complaintRepository.findById(100L)).thenReturn(Optional.of(sampleComplaint));
        when(complaintRepository.save(any(Complaint.class))).thenAnswer(i -> i.getArgument(0));

        ComplaintStatusUpdateDto statusDto = new ComplaintStatusUpdateDto("RESOLVED", "Drain pipe repaired and cover replaced.");
        ComplaintResponseDto response = complaintService.updateComplaintStatus(100L, statusDto, 2L);

        assertNotNull(response);
        assertEquals("RESOLVED", response.getStatus());
        assertEquals("Drain pipe repaired and cover replaced.", response.getResolutionNotes());
        assertNotNull(response.getResolvedAt());
    }

    @Test
    @DisplayName("Delete complaint succeeds when complaint exists")
    void testDeleteComplaintSuccess() {
        when(complaintRepository.existsById(100L)).thenReturn(true);

        complaintService.deleteComplaint(100L);

        verify(complaintRepository, times(1)).deleteById(100L);
    }
}
