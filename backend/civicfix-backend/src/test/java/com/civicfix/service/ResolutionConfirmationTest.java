package com.civicfix.service;

import com.civicfix.dto.ComplaintResponseDto;
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

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResolutionConfirmationTest {

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

    private Complaint resolvedComplaint;

    @BeforeEach
    void setUp() {
        resolvedComplaint = new Complaint();
        resolvedComplaint.setId(500L);
        resolvedComplaint.setCitizenId(7L);
        resolvedComplaint.setTitle("Broken Water Pipe");
        resolvedComplaint.setStatus("RESOLVED");
        resolvedComplaint.setResolutionConfirmed(false);
        resolvedComplaint.setAssignedOfficerId(2L);
    }

    @Test
    @DisplayName("Complaint owner successfully confirms resolution")
    void testConfirmResolutionSuccess() {
        when(complaintRepository.findById(500L)).thenReturn(Optional.of(resolvedComplaint));
        when(complaintRepository.save(any(Complaint.class))).thenAnswer(i -> i.getArgument(0));

        ComplaintResponseDto response = complaintService.confirmResolution(500L, 7L);

        assertNotNull(response);
        assertEquals("RESOLUTION_CONFIRMED", response.getStatus());
        assertTrue(response.getResolutionConfirmed());
        assertNotNull(response.getResolutionConfirmedAt());

        verify(reputationService, times(1)).awardReputation(7L, 500L, 5, "RESOLUTION_CONFIRMED");
        verify(statusHistoryRepository, times(1)).save(any());
        verify(notificationRepository, atLeast(1)).save(any());
    }

    @Test
    @DisplayName("Non-owner citizen cannot confirm resolution (SecurityException)")
    void testNonOwnerCannotConfirm() {
        when(complaintRepository.findById(500L)).thenReturn(Optional.of(resolvedComplaint));

        // User ID 99 tries to confirm complaint owned by User ID 7
        assertThrows(SecurityException.class, () -> complaintService.confirmResolution(500L, 99L));
        verify(reputationService, never()).awardReputation(anyLong(), anyLong(), anyInt(), anyString());
    }

    @Test
    @DisplayName("Cannot confirm resolution if complaint is not RESOLVED (IllegalStateException)")
    void testCannotConfirmUnresolvedComplaint() {
        resolvedComplaint.setStatus("IN_PROGRESS");
        when(complaintRepository.findById(500L)).thenReturn(Optional.of(resolvedComplaint));

        assertThrows(IllegalStateException.class, () -> complaintService.confirmResolution(500L, 7L));
        verify(reputationService, never()).awardReputation(anyLong(), anyLong(), anyInt(), anyString());
    }

    @Test
    @DisplayName("Cannot confirm resolution twice (IllegalStateException)")
    void testCannotConfirmTwice() {
        resolvedComplaint.setResolutionConfirmed(true);
        when(complaintRepository.findById(500L)).thenReturn(Optional.of(resolvedComplaint));

        assertThrows(IllegalStateException.class, () -> complaintService.confirmResolution(500L, 7L));
        verify(reputationService, never()).awardReputation(anyLong(), anyLong(), anyInt(), anyString());
    }

    @Test
    @DisplayName("Throws ComplaintNotFoundException if complaint does not exist")
    void testComplaintNotFound() {
        when(complaintRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(ComplaintNotFoundException.class, () -> complaintService.confirmResolution(999L, 7L));
    }
}
