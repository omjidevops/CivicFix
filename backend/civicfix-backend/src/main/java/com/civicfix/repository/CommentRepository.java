package com.civicfix.repository;

import com.civicfix.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 44: COMMENT JPA REPOSITORY
 * Package: com.civicfix.repository
 * Interface: CommentRepository
 * ============================================================================
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByComplaintIdOrderByCreatedAtAsc(Long complaintId);

    long countByComplaintId(Long complaintId);
}
