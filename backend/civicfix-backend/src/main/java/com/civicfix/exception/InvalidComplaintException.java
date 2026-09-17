package com.civicfix.exception;

/**
 * ============================================================================
 * CIVICFIX — INVALID COMPLAINT EXCEPTION
 * Thrown when custom domain validation rules are violated.
 * ============================================================================
 */
public class InvalidComplaintException extends RuntimeException {
    public InvalidComplaintException(String message) {
        super(message);
    }
}
