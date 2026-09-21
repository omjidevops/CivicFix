package com.civicfix.repository;

import com.civicfix.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: VOTE JPA REPOSITORY
 * Package: com.civicfix.repository
 * Interface: VoteRepository
 * ============================================================================
 */
@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    boolean existsByComplaintIdAndUserId(Long complaintId, Long userId);

    Optional<Vote> findByComplaintIdAndUserId(Long complaintId, Long userId);

    long countByComplaintId(Long complaintId);

    void deleteByComplaintIdAndUserId(Long complaintId, Long userId);
}
