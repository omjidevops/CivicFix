
import java.util.Scanner;

/**
 * ============================================================================
 * CIVICFIX — DAY 20: MINI PRACTICE CONSOLE PROGRAM
 * File: CivicFixComplaintPreview.java
 *
 * Demonstrates:
 * 1. Taking console input using java.util.Scanner
 * 2. Reading Strings (nextLine()) and integers (nextInt())
 * 3. Handling Scanner buffer newline behavior
 * 4. Conditional calculation of introductory priority
 * 5. Clean output formatting with println()
 *
 * NOTE: This is a learning exercise, NOT the final CivicFix Smart Priority Engine.
 * ============================================================================
 */
public class CivicFixComplaintPreview {

    public static void main(String[] args) {
        // 1. Initialize Scanner to read input from keyboard (System.in)
        Scanner scanner = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("      CIVICFIX — CITIZEN COMPLAINT PREVIEW        ");
        System.out.println("   (Day 20 Java Fundamentals Practice Program)    ");
        System.out.println("==================================================");

        // 2. Prompt for Citizen Name
        System.out.print("Enter Citizen Name: ");
        String citizenName = scanner.nextLine();

        // 3. Prompt for Issue Category
        System.out.print("Enter Issue Category (e.g. Road, Sanitation, Water): ");
        String category = scanner.nextLine();

        // 4. Prompt for Description
        System.out.print("Enter Brief Description: ");
        String description = scanner.nextLine();

        // 5. Prompt for Severity (Integer 1 to 5)
        System.out.print("Enter Severity Level (1 = Low to 5 = Critical): ");
        int severity = scanner.nextInt();

        // 6. Calculate introductory priority label
        String priorityLabel;
        if (severity >= 4) {
            priorityLabel = "High";
        } else if (severity == 3) {
            priorityLabel = "Medium";
        } else {
            priorityLabel = "Low";
        }

        // 7. Display Formatted Complaint Preview
        System.out.println("\n--------------------------------------------------");
        System.out.println("              COMPLAINT PREVIEW                   ");
        System.out.println("--------------------------------------------------");
        System.out.println("Citizen     : " + citizenName);
        System.out.println("Category    : " + category);
        System.out.println("Description : " + description);
        System.out.println("Severity    : " + severity + " / 5");
        System.out.println("Priority    : " + priorityLabel);
        System.out.println("Status      : Pending Verification");
        System.out.println("--------------------------------------------------");
        System.out.println("Thank you, " + citizenName + "! Your report is ready for dispatch.");

        // 8. Close scanner resource
        scanner.close();
    }
}
