package com.civicfix.exception;

/**
 * Thrown when a citizen attempts to cast a duplicate vote on the same complaint.
 */
public class DuplicateVoteException extends RuntimeException {
    public DuplicateVoteException(String message) {
        super(message);
    }
}
