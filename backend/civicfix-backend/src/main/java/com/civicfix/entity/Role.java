package com.civicfix.entity;

/**
 * ============================================================================
 * CIVICFIX — DAY 36 & 40: USER ROLES FOR ROLE-BASED ACCESS CONTROL (RBAC)
 * Package: com.civicfix.entity
 * Enum: Role
 *
 * Defines the authoritative authorization tiers in CivicFix:
 * - CITIZEN  : Public users who lodge grievances, upvote, and track issues.
 * - EMPLOYEE : Municipal ward officers and engineers assigned to resolve issues.
 * - ADMIN    : Municipal administrators with full oversight, analytics, and dispatch powers.
 * ============================================================================
 */
public enum Role {
    CITIZEN,
    EMPLOYEE,
    ADMIN
}
