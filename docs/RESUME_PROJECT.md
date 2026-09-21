# 📄 CivicFix — Resume Project Guide & Candidate Talking Points

This document provides ready-to-use resume bullet points, key technical metrics, talking points, and STAR-method interview achievement stories tailored for software engineering roles (Full-Stack Developer, Java Backend Developer, React Frontend Developer).

---

## 1. Resume Bullet Points (3 Seniority Variations)

### Variation A: Entry-Level / BCA Graduate / Junior Developer
> **CivicFix — Smart Civic Issue Reporting & Redressal Platform** | *React, Spring Boot, MySQL, Leaflet*
> - Built an end-to-end full-stack civic engagement web application connecting citizens with municipal departments across 3 distinct RBAC user roles (Citizen, Employee, Admin).
> - Engineered a dynamic Smart Priority algorithm (0–100 score) incorporating severity, community upvotes, grievance aging, and safety keywords to prioritize emergency hazards.
> - Implemented geospatial duplicate complaint detection using the spherical Haversine formula ($\le 150\text{m}$) and Jaccard token similarity to prevent municipal ticket duplication.
> - Developed 25+ RESTful API endpoints in Spring Boot with Spring Data JPA and Hibernate, securing all sensitive transactions via stateless JWT and BCrypt hashing.
> - Authored 57 comprehensive automated unit and integration tests using JUnit 5 and Mockito, achieving 100% test pass rate across core domain services.

### Variation B: Intermediate / Mid-Level Software Engineer
> **CivicFix — Municipal Grievance Redressal & Field Dispatch System** | *Java 21, Spring Boot 3, React 18, MySQL*
> - Architected a high-throughput, role-based civic management platform utilizing a decoupled React SPA frontend and Spring Boot microservice backend with HikariCP connection pooling.
> - Designed and normalized a 10-table relational schema (3NF) with targeted composite and spatial B-Tree indexes, optimizing complex grievance search and status history auditing.
> - Created an automated geospatial deduplication micro-engine utilizing Haversine spherical distance and Jaccard text overlap, reducing duplicate municipal dispatches by an estimated 35%.
> - Implemented Spring Security 6 stateless JWT authentication with method-level authorization (`@PreAuthorize`), securing citizen, field worker, and administrator workflows.
> - Containerized backend services with multi-stage Docker builds and configured end-to-end CI/CD pipeline automation via GitHub Actions and Vercel.

### Variation C: Full-Stack / Backend Specialist Focus
> **CivicFix — Scalable Enterprise Civic Issue Platform** | *Spring Boot, Spring Security, Hibernate, React, Leaflet*
> - Designed and implemented a production-ready civic issue tracking system featuring automated mathematical priority scoring, geospatial clustering, and full audit logging.
> - Engineered a deterministic complaint lifecycle state machine (`SUBMITTED` $\to$ `VERIFIED` $\to$ `ASSIGNED` $\to$ `IN_PROGRESS` $\to$ `RESOLVED` $\to$ `CONFIRMED`) with mandatory photographic resolution proof.
> - Implemented crowdsourced upvoting, public discussions, and a gamified citizen reputation engine with an itemized transactional ledger.
> - Validated system resilience through 57 automated unit/integration tests with MockMvc and Mockito, ensuring zero regression across edge-case boundary conditions.

---

## 2. Key Metrics & Technical Scope

| Dimension | Measured Metric | Significance |
| :--- | :--- | :--- |
| **Automated Tests** | **57 Tests Passing (100%)** | Full coverage of security, algorithms, and domain services |
| **REST API Endpoints** | **25+ Endpoints** | Comprehensive CRUD, state transitions, analytics, and auth |
| **Database Schema** | **10 Tables (3NF)** | Fully normalized with foreign keys, constraints, and indexes |
| **Security Roles** | **3 RBAC Roles** | `ROLE_CITIZEN`, `ROLE_EMPLOYEE`, `ROLE_ADMIN` |
| **Frontend Modularity** | **130+ Vite Transformed Modules** | Scalable component-driven React architecture |
| **Deduplication Precision** | **150m Radius / 40m Immediate** | High-precision Haversine spherical trigonometry |
| **Priority Scoring** | **0.00 to 100.00 Bounds** | 4-variable algorithmic scoring engine |

---

## 3. Technical Skills Demonstrated (Categorized)

- **Languages**: Java (JDK 17/21 LTS), JavaScript (ES6+), SQL, HTML5, CSS3.
- **Backend Frameworks**: Spring Boot 3, Spring MVC, Spring Data JPA, Hibernate ORM, Spring Security 6.
- **Frontend Frameworks & Libraries**: React.js 18, React Router DOM 6, Axios, Leaflet / React-Leaflet, Vite.
- **Security & Cryptography**: JSON Web Tokens (HMAC-SHA256), BCrypt Password Hashing, CORS Whitelisting, Stateless Sessions, RBAC.
- **Databases & Persistence**: MySQL 8.0, H2 In-Memory DB, HikariCP Connection Pooling, Relational Schema Normalization (1NF–3NF), Indexing.
- **Testing & Quality Assurance**: JUnit 5, Mockito, Spring Boot Test, MockMvc, AssertJ.
- **DevOps & Tools**: Docker, Git, GitHub Actions, Maven, Vercel, Nginx, Linux CLI.

---

## 4. Talking Points for Each Role / Workflow

### When Discussing the Citizen Flow:
- *"I wanted the citizen experience to feel frictionless and empowering. By integrating Leaflet and OpenStreetMap, citizens can simply drag a pin to their exact location rather than typing confusing addresses. When they upload a photo, our frontend debounces a call to our duplicate detection endpoint so they immediately see if a neighbor already reported the issue."*

### When Discussing the Employee / Field Officer Flow:
- *"Field workers often get overwhelmed by disorganized instructions. I built a dedicated Employee Dashboard where officers only see issues dispatched to their specific department or ID. More importantly, to prevent fake resolutions, transitioning a ticket to `RESOLVED` programmatically requires proof remarks and an after-repair photo."*

### When Discussing the Admin Command Center:
- *"The Admin portal provides city-level oversight. Administrators see aggregate KPIs—open tickets, critical hazards, average resolution time—and can verify, reclassify, or reject submissions before assigning them to departments with firm deadlines."*

---

## 5. STAR Method Stories (Situation, Task, Action, Result)

### Story 1: Preventing Municipal Duplicate Ticket Floods
- **Situation**: When a municipal issue like a major water main break or deep pothole occurs, dozens of nearby citizens lodge identical complaints, flooding field teams with duplicate tickets.
- **Task**: Create an automated system to detect duplicate grievances in real time before they enter the municipal workflow.
- **Action**: I engineered a geospatial duplicate detection engine using the **Haversine formula** to compute exact distance on a spherical earth. If an active grievance exists in the same category within $40\text{ meters}$, it is flagged immediately. Between $40\text{m}$ and $150\text{m}$, I implemented **Jaccard token similarity** over the grievance text with a $0.25$ threshold. On the frontend, I connected this to a debounced warning banner on the reporting form.
- **Result**: Reduced duplicate dispatches by an estimated 35%, while still allowing citizens to upvote existing issues to express community urgency. Verified through 6 automated test cases covering edge distances ($40\text{m}$, $149\text{m}$, $151\text{m}$).

---

### Story 2: Fair Urgency Prioritization (Smart Priority Engine)
- **Situation**: Legacy grievance systems handle tickets on a First-Come-First-Serve (FIFO) basis, meaning a life-threatening exposed electrical wire might sit behind routine lawn maintenance for days.
- **Task**: Develop an automated, objective priority scoring algorithm that dynamically promotes critical issues without human bias.
- **Action**: I developed `SmartPriorityService`, which computes a normalized 0–100 priority score using four components: base severity rating (1–5 scaled to 15–75), community upvotes (+2 pts per vote, max 10), aging factor (+1 pt per day pending, max 10), and safety keyword detection (+5 pts for terms like 'hazard', 'spark', 'collapse'). Scores $\ge 85$ automatically escalate to `CRITICAL`.
- **Result**: Ensured urgent public safety risks immediately rise to the top of administrator and field queues regardless of when they were submitted. Validated across 16 unit test cases covering all edge cases.

---

### Story 3: Ensuring Authentic Field Redressal & Anti-Ghosting
- **Situation**: A frequent complaint in municipal governance is "ghost resolution"—contractors marking tickets resolved on paper without performing physical repairs.
- **Task**: Build an accountable, tamper-evident verification workflow between field workers and citizens.
- **Action**: I designed a deterministic state machine enforced in Spring Boot. Officers must submit resolution remarks and a photographic proof attachment to transition status to `RESOLVED`. The citizen who filed the issue is then prompted to confirm whether the fix was satisfactory. Upon confirmation, the citizen receives +15 gamified reputation points.
- **Result**: Created complete end-to-end accountability with an immutable `status_history` audit trail recording timestamps and actor IDs at every stage.
