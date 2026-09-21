package com.civicfix.repository;

import com.civicfix.entity.ComplaintMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 42: COMPLAINT MEDIA REPOSITORY
 * Package: com.civicfix.repository
 * Interface: ComplaintMediaRepository
 *
 * Provides CRUD queries for grievance media attachments.
 * ============================================================================
 */
@Repository
public interface ComplaintMediaRepository extends JpaRepository<ComplaintMedia, Long> {

    List<ComplaintMedia> findByComplaintId(Long complaintId);
}
