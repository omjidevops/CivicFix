/**
 * ============================================================================
 * CIVICFIX — DAY 23: JAVA OOP FUNDAMENTALS
 * File: Day23OOP.java
 *
 * Concepts Demonstrated:
 * 1. Object-Oriented Programming (OOP) vs Procedural Programming
 * 2. Class (Blueprint) vs Object (Instance in Memory)
 * 3. Instance Variables vs Local Variables
 * 4. Constructors (Default and Parameterized) & the 'this' keyword
 * 5. Encapsulation: private fields + public getters & setters
 * 6. Business Validation inside setters
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// CLASS DEFINITION (Blueprint for a Civic Grievance)
// ----------------------------------------------------------------------------
class Complaint {
    // 1. Private Fields (Encapsulation: data hiding)
    private int complaintId;
    private String title;
    private String category;
    private String description;
    private String location;
    private int severity;       // Valid range: 1 (Low) to 5 (Critical)
    private String status;      // "Pending", "In Progress", "Resolved"

    // 2. Default Constructor (No arguments)
    public Complaint() {
        this.complaintId = 0;
        this.title = "Untitled Grievance";
        this.category = "General";
        this.description = "No description provided";
        this.location = "Unknown Location";
        this.severity = 1;
        this.status = "Pending";
    }

    // 3. Parameterized Constructor
    public Complaint(int complaintId, String title, String category,
                     String description, String location, int severity, String status) {
        this.complaintId = complaintId;
        this.title = title;
        this.category = category;
        this.description = description;
        this.location = location;
        // Using setter to enforce validation during object creation
        setSeverity(severity);
        this.status = status;
    }

    // 4. Getter and Setter Methods (Controlled Access)

    public int getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(int complaintId) {
        this.complaintId = complaintId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getSeverity() {
        return severity;
    }

    // Validation inside setter: Severity MUST be between 1 and 5
    public void setSeverity(int severity) {
        if (severity >= 1 && severity <= 5) {
            this.severity = severity;
        } else {
            System.out.println("⚠️ Validation Error: Severity must be 1 to 5. Defaulting to 1.");
            this.severity = 1;
        }
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // 5. Method to display complaint details
    public void displayComplaint() {
        System.out.println("--------------------------------------------------");
        System.out.println("Ticket ID    : CF-" + this.complaintId);
        System.out.println("Title        : " + this.title);
        System.out.println("Category     : " + this.category);
        System.out.println("Location     : " + this.location);
        System.out.println("Severity     : " + this.severity + " / 5");
        System.out.println("Status       : " + this.status);
        System.out.println("Description  : " + this.description);
    }
}

// ----------------------------------------------------------------------------
// MAIN CLASS (Entry Point to create and test Complaint objects)
// ----------------------------------------------------------------------------
public class Day23OOP {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("        CIVICFIX — DAY 23: JAVA OOP BASICS        ");
        System.out.println("==================================================");

        // 1. Creating an object using Default Constructor
        System.out.println("\n[1] CREATING OBJECT WITH DEFAULT CONSTRUCTOR:");
        Complaint defaultComplaint = new Complaint();
        defaultComplaint.displayComplaint();

        // 2. Creating multiple distinct objects using Parameterized Constructor
        System.out.println("\n[2] CREATING OBJECTS WITH PARAMETERIZED CONSTRUCTOR:");

        Complaint complaint1 = new Complaint(
                1001,
                "Hazardous Pothole on Main Arterial Road",
                "Road Damage",
                "Deep 2-foot crater causing severe vehicle congestion.",
                "Central Ward, Sector 4",
                5,
                "Pending"
        );

        Complaint complaint2 = new Complaint(
                1002,
                "Non-functional Street Light",
                "Street Light",
                "Dark junction leading to pedestrian safety concerns.",
                "North Ward, Street 9",
                3,
                "In Progress"
        );

        // Displaying each object's encapsulated data
        complaint1.displayComplaint();
        complaint2.displayComplaint();

        // 3. Demonstrating Encapsulation & Validation via Setters
        System.out.println("\n[3] TESTING ENCAPSULATION & SETTER VALIDATION:");
        System.out.println("Updating complaint2 status to 'Resolved' via setStatus()...");
        complaint2.setStatus("Resolved");

        System.out.println("Attempting invalid severity (99) on complaint2...");
        complaint2.setSeverity(99); // Triggers validation error!

        System.out.println("\nUpdated Complaint #2 State:");
        System.out.println("Status   : " + complaint2.getStatus());
        System.out.println("Severity : " + complaint2.getSeverity() + " (Protected by validation)");

        System.out.println("\nDay 23 Java OOP Fundamentals completed and verified!");
    }
}
