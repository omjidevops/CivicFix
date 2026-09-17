package com.civicfix.repository;

import com.civicfix.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ============================================================================
 * CIVICFIX — DAY 32: COMPLAINT REPOSITORY
 * Package: com.civicfix.repository
 * Interface: ComplaintRepository
 *
 * Spring Data JPA magic:
 * By extending JpaRepository<Complaint, Long>, Spring Data generates complete
 * CRUD operations (save, findById, findAll, deleteById, count) at runtime
 * without requiring us to write a single line of boilerplate SQL!
 * ============================================================================
 */
@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    // Spring Data derives queries automatically from method names!
    List<Complaint> findByCategory(String category);

    List<Complaint> findByStatus(String status);

    List<Complaint> findByCitizenId(Long citizenId);
}
