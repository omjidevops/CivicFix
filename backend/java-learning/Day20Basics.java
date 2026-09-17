/**
 * ============================================================================
 * CIVICFIX — DAY 20: JAVA FUNDAMENTALS FROM ZERO
 * File: Day20Basics.java
 *
 * Concepts Demonstrated:
 * 1. Java Program Structure (class, public, static, void, main)
 * 2. Output with println(), print(), and printf()
 * 3. Primitive Data Types & Reference Type (String)
 * 4. Operators (Arithmetic, Assignment, Comparison, Logical)
 * 5. Type Casting (Widening & Narrowing)
 * 6. String Operations & Value Comparison (.equals vs ==)
 * ============================================================================
 */
public class Day20Basics {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       CIVICFIX — DAY 20: JAVA FUNDAMENTALS       ");
        System.out.println("==================================================");

        // --------------------------------------------------------------------
        // 1. JAVA VARIABLES & DATA TYPES
        // --------------------------------------------------------------------
        // Primitive Data Types:
        byte wardNumber = 4;                           // 1 byte (-128 to 127)
        short municipalZone = 104;                     // 2 bytes (-32,768 to 32,767)
        int complaintId = 1001;                        // 4 bytes (standard integer)
        long totalCityComplaints = 150000L;            // 8 bytes (large integers, suffix L)
        float inspectionLatitude = 28.6139f;           // 4 bytes (decimal with 6-7 digits precision)
        double resolutionRate = 94.75;                 // 8 bytes (double precision, default decimal)
        char priorityCode = 'H';                       // 2 bytes (single 16-bit Unicode character)
        boolean isVerified = true;                     // 1 bit (true or false)

        // Reference Data Type:
        String platformName = "CivicFix";             // Object holding sequence of characters
        String citizenName = "Aarav Sharma";
        String category = "Road Damage";

        System.out.println("\n[1] DATA TYPES DEMO:");
        System.out.println("Platform Name (String)        : " + platformName);
        System.out.println("Complaint ID (int)            : " + complaintId);
        System.out.println("Ward Number (byte)            : " + wardNumber);
        System.out.println("Resolution Rate (double)      : " + resolutionRate + "%");
        System.out.println("Priority Code (char)          : " + priorityCode);
        System.out.println("Is Inspector Verified (boolean): " + isVerified);

        // --------------------------------------------------------------------
        // 2. OUTPUT METHODS (println, print, printf)
        // --------------------------------------------------------------------
        System.out.println("\n[2] OUTPUT FORMATTING:");
        System.out.print("This is print() - stays on the same line. ");
        System.out.println("This is println() - moves to the next line.");
        // printf allows format specifiers: %s (string), %d (integer), %.2f (float/double)
        System.out.printf("Ticket: CF-%d | Citizen: %s | Score: %.2f%%\n",
                complaintId, citizenName, resolutionRate);

        // --------------------------------------------------------------------
        // 3. OPERATORS (Arithmetic, Assignment, Comparison, Logical)
        // --------------------------------------------------------------------
        System.out.println("\n[3] OPERATORS DEMO:");
        int pendingTickets = 15;
        int resolvedTickets = 35;

        // Arithmetic
        int totalTickets = pendingTickets + resolvedTickets; // Addition: 50
        int difference = resolvedTickets - pendingTickets;    // Subtraction: 20
        int doublePending = pendingTickets * 2;              // Multiplication: 30
        int ratio = resolvedTickets / pendingTickets;        // Integer division: 2
        int remainder = resolvedTickets % pendingTickets;    // Modulus / Remainder: 5

        System.out.println("Total Tickets (15 + 35)       : " + totalTickets);
        System.out.println("Remainder (35 % 15)           : " + remainder);

        // Comparison & Logical
        boolean isBacklogged = pendingTickets > 10;
        boolean hasGoodPerformance = resolvedTickets >= 30 && isVerified;
        boolean needsUrgentAction = pendingTickets > 20 || priorityCode == 'H';

        System.out.println("Pending > 10 (Comparison)     : " + isBacklogged);
        System.out.println("Good Performance (&& Logical) : " + hasGoodPerformance);
        System.out.println("Urgent Action (|| Logical)    : " + needsUrgentAction);

        // --------------------------------------------------------------------
        // 4. TYPE CASTING (Implicit Widening vs Explicit Narrowing)
        // --------------------------------------------------------------------
        System.out.println("\n[4] TYPE CASTING DEMO:");
        // Implicit (Widening): smaller type to larger type (safe, automatic)
        int rawScore = 88;
        double decimalScore = rawScore; // int -> double
        System.out.println("Widening (int 88 -> double)   : " + decimalScore);

        // Explicit (Narrowing): larger type to smaller type (manual, truncates decimal)
        double estimatedDays = 5.85;
        int roundedDays = (int) estimatedDays; // double -> int (truncates to 5)
        System.out.println("Narrowing (double 5.85 -> int): " + roundedDays);

        // --------------------------------------------------------------------
        // 5. STRING OPERATIONS & .equals() vs ==
        // --------------------------------------------------------------------
        System.out.println("\n[5] STRING OPERATIONS & EQUALITY:");
        String issueTitle = "Water Pipeline Leakage";

        System.out.println("Length of title               : " + issueTitle.length());
        System.out.println("Uppercase                     : " + issueTitle.toUpperCase());
        System.out.println("Lowercase                     : " + issueTitle.toLowerCase());
        System.out.println("Character at index 0          : " + issueTitle.charAt(0));

        // CRUCIAL: .equals() vs == in Java
        String status1 = new String("Pending");
        String status2 = new String("Pending");

        // == compares MEMORY ADDRESS (Reference equality)
        boolean addressCheck = (status1 == status2);
        // .equals() compares ACTUAL CONTENT (Value equality)
        boolean contentCheck = status1.equals(status2);

        System.out.println("Comparing with == (Addresses) : " + addressCheck + " (False! Different memory locations)");
        System.out.println("Comparing with .equals() (Text): " + contentCheck + " (True! Values are identical)");

        System.out.println("\nDay 20 Java Fundamentals verification completed successfully!");
    }
}
