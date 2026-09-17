package com.civicfix.security;

import com.civicfix.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

/**
 * ============================================================================
 * CIVICFIX — DAY 37 & 39: SPRING SECURITY USER DETAILS ADAPTER
 * Package: com.civicfix.security
 * Class: CustomUserDetails
 *
 * Adapts our database User entity to Spring Security's UserDetails contract.
 *
 * CRITICAL RBAC MAPPING:
 * Spring Security's `hasRole("ADMIN")` expects an authority prefixed with "ROLE_".
 * Therefore, we map our Role enum (e.g. ADMIN) to `ROLE_ADMIN`.
 * ============================================================================
 */
public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Adds "ROLE_" prefix so hasRole("CITIZEN") matches Role.CITIZEN
        String authority = "ROLE_" + user.getRole().name();
        return Collections.singletonList(new SimpleGrantedAuthority(authority));
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User getUser() {
        return user;
    }
}
