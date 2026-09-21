package com.civicfix.service;

import com.civicfix.dto.VoteResponseDto;
import com.civicfix.entity.Complaint;
import com.civicfix.entity.User;
import com.civicfix.entity.Vote;
import com.civicfix.exception.ComplaintNotFoundException;
import com.civicfix.exception.DuplicateVoteException;
import com.civicfix.repository.ComplaintRepository;
import com.civicfix.repository.UserRepository;
import com.civicfix.repository.VoteRepository;
import com.civicfix.service.impl.VoteServiceImpl;
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
class VoteServiceTest {

    @Mock
    private VoteRepository voteRepository;

    @Mock
    private ComplaintRepository complaintRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReputationService reputationService;

    @InjectMocks
    private VoteServiceImpl voteService;

    private Complaint sampleComplaint;
    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleComplaint = new Complaint();
        sampleComplaint.setId(10L);

        sampleUser = new User();
        sampleUser.setId(5L);
    }

    @Test
    @DisplayName("Successfully cast upvote increments count and awards +2 points")
    void testCastVoteSuccess() {
        when(complaintRepository.findById(10L)).thenReturn(Optional.of(sampleComplaint));
        when(userRepository.findById(5L)).thenReturn(Optional.of(sampleUser));
        when(voteRepository.existsByComplaintIdAndUserId(10L, 5L)).thenReturn(false);
        when(voteRepository.countByComplaintId(10L)).thenReturn(1L);

        VoteResponseDto response = voteService.castVote(10L, 5L);

        assertNotNull(response);
        assertEquals(1L, response.getTotalVotes());
        assertTrue(response.isHasVoted());
        verify(voteRepository, times(1)).save(any(Vote.class));
        verify(reputationService, times(1)).handleUpvoteReputation(5L, 10L, true);
    }

    @Test
    @DisplayName("Duplicate upvote throws DuplicateVoteException")
    void testDuplicateUpvoteThrowsException() {
        when(complaintRepository.findById(10L)).thenReturn(Optional.of(sampleComplaint));
        when(userRepository.findById(5L)).thenReturn(Optional.of(sampleUser));
        when(voteRepository.existsByComplaintIdAndUserId(10L, 5L)).thenReturn(true);

        assertThrows(DuplicateVoteException.class, () -> voteService.castVote(10L, 5L));
        verify(voteRepository, never()).save(any());
        verify(reputationService, never()).handleUpvoteReputation(anyLong(), anyLong(), anyBoolean());
    }

    @Test
    @DisplayName("Remove upvote decrements count and reverses -2 points")
    void testRemoveVoteSuccess() {
        when(complaintRepository.existsById(10L)).thenReturn(true);
        when(voteRepository.existsByComplaintIdAndUserId(10L, 5L)).thenReturn(true);
        when(voteRepository.countByComplaintId(10L)).thenReturn(0L);

        VoteResponseDto response = voteService.removeVote(10L, 5L);

        assertNotNull(response);
        assertEquals(0L, response.getTotalVotes());
        assertFalse(response.isHasVoted());
        verify(voteRepository, times(1)).deleteByComplaintIdAndUserId(10L, 5L);
        verify(reputationService, times(1)).handleUpvoteReputation(5L, 10L, false);
    }
}
