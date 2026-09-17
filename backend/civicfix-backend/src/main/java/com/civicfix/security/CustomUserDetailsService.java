package com.civicfix.security;

import com.civicfix.entity.User;
import com.civicfix.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * ============================================================================
 * CIVICFIX — DAY 37: CUSTOM USER DETAILS SERVICE
 * Package: com.civicfix.security
 * Class: CustomUserDetailsService
 *
 * Implements Spring Security's UserDetailsService.
 * Used by AuthenticationManager during login to retrieve user credentials
 * and granted authorities from the database by email address.
 * ============================================================================
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new CustomUserDetails(user);
    }
}
