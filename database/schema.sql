-- ============================================================================
-- CIVICFIX — ENTERPRISE DATABASE SCHEMA
-- File: database/schema.sql
-- Relational Database: MySQL 8.0+
-- Storage Engine: InnoDB (Full ACID compliance & Foreign Key support)
-- Character Set: utf8mb4 (Full Unicode & emoji support)
-- ============================================================================

-- 1. Create Database if not exists
CREATE DATABASE IF NOT EXISTS civicfix
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE civicfix;

-- ----------------------------------------------------------------------------
-- Drop existing tables in reverse dependency order (Child -> Parent)
-- ----------------------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS reputation_transactions;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS status_history;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS complaint_media;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. USERS TABLE
-- Stores credentials, role authorization, and community trust metrics.
-- ----------------------------------------------------------------------------
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Never store raw passwords
    phone VARCHAR(20) NOT NULL,
    role ENUM('CITIZEN', 'EMPLOYEE', 'ADMIN') NOT NULL DEFAULT 'CITIZEN',
    reputation_score INT NOT NULL DEFAULT 10, -- Gamified civic trust score
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_role (role),
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. DEPARTMENTS TABLE
-- Municipal public works agencies handling localized issue redressal.
-- ----------------------------------------------------------------------------
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. COMPLAINTS TABLE (Core Grievance Entity)
-- Supports Smart Priority Scoring and Spatial Proximity Duplicate Detection.
-- ----------------------------------------------------------------------------
CREATE TABLE complaints (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    citizen_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    severity TINYINT NOT NULL CHECK (severity BETWEEN 1 AND 5),
    priority_score DECIMAL(5, 2) DEFAULT 0.00, -- Dynamic algorithm score (0.00 to 100.00)
    priority_level ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'LOW',
    status ENUM('SUBMITTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'REJECTED') DEFAULT 'SUBMITTED',
    latitude DECIMAL(10, 8) NULL,   -- Spatial coordinate for geospatial clustering
    longitude DECIMAL(11, 8) NULL,  -- Spatial coordinate for geospatial clustering
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign Key Constraint (Citizen who lodged grievance)
    CONSTRAINT fk_complaints_citizen
        FOREIGN KEY (citizen_id) REFERENCES users(id)
        ON DELETE CASCADE,

    -- Performance Indexes for search, filtering, and duplicate checking
    INDEX idx_complaint_status (status),
    INDEX idx_complaint_category (category),
    INDEX idx_complaint_severity (severity),
    INDEX idx_complaint_priority (priority_score DESC),
    INDEX idx_complaint_geo (latitude, longitude)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. COMPLAINT MEDIA TABLE
-- Multi-media proof attachments (before and after resolution photos).
-- ----------------------------------------------------------------------------
CREATE TABLE complaint_media (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_type ENUM('IMAGE', 'VIDEO', 'DOCUMENT') DEFAULT 'IMAGE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_media_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 5. COMMENTS TABLE
-- Discussion thread between citizens, inspectors, and assigned field staff.
-- ----------------------------------------------------------------------------
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_comments_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 6. VOTES TABLE (Crowdsourced Verification & Upvoting)
-- Enforces ONE vote per user per complaint via Composite UNIQUE Key.
-- ----------------------------------------------------------------------------
CREATE TABLE votes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_votes_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_votes_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    -- Prevent duplicate voting by the same citizen on the same complaint
    UNIQUE KEY uk_user_complaint_vote (complaint_id, user_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 7. ASSIGNMENTS TABLE
-- Direct delegation of grievance tasks to municipal field teams.
-- ----------------------------------------------------------------------------
CREATE TABLE assignments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    employee_id BIGINT NOT NULL,
    department_id INT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline TIMESTAMP NULL,
    accepted_at TIMESTAMP NULL,

    CONSTRAINT fk_assignments_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_assignments_employee
        FOREIGN KEY (employee_id) REFERENCES users(id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_assignments_department
        FOREIGN KEY (department_id) REFERENCES departments(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 8. STATUS HISTORY TABLE
-- Immutable audit log capturing status transitions, timestamps, and officer remarks.
-- ----------------------------------------------------------------------------
CREATE TABLE status_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    complaint_id BIGINT NOT NULL,
    changed_by BIGINT NOT NULL,
    old_status VARCHAR(50) NOT NULL,
    new_status VARCHAR(50) NOT NULL,
    remarks TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_history_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_history_user
        FOREIGN KEY (changed_by) REFERENCES users(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 9. NOTIFICATIONS TABLE
-- Real-time alerts delivered to citizen dashboards and SMS/Email adapters.
-- ----------------------------------------------------------------------------
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    complaint_id BIGINT NULL,
    message VARCHAR(255) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_notifications_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE SET NULL,
    INDEX idx_user_read (user_id, is_read)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 10. REPUTATION TRANSACTIONS TABLE
-- Citizen civic score history rewards active verified reporting.
-- ----------------------------------------------------------------------------
CREATE TABLE reputation_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    complaint_id BIGINT NULL,
    points INT NOT NULL, -- e.g., +5 for valid report, -10 for spam
    reason VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reputation_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_reputation_complaint
        FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;
