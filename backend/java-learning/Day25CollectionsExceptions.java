import java.util.ArrayList;
import java.util.HashSet;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.Map;

/**
 * ============================================================================
 * CIVICFIX — DAY 25: JAVA COLLECTIONS, EXCEPTION HANDLING & MINI SIMULATION
 * File: Day25CollectionsExceptions.java
 *
 * Concepts Demonstrated:
 * 1. Collections: List (ArrayList), Set (HashSet), Map (HashMap)
 * 2. Why Collections supersede static Arrays
 * 3. Exception Handling: try, catch, finally, throw, throws
 * 4. Checked vs Unchecked Exceptions
 * 5. Custom Domain Exceptions: InvalidSeverityException, ComplaintNotFoundException
 * 6. Integrated CivicFix In-Memory Grievance Management Simulation
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. CUSTOM EXCEPTIONS
// ----------------------------------------------------------------------------

/**
 * Unchecked Custom Exception (extends RuntimeException)
 * Thrown when an invalid severity level (not between 1 and 5) is supplied.
 */
class InvalidSeverityException extends RuntimeException {
    public InvalidSeverityException(String message) {
        super(message);
    }
}

/**
 * Checked Custom Exception (extends Exception)
 * Must be caught or declared with 'throws'.
 * Thrown when querying a grievance ID that does not exist in the database.
 */
class ComplaintNotFoundException extends Exception {
    public ComplaintNotFoundException(String message) {
        super(message);
    }
}

// ----------------------------------------------------------------------------
// 2. CIVIC DOMAIN MODEL
// ----------------------------------------------------------------------------
class ComplaintRecord {
    private int id;
    private String title;
    private String category;
    private int severity;
    private String status;

    public ComplaintRecord(int id, String title, String category, int severity) throws InvalidSeverityException {
        this.id = id;
        this.title = title;
        this.category = category;
        // Validation using custom exception
        if (severity < 1 || severity > 5) {
            throw new InvalidSeverityException("Invalid Severity (" + severity + ")! Must be between 1 and 5.");
        }
        this.severity = severity;
        this.status = "Pending";
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public int getSeverity() { return severity; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "[CF-" + id + "] " + title + " | Category: " + category +
                " | Severity: " + severity + "/5 | Status: " + status;
    }
}

// ----------------------------------------------------------------------------
// 3. MAIN DEMO & COMPLETE CIVICFIX CONSOLE SIMULATION
// ----------------------------------------------------------------------------
public class Day25CollectionsExceptions {

    // Method demonstrating 'throws' keyword for checked exception
    public static ComplaintRecord findComplaintById(Map<Integer, ComplaintRecord> registry, int id)
            throws ComplaintNotFoundException {
        if (!registry.containsKey(id)) {
            throw new ComplaintNotFoundException("Complaint with Ticket ID CF-" + id + " does not exist!");
        }
        return registry.get(id); // O(1) average lookup
    }

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println(" CIVICFIX — DAY 25: COLLECTIONS & EXCEPTIONS      ");
        System.out.println("==================================================");

        // --------------------------------------------------------------------
        // PART 1: JAVA COLLECTIONS DEMO (List, Set, Map)
        // --------------------------------------------------------------------
        System.out.println("\n[1] COLLECTIONS INITIALIZATION:");

        // A. List (ArrayList) -> Dynamic array of complaints, preserves order
        List<ComplaintRecord> complaintList = new ArrayList<>();

        // B. Set (HashSet) -> Guaranteed UNIQUE categories (no duplicates)
        Set<String> uniqueCategories = new HashSet<>();

        // C. Map (HashMap) -> Rapid Key-Value lookup (Ticket ID -> Complaint object)
        Map<Integer, ComplaintRecord> complaintRegistry = new HashMap<>();

        // --------------------------------------------------------------------
        // PART 2: ADDING DATA & HANDLING CUSTOM EXCEPTIONS
        // --------------------------------------------------------------------
        System.out.println("\n[2] CREATING AND VALIDATING COMPLAINTS:");

        // Adding valid complaints
        try {
            ComplaintRecord c1 = new ComplaintRecord(1001, "Burst Water Pipe", "Water Supply", 5);
            ComplaintRecord c2 = new ComplaintRecord(1002, "Overflowing Dustbin", "Sanitation", 3);
            ComplaintRecord c3 = new ComplaintRecord(1003, "Broken Manhole Cover", "Road Damage", 4);
            ComplaintRecord c4 = new ComplaintRecord(1004, "Water Tanker Delay", "Water Supply", 2);

            // Populating ArrayList
            complaintList.add(c1);
            complaintList.add(c2);
            complaintList.add(c3);
            complaintList.add(c4);

            // Populating HashSet (Note: "Water Supply" added twice, HashSet keeps only 1)
            for (ComplaintRecord c : complaintList) {
                uniqueCategories.add(c.getCategory());
                complaintRegistry.put(c.getId(), c);
            }
            System.out.println("Successfully registered " + complaintList.size() + " grievances in memory.");

        } catch (InvalidSeverityException e) {
            System.err.println("Creation Failed: " + e.getMessage());
        }

        // Testing Invalid Severity Exception
        System.out.println("\n[3] TESTING EXCEPTION THROWING (INVALID SEVERITY):");
        try {
            System.out.println("Attempting to create complaint with severity = 9...");
            ComplaintRecord invalidComplaint = new ComplaintRecord(9999, "Damaged Bridge", "Road Damage", 9);
            complaintList.add(invalidComplaint); // Will NOT execute
        } catch (InvalidSeverityException ex) {
            System.out.println("Caught Custom Exception: " + ex.getMessage());
        } finally {
            System.out.println("Finally block executed: Severity validation cycle closed.");
        }

        // --------------------------------------------------------------------
        // PART 3: QUERYING & ITERATING COLLECTIONS
        // --------------------------------------------------------------------
        System.out.println("\n[4] ITERATING UNIQUE CATEGORIES (HashSet):");
        System.out.println("Total Unique Categories: " + uniqueCategories.size());
        for (String cat : uniqueCategories) {
            System.out.println("  • Category: " + cat);
        }

        System.out.println("\n[5] LISTING ALL COMPLAINTS (ArrayList):");
        for (ComplaintRecord c : complaintList) {
            System.out.println("  " + c);
        }

        // --------------------------------------------------------------------
        // PART 4: HASHMAP FAST LOOKUP & CHECKED EXCEPTION HANDLING
        // --------------------------------------------------------------------
        System.out.println("\n[6] HASHMAP LOOKUP (TICKET ID -> COMPLAINT):");

        // Successful query
        try {
            int targetId = 1002;
            ComplaintRecord found = findComplaintById(complaintRegistry, targetId);
            System.out.println("Search Found: " + found);
            // Updating status in-memory
            found.setStatus("In Progress");
            System.out.println("Status Updated: " + found);
        } catch (ComplaintNotFoundException e) {
            System.err.println("Lookup Error: " + e.getMessage());
        }

        // Failed query (Non-existent ID)
        System.out.println("\n[7] SEARCHING NON-EXISTENT COMPLAINT (CF-9999):");
        try {
            findComplaintById(complaintRegistry, 9999);
        } catch (ComplaintNotFoundException ex) {
            System.out.println("Gracefully Caught Exception: " + ex.getMessage());
        }

        System.out.println("\nDay 25 Java Collections & Exception Handling verified successfully!");
    }
}
