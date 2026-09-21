# CivicFix REST API Specification

**Base URL**: `http://localhost:8081`  
**Authentication Scheme**: HTTP Bearer Authorization (`Authorization: Bearer <token>`)  
**Standard Response Format**: `application/json;charset=UTF-8`

---

## 1. Authentication & Identity (`/api/auth`)

### 1.1 Citizen Registration
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Auth Required**: No (Public)
- **Role Required**: None (Strictly registers with `Role.CITIZEN` on backend)
- **Request Body**:
  ```json
  {
    "name": "Rahul Sharma",
    "email": "rahul.citizen@example.com",
    "password": "SecurePassword123",
    "phone": "9876543210"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "message": "User registered successfully",
    "userId": 4,
    "name": "Rahul Sharma",
    "email": "rahul.citizen@example.com",
    "role": "CITIZEN"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Validation constraint failures (e.g. invalid email format, short password).
  - `409 Conflict`: Email address is already registered.

### 1.2 User Login
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Auth Required**: No (Public)
- **Request Body**:
  ```json
  {
    "email": "rahul.citizen@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "user": {
      "id": 4,
      "name": "Rahul Sharma",
      "email": "rahul.citizen@example.com",
      "role": "CITIZEN",
      "reputationScore": 10
    }
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid email or password (generic message prevents user enumeration).

---

## 2. Grievance Management (`/api/complaints`)

### 2.1 Submit New Grievance
- **Method**: `POST`
- **Endpoint**: `/api/complaints`
- **Auth Required**: Yes (`Bearer <token>`)
- **Role Required**: `CITIZEN`, `EMPLOYEE`, `ADMIN`
- **Request Body**:
  ```json
  {
    "title": "Severe Pothole on 4th Main Crossroad",
    "description": "Deep crater on right vehicular lane damaging suspension and causing traffic gridlock.",
    "category": "Roads",
    "severity": 4,
    "address": "4th Main Crossroad, Ward 12, Indiranagar",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "id": 101,
    "citizenId": 4,
    "title": "Severe Pothole on 4th Main Crossroad",
    "description": "Deep crater on right vehicular lane damaging suspension and causing traffic gridlock.",
    "category": "Roads",
    "severity": 4,
    "status": "SUBMITTED",
    "priorityLevel": "HIGH",
    "priorityScore": 75.00,
    "address": "4th Main Crossroad, Ward 12, Indiranagar",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "createdAt": "2026-09-19T02:10:00",
    "resolutionConfirmed": false
  }
  ```

### 2.2 List All Complaints
- **Method**: `GET`
- **Endpoint**: `/api/complaints`
- **Auth Required**: No (Publicly queryable for civic transparency)
- **Response (200 OK)**: Array of `ComplaintResponseDto`.

### 2.3 Get Complaint By ID
- **Method**: `GET`
- **Endpoint**: `/api/complaints/{id}`
- **Auth Required**: No (Public)
- **Response (200 OK)**: Detailed `ComplaintResponseDto`.
- **Error Responses**: `404 Not Found` if complaint ID does not exist.

### 2.4 Check Potential Duplicate Grievance
- **Method**: `GET`
- **Endpoint**: `/api/complaints/check-duplicate`
- **Auth Required**: Yes
- **Query Parameters**:
  - `category` (string, required): e.g. "Roads"
  - `latitude` (decimal, required): e.g. 12.9716
  - `longitude` (decimal, required): e.g. 77.5946
  - `title` (string, optional): e.g. "Pothole"
  - `excludeId` (long, optional): ID to exclude during edits
- **Response (200 OK)**:
  ```json
  {
    "duplicateFound": true,
    "matchedComplaintId": 101,
    "matchedTitle": "Severe Pothole on 4th Main Crossroad",
    "distanceMeters": 28.5,
    "advisoryMessage": "Potential duplicate: Grievance #101 ('Severe Pothole on 4th Main Crossroad') was reported 29m away in 'Roads'."
  }
  ```

### 2.5 Citizen Resolution Confirmation
- **Method**: `POST`
- **Endpoint**: `/api/complaints/{id}/confirm-resolution`
- **Auth Required**: Yes
- **Role Required**: `CITIZEN` (Owner only)
- **Response (200 OK)**:
  ```json
  {
    "id": 101,
    "status": "RESOLUTION_CONFIRMED",
    "resolutionConfirmed": true,
    "resolutionConfirmedAt": "2026-09-19T02:16:50"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Complaint is not in `RESOLVED` status or already confirmed.
  - `403 Forbidden`: Authenticated user is not the citizen who created this grievance.

---

## 3. Crowdsourcing: Comments & Votes

### 3.1 List Comments on a Grievance
- **Method**: `GET`
- **Endpoint**: `/api/complaints/{id}/comments`
- **Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "complaintId": 101,
      "userId": 4,
      "userName": "Rahul Sharma",
      "userRole": "CITIZEN",
      "commentText": "Resident note: Warning cone placed.",
      "createdAt": "2026-09-19T02:11:00"
    }
  ]
  ```

### 3.2 Add Comment
- **Method**: `POST`
- **Endpoint**: `/api/complaints/{id}/comments`
- **Auth Required**: Yes
- **Request Body**:
  ```json
  {
    "commentText": "Work crew arrived on site with asphalt mixer."
  }
  ```
- **Response (201 Created)**: `CommentResponseDto`.

### 3.3 Get Upvote Status
- **Method**: `GET`
- **Endpoint**: `/api/complaints/{id}/votes`
- **Response (200 OK)**:
  ```json
  {
    "complaintId": 101,
    "totalVotes": 14,
    "hasVoted": true,
    "message": "Vote status fetched"
  }
  ```

### 3.4 Cast Upvote (+2 Points to Citizen)
- **Method**: `POST`
- **Endpoint**: `/api/complaints/{id}/vote`
- **Auth Required**: Yes (`CITIZEN`)
- **Response (201 Created)**:
  ```json
  {
    "complaintId": 101,
    "totalVotes": 15,
    "hasVoted": true,
    "message": "Upvote registered successfully"
  }
  ```
- **Error Responses**:
  - `409 Conflict`: Duplicate vote attempt by the same citizen on the same grievance.

### 3.5 Remove Upvote (-2 Points Reversed)
- **Method**: `DELETE`
- **Endpoint**: `/api/complaints/{id}/vote`
- **Auth Required**: Yes
- **Response (200 OK)**: `totalVotes` decremented and `hasVoted: false`.

---

## 4. Municipal Photo Media Proof (`/api/media`)

### 4.1 Upload Media Attachment
- **Method**: `POST`
- **Endpoint**: `/api/media/upload/{complaintId}`
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`
- **Form Param**: `file` (Binary Image, max 5MB, JPG/PNG/WebP)
- **Response (201 Created)**:
  ```json
  {
    "id": 12,
    "complaintId": 101,
    "fileUrl": "/api/media/files/101_cf7829_pothole.jpg",
    "fileType": "IMAGE",
    "createdAt": "2026-09-19T02:12:00"
  }
  ```
- **Error Responses**:
  - `400 Bad Request`: Disallowed MIME type.
  - `413 Payload Too Large`: File exceeds 5MB size ceiling.

---

## 5. Municipal Enterprise Admin Console (`/api/admin`)

### 5.1 Admin Dashboard Aggregated KPIs
- **Method**: `GET`
- **Endpoint**: `/api/admin/dashboard/stats`
- **Auth Required**: Yes
- **Role Required**: `ADMIN`
- **Response (200 OK)**:
  ```json
  {
    "totalComplaints": 42,
    "pendingVerification": 8,
    "verified": 10,
    "assigned": 6,
    "inProgress": 4,
    "resolved": 14,
    "critical": 5,
    "resolutionRate": "33.3%"
  }
  ```

### 5.2 Admin 360° Complaint Detail
- **Method**: `GET`
- **Endpoint**: `/api/admin/complaints/{id}`
- **Auth Required**: Yes
- **Role Required**: `ADMIN`

### 5.3 Verify Complaint (+10 Points to Citizen)
- **Method**: `PUT`
- **Endpoint**: `/api/admin/complaints/{id}/verify`
- **Auth Required**: Yes
- **Role Required**: `ADMIN`
- **Request Body**:
  ```json
  {
    "remarks": "Field engineer verified severe asphalt sinkhole on site."
  }
  ```
- **Response (200 OK)**: Updated `ComplaintResponseDto` with status `VERIFIED`.

### 5.4 Delegate Complaint to Department & Officer
- **Method**: `POST`
- **Endpoint**: `/api/admin/complaints/{id}/assign`
- **Auth Required**: Yes
- **Role Required**: `ADMIN`
- **Request Body**:
  ```json
  {
    "departmentId": 1,
    "employeeId": 2,
    "deadlineDays": 3,
    "dispatchInstructions": "Deploy emergency asphalt repair vehicle immediately."
  }
  ```
- **Response (200 OK)**: Updated `ComplaintResponseDto` with status `ASSIGNED`.

---

## 6. Field Officer Operations (`/api/employee`)

### 6.1 Officer Dashboard KPIs
- **Method**: `GET`
- **Endpoint**: `/api/employee/dashboard/stats`
- **Role Required**: `EMPLOYEE` or `ADMIN`
- **Response (200 OK)**:
  ```json
  {
    "totalAssigned": 5,
    "pendingStart": 2,
    "inProgress": 1,
    "resolved": 2,
    "departmentName": "Roads & Stormwater Infrastructure"
  }
  ```

### 6.2 Get Assigned Work Orders
- **Method**: `GET`
- **Endpoint**: `/api/employee/assignments`
- **Role Required**: `EMPLOYEE` or `ADMIN`
- **Query Params**: `status=ALL|ASSIGNED|IN_PROGRESS|RESOLVED`

### 6.3 Commence Field Work (ASSIGNED -> IN_PROGRESS)
- **Method**: `PUT`
- **Endpoint**: `/api/employee/assignments/{complaintId}/start`
- **Role Required**: `EMPLOYEE` or `ADMIN`
- **Request Body**:
  ```json
  {
    "remarks": "Field repair squad arrived on site with equipment."
  }
  ```

### 6.4 Mark Issue Resolved (IN_PROGRESS -> RESOLVED)
- **Method**: `PUT`
- **Endpoint**: `/api/employee/assignments/{complaintId}/resolve`
- **Role Required**: `EMPLOYEE` or `ADMIN`
- **Request Body**:
  ```json
  {
    "resolutionNotes": "Pothole filled with aggregate base and hot-mix bitumen. Road re-opened for vehicles."
  }
  ```

---

## 7. Civic Reputation & Gamification (`/api/reputation`)

### 7.1 Get My Reputation Profile & Ledger
- **Method**: `GET`
- **Endpoint**: `/api/reputation/me`
- **Auth Required**: Yes
- **Response (200 OK)**:
  ```json
  {
    "reputationScore": 25,
    "tier": "Novice Citizen",
    "totalTransactions": 4,
    "transactions": [
      {
        "id": 4,
        "complaintId": 101,
        "points": 5,
        "reason": "RESOLUTION_CONFIRMED",
        "createdAt": "2026-09-19T02:16:50"
      },
      {
        "id": 3,
        "complaintId": 101,
        "points": 10,
        "reason": "VALID_COMPLAINT",
        "createdAt": "2026-09-19T02:14:00"
      }
    ]
  }
  ```

---

## 8. Notifications (`/api/notifications`)

### 8.1 Fetch Alerts
- **Method**: `GET`
- **Endpoint**: `/api/notifications`
- **Auth Required**: Yes
- **Response (200 OK)**: List of notification objects with `message`, `complaintId`, `isRead`, `createdAt`.

### 8.2 Mark Alert as Read
- **Method**: `PATCH`
- **Endpoint**: `/api/notifications/{id}/read`
- **Auth Required**: Yes
