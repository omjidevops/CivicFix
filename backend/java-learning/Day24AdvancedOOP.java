/**
 * ============================================================================
 * CIVICFIX — DAY 24: ADVANCED JAVA OOP
 * File: Day24AdvancedOOP.java
 *
 * Concepts Demonstrated:
 * 1. Inheritance (User -> Citizen, Employee, Admin) with 'extends'
 * 2. super keyword (calling parent constructor and methods)
 * 3. Method Overriding (@Override) & Runtime Polymorphism (Upcasting)
 * 4. Abstraction with 'abstract class' (ComplaintHandler)
 * 5. Interfaces with 'implements' (NotificationService -> Email, SMS)
 * 6. Composition (HAS-A) vs Inheritance (IS-A)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. INHERITANCE HIERARCHY: BASE CLASS (PARENT)
// ----------------------------------------------------------------------------
class User {
    protected int userId;
    protected String name;
    protected String email;

    public User(int userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public void displayProfile() {
        System.out.println("User ID: " + userId + " | Name: " + name + " | Email: " + email);
    }

    // Method to be overridden by subclasses (Polymorphism)
    public void performDuty() {
        System.out.println(name + " is accessing the civic portal.");
    }
}

// ----------------------------------------------------------------------------
// CHILD CLASS 1: Citizen IS-A User
// ----------------------------------------------------------------------------
class Citizen extends User {
    private int wardNumber;

    public Citizen(int userId, String name, String email, int wardNumber) {
        // super() invokes the parent (User) constructor
        super(userId, name, email);
        this.wardNumber = wardNumber;
    }

    @Override
    public void performDuty() {
        System.out.println("[Citizen Duty] " + name + " (Ward " + wardNumber +
                ") is reporting a civic grievance and tracking resolution.");
    }

    public void reportComplaint(String title) {
        System.out.println("  -> Filing complaint: '" + title + "'");
    }
}

// ----------------------------------------------------------------------------
// CHILD CLASS 2: Employee IS-A User
// ----------------------------------------------------------------------------
class Employee extends User {
    private String department;

    public Employee(int userId, String name, String email, String department) {
        super(userId, name, email);
        this.department = department;
    }

    @Override
    public void performDuty() {
        System.out.println("[Employee Duty] Officer " + name + " from " + department +
                " is inspecting field sites and closing grievance tickets.");
    }

    public void updateComplaintStatus(String ticketId, String newStatus) {
        System.out.println("  -> Updated " + ticketId + " status to: " + newStatus);
    }
}

// ----------------------------------------------------------------------------
// CHILD CLASS 3: Admin IS-A User
// ----------------------------------------------------------------------------
class Admin extends User {
    private String jurisdiction;

    public Admin(int userId, String name, String email, String jurisdiction) {
        super(userId, name, email);
        this.jurisdiction = jurisdiction;
    }

    @Override
    public void performDuty() {
        System.out.println("[Admin Duty] Commissioner " + name + " is auditing municipal " +
                jurisdiction + " performance metrics and SLA compliance.");
    }
}

// ----------------------------------------------------------------------------
// 2. ABSTRACTION: ABSTRACT CLASS
// ----------------------------------------------------------------------------
abstract class ComplaintHandler {
    protected String handlerName;

    public ComplaintHandler(String handlerName) {
        this.handlerName = handlerName;
    }

    // Concrete method (shared implementation)
    public void logAudit(String ticketId, String action) {
        System.out.println("[AUDIT LOG] Ticket " + ticketId + " -> Action: " + action + " by " + handlerName);
    }

    // Abstract method: has NO body; every subclass MUST provide its own implementation
    public abstract void handleComplaint(String ticketId);
}

class CitizenComplaintHandler extends ComplaintHandler {
    public CitizenComplaintHandler(String name) {
        super(name);
    }

    @Override
    public void handleComplaint(String ticketId) {
        logAudit(ticketId, "Grievance Lodged");
        System.out.println("CitizenHandler: Dispatched initial submission confirmation to citizen.");
    }
}

class EmployeeComplaintHandler extends ComplaintHandler {
    public EmployeeComplaintHandler(String name) {
        super(name);
    }

    @Override
    public void handleComplaint(String ticketId) {
        logAudit(ticketId, "Field Inspection Assigned");
        System.out.println("EmployeeHandler: Field crew routed to site for ticket " + ticketId);
    }
}

// ----------------------------------------------------------------------------
// 3. INTERFACES (CONTRACT FOR BEHAVIOR)
// ----------------------------------------------------------------------------
interface NotificationService {
    // Implicitly 'public abstract'
    void sendNotification(String recipient, String message);
}

class EmailNotification implements NotificationService {
    @Override
    public void sendNotification(String recipient, String message) {
        System.out.println("[EMAIL DISPATCH] Sent to " + recipient + " -> Content: \"" + message + "\"");
    }
}

class SmsNotification implements NotificationService {
    @Override
    public void sendNotification(String recipient, String message) {
        System.out.println("[SMS ALERT] Sent to phone " + recipient + " -> Content: \"" + message + "\"");
    }
}

// ----------------------------------------------------------------------------
// MAIN CLASS (Testing Inheritance, Polymorphism, Abstraction, and Interfaces)
// ----------------------------------------------------------------------------
public class Day24AdvancedOOP {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    CIVICFIX — DAY 24: ADVANCED JAVA OOP          ");
        System.out.println("==================================================");

        // 1. Inheritance & Super Demo
        System.out.println("\n[1] INHERITANCE (IS-A RELATIONSHIP):");
        Citizen citizen = new Citizen(101, "Rohan Verma", "rohan@civicfix.org", 4);
        Employee employee = new Employee(201, "Dr. Sunita Sharma", "sunita@pwd.gov.in", "Public Works");
        Admin admin = new Admin(301, "Rajesh Gupta", "admin@municipal.gov.in", "Zone Central");

        citizen.displayProfile();
        employee.displayProfile();
        admin.displayProfile();

        // 2. Runtime Polymorphism (Upcasting)
        System.out.println("\n[2] RUNTIME POLYMORPHISM & METHOD OVERRIDING:");
        // Array of parent reference type 'User', holding various child objects!
        User[] portalUsers = { citizen, employee, admin };

        for (User user : portalUsers) {
            // At runtime, the JVM determines which performDuty() implementation to invoke
            user.performDuty();
        }

        // 3. Abstraction Demo
        System.out.println("\n[3] ABSTRACTION (ABSTRACT CLASS & METHOD):");
        ComplaintHandler cHandler = new CitizenComplaintHandler("Citizen Portal Gateway");
        ComplaintHandler eHandler = new EmployeeComplaintHandler("PWD Dispatch Unit");

        cHandler.handleComplaint("CF-1001");
        eHandler.handleComplaint("CF-1001");

        // 4. Interface Demo
        System.out.println("\n[4] INTERFACES (PLUGGABLE NOTIFICATION SERVICES):");
        // Using interface reference to achieve loose coupling
        NotificationService emailService = new EmailNotification();
        NotificationService smsService = new SmsNotification();

        emailService.sendNotification("rohan@civicfix.org", "Your complaint CF-1001 has been registered.");
        smsService.sendNotification("+91-9876543210", "PWD crew dispatched for pothole repair.");

        System.out.println("\nDay 24 Advanced Java OOP verified successfully!");
    }
}
