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


// ==============================================================================
// DAY 10 — JAVASCRIPT OBJECTS
// ==============================================================================
// In Day 9, we learned that an array is an ordered list of items (e.g. ["Road", "Garbage"]).
// An OBJECT, however, represents a SINGLE entity by describing it with named properties!
// Real-world analogy: A citizen ID card or a municipal complaint file folder has labeled
// fields: Name, Category, Severity, Status, etc.

console.log("\n--- Day 10: JavaScript Objects Initialized ---");

// ==============================================================================
// 1 & 2. CREATING AN OBJECT & KEY-VALUE PAIRS
// ==============================================================================
// Syntax: { key: value, key: value }
// 'key' is the label/property name, 'value' is the data stored inside.

const complaint = {
   category: "Road Damage",  // key: "category", value: "Road Damage" (string)
   severity: 5,              // key: "severity", value: 5 (number)
   upvotes: 25,              // key: "upvotes",  value: 25 (number)
   verified: true            // key: "verified", value: true (boolean)
};

console.log("Full Complaint Object:", complaint);


// ==============================================================================
// 3. ACCESSING PROPERTIES WITH DOT NOTATION
// ==============================================================================
// Dot notation (object.property) is the standard and most readable way to access values:

console.log("Category (dot notation):", complaint.category);
console.log("Severity (dot notation):", complaint.severity);
console.log("Upvotes (dot notation):", complaint.upvotes);
console.log("Verified (dot notation):", complaint.verified);


// ==============================================================================
// 4. ACCESSING PROPERTIES WITH BRACKET NOTATION
// ==============================================================================
// Bracket notation (object["property"]) uses a string inside square brackets.
// Useful when property names contain spaces, special characters, or come from variables.

console.log("Category (bracket notation):", complaint["category"]);
console.log("Severity (bracket notation):", complaint["severity"]);


// ==============================================================================
// 5. UPDATING PROPERTIES (OBJECTS ARE MUTABLE)
// ==============================================================================
// Even when declared with 'const', you can change the properties INSIDE the object:

complaint.severity = 4;
complaint.upvotes = 30;

console.log("Updated Severity:", complaint.severity); // 4
console.log("Updated Upvotes:", complaint.upvotes);   // 30


// ==============================================================================
// 6. ADDING NEW PROPERTIES
// ==============================================================================
// If a property does not exist yet, assigning a value creates it on the fly:

complaint.status = "Pending";
complaint.department = "Road Department";

console.log("Added Status:", complaint.status);
console.log("Added Department:", complaint.department);


// ==============================================================================
// 7. DELETING PROPERTIES
// ==============================================================================
// The 'delete' keyword removes a property entirely from an object:

delete complaint.department;
console.log("After deleting department:", complaint.department); // undefined


// ==============================================================================
// 8. DIFFERENT DATA TYPES INSIDE AN OBJECT
// ==============================================================================
// An object can hold any data type: strings, numbers, booleans, and null:

const diverseComplaint = {
   category: "Street Light",  // String
   severity: 3,               // Number
   verified: true,            // Boolean
   resolutionPhoto: null      // Null (represents intentional absence of a photo yet)
};

console.log("Diverse Complaint Object:", diverseComplaint);


// ==============================================================================
// 9. OBJECTS WITH CONDITIONS (DAY 7 INTEGRATION)
// ==============================================================================
// We can inspect object properties to make intelligent decisions:

if (complaint.verified) {
   console.log("Status: Complaint is verified by community members.");
}

if (complaint.severity >= 4) {
   console.log("Priority Alert: Urgent complaint requires immediate field dispatch!");
} else {
   console.log("Standard Priority: Scheduled for routine municipal inspection.");
}


// ==============================================================================
// 10. OBJECTS WITH FUNCTIONS (DAY 8 INTEGRATION)
// ==============================================================================
// An entire object can be passed into a function as an argument:

function showComplaint(complaintObj) {
   console.log(`[Summary] Category: ${complaintObj.category} | Severity: ${complaintObj.severity}/5 | Status: ${complaintObj.status}`);
}

showComplaint(complaint);


// ==============================================================================
// 11. BASIC OBJECT METHOD CONCEPT (FUNCTION INSIDE AN OBJECT)
// ==============================================================================
// When a function is stored as a property value of an object, it is called a METHOD.
// (Note: We keep this simple and do NOT introduce the 'this' keyword yet.)
// We use 'citizenUser' to avoid variable collision with the Day 6 'citizen' string:
const citizenUser = {
   name: "Citizen Om",
   introduce: function () {
      console.log("Hello from CivicFix citizen portal.");
   }
};

citizenUser.introduce(); // Calling the method on the object


// ==============================================================================
// 12. NESTED OBJECTS (OBJECTS INSIDE OBJECTS)
// ==============================================================================
// An object property can hold another object to group related sub-data together:

const nestedComplaint = {
   category: "Road Damage",
   location: {
      city: "Kanpur",
      area: "Main Road"
   }
};

// Accessing nested properties using chained dot notation:
console.log("Complaint City (nested):", nestedComplaint.location.city);
console.log("Complaint Area (nested):", nestedComplaint.location.area);


// ==============================================================================
// 13. ARRAY OF OBJECTS (CRITICAL CIVICFIX PATTERN)
// ==============================================================================
// In CivicFix, we have MULTIPLE complaints. Each complaint is an object,
// and all complaints are stored together in an ARRAY!

const complaintsList = [
   {
      category: "Road Damage",
      severity: 5
   },
   {
      category: "Garbage",
      severity: 3
   },
   {
      category: "Street Light",
      severity: 4
   }
];

console.log("\n--- Looping Through Array of Complaint Objects ---");
for (let i = 0; i < complaintsList.length; i++) {
   // complaintsList[i] is ONE complaint object!
   console.log(`Complaint #${i + 1} -> Category: ${complaintsList[i].category}, Severity: ${complaintsList[i].severity}`);
}


// ==============================================================================
// 14. CIVICFIX COMPLAINT OBJECT (LEARNING MODEL)
// ==============================================================================
// A realistic model of a complete CivicFix report (JavaScript learning model):

const civicFixComplaint = {
   id: 101,
   category: "Road Damage",
   description: "Large pothole near main road",
   severity: 5,
   upvotes: 25,
   verified: true,
   status: "Pending"
};

console.log("\n--- CivicFix Official Complaint Learning Model ---");
console.log("Issue ID:", civicFixComplaint.id);
console.log("Category:", civicFixComplaint.category);
console.log("Description:", civicFixComplaint.description);
console.log("Severity:", civicFixComplaint.severity);
console.log("Upvotes:", civicFixComplaint.upvotes);
console.log("Verified:", civicFixComplaint.verified);
console.log("Status:", civicFixComplaint.status);

console.log("Day 10 script execution finished cleanly.");


// ==============================================================================
// DAY 11 — JAVASCRIPT DOM AND EVENTS
// ==============================================================================
// The DOM (Document Object Model) is a tree-like representation of our HTML page
// created by the browser. Through the DOM, JavaScript can:
// 1. Find elements on the page (select).
// 2. Read and change text, attributes, and styles (modify).
// 3. Listen to user actions like clicks and typing (events).
// 4. Create and add new elements on the fly (dynamic UI).

console.log("\n--- Day 11: JavaScript DOM & Events Initialized ---");

// Check if running in a browser environment with a DOM:
if (typeof document !== "undefined") {

   // 1 & 2. THE document OBJECT
   // 'document' is the root object provided by the browser that represents the entire webpage.
   console.log("Document Object:", document);

   // 3. SELECTING BY ID: getElementById()
   // Finds a unique element matching the exact id (without any '#' symbol):
   const pageTitleEl = document.getElementById("pageTitle");
   console.log("getElementById('pageTitle'):", pageTitleEl);

   // 4. SELECTING BY CSS SELECTOR: querySelector()
   // Uses CSS selectors: '#' for IDs, '.' for classes, or tag names:
   const brandTitleQuery = document.querySelector("#pageTitle");
   const heroSectionQuery = document.querySelector(".hero-section");
   const firstHeading = document.querySelector("h1");
   console.log("querySelector('#pageTitle'):", brandTitleQuery);

   // 5. SELECTING MULTIPLE ELEMENTS: querySelectorAll()
   // Returns a collection of all matching elements (like an array of elements):
   const allIssueCards = document.querySelectorAll(".issue-card");
   console.log(`Found ${allIssueCards.length} issue cards on the page with querySelectorAll('.issue-card').`);

   // 6. READING & CHANGING TEXT: textContent
   // .textContent reads or writes pure, unformatted plain text safely:
   const greetingPreview = document.querySelector("#greetingPreview");
   if (greetingPreview) {
      console.log("Initial greeting textContent:", greetingPreview.textContent);
   }

   // 7. HTML MODIFICATION: innerHTML & SECURITY WARNING
   // .innerHTML parses and injects HTML markup tags (e.g. <strong>):
   // IMPORTANT SECURITY RULE: Never inject untrusted user input directly into innerHTML!
   // (Untrusted input inside innerHTML can lead to Cross-Site Scripting / XSS).
   // Always use .textContent when displaying user-entered strings!

   // 8. FORM INPUT VALUE: .value
   // .value reads the current text typed by the user inside an <input>, <select>, or <textarea>.
   const citizenNameInput = document.querySelector("#citizenName");
   const issueCategorySelect = document.querySelector("#issueCategory");
   const descriptionInput = document.querySelector("#description");

   // 9. INLINE STYLES: element.style
   // JavaScript can inspect or modify inline CSS properties (in camelCase):
   const previewBox = document.querySelector("#previewBox");
   if (previewBox) {
      previewBox.style.transition = "all 0.3s ease";
   }

   // 10. MANAGING CLASSES: classList (add, remove, toggle)
   // Much cleaner and more maintainable than modifying multiple inline styles:
   // element.classList.add("active");
   // element.classList.remove("active");
   // element.classList.toggle("active");

   // 11, 12 & 13. CREATING, APPENDING & REMOVING ELEMENTS
   // createElement() creates a detached element in memory.
   // appendChild() attaches it to the visible DOM tree.
   // remove() deletes it from the DOM.
   const demoNotification = document.createElement("p");
   demoNotification.textContent = "CivicFix Live Notification System Initialized.";
   demoNotification.style.fontSize = "0.85rem";
   demoNotification.style.color = "#0f766e";
   // Attach to preview box:
   if (previewBox) {
      previewBox.appendChild(demoNotification);
      // Remove it after demonstration so it doesn't clutter:
      setTimeout(function () {
         demoNotification.remove();
      }, 4000);
   }

   // 14 & 15. EVENTS & addEventListener()
   // An EVENT is a signal that something occurred (e.g. click, key press, submit).
   // addEventListener(eventType, callbackFunction) listens for that signal and triggers code!

   // 16. CLICK EVENT DEMONSTRATION
   const quickTestBtn = document.querySelector("#quickTestBtn");
   if (quickTestBtn) {
      let clickCount = 0;
      quickTestBtn.addEventListener("click", function () {
         clickCount++;
         console.log(`Quick Test Button clicked ${clickCount} time(s)!`);
         quickTestBtn.textContent = `Clicked (${clickCount})`;
         quickTestBtn.classList.toggle("btn-primary");
      });
   }

   // 17. INPUT EVENT DEMONSTRATION (REAL-TIME AS USER TYPES)
   if (citizenNameInput && greetingPreview) {
      citizenNameInput.addEventListener("input", function () {
         const enteredName = citizenNameInput.value.trim();
         if (enteredName === "") {
            greetingPreview.textContent = "Welcome, Citizen! Type your name below.";
         } else {
            // Using textContent for 100% safe rendering of user input:
            greetingPreview.textContent = `Welcome, Citizen ${enteredName}! Thank you for participating.`;
         }
      });
   }

   // 18. CHANGE EVENT DEMONSTRATION (SELECT DROPDOWN)
   const categoryPreview = document.querySelector("#categoryPreview");
   if (issueCategorySelect && categoryPreview) {
      issueCategorySelect.addEventListener("change", function () {
         const selectedCategory = issueCategorySelect.value;
         if (selectedCategory === "") {
            categoryPreview.textContent = "Selected Category: None";
         } else {
            categoryPreview.textContent = `Selected Category: ${selectedCategory}`;
         }
      });
   }

   // 19 & 20. SUBMIT EVENT & event.preventDefault()
   // By default, submitting an HTML form sends an HTTP GET/POST and reloads the webpage.
   // event.preventDefault() stops the reload so JavaScript can handle the interaction seamlessly!
   const reportForm = document.querySelector("#reportForm");
   const demoFeedback = document.querySelector("#demoFeedback");

   if (reportForm) {
      reportForm.addEventListener("submit", function (event) {
         // Stop page from reloading/navigating:
         event.preventDefault();

         // Read values from form inputs:
         const nameVal = citizenNameInput ? citizenNameInput.value.trim() : "Citizen";
         const categoryVal = issueCategorySelect ? issueCategorySelect.value : "General";
         const descVal = descriptionInput ? descriptionInput.value.trim() : "No description provided.";

         console.log("--- Demo Report Submitted ---");
         console.log("Name:", nameVal);
         console.log("Category:", categoryVal);
         console.log("Description:", descVal);

         // Display feedback safely on the webpage:
         if (demoFeedback) {
            demoFeedback.style.display = "block";
            // Set textContent to avoid XSS:
            demoFeedback.textContent = `Thank you, ${nameVal}. Your "${categoryVal}" report has been received as a demo.`;
         }

         // Reset form fields:
         reportForm.reset();
         if (greetingPreview) {
            greetingPreview.textContent = "Welcome, Citizen! Type your name below.";
         }
         if (categoryPreview) {
            categoryPreview.textContent = "Selected Category: None";
         }
      });
   }

} else {
   console.log("Note: DOM and event listeners require a web browser environment (frontend/index.html).");
}

console.log("Day 11 script execution finished cleanly.");


// ==============================================================================
// DAY 12 — ASYNC JS, JSON & APIs
// ==============================================================================
// In Days 1–11, our code executed synchronously (line-by-line) and interacted only
// with the local browser DOM. In real production applications like CivicFix,
// frontend web apps need to communicate with remote backend servers (APIs)
// over the internet using asynchronous HTTP requests and JSON data formats!

console.log("\n--- Day 12: Async JavaScript, JSON & APIs Initialized ---");

// ==============================================================================
// STEP 1 — SYNCHRONOUS JAVASCRIPT
// ==============================================================================
// Synchronous code runs strictly line-by-line, in sequential order.
// Each line must finish before the next line can start:

console.log("\n[Step 1: Synchronous Execution]");
console.log("Synchronous Step 1: Initializing civic configuration");
console.log("Synchronous Step 2: Validating citizen session");
console.log("Synchronous Step 3: Interface rendered successfully");


// ==============================================================================
// STEP 2 — ASYNCHRONOUS JAVASCRIPT & setTimeout()
// ==============================================================================
// Why is asynchronous code needed?
// If a network request takes 3 seconds to get data from a server, synchronous code
// would FREEZE the entire browser (buttons couldn't be clicked, scrolling would stop!).
// Asynchronous code allows slow tasks to run in the background while the rest of
// the webpage continues running smoothly:

console.log("\n[Step 2: Asynchronous Execution with setTimeout]");
console.log("Async Demo: Start");

// setTimeout schedules a task to run after a specified delay (in milliseconds):
setTimeout(() => {
   console.log("Async Demo: Data received from remote server (after 2000ms delay)");
}, 2000);

console.log("Async Demo: End (Executed immediately without waiting for the 2s timer!)");


// ==============================================================================
// STEP 3 — CALLBACK FUNCTIONS
// ==============================================================================
// A callback is simply a function passed as an argument to another function,
// which is invoked once the background task finishes:

function fetchSimulatedIssue(callback) {
   setTimeout(() => {
      const sampleData = { id: 101, category: "Road Damage", status: "Pending" };
      callback(sampleData);
   }, 300);
}

fetchSimulatedIssue((data) => {
   console.log("[Step 3: Callback Received]:", data.category, `(Status: ${data.status})`);
});


// ==============================================================================
// STEP 4 — PROMISES (.then, .catch, .finally)
// ==============================================================================
// A Promise represents an eventual completion (or failure) of an asynchronous operation.
// A Promise has 3 states:
// 1. Pending: Initial state, operation still in progress.
// 2. Fulfilled (Resolved): Operation completed successfully.
// 3. Rejected: Operation failed with an error.

function checkWardInspection(wardId) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         if (wardId > 0) {
            resolve(`Ward #${wardId} inspection report verified.`);
         } else {
            reject("Invalid Ward ID provided: must be greater than 0.");
         }
      }, 400);
   });
}

// Consuming the promise using .then(), .catch(), and .finally():
checkWardInspection(104)
   .then((message) => {
      console.log("[Step 4: Promise Fulfilled]:", message);
   })
   .catch((error) => {
      console.error("[Step 4: Promise Rejected]:", error);
   })
   .finally(() => {
      console.log("[Step 4: Promise Finally]: Ward inspection promise settled.");
   });


// ==============================================================================
// STEP 5 — ASYNC / AWAIT & TRY...CATCH
// ==============================================================================
// 'async/await' is modern syntactic sugar built on top of Promises.
// It allows asynchronous code to be written and read just like synchronous code:

async function inspectWardAsync(wardId) {
   try {
      console.log(`[Step 5: async/await]: Awaiting inspection for Ward #${wardId}...`);
      const result = await checkWardInspection(wardId);
      console.log("[Step 5: async/await Success]:", result);
   } catch (err) {
      console.error("[Step 5: async/await Error caught]:", err);
   }
}

inspectWardAsync(105);


// ==============================================================================
// STEP 6 — JSON (JavaScript Object Notation)
// ==============================================================================
// JSON is a lightweight text-based data format used for exchanging data between
// frontend clients and backend servers.
// - JSON.stringify(): Converts a JavaScript Object -> JSON String (for sending over HTTP)
// - JSON.parse(): Converts a JSON String -> JavaScript Object (for reading in JavaScript)

const sampleComplaintObject = {
   id: 101,
   category: "Road Damage",
   severity: 5,
   status: "Pending"
};

// 1. Convert Object to JSON String:
const complaintJsonString = JSON.stringify(sampleComplaintObject);
console.log("\n[Step 6: JSON Serialization]");
console.log("Original JS Object:", sampleComplaintObject);
console.log("JSON.stringify() String:", complaintJsonString);

// 2. Convert JSON String back to Object:
const parsedBackObject = JSON.parse(complaintJsonString);
console.log("JSON.parse() Object Category:", parsedBackObject.category);


// ==============================================================================
// STEP 7 & 8 — HTTP BASICS, METHODS & STATUS CODES
// ==============================================================================
// HTTP (Hypertext Transfer Protocol) governs request-response communication:
//
// 1. Standard HTTP Methods (CRUD operations):
// - GET:    Retrieve data from the server (e.g. GET /api/complaints)
// - POST:   Create new data on the server (e.g. POST /api/complaints)
// - PUT:    Replace/update an entire record (e.g. PUT /api/complaints/101)
// - PATCH:  Partially update a record (e.g. PATCH /api/complaints/101/status)
// - DELETE: Remove a record from the server (e.g. DELETE /api/complaints/101)
//
// 2. Standard HTTP Status Codes:
// - 200 OK: Request succeeded (e.g. complaint list loaded).
// - 201 Created: New resource successfully created (e.g. new complaint filed).
// - 400 Bad Request: Invalid input data sent by the client.
// - 401 Unauthorized: User is not authenticated/logged in.
// - 403 Forbidden: User is logged in but lacks permissions (e.g. citizen accessing admin tools).
// - 404 Not Found: Requested resource does not exist (e.g. complaint #999 not found).
// - 500 Internal Server Error: Server crashed or encountered an unexpected backend failure.


// ==============================================================================
// STEP 9 — ARCHITECTURAL BRIDGE: CIVICFIX FRONTEND TO FUTURE SPRING BOOT BACKEND
// ==============================================================================
// How CivicFix will communicate in future full-stack stages:
//
// Citizen Browser (HTML/JS/React)
//       │  1. Sends HTTP Request (fetch with JSON body)
//       ▼
// Spring Boot REST Controller (@RestController @PostMapping("/api/complaints"))
//       │  2. Validates business logic
//       ▼
// Service Layer (@Service ComplaintService)
//       │  3. Processes database operations
//       ▼
// Data Repository (@Repository ComplaintRepository / Spring Data JPA)
//       │  4. Runs SQL queries
//       ▼
// MySQL Database (Stores complaints permanently)
//       │  5. Returns query results
//       ▼
// Spring Boot sends HTTP Response (201 Created + JSON payload)
//       │  6. Browser receives response
//       ▼
// JavaScript updates UI dynamically on the screen!


// ==============================================================================
// STEP 10, 11, 12 & 13 — LIVE BROWSER DOM FETCH INTEGRATION (GET & POST)
// ==============================================================================
// Only runs in browser environments where 'document' exists:
if (typeof document !== "undefined") {

   // ---------------------------------------------------------------------------
   // Part A: GET Request Demonstration (Loading Sample Data)
   // ---------------------------------------------------------------------------
   const loadSampleBtn = document.querySelector("#loadSampleBtn");
   const apiLoadingIndicator = document.querySelector("#apiLoadingIndicator");
   const apiResultDisplay = document.querySelector("#apiResultDisplay");
   const apiResultId = document.querySelector("#apiResultId");
   const apiResultTitle = document.querySelector("#apiResultTitle");
   const apiResultBody = document.querySelector("#apiResultBody");
   const apiErrorDisplay = document.querySelector("#apiErrorDisplay");

   if (loadSampleBtn) {
      loadSampleBtn.addEventListener("click", async function() {
         console.log("Initiating GET request to practice API...");

         // 1. Set Loading State:
         if (apiLoadingIndicator) apiLoadingIndicator.style.display = "block";
         if (apiResultDisplay) apiResultDisplay.style.display = "none";
         if (apiErrorDisplay) apiErrorDisplay.style.display = "none";
         loadSampleBtn.disabled = true;
         loadSampleBtn.textContent = "Loading...";

         try {
            // 2. Perform GET fetch request using public practice API:
            const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

            // Check if HTTP response status is OK (200-299):
            if (!response.ok) {
               throw new Error(`Server returned HTTP status ${response.status}: ${response.statusText}`);
            }

            // 3. Parse JSON response:
            const postData = await response.json();
            console.log("GET API Response received:", postData);

            // 4. Update UI with Success State (using safe textContent):
            if (apiResultId) apiResultId.textContent = `ID: #${postData.id}`;
            if (apiResultTitle) apiResultTitle.textContent = postData.title;
            if (apiResultBody) apiResultBody.textContent = postData.body;
            if (apiResultDisplay) apiResultDisplay.style.display = "block";

         } catch (error) {
            console.error("GET API Error caught:", error);
            // 5. Update UI with Error State:
            if (apiErrorDisplay) {
               apiErrorDisplay.style.display = "block";
               apiErrorDisplay.textContent = `Failed to load sample complaint: ${error.message}. Please check your connection and try again.`;
            }
         } finally {
            // 6. Reset Loading State:
            if (apiLoadingIndicator) apiLoadingIndicator.style.display = "none";
            loadSampleBtn.disabled = false;
            loadSampleBtn.textContent = "Load Sample Complaint";
         }
      });
   }

   // ---------------------------------------------------------------------------
   // Part B: POST Request Demonstration (Submitting Practice Issue)
   // ---------------------------------------------------------------------------
   const apiPostForm = document.querySelector("#apiPostForm");
   const postTitleInput = document.querySelector("#postTitleInput");
   const postBodyInput = document.querySelector("#postBodyInput");
   const submitPostBtn = document.querySelector("#submitPostBtn");
   const postFeedback = document.querySelector("#postFeedback");

   if (apiPostForm) {
      apiPostForm.addEventListener("submit", async function(event) {
         // Stop native form reload:
         event.preventDefault();

         const titleVal = postTitleInput ? postTitleInput.value.trim() : "";
         const bodyVal = postBodyInput ? postBodyInput.value.trim() : "";

         if (!titleVal || !bodyVal) return;

         // Set Loading state on submit button:
         if (submitPostBtn) {
            submitPostBtn.disabled = true;
            submitPostBtn.textContent = "Sending POST...";
         }
         if (postFeedback) postFeedback.style.display = "none";

         // Create JavaScript Object representing the issue:
         const newIssuePayload = {
            title: titleVal,
            body: bodyVal,
            userId: 1 // Practice API user identifier
         };

         try {
            console.log("Sending POST request with JSON payload:", newIssuePayload);

            // Send POST request via fetch():
            const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json; charset=UTF-8"
               },
               body: JSON.stringify(newIssuePayload) // Convert JS Object -> JSON String
            });

            if (!postResponse.ok) {
               throw new Error(`HTTP Error ${postResponse.status}: ${postResponse.statusText}`);
            }

            const createdRecord = await postResponse.json();
            console.log("POST Response received from server:", createdRecord);

            // Display Success Feedback safely:
            if (postFeedback) {
               postFeedback.style.display = "block";
               postFeedback.className = "api-status-box api-success";
               postFeedback.textContent = `Success! Practice issue registered on server with simulated ID: #${createdRecord.id}. Title: "${createdRecord.title}"`;
            }

            // Reset form fields:
            apiPostForm.reset();

         } catch (error) {
            console.error("POST API Error caught:", error);
            if (postFeedback) {
               postFeedback.style.display = "block";
               postFeedback.className = "api-status-box api-error";
               postFeedback.textContent = `Error submitting issue: ${error.message}`;
            }
         } finally {
            if (submitPostBtn) {
               submitPostBtn.disabled = false;
               submitPostBtn.textContent = "Send POST Request";
            }
         }
      });
   }

} else {
   console.log("Note: Browser DOM fetch elements require a web browser environment (frontend/index.html).");
}

console.log("Day 12 script execution finished cleanly.");




