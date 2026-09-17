/**
 * ============================================================================
 * CIVICFIX — DAY 22: JAVA METHODS, ARRAYS & DSA CONNECTION
 * File: Day22MethodsArrays.java
 *
 * Demonstrates:
 * 1. Method declaration, return types, parameters vs arguments
 * 2. void vs returning values
 * 3. Method overloading (same name, different parameter signature)
 * 4. Local variable scope inside methods
 * 5. Array declaration, indexing, and length
 * 6. Array traversal: standard for loop vs enhanced for-each loop
 * 7. Algorithmic array operations: Max, Min, Sum, Average, Count, Search
 * 8. DSA Connection & Introduction to Time Complexity O(n)
 * ============================================================================
 */
public class Day22MethodsArrays {

    // ------------------------------------------------------------------------
    // 1. METHODS WITH VOID & PARAMETERS
    // ------------------------------------------------------------------------
    /**
     * Prints a personalized civic portal welcome message.
     * @param citizenName parameter: the placeholder variable defined in the method signature
     */
    public static void greetCitizen(String citizenName) {
        // citizenName is a local parameter variable accessible only inside this method
        System.out.println("Hello " + citizenName + "! Welcome to CivicFix Grievance Redressal.");
    }

    // ------------------------------------------------------------------------
    // 2. METHODS WITH RETURN VALUES
    // ------------------------------------------------------------------------
    /**
     * Calculates introductory priority based on integer severity level.
     * Returning a value makes this logic reusable across console, APIs, and databases!
     */
    public static String calculatePriority(int severity) {
        if (severity >= 4) {
            return "High";
        } else if (severity == 3) {
            return "Medium";
        } else {
            return "Low";
        }
    }

    // ------------------------------------------------------------------------
    // 3. MULTIPLE PARAMETERS & METHOD OVERLOADING
    // ------------------------------------------------------------------------
    /**
     * Overload Version A: Calculates score based ONLY on severity.
     */
    public static int calculateScore(int severity) {
        int baseWeight = 10; // Local variable: exists only while this method executes
        return severity * baseWeight;
    }

    /**
     * Overload Version B: Same method name 'calculateScore', but different parameter list!
     * Calculates combined score factoring in community upvotes.
     */
    public static int calculateScore(int severity, int upvotes) {
        int baseScore = calculateScore(severity); // Reuses Version A!
        int upvoteMultiplier = 2;
        return baseScore + (upvotes * upvoteMultiplier);
    }

    // ------------------------------------------------------------------------
    // 4. ALGORITHMIC ARRAY OPERATIONS (DSA CONNECTION)
    // ------------------------------------------------------------------------

    /**
     * Traverses the array and prints each severity score.
     * Time Complexity: O(n) - visits each of the n elements once.
     */
    public static void printAllSeverities(int[] severities) {
        System.out.print("Current Severities: [ ");
        for (int i = 0; i < severities.length; i++) {
            System.out.print(severities[i] + (i < severities.length - 1 ? ", " : " "));
        }
        System.out.println("]");
    }

    /**
     * Finds the maximum severity value in an array.
     * Time Complexity: O(n) - linear scan through all n elements.
     */
    public static int findMaximum(int[] numbers) {
        // Assume the first element is the largest so far
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i]; // Found a new champion!
            }
        }
        return max;
    }

    /**
     * Finds the minimum severity value in an array.
     * Time Complexity: O(n)
     */
    public static int findMinimum(int[] numbers) {
        int min = numbers[0];
        for (int num : numbers) { // Using enhanced for-each loop
            if (num < min) {
                min = num;
            }
        }
        return min;
    }

    /**
     * Calculates the sum of all elements in an array.
     * Time Complexity: O(n)
     */
    public static int calculateTotal(int[] numbers) {
        int total = 0;
        for (int val : numbers) {
            total += val;
        }
        return total;
    }

    /**
     * Computes the mathematical average of values.
     * Reuses calculateTotal() and performs type casting to avoid integer truncation.
     */
    public static double calculateAverage(int[] numbers) {
        if (numbers.length == 0) return 0.0;
        int sum = calculateTotal(numbers);
        return (double) sum / numbers.length;
    }

    /**
     * Counts how many complaints exceed or meet a high severity threshold (e.g. >= 4).
     * Time Complexity: O(n)
     */
    public static int countHighSeverity(int[] numbers, int threshold) {
        int count = 0;
        for (int val : numbers) {
            if (val >= threshold) {
                count++;
            }
        }
        return count;
    }

    /**
     * Performs a Linear Search to check if a specific severity exists in the array.
     * Time Complexity: Best case O(1), Worst case O(n).
     * @return index of element if found, or -1 if not found.
     */
    public static int searchSeverity(int[] numbers, int target) {
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                return i; // Target found at index i!
            }
        }
        return -1; // Target does not exist in array
    }

    // ------------------------------------------------------------------------
    // MAIN ENTRY POINT
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println(" CIVICFIX — DAY 22: METHODS, ARRAYS & DSA BASICS  ");
        System.out.println("==================================================");

        // 1. Method Calling & Arguments
        System.out.println("\n[1] METHODS CALLING & REUSABILITY:");
        // "Kavita Rao" is the ARGUMENT passed to the PARAMETER citizenName
        greetCitizen("Kavita Rao");

        String p1 = calculatePriority(5);
        String p2 = calculatePriority(2);
        System.out.println("Priority for Severity 5: " + p1);
        System.out.println("Priority for Severity 2: " + p2);

        // 2. Method Overloading Demo
        System.out.println("\n[2] METHOD OVERLOADING:");
        int scoreWithoutUpvotes = calculateScore(4);
        int scoreWithUpvotes = calculateScore(4, 25);
        System.out.println("Severity 4 alone score           : " + scoreWithoutUpvotes);
        System.out.println("Severity 4 with 25 upvotes score : " + scoreWithUpvotes);

        // 3. Array Creation & Traversal
        System.out.println("\n[3] ARRAYS CREATION & TRAVERSAL:");
        // Array declaration approach A: inline initialization
        int[] complaintSeverities = {5, 2, 4, 1, 3, 5};

        // Array declaration approach B: fixed allocation (default zeroes)
        int[] emptyScores = new int[3]; // [0, 0, 0]
        emptyScores[0] = 10;
        emptyScores[1] = 20;
        emptyScores[2] = 30;

        printAllSeverities(complaintSeverities);
        System.out.println("Array Length (.length property)  : " + complaintSeverities.length);
        System.out.println("First element (index 0)          : " + complaintSeverities[0]);
        System.out.println("Last element (index length - 1)  : " + complaintSeverities[complaintSeverities.length - 1]);

        // 4. DSA Operations on CivicFix Complaint Array
        System.out.println("\n[4] DSA ALGORITHMIC ARRAY OPERATIONS:");
        int maxSeverity = findMaximum(complaintSeverities);
        int minSeverity = findMinimum(complaintSeverities);
        int totalSum = calculateTotal(complaintSeverities);
        double averageSeverity = calculateAverage(complaintSeverities);
        int highSeverityCount = countHighSeverity(complaintSeverities, 4);

        System.out.println("Maximum Severity in Batch        : " + maxSeverity);
        System.out.println("Minimum Severity in Batch        : " + minSeverity);
        System.out.println("Total Severity Points Sum        : " + totalSum);
        System.out.printf("Average Severity in Ward         : %.2f\n", averageSeverity);
        System.out.println("High-Severity (>= 4) Complaints  : " + highSeverityCount);

        // 5. Linear Search Demo
        System.out.println("\n[5] LINEAR SEARCH DEMO:");
        int target = 4;
        int searchResult = searchSeverity(complaintSeverities, target);
        if (searchResult != -1) {
            System.out.println("Target severity " + target + " found at array index: " + searchResult);
        } else {
            System.out.println("Target severity " + target + " not found.");
        }

        System.out.println("\nDay 22 Java Methods, Arrays & DSA Basics verified successfully!");
    }
}
