-- ============================================================================
-- CIVICFIX — REALISTIC SEED DATA
-- File: database/sample-data.sql
-- Safe, fictitious sample data for development, testing, and learning.
-- ============================================================================

USE civicfix;

-- ----------------------------------------------------------------------------
-- 1. SEED DEPARTMENTS
-- ----------------------------------------------------------------------------
INSERT INTO departments (id, name, description) VALUES
(1, 'Public Works Department (PWD)', 'Road repairs, potholes, bridges, and flyovers maintenance'),
(2, 'Solid Waste Management (SWM)', 'Garbage collection, dustbins, composting, and landfill operations'),
(3, 'Municipal Electricity Board', 'Street lighting, electrical transformers, and wire repairs'),
(4, 'Jal Sansthan (Water Board)', 'Drinking water pipelines, leakage, and water tanker supply'),
(5, 'Drainage & Sewage Board', 'Sewerage line blockage, drainage desilting, and stormwater canals');

-- ----------------------------------------------------------------------------
-- 2. SEED USERS (Citizens, Municipal Employees, and Ward Administrators)
-- Passwords are mock bcrypt hashes ($2a$10$...) for placeholder testing.
-- ----------------------------------------------------------------------------
INSERT INTO users (id, name, email, password_hash, phone, role, reputation_score) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@example.com', '$2a$10$DUMMY_HASH_AARAV_1234567890ABCDEF', '+91-9876543210', 'CITIZEN', 45),
(2, 'Priya Patel', 'priya.patel@example.com', '$2a$10$DUMMY_HASH_PRIYA_1234567890ABCDEF', '+91-9876543211', 'CITIZEN', 25),
(3, 'Rohan Verma', 'rohan.verma@example.com', '$2a$10$DUMMY_HASH_ROHAN_1234567890ABCDEF', '+91-9876543212', 'CITIZEN', 60),
(4, 'Kavita Rao', 'kavita.rao@example.com', '$2a$10$DUMMY_HASH_KAVITA_1234567890ABCDEF', '+91-9876543213', 'CITIZEN', 15),
(5, 'Eng. Rajesh Kumar', 'rajesh.kumar@pwd.gov.in', '$2a$10$DUMMY_HASH_RAJESH_1234567890ABCDEF', '+91-9876543214', 'EMPLOYEE', 80),
(6, 'Inspector Sunita Verma', 'sunita.verma@swm.gov.in', '$2a$10$DUMMY_HASH_SUNITA_1234567890ABCDEF', '+91-9876543215', 'EMPLOYEE', 95),
(7, 'Officer Manoj Tiwari', 'manoj.tiwari@water.gov.in', '$2a$10$DUMMY_HASH_MANOJ_1234567890ABCDEF', '+91-9876543216', 'EMPLOYEE', 75),
(8, 'Commissioner Vikram Singh', 'admin.vikram@civicfix.org', '$2a$10$DUMMY_HASH_VIKRAM_1234567890ABCDEF', '+91-9876543217', 'ADMIN', 100);

-- ----------------------------------------------------------------------------
-- 3. SEED COMPLAINTS (At least 8 realistic multi-category issues)
-- ----------------------------------------------------------------------------
INSERT INTO complaints (id, citizen_id, title, description, category, severity, priority_score, priority_level, status, latitude, longitude, address) VALUES
(1001, 1, 'Deep hazardous pothole near Central School', 'Deep 2-foot crater on main arterial road causing vehicle damage and bike skidding.', 'Road Damage', 5, 88.50, 'CRITICAL', 'ASSIGNED', 28.613939, 77.209021, 'Main Market Crossroad, Ward 4, Central Zone'),
(1002, 2, 'Overflowing community garbage bin', 'Solid waste overflowing onto pedestrian sidewalk for 4 consecutive days.', 'Garbage', 3, 54.00, 'MEDIUM', 'IN_PROGRESS', 28.620100, 77.215400, 'Sector 12 Market Complex, Ward 8, East Zone'),
(1003, 3, 'Non-functional street light on dark corner', 'Entire block pitch black at night creating serious women and elderly pedestrian safety risks.', 'Street Light', 4, 72.00, 'HIGH', 'RESOLVED', 28.611200, 77.204500, 'Street 9, Green Park Colony, Ward 2'),
(1004, 1, 'Burst drinking water main line', 'High pressure clean water leaking across road causing massive water loss and street flooding.', 'Water Supply', 4, 76.50, 'HIGH', 'VERIFIED', 28.618900, 77.211000, 'Jal Vihar Road, Sector 3, Ward 4'),
(1005, 4, 'Choked open storm drain emitting foul odor', 'Drain clogged with plastic debris causing sewage stagnation and mosquito infestation.', 'Drainage', 3, 48.00, 'MEDIUM', 'SUBMITTED', 28.625000, 77.220000, 'Lane 4, Subhash Nagar, Ward 11'),
(1006, 2, 'Fallen tree branch obstructing traffic lane', 'Heavy storm branch blocking left lane of dual carriageway.', 'Road Damage', 4, 68.00, 'HIGH', 'RESOLVED', 28.615000, 77.208000, 'Ring Road flyover descent, Ward 4'),
(1007, 3, 'Uncovered deep manhole near bus stop', 'High risk of pedestrians falling into open 6-foot deep sewer hole.', 'Drainage', 5, 92.00, 'CRITICAL', 'ASSIGNED', 28.614500, 77.210500, 'Bus Terminal Gate 2, Ward 4'),
(1008, 1, 'Low water supply pressure in residential blocks', 'Water supplied for only 15 minutes in the morning with negligible pressure.', 'Water Supply', 2, 32.00, 'LOW', 'SUBMITTED', 28.617000, 77.213000, 'Pocket B, Teachers Colony, Ward 4');

-- ----------------------------------------------------------------------------
-- 4. SEED COMPLAINT MEDIA
-- ----------------------------------------------------------------------------
INSERT INTO complaint_media (id, complaint_id, file_url, file_type) VALUES
(1, 1001, 'https://cdn.civicfix.org/media/pothole_school_road_before.jpg', 'IMAGE'),
(2, 1002, 'https://cdn.civicfix.org/media/overflowing_bin_sector12.jpg', 'IMAGE'),
(3, 1003, 'https://cdn.civicfix.org/media/streetlight_dark_junction.jpg', 'IMAGE'),
(4, 1003, 'https://cdn.civicfix.org/media/streetlight_repair_completed.jpg', 'IMAGE');

-- ----------------------------------------------------------------------------
-- 5. SEED COMMENTS
-- ----------------------------------------------------------------------------
INSERT INTO comments (id, complaint_id, user_id, comment_text) VALUES
(1, 1001, 5, 'Inspection complete. Cold mix asphalt dispatched for evening pothole filling.'),
(2, 1001, 1, 'Thank you Officer Rajesh. Please ensure road roller compacts the edge properly.'),
(3, 1002, 6, 'Compactor truck assigned to clear Sector 12 dustbin by 3:00 PM today.'),
(4, 1003, 3, 'Electrician team replaced the LED bulb yesterday evening. Confirmed working!');

-- ----------------------------------------------------------------------------
-- 6. SEED VOTES (Upvotes)
-- ----------------------------------------------------------------------------
INSERT INTO votes (complaint_id, user_id) VALUES
(1001, 2),
(1001, 3),
(1001, 4),
(1002, 1),
(1002, 3),
(1004, 2),
(1007, 1),
(1007, 2),
(1007, 3);

-- ----------------------------------------------------------------------------
-- 7. SEED ASSIGNMENTS
-- ----------------------------------------------------------------------------
INSERT INTO assignments (id, complaint_id, employee_id, department_id, deadline, accepted_at) VALUES
(1, 1001, 5, 1, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 24 HOUR), CURRENT_TIMESTAMP),
(2, 1002, 6, 2, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 12 HOUR), CURRENT_TIMESTAMP),
(3, 1003, 5, 3, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 48 HOUR), CURRENT_TIMESTAMP),
(4, 1007, 7, 5, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 6 HOUR), CURRENT_TIMESTAMP);

-- ----------------------------------------------------------------------------
-- 8. SEED STATUS HISTORY
-- ----------------------------------------------------------------------------
INSERT INTO status_history (complaint_id, changed_by, old_status, new_status, remarks) VALUES
(1001, 1, 'SUBMITTED', 'VERIFIED', 'Automated spatial deduplication check passed'),
(1001, 8, 'VERIFIED', 'ASSIGNED', 'Assigned to PWD North Division under Officer Rajesh'),
(1002, 2, 'SUBMITTED', 'IN_PROGRESS', 'Assigned to SWM crew 4'),
(1003, 3, 'SUBMITTED', 'IN_PROGRESS', 'North electricity van dispatched'),
(1003, 5, 'IN_PROGRESS', 'RESOLVED', 'LED luminaire replaced and photo verified');

-- ----------------------------------------------------------------------------
-- 9. SEED NOTIFICATIONS
-- ----------------------------------------------------------------------------
INSERT INTO notifications (id, user_id, complaint_id, message, is_read) VALUES
(1, 1, 1001, 'Your complaint CF-1001 has been assigned to PWD.', TRUE),
(2, 2, 1002, 'SWM truck dispatched to clear community bin CF-1002.', FALSE),
(3, 3, 1003, 'Grievance CF-1003 (Street Light) has been marked RESOLVED.', FALSE);

-- ----------------------------------------------------------------------------
-- 10. SEED REPUTATION TRANSACTIONS
-- ----------------------------------------------------------------------------
INSERT INTO reputation_transactions (id, user_id, complaint_id, points, reason) VALUES
(1, 1, 1001, 10, 'Verified accurate reporting of critical road hazard'),
(2, 3, 1003, 15, 'Provided photo confirmation of municipal resolution'),
(3, 2, 1002, 5, 'Civic issue report verified by community upvotes');
