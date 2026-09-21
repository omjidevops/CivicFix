package com.civicfix.repository;

import com.civicfix.entity.Role;
import com.civicfix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * ============================================================================
 * CIVICFIX — DAYS 36 & 46: USER REPOSITORY
 * Package: com.civicfix.repository
 * Interface: UserRepository
 *
 * Spring Data JPA abstraction for User persistence:
 * - findByEmail: Used during authentication and JWT extraction
 * - existsByEmail: Used during registration to detect duplicate accounts
 * - findByRole: Used to list municipal staff for complaint delegation
 * ============================================================================
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(Role role);
}
