package com.civicfix.repository;

import com.civicfix.entity.ReputationTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 48: REPUTATION TRANSACTION REPOSITORY
 * Package: com.civicfix.repository
 * Interface: ReputationTransactionRepository
 * ============================================================================
 */
@Repository
public interface ReputationTransactionRepository extends JpaRepository<ReputationTransaction, Long> {

    List<ReputationTransaction> findByUserIdOrderByCreatedAtDesc(Long userId);

    boolean existsByUserIdAndComplaintIdAndReason(Long userId, Long complaintId, String reason);

    long countByUserId(Long userId);
}
