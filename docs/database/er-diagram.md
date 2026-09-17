# CivicFix — Entity-Relationship (ER) Architecture

This document specifies the relational database schema and entity relationships for the **CivicFix Smart Civic Grievance Redressal Platform**.

---

## 1. Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    USERS ||--o{ COMPLAINTS : "files (citizen_id)"
    USERS ||--o{ COMMENTS : "posts (user_id)"
    USERS ||--o{ VOTES : "casts (user_id)"
    USERS ||--o{ ASSIGNMENTS : "receives (employee_id)"
    USERS ||--o{ STATUS_HISTORY : "triggers (changed_by)"
    USERS ||--o{ NOTIFICATIONS : "receives (user_id)"
    USERS ||--o{ REPUTATION_TRANSACTIONS : "earns (user_id)"

    DEPARTMENTS ||--o{ ASSIGNMENTS : "manages (department_id)"

    COMPLAINTS ||--o{ COMPLAINT_MEDIA : "attaches (complaint_id)"
    COMPLAINTS ||--o{ COMMENTS : "contains (complaint_id)"
    COMPLAINTS ||--o{ VOTES : "accumulates (complaint_id)"
    COMPLAINTS ||--o{ ASSIGNMENTS : "allocated_to (complaint_id)"
    COMPLAINTS ||--o{ STATUS_HISTORY : "tracks (complaint_id)"
    COMPLAINTS ||--o{ NOTIFICATIONS : "generates (complaint_id)"
    COMPLAINTS ||--o{ REPUTATION_TRANSACTIONS : "credited_for (complaint_id)"

    USERS {
        bigint id PK
        string name
        string email UK
        string password_hash
        string phone
        string role "CITIZEN, EMPLOYEE, ADMIN"
        int reputation_score
        timestamp created_at
        timestamp updated_at
    }

    DEPARTMENTS {
        int id PK
        string name UK
        text description
        timestamp created_at
    }

    COMPLAINTS {
        bigint id PK
        bigint citizen_id FK
        string title
        text description
        string category
        int severity "1 to 5"
        decimal priority_score "0.00 to 100.00"
        string priority_level "LOW, MEDIUM, HIGH, CRITICAL"
        string status "SUBMITTED, VERIFIED, ASSIGNED, IN_PROGRESS, RESOLVED"
        decimal latitude
        decimal longitude
        string address
        timestamp created_at
        timestamp updated_at
    }

    COMPLAINT_MEDIA {
        bigint id PK
        bigint complaint_id FK
        string file_url
        string file_type "IMAGE, VIDEO, DOCUMENT"
        timestamp created_at
    }

    COMMENTS {
        bigint id PK
        bigint complaint_id FK
        bigint user_id FK
        text comment_text
        timestamp created_at
    }

    VOTES {
        bigint id PK
        bigint complaint_id FK
        bigint user_id FK
        timestamp created_at
    }

    ASSIGNMENTS {
        bigint id PK
        bigint complaint_id FK
        bigint employee_id FK
        int department_id FK
        timestamp assigned_at
        timestamp deadline
        timestamp accepted_at
    }

    STATUS_HISTORY {
        bigint id PK
        bigint complaint_id FK
        bigint changed_by FK
        string old_status
        string new_status
        text remarks
        timestamp created_at
    }

    NOTIFICATIONS {
        bigint id PK
        bigint user_id FK
        bigint complaint_id FK
        string message
        boolean is_read
        timestamp created_at
    }

    REPUTATION_TRANSACTIONS {
        bigint id PK
        bigint user_id FK
        bigint complaint_id FK
        int points
        string reason
        timestamp created_at
    }
```

---

## 2. Table Cardinalities & Business Rules

1. **One Citizen $\rightarrow$ Many Complaints (1:N)**:
   - A registered citizen can lodge multiple complaints over time.
   - Each complaint belongs strictly to one citizen (`citizen_id`).
2. **One Complaint $\rightarrow$ Many Media Files (1:N)**:
   - A grievance can include multiple photos/videos (e.g., before and after repair).
3. **One Complaint $\rightarrow$ Many Comments (1:N)**:
   - Citizens and assigned municipal officers can hold discussions on a ticket.
4. **One User + One Complaint $\rightarrow$ One Vote (Composite Unique Key)**:
   - A citizen can upvote a complaint to show community urgency, but duplicate votes by the same user on the same complaint are forbidden by `UNIQUE KEY (complaint_id, user_id)`.
5. **One Department $\rightarrow$ Many Assignments (1:N)**:
   - A municipal department (e.g., Public Works) handles assignments across multiple complaints.
6. **One Complaint $\rightarrow$ Many Status History Entries (1:N)**:
   - Provides an immutable audit trail (`SUBMITTED` $\rightarrow$ `VERIFIED` $\rightarrow$ `ASSIGNED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `RESOLVED`).

---

## 3. Database Normalization (1NF to 3NF)

- **1NF (First Normal Form)**: Every column holds atomic (indivisible) values. No repeating comma-separated lists of photos or comments (stored in `complaint_media` and `comments` child tables).
- **2NF (Second Normal Form)**: In 1NF and all non-key attributes are fully functionally dependent on the primary key (no partial dependencies).
- **3NF (Third Normal Form)**: In 2NF and no transitive dependencies. Department descriptions reside in `departments`, not duplicated across every complaint row.

---

## 4. Smart Priority & Duplicate Detection Architecture

- **Smart Priority Indexing**:
  - `INDEX idx_complaint_priority (priority_score DESC)` allows $O(1)$ dashboard sorting of the most urgent issues.
  - Factors: `severity` (1-5), `votes` count (crowdsourced urgency), and `DATEDIFF(CURRENT_TIMESTAMP, created_at)` (pending duration).
- **Geospatial & Category Clustering**:
  - `INDEX idx_complaint_geo (latitude, longitude)` combined with `category` enables spatial proximity calculation to flag duplicate reports filed by multiple neighbors for the same pothole or broken streetlight.
