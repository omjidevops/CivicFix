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


// ==============================================================================
// ==============================================================================
// DAY 7 — CONDITIONS AND LOOPS
// ==============================================================================
// ==============================================================================
console.log("\n--- Day 7: Conditions and Loops Initialized ---");


// ==============================================================================
// 1. IF, ELSE IF, AND ELSE STATEMENTS
// ==============================================================================
// Conditions allow our code to make decisions: "IF this is true, do X, ELSE do Y".

let issueSeverity = 5;

// IMPORTANT NOTE: This is an introductory JavaScript exercise,
// NOT the final CivicFix Smart Priority Algorithm.
if (issueSeverity >= 4) {
   console.log("Priority Level: Urgent attention required!");
} else if (issueSeverity >= 2) {
   console.log("Priority Level: Normal priority complaint.");
} else {
   console.log("Priority Level: Low priority complaint.");
}


// ==============================================================================
// 2. LOGICAL OPERATORS IN CONDITIONS (&&, ||, !)
// ==============================================================================
let citizenUpvotes = 25;
let isCitizenVerified = true;

// Logical AND (&&): Both conditions must be true
if (citizenUpvotes > 20 && isCitizenVerified) {
   console.log("High Community Impact: Complaint has > 20 upvotes AND verified citizen!");
}

// Logical OR (||): At least one condition must be true
let isHazardous = false;
if (isHazardous || issueSeverity >= 4) {
   console.log("Emergency Dispatch: Issue is hazardous OR severity is critical.");
}

// Nested If: A condition placed inside another condition
if (isCitizenVerified) {
   if (citizenUpvotes >= 20) {
      console.log("Nested Check: Citizen is verified, and upvotes exceed threshold.");
   }
}


// ==============================================================================
// 3. TERNARY OPERATOR (condition ? valueIfTrue : valueIfFalse)
// ==============================================================================
// A clean, one-line shortcut for simple if/else decisions.

// Example 1: Verification Badge Text
let userVerified = true;
let verificationBadge = userVerified ? "Verified Citizen" : "Unverified Citizen";
console.log(`Citizen Status: ${verificationBadge}`);

// Example 2: Access Check
let hasAdminRole = false;
let portalAccess = hasAdminRole ? "Access Granted to Municipal Portal" : "Access Denied";
console.log(`Portal Access: ${portalAccess}`);

// Example 3: Complaint State
let isResolved = false;
let statusMessage = isResolved ? "Resolved" : "Pending Investigation";
console.log(`Resolution Status: ${statusMessage}`);


// ==============================================================================
// 4. SWITCH STATEMENT
// ==============================================================================
// Use switch when comparing a single variable against multiple specific values.
// - 'case': Matches a specific value.
// - 'break': Stops code from falling through to the next case.
// - 'default': Runs if none of the cases match (like the final 'else').

let selectedCategory = "Road Damage";

switch (selectedCategory) {
   case "Road Damage":
      console.log("Assigned Department: Public Works & Road Department");
      break;

   case "Garbage":
      console.log("Assigned Department: Sanitation & Waste Management");
      break;

   case "Street Light":
      console.log("Assigned Department: Municipal Electricity Department");
      break;

   case "Water Supply":
      console.log("Assigned Department: Water Supply & Sewerage Board");
      break;

   default:
      console.log("Assigned Department: General Municipal Grievance Cell");
}


// ==============================================================================
// 5. FOR LOOP (Repetition with Known Count)
// ==============================================================================
// A loop repeats a block of code until a condition becomes false.
// Structure: for (initialization; condition; increment) { ... }
// 1. let i = 1      -> Starts counter at 1 (runs once at start).
// 2. i <= 5         -> Before each loop, checks if i is still <= 5.
// 3. i++            -> After each loop, adds 1 to i.

console.log("\n--- For Loop Demonstration ---");
for (let complaintNumber = 1; complaintNumber <= 5; complaintNumber++) {
   console.log(`Checking complaint #${complaintNumber}`);
}


// ==============================================================================
// 6. WHILE LOOP (Repetition While Condition Remains True)
// ==============================================================================
// Checks condition FIRST before executing the loop block.
// If the condition is false initially, the block will never run!
// IMPORTANT: You must increment the counter manually, or you get an infinite loop!

console.log("\n--- While Loop Demonstration ---");
let auditIndex = 1;

while (auditIndex <= 5) {
   console.log(`Processing audit for record #${auditIndex}`);
   auditIndex++; // Increment is essential to prevent infinite loop!
}


// ==============================================================================
// 7. DO...WHILE LOOP (Executes At Least Once)
// ==============================================================================
// Key Difference:
// 'while' checks the condition at the top (may run 0 times).
// 'do...while' runs the code block FIRST, then checks the condition at the bottom.
// Therefore, do...while is GUARANTEED to execute at least once!

console.log("\n--- Do...While Loop Demonstration ---");
let retryCount = 1;

do {
   console.log(`Dispatch check attempt #${retryCount}`);
   retryCount++;
} while (retryCount <= 3);


// ==============================================================================
// 8. LOOP CONTROL: break STATEMENT
// ==============================================================================
// 'break' immediately EXITS the loop entirely, ignoring any remaining iterations.

console.log("\n--- Break Statement Demonstration ---");
for (let id = 1; id <= 10; id++) {
   if (id === 5) {
      console.log(`Break triggered at complaint #${id}: Target found! Stopping search.`);
      break; // Stops the loop immediately!
   }
   console.log(`Inspecting complaint #${id}`);
}


// ==============================================================================
// 9. LOOP CONTROL: continue STATEMENT
// ==============================================================================
// 'continue' SKIPS the rest of the CURRENT iteration and jumps straight to the next one.

console.log("\n--- Continue Statement Demonstration ---");
for (let wardNumber = 1; wardNumber <= 5; wardNumber++) {
   if (wardNumber === 3) {
      console.log(`Ward #${wardNumber} is under maintenance. Skipping inspection!`);
      continue; // Skips the rest of ward 3, proceeds to ward 4!
   }
   console.log(`Inspecting facilities in Ward #${wardNumber}`);
}


// ==============================================================================
// 10. MINI CIVICFIX INTEGRATED PRACTICE
// ==============================================================================
// Putting it all together using variables, conditions, switch, and loops:
console.log("\n--- Mini CivicFix Integrated Practice ---");

let targetIssueSeverity = 4;
let targetIssueCategory = "Street Light";
let targetIssueVerified = true;

// 1. Severity Decision
if (targetIssueSeverity >= 4 && targetIssueVerified) {
   console.log("Status: High Priority Verified Incident.");
} else {
   console.log("Status: Standard Queue Incident.");
}

// 2. Department Assignment via Switch
switch (targetIssueCategory) {
   case "Street Light":
      console.log("Routing: Assigned to Electrical Division.");
      break;
   default:
      console.log("Routing: Assigned to General Intake.");
}

// 3. Batch Notification Simulation using a For Loop
console.log("Simulating batch notifications for nearby field officers:");
for (let officer = 1; officer <= 3; officer++) {
   console.log(`Officer ${officer}: SMS alert dispatched.`);
}

console.log("Day 7 script execution finished cleanly.");


// ==============================================================================
// ==============================================================================
// DAY 8 — JAVASCRIPT FUNCTIONS
// ==============================================================================
// ==============================================================================
console.log("\n--- Day 8: JavaScript Functions Initialized ---");


// ==============================================================================
// 1. WHAT IS A FUNCTION? (DECLARATION & CALLING)
// ==============================================================================
// A function is a reusable block of code designed to perform a specific task.
// Analogy: Like a vending machine button — once built, you can press it anytime!

// Defining / Declaring a function:
// Notice: Defining a function does NOT execute it yet!
function showWelcomeMessage() {
   console.log("Welcome to CivicFix — Municipal Redressal Portal!");
}

// Calling / Invoking / Executing the function:
// Putting () after the function name tells JavaScript: "RUN THIS CODE NOW!"
showWelcomeMessage();
showWelcomeMessage(); // Calling it a second time demonstrates reusability!


// ==============================================================================
// 2. FUNCTIONS WITH PARAMETERS AND ARGUMENTS
// ==============================================================================
// Parameter: The placeholder variable named inside the function definition ().
// Argument: The real value passed into the function when you call it.

function greetCitizen(name) {
   // 'name' is the PARAMETER (placeholder)
   console.log(`Welcome, ${name}! Thank you for keeping your city clean.`);
}

// "Om" and "Priya" are the ARGUMENTS (real data)
greetCitizen("Om");
greetCitizen("Priya");


// ==============================================================================
// 3. MULTIPLE PARAMETERS & ARGUMENT ORDER
// ==============================================================================
// Functions can accept multiple inputs separated by commas.
// IMPORTANT: Arguments are assigned to parameters in the EXACT order they are passed!

function showComplaintInfo(category, severity) {
   console.log(`Complaint Category: ${category}`);
   console.log(`Reported Severity Level: ${severity}/5`);
}

// Correct Order: (string, number)
showComplaintInfo("Road Damage", 5);

// If passed in the wrong order:
// showComplaintInfo(5, "Road Damage");
// -> Category: 5, Severity: Road Damage/5 (Logically incorrect!)


// ==============================================================================
// 4. THE return STATEMENT
// ==============================================================================
// 'return' stops the function and sends a calculated value BACK to where it was called.
// This allows you to store the result in a variable and use it elsewhere in your app.

function addNumbers(a, b) {
   return a + b; // Returns the sum back to the caller
}

// Step-by-step:
// 1. addNumbers(10, 20) is called.
// 2. 10 goes into a, 20 goes into b.
// 3. a + b calculates 30.
// 4. return 30 sends 30 back.
// 5. 'sumResult' captures and stores 30.
const sumResult = addNumbers(10, 20);
console.log("Returned Sum:", sumResult);


// ==============================================================================
// 5. console.log() VS return (CRITICAL DISTINCTION)
// ==============================================================================
// console.log() -> Only displays text on the screen for the developer to read.
// return        -> Actually produces a data value that other code can store and use!

function logCalculation(a, b) {
   console.log("Inside logCalculation:", a + b);
   // Returns undefined implicitly!
}

function returnCalculation(a, b) {
   return a + b; // Hands the answer to the caller!
}

const loggedValue = logCalculation(5, 5);       // Prints 10 to console, but...
console.log("Stored loggedValue:", loggedValue); // undefined! Cannot use it!

const returnedValue = returnCalculation(5, 5);  // Hands back 10
console.log("Stored returnedValue:", returnedValue * 2); // 20! Can be used in further math!


// ==============================================================================
// 6. INTRODUCTORY CIVICFIX PRIORITY FUNCTION
// ==============================================================================
// INTRODUCTORY PRACTICE ONLY:
// This is NOT the final CivicFix Smart Priority Algorithm.
// It is a simple arithmetic function to demonstrate parameter calculation.

function calculatePriority(severity, upvotes) {
   const baseScore = severity * 10;
   const finalScore = baseScore + upvotes;
   return finalScore;
}

const sampleScore1 = calculatePriority(4, 25); // (4 * 10) + 25 = 65
const sampleScore2 = calculatePriority(2, 5);  // (2 * 10) + 5  = 25
console.log(`Priority Score for Issue 1: ${sampleScore1}`);
console.log(`Priority Score for Issue 2: ${sampleScore2}`);


// ==============================================================================
// 7. FUNCTIONS COMBINED WITH CONDITIONS (if / else if / else)
// ==============================================================================
// Functions frequently evaluate logic and return different values.

function checkSeverity(severity) {
   if (severity >= 4) {
      return "Urgent";
   } else if (severity >= 2) {
      return "Normal";
   } else {
      return "Low";
   }
}

console.log("Severity 5 is:", checkSeverity(5)); // Urgent
console.log("Severity 3 is:", checkSeverity(3)); // Normal
console.log("Severity 1 is:", checkSeverity(1)); // Low


// ==============================================================================
// 8. FUNCTIONS COMBINED WITH LOOPS
// ==============================================================================
// Functions can wrap and trigger repetitive tasks whenever needed.

function showComplaintNumbers() {
   console.log("Listing recent complaint queue sequence:");
   for (let i = 1; i <= 5; i++) {
      console.log(`Complaint #${i}`);
   }
}

showComplaintNumbers();


// ==============================================================================
// 9. DEFAULT PARAMETERS
// ==============================================================================
// Default parameters provide a fallback value if the caller leaves an argument blank.

function reportIssue(category = "General") {
   console.log(`Issue Category Filed: ${category}`);
}

reportIssue();             // No argument passed -> Uses default: "General"
reportIssue("Water Leak"); // Argument passed    -> Overrides default with "Water Leak"


// ==============================================================================
// 10. SCOPE: GLOBAL VS. LOCAL (FUNCTION) SCOPE
// ==============================================================================
// Scope determines WHERE a variable can be seen and accessed in your code.

// Global Variable: Declared outside of any function. Visible EVERYWHERE!
const platformName = "CivicFix";

function showPlatformScope() {
   // Local Variable: Declared INSIDE this function.
   // Visible ONLY inside this function!
   const localMessage = "Smart Civic Platform";

   console.log("Inside function - Global variable:", platformName);
   console.log("Inside function - Local variable:", localMessage);
}

showPlatformScope();

// Trying to access 'localMessage' outside its function would throw:
// ReferenceError: localMessage is not defined!


// ==============================================================================
// 11. FUNCTION EXPRESSIONS
// ==============================================================================
// In JavaScript, a function can be created and stored directly inside a variable!

// Function Declaration:
// function greet() {}

// Function Expression:
const greetUser = function (name) {
   console.log(`Hello, ${name}! (From Function Expression)`);
};

greetUser("Citizen");


// ==============================================================================
// 12. ARROW FUNCTIONS (ES6 MODERN SYNTAX)
// ==============================================================================
// Arrow functions provide a shorter, modern way to write functions using '=>'.

// Standard Arrow Function with code block:
const addArrow = (a, b) => {
   return a + b;
};
console.log("Arrow function sum:", addArrow(5, 10));

// Concise / One-line Arrow Function:
// If the function only has one return expression, you can OMIT the {} and the 'return' keyword!
const multiplyArrow = (a, b) => a * b;
console.log("Concise arrow function multiplication:", multiplyArrow(6, 7));

console.log("Day 8 script execution finished cleanly.");


// ==============================================================================
// ==============================================================================
// DAY 9 — JAVASCRIPT ARRAYS
// ==============================================================================
// ==============================================================================
console.log("\n--- Day 9: JavaScript Arrays Initialized ---");


// ==============================================================================
// 1. WHAT IS AN ARRAY?
// ==============================================================================
// An array is an ordered collection that allows storing multiple values inside a SINGLE variable.
// Analogy: Like an egg carton or a row of numbered lockers where each compartment holds an item.

// Creating an array using square brackets []:
const categories = [
   "Road Damage",
   "Garbage",
   "Street Light"
];
console.log("All Categories:", categories);


// ==============================================================================
// 2 & 3. 0-BASED INDEXING & READING VALUES
// ==============================================================================
// In JavaScript, array positions (indexes) ALWAYS start at 0!
// First element  -> index 0
// Second element -> index 1
// Third element  -> index 2

console.log("First Category (index 0):", categories[0]);  // "Road Damage"
console.log("Second Category (index 1):", categories[1]); // "Garbage"
console.log("Third Category (index 2):", categories[2]);  // "Street Light"

// Accessing an invalid or out-of-range index returns 'undefined':
console.log("Non-existent index 99:", categories[99]);    // undefined


// ==============================================================================
// 4. UPDATING ARRAY VALUES (ARRAYS ARE MUTABLE)
// ==============================================================================
// Even when declared with 'const', the elements INSIDE an array can be updated/reassigned.

console.log("Before update:", categories[1]); // "Garbage"
categories[1] = "Water Supply";               // Replacing index 1
console.log("After update:", categories[1]);  // "Water Supply"


// ==============================================================================
// 5. ARRAY LENGTH (.length PROPERTY)
// ==============================================================================
// .length tells you the total count of elements inside the array.

console.log("Total count of categories:", categories.length); // 3

// Quick tip: The last element is always at index: array.length - 1
console.log("Last item via length - 1:", categories[categories.length - 1]);


// ==============================================================================
// 6. ADDING & REMOVING FROM THE END: push() AND pop()
// ==============================================================================
const complaintCategories = ["Road Damage", "Garbage"];
console.log("Initial categories:", complaintCategories);

// push() adds one or more items to the END of the array:
complaintCategories.push("Street Light");
console.log("After push('Street Light'):", complaintCategories);

// pop() removes the LAST item from the array and returns it:
const removedLast = complaintCategories.pop();
console.log("Removed item with pop():", removedLast);
console.log("After pop():", complaintCategories);


// ==============================================================================
// 7. ADDING & REMOVING FROM THE BEGINNING: unshift() AND shift()
// ==============================================================================
// Visual Summary:
// [ unshift() ──▶ [ item 0 , item 1 , item 2 ] ──▶ push() ]
// [ ◀── shift()   [ item 0 , item 1 , item 2 ] ◀── pop()  ]

const dispatchQueue = ["Complaint #101", "Complaint #102"];

// unshift() adds an item to the VERY FRONT (index 0), shifting existing items right:
dispatchQueue.unshift("Urgent Complaint #100");
console.log("After unshift (added to front):", dispatchQueue);

// shift() removes the FIRST item (index 0) and shifts all remaining items left:
const processedItem = dispatchQueue.shift();
console.log("Processed item with shift():", processedItem);
console.log("After shift():", dispatchQueue);


// ==============================================================================
// 8. COMBINING LOOPS WITH ARRAYS
// ==============================================================================
// We can use a 'for' loop to visit every single item in an array automatically.
// Notice: We start at let i = 0, and stop when i < array.length.

const activeIssuesList = [
   "Road Damage",
   "Garbage",
   "Street Light",
   "Water Supply"
];

console.log("\n--- Looping Through Categories ---");
for (let i = 0; i < activeIssuesList.length; i++) {
   // In each round, i is 0, 1, 2, 3...
   // activeIssuesList[i] gives the item at that position!
   console.log(`Category #${i + 1}: ${activeIssuesList[i]}`);
}


// ==============================================================================
// 9. SEARCHING: includes()
// ==============================================================================
// includes() checks if an element exists in the array and returns true or false.

console.log("Does array include 'Garbage'?", activeIssuesList.includes("Garbage")); // true
console.log("Does array include 'Flooding'?", activeIssuesList.includes("Flooding")); // false


// ==============================================================================
// 10. SEARCHING: indexOf()
// ==============================================================================
// indexOf() returns the INDEX where the item is located.
// If the item does NOT exist, it returns -1!

const garbageIndex = activeIssuesList.indexOf("Garbage");
console.log("Index of 'Garbage':", garbageIndex); // 1

const missingIndex = activeIssuesList.indexOf("Flooding");
console.log("Index of 'Flooding' (not found):", missingIndex); // -1


// ==============================================================================
// 11. SUBSETS: slice(startIndex, endIndex)
// ==============================================================================
// slice() extracts a portion of an array and returns a NEW array.
// IMPORTANT:
// 1. The ending index is EXCLUDED (not included in the result).
// 2. The original array is NOT modified (non-destructive).

const allIssueTypes = [
   "Road Damage",   // index 0
   "Garbage",       // index 1
   "Street Light",  // index 2
   "Water Supply",  // index 3
   "Drainage"       // index 4
];

// Takes elements from index 1 up to (but not including) index 3:
const slicedSubset = allIssueTypes.slice(1, 3); // grabs index 1 and 2
console.log("Sliced portion (index 1 to 3):", slicedSubset); // ["Garbage", "Street Light"]
console.log("Original array remains unchanged:", allIssueTypes.length); // 5


// ==============================================================================
// 12. MODIFYING: splice(startIndex, deleteCount)
// ==============================================================================
// splice() alters the ORIGINAL array directly by removing, adding, or replacing items.

const mutableIssues = ["Road Damage", "Garbage", "Street Light", "Drainage"];
console.log("Before splice:", mutableIssues);

// splice(1, 1) -> Starting at index 1, delete 1 item ("Garbage")
const deletedItems = mutableIssues.splice(1, 1);
console.log("Deleted items from splice:", deletedItems);
console.log("After splice (original modified!):", mutableIssues);


// ==============================================================================
// 13. slice() VS splice() — THE GOLDEN RULE
// ==============================================================================
// slice()  -> NON-DESTRUCTIVE: Leaves original array alone, returns a clean copy.
// splice() -> DESTRUCTIVE: Modifies and mutates the original array in place!


// ==============================================================================
// 14. CIVICFIX ARRAY PRACTICE (CIVIC DATA LISTS)
// ==============================================================================
// Modeling civic platform lists without objects:

// 1. Complaint Statuses
const complaintStatuses = ["Pending", "In Progress", "Resolved", "Verified"];
console.log("Available CivicFix Statuses:", complaintStatuses);

// 2. Municipal Department Names
const municipalDepartments = [
   "Road Department",
   "Sanitation Department",
   "Electricity Department",
   "Water Department"
];
console.log("Municipal Departments count:", municipalDepartments.length);

// 3. Upvote Counts
const upvoteCounts = [15, 34, 8, 42, 19];
console.log("First issue upvotes:", upvoteCounts[0]);
console.log("Last issue upvotes:", upvoteCounts[upvoteCounts.length - 1]);


// ==============================================================================
// 15. FUNCTIONS + ARRAYS INTEGRATION
// ==============================================================================
// Arrays can be passed directly into functions as arguments!

function showCategories(categoriesList) {
   console.log(`--- Displaying ${categoriesList.length} Categories via Function ---`);
   for (let i = 0; i < categoriesList.length; i++) {
      console.log(`- ${categoriesList[i]}`);
   }
}

// Calling the function with our array:
showCategories(municipalDepartments);

console.log("Day 9 script execution finished cleanly.");

