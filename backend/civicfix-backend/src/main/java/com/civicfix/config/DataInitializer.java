package com.civicfix.config;

import com.civicfix.entity.Role;
import com.civicfix.entity.User;
import com.civicfix.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * ============================================================================
 * CIVICFIX — DAY 40: SECURE INITIALIZER FOR RBAC DEMONSTRATION
 * Package: com.civicfix.config
 * Class: DataInitializer
 *
 * Seeds initial demo accounts with BCrypt-hashed passwords on startup:
 * - Admin account: admin@civicfix.gov (Role.ADMIN)
 * - Employee account: officer@civicfix.gov (Role.EMPLOYEE)
 *
 * Notice: Public registration NEVER allows self-declaring ADMIN or EMPLOYEE.
 * Privileged accounts are provisioned via administrative seeding/workflows.
 * ============================================================================
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Seed Admin if not present
        if (userRepository.findByEmail("admin@civicfix.gov").isEmpty()) {
            User admin = new User();
            admin.setName("Municipal Commissioner");
            admin.setEmail("admin@civicfix.gov");
            admin.setPasswordHash(passwordEncoder.encode("AdminSecret123"));
            admin.setPhone("1112223334");
            admin.setRole(Role.ADMIN);
            admin.setReputationScore(100);
            userRepository.save(admin);
        }

        // 2. Seed Officer / Employee if not present
        if (userRepository.findByEmail("officer@civicfix.gov").isEmpty()) {
            User officer = new User();
            officer.setName("Ward Officer Vikas");
            officer.setEmail("officer@civicfix.gov");
            officer.setPasswordHash(passwordEncoder.encode("OfficerSecret123"));
            officer.setPhone("5556667778");
            officer.setRole(Role.EMPLOYEE);
            officer.setReputationScore(50);
            userRepository.save(officer);
        }
    }
}
