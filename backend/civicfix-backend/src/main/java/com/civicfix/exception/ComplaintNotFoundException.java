package com.civicfix.exception;

/**
 * ============================================================================
 * CIVICFIX — COMPLAINT NOT FOUND EXCEPTION
 * Thrown when an ID lookup fails to locate an existing grievance in the database.
 * ============================================================================
 */
public class ComplaintNotFoundException extends RuntimeException {
    public ComplaintNotFoundException(String message) {
        super(message);
    }
}
