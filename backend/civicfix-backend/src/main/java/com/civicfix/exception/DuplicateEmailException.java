package com.civicfix.exception;

/**
 * ============================================================================
 * CIVICFIX — DAY 36: DUPLICATE EMAIL DOMAIN EXCEPTION
 * Package: com.civicfix.exception
 * Class: DuplicateEmailException
 *
 * Thrown during user registration when the submitted email already exists.
 * ============================================================================
 */
public class DuplicateEmailException extends RuntimeException {

    public DuplicateEmailException(String message) {
        super(message);
    }
}
