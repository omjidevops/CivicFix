/* ==============================================================================
   CivicFix — Smart Civic Issue Reporting & Resolution Platform
   Script: frontend/script.js
   Stage: Day 6 — JavaScript Fundamentals From Zero
   Beginner-friendly, clean, well-commented, and interview-ready.
   ============================================================================== */


// ==============================================================================
// 1. FIRST JAVASCRIPT PROGRAM: console.log()
// ==============================================================================
// console.log() outputs messages to the browser's Developer Tools Console.
// It is the primary tool for developers to inspect values and debug code.
console.log("Welcome to CivicFix!");
console.log("Day 6: JavaScript Fundamentals Initialized.");


// ==============================================================================
// 2. COMMENTS IN JAVASCRIPT
// ==============================================================================
// Single-line comments start with two forward slashes (//).

/*
   Multi-line comments are wrapped inside slash-asterisk.
   They are great for explaining larger blocks of logic or documentation.
*/


// ==============================================================================
// 3. VARIABLES: let, const, and var
// ==============================================================================
// A variable is a named storage container for data.

// 'const' is used for values that will NEVER be reassigned.
const projectName = "CivicFix";
const platformVersion = "1.0.0";
console.log("Project Name:", projectName);

// 'let' is used for values that CAN change or be updated later.
let pendingComplaints = 12;
console.log("Pending Complaints initially:", pendingComplaints);

// Reassigning a 'let' variable:
pendingComplaints = 15;
console.log("Pending Complaints after new reports:", pendingComplaints);

// 'var' is the older way of declaring variables in JavaScript (pre-ES6, before 2015).
// Modern JavaScript avoids 'var' because of scoping and hoisting quirks.
// We prefer 'const' by default, and 'let' only when reassignment is needed.
var legacyCityCode = "MUM-01";


// ==============================================================================
// 4. PRIMITIVE DATA TYPES
// ==============================================================================
// JavaScript has several core primitive data types:

// 1. String: Text enclosed in quotes
const citizenName = "Citizen Om";

// 2. Number: Numeric values (integers or decimals)
let complaintCount = 25;
let resolutionRate = 92.5;

// 3. Boolean: Logical values representing true or false
let complaintVerified = true;
let issueResolved = false;

// 4. Undefined: A variable that has been declared but not yet assigned any value
let assignedDepartment;

// 5. Null: An intentional, explicit representation of 'no value' or 'empty'
let resolutionPhoto = null;


// ==============================================================================
// 5. THE typeof OPERATOR
// ==============================================================================
// typeof returns a string describing the data type of any value or variable.
console.log("Type of citizenName:", typeof citizenName);               // string
console.log("Type of complaintCount:", typeof complaintCount);           // number
console.log("Type of complaintVerified:", typeof complaintVerified);     // boolean
console.log("Type of assignedDepartment:", typeof assignedDepartment);   // undefined
console.log("Type of resolutionPhoto:", typeof resolutionPhoto);         // object (historical JS quirk)


// ==============================================================================
// 6. STRINGS & TEMPLATE LITERALS
// ==============================================================================
// Strings can use single quotes (''), double quotes (""), or backticks (``).
const issueCategory = "Road Damage";

// Old-fashioned string concatenation with '+' operator:
const oldGreeting = "CivicFix issue category is: " + issueCategory;
console.log(oldGreeting);

// Modern Template Literals with backticks (``) and ${variable}:
// Allows embedding variables directly inside strings cleanly.
const citizen = "Citizen";
const action = "Report an Issue";
const modernMessage = `${citizen} can ${action} on ${projectName}.`;
console.log(modernMessage);


// ==============================================================================
// 7. NUMBERS & ARITHMETIC OPERATORS
// ==============================================================================
let reportedCount = 10;
let resolvedCount = 4;

let totalSum = reportedCount + resolvedCount;        // Addition: 14
let activeIssues = reportedCount - resolvedCount;    // Subtraction: 6
let scaledEstimate = reportedCount * 2;              // Multiplication: 20
let halfCount = reportedCount / 2;                   // Division: 5
let remainder = reportedCount % 3;                   // Modulus (remainder): 1

console.log("Arithmetic Results:", { totalSum, activeIssues, scaledEstimate, halfCount, remainder });


// ==============================================================================
// 8. ASSIGNMENT OPERATORS
// ==============================================================================
let upvoteCounter = 20;

upvoteCounter += 5;   // Equivalent to: upvoteCounter = upvoteCounter + 5 (25)
console.log("After += 5:", upvoteCounter);

upvoteCounter -= 3;   // Equivalent to: upvoteCounter = upvoteCounter - 3 (22)
console.log("After -= 3:", upvoteCounter);

upvoteCounter *= 2;   // Equivalent to: upvoteCounter = upvoteCounter * 2 (44)
console.log("After *= 2:", upvoteCounter);


// ==============================================================================
// 9. COMPARISON OPERATORS (=== vs ==)
// ==============================================================================
// Comparison operators compare two values and return a boolean (true or false).
console.log("Is 10 > 5?", 10 > 5);                   // true
console.log("Is 10 < 5?", 10 < 5);                   // false
console.log("Is 10 >= 10?", 10 >= 10);               // true
console.log("Is 10 <= 9?", 10 <= 9);                 // false

// Strict Equality (===) vs Loose Equality (==):
// '===' checks BOTH value and data type without automatic type conversion (ALWAYS PREFERRED).
// '==' converts types automatically before comparing, which can cause unexpected bugs.
console.log("10 === 10 (Strict):", 10 === 10);         // true
console.log("10 === '10' (Strict):", 10 === "10");     // false (number vs string)
console.log("10 == '10' (Loose):", 10 == "10");       // true (loose coercion)
console.log("10 !== 5 (Strict Not Equal):", 10 !== 5); // true


// ==============================================================================
// 10. BASIC LOGICAL OPERATORS (&&, ||, !)
// ==============================================================================
// Logical AND (&&): Returns true ONLY IF both operands are true
const isVerified = true;
const isUrgent = false;
console.log("isVerified && isUrgent:", isVerified && isUrgent); // false

// Logical OR (||): Returns true IF AT LEAST ONE operand is true
console.log("isVerified || isUrgent:", isVerified || isUrgent); // true

// Logical NOT (!): Inverts the boolean value
console.log("!isVerified (NOT verified):", !isVerified);         // false
console.log("!isUrgent (NOT urgent):", !isUrgent);               // true


// ==============================================================================
// 11. BASIC TYPE CONVERSION
// ==============================================================================
// Explicitly converting data from one type to another.

// Converting String to Number:
const upvotesFromInput = "42";                     // String received from an HTML input
const numericUpvotes = Number(upvotesFromInput);    // Converted to Number
console.log("Converted Number:", numericUpvotes, typeof numericUpvotes);

// Converting Number to String:
const rating = 5;
const ratingString = String(rating);
console.log("Converted String:", ratingString, typeof ratingString);

// Converting to Boolean:
// In JS: 0, "", null, undefined, NaN are 'falsy'. Everything else is 'truthy'.
console.log("Boolean(1):", Boolean(1));            // true
console.log("Boolean(0):", Boolean(0));            // false
console.log("Boolean('Hello'):", Boolean("Hello"));// true
console.log("Boolean(''):", Boolean(""));          // false


// ==============================================================================
// 12. MINI CIVICFIX PRACTICE DATA & SUMMARY
// ==============================================================================
// Modeling sample civic complaint metadata using pure fundamentals:
const sampleCategory = "Pothole on Main Road";
let sampleUpvotes = 34;
let sampleSeverity = 4;
let isOfficialVerified = true;

const issueSummary = `CivicFix Issue: ${sampleCategory} | Upvotes: ${sampleUpvotes} | Severity: ${sampleSeverity}/5 | Verified: ${isOfficialVerified}`;
console.log(issueSummary);


// ==============================================================================
// 13. SIMPLE CALCULATION PRACTICE
// ==============================================================================
// Calculating a basic combined priority weight:
// Note: This is an introductory arithmetic exercise, NOT the final Smart Priority algorithm.
const baseWeight = sampleSeverity * 10;
const totalPriorityScore = baseWeight + sampleUpvotes;
console.log(`Initial Priority Score Calculation: ${totalPriorityScore}`);
console.log("Day 6 script execution finished cleanly.");
