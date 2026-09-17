/**
 * ============================================================================
 * CIVICFIX — DAY 21: JAVA CONDITIONS & LOOPS
 * File: Day21ConditionsLoops.java
 *
 * Demonstrates:
 * 1. if, if-else, else-if, and nested if decision making
 * 2. Logical operators (&&, ||, !) with short-circuit evaluation
 * 3. switch-case statement for CivicFix department routing
 * 4. Ternary operator (condition ? val1 : val2)
 * 5. Loops: for, while, and do-while
 * 6. Loop control: break and continue
 * 7. Nested loops (Ward vs Inspector schedule matrix)
 * 8. Mini Program: CivicFix Batch Priority & Department Router
 * ============================================================================
 */
public class Day21ConditionsLoops {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    CIVICFIX — DAY 21: JAVA CONDITIONS & LOOPS    ");
        System.out.println("==================================================");

        // --------------------------------------------------------------------
        // 1. DECISION MAKING: IF, IF-ELSE, ELSE-IF
        // --------------------------------------------------------------------
        System.out.println("\n[1] IF / ELSE-IF DECISION MAKING:");
        int severity = 5;
        boolean isVerified = true;

        String priority;
        if (severity >= 4) {
            priority = "High";
        } else if (severity == 3) {
            priority = "Medium";
        } else {
            priority = "Low";
        }
        System.out.println("Severity: " + severity + " -> Calculated Priority: " + priority);

        // Nested IF: Additional check if high priority is verified by inspector
        if (severity >= 4) {
            if (isVerified) {
                System.out.println("Dispatch Alert: Immediate emergency field team dispatched!");
            } else {
                System.out.println("Dispatch Alert: Marked High, but awaiting citizen verification.");
            }
        }

        // --------------------------------------------------------------------
        // 2. LOGICAL OPERATORS & SHORT-CIRCUIT EVALUATION
        // --------------------------------------------------------------------
        System.out.println("\n[2] LOGICAL OPERATORS (&&, ||, !):");
        int citizenUpvotes = 25;
        boolean isDuplicate = false;

        // AND (&&): Both conditions must be true
        if (severity >= 4 && isVerified) {
            System.out.println("&& Check: Critical & Verified report confirmed.");
        }

        // OR (||): At least one condition must be true
        if (severity == 5 || citizenUpvotes > 20) {
            System.out.println("|| Check: High community urgency detected.");
        }

        // NOT (!): Inverts the boolean
        if (!isDuplicate) {
            System.out.println("! Check: Confirmed unique issue (not a duplicate).");
        }

        // Short-circuit demonstration:
        // In (false && ...), the second condition is NEVER evaluated because the first is already false!
        int testCount = 0;
        if (false && (++testCount > 0)) {
            // Unreachable
        }
        System.out.println("Short-circuit check (testCount unchanged): " + testCount);

        // --------------------------------------------------------------------
        // 3. SWITCH STATEMENT (MUNICIPAL DEPARTMENT ROUTING)
        // --------------------------------------------------------------------
        System.out.println("\n[3] SWITCH STATEMENT (DEPARTMENT ROUTER):");
        String category = "Road Damage";
        String assignedDepartment;

        switch (category) {
            case "Road Damage":
                assignedDepartment = "Public Works Department (PWD)";
                break;
            case "Garbage":
                assignedDepartment = "Solid Waste Management (SWM)";
                break;
            case "Street Light":
                assignedDepartment = "Municipal Electricity Board";
                break;
            case "Water Supply":
                assignedDepartment = "Jal Sansthan (Water Board)";
                break;
            default:
                assignedDepartment = "General Grievance Cell";
                break;
        }
        System.out.println("Category: '" + category + "' -> Assigned to: " + assignedDepartment);

        // --------------------------------------------------------------------
        // 4. TERNARY OPERATOR (condition ? trueVal : falseVal)
        // --------------------------------------------------------------------
        System.out.println("\n[4] TERNARY OPERATOR:");
        int pendingDays = 7;
        // Replaces a 4-line if-else for simple variable assignment
        String slaStatus = pendingDays > 3 ? "SLA Breached" : "Within SLA";
        System.out.println("Days Pending: " + pendingDays + " -> SLA Status: " + slaStatus);

        // --------------------------------------------------------------------
        // 5. FOR LOOP (Known Number of Iterations)
        // --------------------------------------------------------------------
        System.out.println("\n[5] FOR LOOP (TICKET DISPATCH SIMULATION):");
        // Steps: (1) initialize i=1, (2) check i<=3, (3) execute body, (4) update i++
        for (int i = 1; i <= 3; i++) {
            System.out.println("  Dispatching SMS update for Complaint #CF-100" + i);
        }

        // --------------------------------------------------------------------
        // 6. WHILE LOOP (Condition-Driven Iteration)
        // --------------------------------------------------------------------
        System.out.println("\n[6] WHILE LOOP (FIELD WORKER PROGRESS TRACKER):");
        int progressPercent = 0;
        while (progressPercent <= 60) {
            System.out.println("  Repair in progress... " + progressPercent + "% completed.");
            progressPercent += 30; // CRITICAL: Update statement avoids infinite loop!
        }

        // --------------------------------------------------------------------
        // 7. DO-WHILE LOOP (Guaranteed At Least One Execution)
        // --------------------------------------------------------------------
        System.out.println("\n[7] DO-WHILE LOOP (RETRY NETWORK PING):");
        int retryAttempts = 0;
        do {
            retryAttempts++;
            System.out.println("  Attempting API handshake... Attempt #" + retryAttempts);
        } while (retryAttempts < 1); // Runs once even though condition becomes false immediately

        // --------------------------------------------------------------------
        // 8. BREAK AND CONTINUE IN LOOPS
        // --------------------------------------------------------------------
        System.out.println("\n[8] BREAK AND CONTINUE DEMO:");
        System.out.println("Searching complaint list for ticket CF-1003:");
        for (int ticket = 1001; ticket <= 1005; ticket++) {
            if (ticket == 1002) {
                System.out.println("  CF-" + ticket + " is archived. Skipping with 'continue'.");
                continue; // Skips remainder of this loop iteration and moves to next ticket
            }

            if (ticket == 1003) {
                System.out.println("  FOUND target ticket CF-" + ticket + "! Halting search with 'break'.");
                break; // Terminates the entire loop immediately
            }
            System.out.println("  Inspecting CF-" + ticket);
        }

        // --------------------------------------------------------------------
        // 9. NESTED LOOPS (WARD & INSPECTOR MATRIX)
        // --------------------------------------------------------------------
        System.out.println("\n[9] NESTED LOOPS (INSPECTION ROSTER):");
        for (int ward = 1; ward <= 2; ward++) {
            System.out.println("Ward #" + ward + " Inspection Schedule:");
            for (int shift = 1; shift <= 2; shift++) {
                System.out.println("   -> Shift " + shift + ": Team Alpha assigned");
            }
        }

        System.out.println("\nDay 21 Java Conditions and Loops verified successfully!");
    }
}
