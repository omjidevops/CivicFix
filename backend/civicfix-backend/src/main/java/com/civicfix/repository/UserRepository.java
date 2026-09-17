package com.civicfix.repository;

import com.civicfix.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * ============================================================================
 * CIVICFIX — DAY 36: USER REPOSITORY
 * Package: com.civicfix.repository
 * Interface: UserRepository
 *
 * Spring Data JPA abstraction for User persistence:
 * - findByEmail: Used during authentication and JWT extraction
 * - existsByEmail: Used during registration to detect duplicate accounts
 * ============================================================================
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
