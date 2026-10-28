const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Omji Savita';
pptx.company = 'PSIT College of Higher Education, Kanpur';
pptx.title = 'CivicFix — Smart Civic Issue Reporting & Resolution Platform';
pptx.subject = 'BCA Final Project Presentation';

// Color Palette
const C = {
  bgDark: '0F172A',      // Slate 900
  bgNavy: '1E293B',      // Slate 800
  bgLight: 'F8FAFC',     // Slate 50
  cardBg: 'FFFFFF',      // White
  cardBorder: 'E2E8F0',  // Slate 200
  cardHeader: 'F1F5F9',  // Slate 100
  primary: '2563EB',     // Blue 600
  primaryDark: '1D4ED8', // Blue 700
  accent: '0D9488',      // Teal 600
  accentLight: 'CCFBF1', // Teal 100
  textDark: '0F172A',    // Slate 900
  textMuted: '475569',   // Slate 600
  textLight: 'F8FAFC',   // Slate 50
  emerald: '059669',     // Emerald 600
  amber: 'D97706',       // Amber 600
  rose: 'E11D48',        // Rose 600
  purple: '7C3AED'       // Violet 600
};

// Helper: Standard Slide Header & Footer
function applySlideTemplate(slide, category, title, slideNum, totalSlides = 16) {
  // Background
  slide.background = { color: C.bgLight };

  // Category Tag / Breadcrumb
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 0.45, w: 2.2, h: 0.32,
    fill: { color: C.primary, transparency: 85 },
    line: { color: C.primary, width: 1 }
  });
  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.45, w: 2.2, h: 0.32,
    fontSize: 9, fontFace: 'Arial', bold: true, color: C.primary,
    align: 'center', valign: 'middle'
  });

  // Slide Title
  slide.addText(title, {
    x: 0.8, y: 0.82, w: 11.5, h: 0.6,
    fontSize: 22, fontFace: 'Arial', bold: true, color: C.textDark,
    valign: 'middle'
  });

  // Subtle separator line under title
  slide.addShape(pptx.shapes.LINE, {
    x: 0.8, y: 1.45, w: 11.7, h: 0,
    line: { color: C.cardBorder, width: 1.5 }
  });

  // Footer text
  slide.addText('PSIT College of Higher Education, Kanpur | Department of Computer Applications (BCA)', {
    x: 0.8, y: 7.05, w: 9.0, h: 0.35,
    fontSize: 9, fontFace: 'Arial', color: C.textMuted
  });

  // Slide Number
  slide.addText(`${slideNum} / ${totalSlides}`, {
    x: 10.5, y: 7.05, w: 2.0, h: 0.35,
    fontSize: 9, fontFace: 'Arial', bold: true, color: C.primary,
    align: 'right'
  });
}

// ==========================================
// SLIDE 1: Title Slide (Dark Academic Elegance)
// ==========================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C.bgDark };

  // University & College Badge
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.2, y: 0.7, w: 10.93, h: 0.5,
    fill: { color: C.bgNavy },
    line: { color: '334155', width: 1 }
  });
  slide.addText('CHHATRAPATI SHAHU JI MAHARAJ UNIVERSITY, KANPUR  |  PSIT COLLEGE OF HIGHER EDUCATION', {
    x: 1.2, y: 0.7, w: 10.93, h: 0.5,
    fontSize: 11, fontFace: 'Arial', bold: true, color: '94A3B8',
    align: 'center', valign: 'middle'
  });

  // Main Title
  slide.addText('CIVICFIX', {
    x: 1.2, y: 1.4, w: 10.93, h: 1.0,
    fontSize: 44, fontFace: 'Arial', bold: true, color: 'FFFFFF',
    align: 'center', valign: 'middle'
  });

  // Subtitle
  slide.addText('Smart Civic Issue Reporting & Resolution Platform', {
    x: 1.2, y: 2.35, w: 10.93, h: 0.5,
    fontSize: 20, fontFace: 'Arial', bold: true, color: '60A5FA',
    align: 'center', valign: 'middle'
  });

  slide.addText('An Enterprise Full-Stack Municipal Grievance Ecosystem with Real-Time Geospatial Duplicate Detection & Dynamic SLA Priority Scoring', {
    x: 1.5, y: 2.9, w: 10.33, h: 0.6,
    fontSize: 13, fontFace: 'Arial', color: 'CBD5E1',
    align: 'center', valign: 'middle'
  });

  // Project Degree Tag
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.8, y: 3.65, w: 5.73, h: 0.4,
    fill: { color: '1E3A8A' },
    line: { color: '3B82F6', width: 1 }
  });
  slide.addText('BACHELOR OF COMPUTER APPLICATIONS (BCA) PROJECT PRESENTATION', {
    x: 3.8, y: 3.65, w: 5.73, h: 0.4,
    fontSize: 10, fontFace: 'Arial', bold: true, color: 'DBEAFE',
    align: 'center', valign: 'middle'
  });

  // Presenter Card (Left)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.8, y: 4.4, w: 4.5, h: 2.2,
    fill: { color: C.bgNavy },
    line: { color: '334155', width: 1.5 }
  });
  slide.addText('PRESENTED BY', {
    x: 2.0, y: 4.6, w: 4.1, h: 0.3,
    fontSize: 10, fontFace: 'Arial', bold: true, color: '94A3B8'
  });
  slide.addText('Omji Savita', {
    x: 2.0, y: 4.95, w: 4.1, h: 0.45,
    fontSize: 18, fontFace: 'Arial', bold: true, color: 'FFFFFF'
  });
  slide.addText('Roll No: 24116002349\nDegree: BCA (Semester V / VI)\nPSIT College of Higher Education, Kanpur', {
    x: 2.0, y: 5.45, w: 4.1, h: 0.9,
    fontSize: 11, fontFace: 'Arial', color: 'CBD5E1', lineSpacing: 18
  });

  // Supervisor Card (Right)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.03, y: 4.4, w: 4.5, h: 2.2,
    fill: { color: C.bgNavy },
    line: { color: '334155', width: 1.5 }
  });
  slide.addText('UNDER THE SUPERVISION OF', {
    x: 7.23, y: 4.6, w: 4.1, h: 0.3,
    fontSize: 10, fontFace: 'Arial', bold: true, color: '94A3B8'
  });
  slide.addText('Prof. Sandeepp Agarwal', {
    x: 7.23, y: 4.95, w: 4.1, h: 0.45,
    fontSize: 18, fontFace: 'Arial', bold: true, color: 'FFFFFF'
  });
  slide.addText('Assistant Professor / Project Guide\nDepartment of Computer Applications\nPSIT College of Higher Education, Kanpur', {
    x: 7.23, y: 5.45, w: 4.1, h: 0.9,
    fontSize: 11, fontFace: 'Arial', color: 'CBD5E1', lineSpacing: 18
  });

  // Date Tag
  slide.addText('October 2026 | Kanpur, Uttar Pradesh', {
    x: 1.2, y: 6.85, w: 10.93, h: 0.35,
    fontSize: 10, fontFace: 'Arial', color: '64748B', align: 'center'
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 1: INTRO]\n"Respected guide, faculty members, and fellow classmates, good morning. My name is Omji Savita, Roll Number 24116002349, pursuing Bachelor of Computer Applications at PSIT College of Higher Education, Kanpur.\n\nToday, I am proud to present my project titled 'CivicFix: Smart Civic Issue Reporting & Resolution Platform'.\nCivicFix is a production-grade full-stack civic governance ecosystem engineered using Spring Boot, React, and MySQL. It modernizes municipal grievance redressal using mathematical urgency prioritization and real-time geospatial duplicate clustering. Let us examine the challenges that motivated this work."`);
}

// ==========================================
// SLIDE 2: Background & Municipal Challenges
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 1: Context & Need', 'The Civic Governance Crisis: Why We Need CivicFix', 2);

  // 3 Critical Problem Pillars
  const pillars = [
    {
      title: 'Opaque Bureaucracy',
      color: C.rose,
      points: [
        'Citizens submit complaints into a municipal "black hole" with no tracking.',
        'Zero visibility into assigned department, contractor, or officer.',
        'No expected SLA or resolution deadline provided to taxpayers.'
      ]
    },
    {
      title: 'Duplicate & Spam Overload',
      color: C.amber,
      points: [
        'Multiple neighbors report the exact same water leak or pothole.',
        'Field departments are inundated with 10+ tickets for 1 incident.',
        'Wastes administrative manpower on manual verification & triage.'
      ]
    },
    {
      title: 'FIFO Flaw & Ghost Closures',
      color: C.purple,
      points: [
        'Urgent hazards (live electrical wires) wait behind cosmetic complaints.',
        'Contractors mark tickets "Resolved" on paper without proof.',
        'No citizen satisfaction feedback loop or civic accountability.'
      ]
    }
  ];

  pillars.forEach((p, idx) => {
    const x = 0.8 + idx * 4.0;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 4.8,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });
    // Top colored strip
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 0.6,
      fill: { color: p.color }
    });
    slide.addText(p.title, {
      x: x + 0.2, y: 1.7, w: 3.3, h: 0.6,
      fontSize: 14, fontFace: 'Arial', bold: true, color: 'FFFFFF',
      align: 'center', valign: 'middle'
    });
    // Bullet content
    slide.addText(p.points.map(pt => `•  ${pt}`).join('\n\n'), {
      x: x + 0.3, y: 2.5, w: 3.1, h: 3.8,
      fontSize: 12, fontFace: 'Arial', color: C.textDark,
      lineSpacing: 20
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 2: BACKGROUND]\n"In our cities, civic grievance redressal is crippled by three fundamental bottlenecks:\nFirst, Bureaucratic Opacity: When a citizen reports an overflowing sewer, they have no visibility into who is handling it or when it will be fixed.\nSecond, Duplicate Ticket Overload: When a pothole appears on a busy road, 15 different residents file 15 separate complaints. Municipal officers waste days manually triaging duplicates.\nThird, The FIFO Flaw and Ghost Resolutions: Traditional systems handle complaints First-In, First-Out. A life-threatening open live wire sits behind park grass trimming. Furthermore, contractors often mark tickets resolved on paper without ever visiting the site. CivicFix solves every one of these problems through software."`);
}

// ==========================================
// SLIDE 3: Problem Statement & Objectives
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 1: Objectives', 'Problem Statement & Academic Project Scope', 3);

  // Left Box: Problem Statement
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 5.6, h: 5.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Core Problem Statement', {
    x: 1.1, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: 'Arial', bold: true, color: C.rose
  });
  slide.addText(
    '"How can municipal corporations systematically eliminate ticket duplication, dynamically prioritize life-threatening civic emergencies, enforce photographic resolution proof, and empower citizens with transparent real-time tracking across diverse administrative roles?"',
    {
      x: 1.1, y: 2.4, w: 5.0, h: 1.5,
      fontSize: 13, fontFace: 'Arial', italic: true, color: C.textMuted, lineSpacing: 20
    }
  );
  slide.addText('System Boundaries & Academic Constraints:', {
    x: 1.1, y: 4.0, w: 5.0, h: 0.35,
    fontSize: 12, fontFace: 'Arial', bold: true, color: C.textDark
  });
  slide.addText(
    '• Focuses on urban local body (ULB) civic issues (Roads, Water, Waste, Lights, Safety).\n• Implements strict RBAC across 3 roles: Citizen, Field Officer, Administrator.\n• Production-ready full-stack architecture with automated test coverage.',
    {
      x: 1.1, y: 4.4, w: 5.0, h: 2.1,
      fontSize: 11.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 18
    }
  );

  // Right Box: Five Core Objectives
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: 1.7, w: 5.6, h: 5.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Five Core Project Objectives', {
    x: 7.2, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 16, fontFace: 'Arial', bold: true, color: C.primary
  });

  const objectives = [
    { num: '1', title: 'Geospatial Ticket Creation', desc: 'Pin exact coordinates via interactive Leaflet map & photo upload.' },
    { num: '2', title: 'Intelligent Duplicate Suppression', desc: 'Use Haversine distance (<150m) & Jaccard token similarity.' },
    { num: '3', title: 'Dynamic Smart Priority Engine', desc: 'Algorithmic 0–100 score balancing severity, aging & crowd votes.' },
    { num: '4', title: 'Verifiable Proof Workflow', desc: 'Mandatory photo proof & citizen confirmation before ticket closure.' },
    { num: '5', title: 'Stateless Enterprise Security', desc: 'JWT HMAC-SHA256, BCrypt hashing, and strict Spring Security RBAC.' }
  ];

  objectives.forEach((obj, i) => {
    const y = 2.45 + i * 0.8;
    slide.addShape(pptx.shapes.OVAL, {
      x: 7.2, y: y + 0.05, w: 0.35, h: 0.35,
      fill: { color: C.primary }
    });
    slide.addText(obj.num, {
      x: 7.2, y: y + 0.05, w: 0.35, h: 0.35,
      fontSize: 11, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });
    slide.addText(`${obj.title}: `, {
      x: 7.7, y: y, w: 4.5, h: 0.35,
      fontSize: 11.5, fontFace: 'Arial', bold: true, color: C.textDark
    });
    slide.addText(obj.desc, {
      x: 7.7, y: y + 0.28, w: 4.5, h: 0.45,
      fontSize: 10.5, fontFace: 'Arial', color: C.textMuted
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 3: OBJECTIVES]\n"This brings us to our core research and engineering objectives. We set out to design a system that answers: 'How can municipal bodies eliminate spam duplicates, prioritize life-threatening emergencies, enforce photographic resolution proof, and empower citizens with real-time tracking?'\nWe defined five concrete objectives: geospatial reporting with GPS pinning, intelligent duplicate suppression, dynamic mathematical priority calculation from 0 to 100, verifiable resolution workflows, and enterprise stateless JWT security."`);
}

// ==========================================
// SLIDE 4: Existing System vs Proposed CivicFix
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 1: Comparison', 'Comparative Analysis: Existing Systems vs. CivicFix', 4);

  // Table Data
  const headers = [
    { text: 'Evaluation Dimension', options: { bold: true, fill: '1E293B', color: 'FFFFFF', align: 'center', fontSize: 11 } },
    { text: 'Traditional Civic Portals', options: { bold: true, fill: '475569', color: 'FFFFFF', align: 'center', fontSize: 11 } },
    { text: 'CivicFix Proposed Platform', options: { bold: true, fill: '1D4ED8', color: 'FFFFFF', align: 'center', fontSize: 11 } }
  ];

  const rows = [
    ['Incident Pinning', 'Manual text address (vague landmarks, errors)', 'Interactive Leaflet GPS map with exact coordinates'],
    ['Duplicate Handling', 'None; duplicates clutter database & officer queues', 'Haversine formula (<150m) + Jaccard token similarity'],
    ['Queue Priority', 'First-In-First-Out (FIFO); hazards wait in line', 'Automated 0–100 score (Severity, Votes, Aging, Keywords)'],
    ['Resolution Integrity', 'Verbal/paper sign-off; widespread "ghost" closures', 'Mandatory resolution photo proof + officer remarks'],
    ['Citizen Feedback', 'None; ticket is closed without citizen input', 'Citizen confirms satisfaction & awards reputation points'],
    ['Audit & Security', 'Shared logins, mutable records, session state', 'Stateless JWT HMAC-SHA256, BCrypt, immutable audit trail'],
    ['Community Voice', 'Individual isolated complaints', 'Crowdsourced upvoting to organically escalate priority']
  ];

  const tableData = [headers];
  rows.forEach((r, idx) => {
    const bgColor = idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC';
    tableData.push([
      { text: r[0], options: { bold: true, fill: bgColor, color: C.textDark, fontSize: 10 } },
      { text: r[1], options: { fill: bgColor, color: C.rose, fontSize: 10 } },
      { text: r[2], options: { bold: true, fill: bgColor, color: C.emerald, fontSize: 10 } }
    ]);
  });

  slide.addTable(tableData, {
    x: 0.8, y: 1.7, w: 11.7, h: 4.9,
    colW: [2.5, 4.6, 4.6],
    border: { pt: 1, color: C.cardBorder },
    valign: 'middle'
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 4: COMPARATIVE ANALYSIS]\n"To justify the engineering value of CivicFix, we evaluated it against existing municipal portals like traditional helpline portals. As seen in this comparison matrix:\nWhile existing systems rely on vague text addresses, CivicFix uses GPS coordinates.\nWhile legacy portals suffer from duplicate ticket flooding, CivicFix checks for duplicates within 150 meters before submission.\nWhile traditional systems process tickets FIFO, CivicFix prioritizes issues using a 0–100 urgency score.\nAnd most critically, while contractors often close complaints on paper without fixing them, CivicFix requires mandatory photographic proof and citizen satisfaction confirmation."`);
}

// ==========================================
// SLIDE 5: 3-Tier Multi-Role Architecture
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 2: User Roles', 'Three-Tier Role-Based Separation of Concerns', 5);

  const roles = [
    {
      role: 'ROLE_CITIZEN',
      title: 'Citizens (Public)',
      color: C.primary,
      icon: 'USER',
      features: [
        'Secure registration with BCrypt hashing',
        'Report issues with GPS & photo evidence',
        'Real-time duplicate detection warning',
        'Crowdsourced upvoting on public issues',
        'Track status & confirm resolution satisfaction',
        'Earn civic reputation points ledger'
      ]
    },
    {
      role: 'ROLE_EMPLOYEE',
      title: 'Field Officers (Staff)',
      color: C.accent,
      icon: 'WORKER',
      features: [
        'Personal departmental work queue',
        'Acknowledge tickets to "In Progress"',
        'Inspect GPS map & citizen photos',
        'Mandatory resolution photo upload',
        'Submit official completion remarks',
        'SLA deadline compliance tracking'
      ]
    },
    {
      role: 'ROLE_ADMIN',
      title: 'Administrators (Supervisors)',
      color: C.purple,
      icon: 'ADMIN',
      features: [
        'Executive municipal control center',
        'Verify incoming reports or reject spam',
        'Assign tickets to Departments & Officers',
        'Adjust urgency scores & severity ratings',
        'Real-time category & resolution analytics',
        'Full immutable audit log oversight'
      ]
    }
  ];

  roles.forEach((r, idx) => {
    const x = 0.8 + idx * 4.0;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 4.8,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });

    // Header badge
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 0.8,
      fill: { color: r.color }
    });
    slide.addText(r.role, {
      x: x + 0.2, y: 1.78, w: 3.3, h: 0.3,
      fontSize: 10, fontFace: 'Arial', bold: true, color: 'E2E8F0', align: 'center'
    });
    slide.addText(r.title, {
      x: x + 0.2, y: 2.05, w: 3.3, h: 0.35,
      fontSize: 14, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center'
    });

    // Feature list
    slide.addText(r.features.map(f => `✓  ${f}`).join('\n\n'), {
      x: x + 0.3, y: 2.7, w: 3.1, h: 3.6,
      fontSize: 11.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 18
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 5: 3-TIER ROLES]\n"CivicFix enforces a strict three-tier role-based architecture:\nTier 1 is the Citizen: They can register, pin issues on a map, upload photos, upvote community tickets, and earn reputation points.\nTier 2 is the Field Officer: Municipal workers assigned to specific departments. They receive an authenticated queue, accept assignments, and cannot mark a ticket resolved without uploading photographic proof.\nTier 3 is the Administrator: Supervisors who oversee the entire municipality. They verify tickets, route them to departments, monitor SLAs, and review analytics."`);
}

// ==========================================
// SLIDE 6: System Architecture & Technology Stack
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 3: Architecture', 'End-to-End Enterprise System Architecture', 6);

  // 4 Horizontal Architectural Layers
  const layers = [
    {
      num: 'Layer 1: Client Tier',
      tech: 'React 18.3 | Vite 5.4 | React Router 7 | Leaflet 1.9 | Axios',
      desc: 'Responsive Single Page Application (SPA), interactive OpenStreetMap geospatial viewer, debounced duplicate checks, and automated JWT Bearer token injection via Axios interceptors.',
      color: C.primary
    },
    {
      num: 'Layer 2: Security & Gateway Tier',
      tech: 'Spring Security 6 | Stateless JWT (HS256) | BCrypt | CORS Filter',
      desc: 'Extracts Bearer token, validates HMAC-SHA256 signature, validates 24h expiration, populates SecurityContextHolder with authorities, and enforces method-level RBAC.',
      color: C.accent
    },
    {
      num: 'Layer 3: Business & Service Tier',
      tech: 'Spring Boot 3.4.3 | Spring MVC REST Controllers | @Transactional Services',
      desc: 'REST Controllers exposing JSON endpoints. Core business services encapsulating Haversine duplicate detection, dynamic priority calculation, and reputation auditing.',
      color: C.purple
    },
    {
      num: 'Layer 4: Data Persistence Tier',
      tech: 'Spring Data JPA | Hibernate ORM | HikariCP Pool | MySQL 8.0 (ACID)',
      desc: '10 relational tables in Third Normal Form (3NF). B-Tree composite indexing on spatial coordinates and status. Declarative transaction rollbacks on failure.',
      color: C.navy || '1E293B'
    }
  ];

  layers.forEach((l, idx) => {
    const y = 1.7 + idx * 1.25;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y, w: 11.7, h: 1.15,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });
    // Left colored pill
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y, w: 2.8, h: 1.15,
      fill: { color: l.color }
    });
    slide.addText(l.num, {
      x: 0.9, y: y + 0.15, w: 2.6, h: 0.35,
      fontSize: 12, fontFace: 'Arial', bold: true, color: 'FFFFFF'
    });
    slide.addText(l.tech, {
      x: 0.9, y: y + 0.5, w: 2.6, h: 0.55,
      fontSize: 9.5, fontFace: 'Arial', color: 'E2E8F0', lineSpacing: 12
    });

    // Right description
    slide.addText(l.desc, {
      x: 3.8, y: y + 0.15, w: 8.4, h: 0.85,
      fontSize: 11.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 16
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 6: ARCHITECTURE]\n"Here is the architectural blueprint of CivicFix. The application follows a decoupled multi-tier enterprise architecture:\nAt Layer 1, we have a React 18 Single Page Application powered by Vite and Leaflet maps for high performance.\nAt Layer 2, Spring Security 6 provides stateless JWT authentication, validating user credentials without server-side session overhead.\nAt Layer 3, Spring Boot REST controllers manage domain operations, delegating to specialized transactional services for priority and duplicate computation.\nAt Layer 4, Spring Data JPA and Hibernate interact with an ACID-compliant MySQL database through a high-performance HikariCP connection pool."`);
}

// ==========================================
// SLIDE 7: Smart Algorithm 1: Dynamic Priority Scoring
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 3: Core Algorithms', 'Smart Algorithm 1: Dynamic Priority Scoring Engine', 7);

  // Top Formula Banner
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 11.7, h: 0.8,
    fill: { color: '1E3A8A' },
    line: { color: C.primary, width: 1.5 }
  });
  slide.addText('Mathematical Formula:   Priority Score (P)  =  S_base  +  V_boost  +  A_escalation  +  K_bonus   ∈  [0.0, 100.0]', {
    x: 0.8, y: 1.7, w: 11.7, h: 0.8,
    fontSize: 14, fontFace: 'Courier New', bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
  });

  // 4 Factor Cards
  const factors = [
    {
      term: 'S_base',
      name: 'Base Severity',
      formula: 'Severity × 15.0',
      range: '[15.0 – 75.0]',
      desc: 'Assigned 1 to 5 scale by citizen or verified by admin based on physical magnitude of issue.'
    },
    {
      term: 'V_boost',
      name: 'Community Votes',
      formula: 'min(Votes × 2.0, 10.0)',
      range: '[0.0 – 10.0]',
      desc: 'Crowdsourced democratic upvoting by verified local residents amplifies attention.'
    },
    {
      term: 'A_escalation',
      name: 'Aging Escalation',
      formula: 'min(Days × 1.0, 10.0)',
      range: '[0.0 – 10.0]',
      desc: 'Increases 1 point per day unsolved. Guarantees neglected issues bubble to the top.'
    },
    {
      term: 'K_bonus',
      name: 'Hazard Keywords',
      formula: '+5.0 if matched',
      range: '[0.0 or 5.0]',
      desc: 'NLP scan for danger keywords: "spark", "collapse", "danger", "fire", "burst", "overflow".'
    }
  ];

  factors.forEach((f, idx) => {
    const x = 0.8 + idx * 3.0;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.7, w: 2.7, h: 2.6,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });
    slide.addText(f.term, {
      x: x + 0.15, y: 2.85, w: 2.4, h: 0.35,
      fontSize: 14, fontFace: 'Courier New', bold: true, color: C.primary, align: 'center'
    });
    slide.addText(f.name, {
      x: x + 0.15, y: 3.15, w: 2.4, h: 0.3,
      fontSize: 11, fontFace: 'Arial', bold: true, color: C.textDark, align: 'center'
    });
    slide.addText(f.formula, {
      x: x + 0.15, y: 3.5, w: 2.4, h: 0.3,
      fontSize: 10, fontFace: 'Courier New', color: C.rose, align: 'center'
    });
    slide.addText(`Bounds: ${f.range}`, {
      x: x + 0.15, y: 3.8, w: 2.4, h: 0.25,
      fontSize: 9.5, fontFace: 'Arial', color: C.textMuted, align: 'center'
    });
    slide.addText(f.desc, {
      x: x + 0.2, y: 4.1, w: 2.3, h: 1.1,
      fontSize: 9.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 14
    });
  });

  // SLA Tiers Strip
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 5.5, w: 11.7, h: 1.1,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Automated SLA Urgency Classification Tiers:', {
    x: 1.0, y: 5.6, w: 11.3, h: 0.3,
    fontSize: 11, fontFace: 'Arial', bold: true, color: C.textDark
  });

  const tiers = [
    { name: 'CRITICAL (≥ 85.0)', desc: 'Immediate dispatch (24h SLA)', color: C.rose },
    { name: 'HIGH (65.0 – 84.9)', desc: 'Expedited resolution (48h SLA)', color: C.amber },
    { name: 'MEDIUM (35.0 – 64.9)', desc: 'Scheduled maintenance (5d SLA)', color: C.primary },
    { name: 'LOW (< 35.0)', desc: 'Routine cosmetic repair (14d SLA)', color: C.emerald }
  ];

  tiers.forEach((t, i) => {
    const tx = 1.0 + i * 2.85;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: tx, y: 6.0, w: 2.65, h: 0.45,
      fill: { color: t.color }
    });
    slide.addText(`${t.name}\n${t.desc}`, {
      x: tx, y: 6.0, w: 2.65, h: 0.45,
      fontSize: 8.5, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 7: DYNAMIC PRIORITY]\n"One of the crowning engineering features of CivicFix is the Smart Priority Service. In traditional systems, complaints sit in a FIFO queue. In CivicFix, we compute a 0 to 100 mathematical priority score combining 4 orthogonal factors:\nFirst, Base Severity: 15 to 75 points directly from severity rating.\nSecond, Community Votes: Up to 10 points boosted by neighbor upvotes.\nThird, Aging Escalation: Every single day a complaint sits unresolved, it gains 1 point up to 10 points, ensuring older tickets are never buried.\nFourth, Hazard Keywords: If safety terms like 'spark', 'collapse', or 'fire' appear, an extra 5-point emergency bonus is added.\nThe final score maps to SLA tiers: Critical, High, Medium, and Low."`);
}

// ==========================================
// SLIDE 8: Smart Algorithm 2: Geospatial Duplicate Detection
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 3: Core Algorithms', 'Smart Algorithm 2: Geospatial Duplicate Detection', 8);

  // Left Box: Two-Stage Algorithmic Logic
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 6.2, h: 5.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Two-Stage Geospatial Duplicate Logic', {
    x: 1.1, y: 1.9, w: 5.6, h: 0.4,
    fontSize: 15, fontFace: 'Arial', bold: true, color: C.primary
  });

  const steps = [
    {
      title: 'Stage 1: Radius Pre-Filtering (d ≤ 150m)',
      desc: 'Retrieves all open complaints in the same category within 150 meters using database spatial bounding box.'
    },
    {
      title: 'Stage 2A: Immediate Proximity Check (d ≤ 40m)',
      desc: 'If two reports occur within 40 meters in the same category (e.g. same street corner), it is flagged as an instant duplicate.'
    },
    {
      title: 'Stage 2B: Semantic Text Similarity (40m < d ≤ 150m)',
      desc: 'Computes Jaccard Token Similarity between titles and descriptions: J(A, B) = |A ∩ B| / |A ∪ B|. If J > 0.25, flagged as duplicate.'
    },
    {
      title: 'Stage 3: Debounced Client-Side Warning',
      desc: 'Warns citizen before submission, showing the existing complaint ID, distance, and providing an instant Upvote shortcut.'
    }
  ];

  steps.forEach((s, idx) => {
    const y = 2.4 + idx * 1.05;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 1.1, y, w: 5.6, h: 0.95,
      fill: { color: C.cardHeader }
    });
    slide.addText(s.title, {
      x: 1.25, y: y + 0.1, w: 5.3, h: 0.3,
      fontSize: 11, fontFace: 'Arial', bold: true, color: C.primaryDark
    });
    slide.addText(s.desc, {
      x: 1.25, y: y + 0.38, w: 5.3, h: 0.5,
      fontSize: 9.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 13
    });
  });

  // Right Box: Mathematical Formulas
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.3, y: 1.7, w: 5.2, h: 5.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Underlying Mathematical Formulas', {
    x: 7.6, y: 1.9, w: 4.6, h: 0.4,
    fontSize: 15, fontFace: 'Arial', bold: true, color: C.accent
  });

  slide.addText('1. Haversine Great-Circle Distance Formula:', {
    x: 7.6, y: 2.4, w: 4.6, h: 0.3,
    fontSize: 11, fontFace: 'Arial', bold: true, color: C.textDark
  });
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.6, y: 2.75, w: 4.6, h: 1.35,
    fill: { color: 'F1F5F9' },
    line: { color: C.cardBorder, width: 1 }
  });
  slide.addText(
    'a = sin²(Δφ/2) + cos φ₁ · cos φ₂ · sin²(Δλ/2)\n\n' +
    'd = 2 · R · atan2( √a, √(1−a) )\n\n' +
    'Where R = 6,371,000 meters (Earth radius)',
    {
      x: 7.8, y: 2.85, w: 4.2, h: 1.15,
      fontSize: 10, fontFace: 'Courier New', color: C.primaryDark
    }
  );

  slide.addText('2. Jaccard Token Set Similarity:', {
    x: 7.6, y: 4.3, w: 4.6, h: 0.3,
    fontSize: 11, fontFace: 'Arial', bold: true, color: C.textDark
  });
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.6, y: 4.65, w: 4.6, h: 1.15,
    fill: { color: 'F1F5F9' },
    line: { color: C.cardBorder, width: 1 }
  });
  slide.addText(
    'J(A, B) = |A ∩ B| / |A ∪ B|\n\n' +
    'Threshold: If J(A, B) > 0.25 (25% word overlap)\nand d ≤ 150m  =>  Flag as Duplicate',
    {
      x: 7.8, y: 4.75, w: 4.2, h: 0.95,
      fontSize: 10, fontFace: 'Courier New', color: C.rose
    }
  );

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 8: GEOSPATIAL DUPLICATES]\n"The second major algorithm solves duplicate complaint flooding. We implemented a two-stage filter:\nWhen a citizen selects a location and category, our backend executes the Haversine Great-Circle formula using Earth's radius of 6,371 km.\nIf an existing complaint in the same category is within 40 meters, it is an immediate duplicate.\nIf it is between 40 and 150 meters, we apply Jaccard Token Similarity. The text is tokenized into word sets, and if the intersection over union exceeds 0.25, the system warns the citizen before they submit, letting them upvote the existing ticket instead."`);
}

// ==========================================
// SLIDE 9: Complaint Lifecycle State Machine
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 3: Workflows', 'Audited Complaint Lifecycle State Machine', 9);

  // States flow representation (5 horizontal cards with arrows)
  const states = [
    { name: '1. SUBMITTED', actor: 'Citizen', desc: 'GPS, Photo, Severity logged. Priority score calculated.', color: C.primary },
    { name: '2. VERIFIED', actor: 'Admin', desc: 'Admin validates authenticity. Sets dept & SLA deadline.', color: C.purple },
    { name: '3. IN_PROGRESS', actor: 'Field Officer', desc: 'Assigned officer accepts work & mobilizes on-site.', color: C.amber },
    { name: '4. RESOLVED', actor: 'Field Officer', desc: 'MANDATORY photo proof & remarks uploaded.', color: C.accent },
    { name: '5. CONFIRMED', actor: 'Citizen', desc: 'Citizen verifies fix. +15 reputation awarded.', color: C.emerald }
  ];

  states.forEach((st, idx) => {
    const x = 0.8 + idx * 2.38;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 2.2, h: 2.8,
      fill: { color: C.cardBg },
      line: { color: st.color, width: 2 }
    });
    // Header
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 2.2, h: 0.55,
      fill: { color: st.color }
    });
    slide.addText(st.name, {
      x: x + 0.1, y: 1.7, w: 2.0, h: 0.55,
      fontSize: 10, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });
    slide.addText(`Actor: ${st.actor}`, {
      x: x + 0.15, y: 2.35, w: 1.9, h: 0.3,
      fontSize: 10, fontFace: 'Arial', bold: true, color: C.textDark, align: 'center'
    });
    slide.addText(st.desc, {
      x: x + 0.15, y: 2.7, w: 1.9, h: 1.6,
      fontSize: 9.5, fontFace: 'Arial', color: C.textMuted, lineSpacing: 14
    });

    // Arrow to next state (except last)
    if (idx < states.length - 1) {
      slide.addText('➔', {
        x: x + 2.15, y: 2.8, w: 0.3, h: 0.4,
        fontSize: 16, fontFace: 'Arial', bold: true, color: C.textMuted, align: 'center'
      });
    }
  });

  // Strict Accountability Rules (Bottom Box)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.8, w: 11.7, h: 1.9,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Core Accountability Guarantees & Fraud Prevention:', {
    x: 1.1, y: 4.95, w: 11.1, h: 0.3,
    fontSize: 12, fontFace: 'Arial', bold: true, color: C.rose
  });

  const rules = [
    'No "Ghost" Resolutions: System throws HTTP 400 Bad Request if resolutionProofPhotoUrl or resolutionRemarks is blank.',
    'Closed-Loop Citizen Confirmation: Only the citizen who filed the complaint (or Admin override) can confirm satisfaction.',
    'Immutable Audit Ledger: Every transition writes a permanent entry to status_history table with timestamp and officer ID.',
    'Gamified Citizen Trust: Citizens receive +10 points for valid reports, +15 for confirming resolution, and -20 for abusive spam.'
  ];

  rules.forEach((r, i) => {
    slide.addText(`•  ${r}`, {
      x: 1.1, y: 5.3 + i * 0.32, w: 11.1, h: 0.3,
      fontSize: 10.5, fontFace: 'Arial', color: C.textDark
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 9: STATE MACHINE]\n"CivicFix enforces a deterministic state machine:\n1. SUBMITTED by the citizen.\n2. VERIFIED by the administrator who assigns an official department and officer.\n3. IN_PROGRESS when the officer accepts the work.\n4. RESOLVED: And here is our crucial defense against fraud—an officer CANNOT mark a complaint resolved without uploading photographic proof and remarks. The backend enforces this strictly.\n5. CONFIRMED: The final state is confirmed by the reporting citizen, closing the loop and awarding 15 reputation points."`);
}

// ==========================================
// SLIDE 10: Relational Database Architecture
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 4: Data Design', 'Relational Database Architecture (10 Normalized 3NF Tables)', 10);

  // 10 Tables Grid (5 left, 5 right)
  const tables = [
    { name: '1. users', role: 'Citizens, Employees, Admins with BCrypt hashes & reputation scores' },
    { name: '2. departments', role: 'Municipal divisions (Roads, Water Works, Sanitation, Power, Parks)' },
    { name: '3. complaints', role: 'Core grievance entity with GPS lat/lon, severity, priority score, & SLA' },
    { name: '4. complaint_media', role: 'Original photographic evidence & resolution proof images' },
    { name: '5. comments', role: 'Two-way citizen-officer discussion thread per ticket' },
    { name: '6. votes', role: 'Unique upvotes preventing double-voting via composite UNIQUE(user, complaint)' },
    { name: '7. assignments', role: 'Audit trail of department and officer delegations with due dates' },
    { name: '8. status_history', role: 'Immutable chronological state transition ledger with changed_by timestamps' },
    { name: '9. notifications', role: 'Real-time alert notifications dispatched on ticket updates' },
    { name: '10. reputation_tx', role: 'Itemized double-entry credit/debit civic points ledger' }
  ];

  tables.forEach((t, i) => {
    const col = i < 5 ? 0 : 1;
    const row = i % 5;
    const x = 0.8 + col * 5.95;
    const y = 1.7 + row * 0.95;

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.75, h: 0.85,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.2 }
    });
    slide.addText(t.name, {
      x: x + 0.2, y: y + 0.1, w: 5.3, h: 0.3,
      fontSize: 11, fontFace: 'Arial', bold: true, color: C.primary
    });
    slide.addText(t.role, {
      x: x + 0.2, y: y + 0.38, w: 5.3, h: 0.42,
      fontSize: 9.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 13
    });
  });

  // DB Highlights Strip
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 6.55, w: 11.7, h: 0.35,
    fill: { color: 'F1F5F9' },
    line: { color: C.cardBorder, width: 1 }
  });
  slide.addText('Key Schema Strengths: Normalized to 3NF | Composite B-Tree Spatial Indexes | Foreign Key Cascades | ACID Compliance via HikariCP', {
    x: 0.8, y: 6.55, w: 11.7, h: 0.35,
    fontSize: 9, fontFace: 'Arial', bold: true, color: C.textMuted, align: 'center', valign: 'middle'
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 10: DATABASE]\n"Coming to the database design, CivicFix uses MySQL 8.0 normalized to Third Normal Form across 10 specialized tables.\nThe 'complaints' table stores latitude, longitude, dynamic priority scores, and SLA status.\nThe 'votes' table has a composite unique constraint to enforce one vote per citizen per ticket.\nThe 'status_history' table acts as an immutable audit log.\nAnd we use B-tree composite indexes on latitude, longitude, and status to keep geospatial duplicate queries lightning-fast."`);
}

// ==========================================
// SLIDE 11: Security & Verification
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 4: Security & Testing', 'Security Hardening & Automated Test Verification', 11);

  // Left Column: Security Hardening
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.7, w: 5.6, h: 5.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Multi-Layer Security Architecture', {
    x: 1.1, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 15, fontFace: 'Arial', bold: true, color: C.rose
  });

  const secFeatures = [
    { title: 'Stateless JWT Auth (HS256)', desc: '24-hour expiration, tamper-proof cryptographic signatures with 256-bit secret key.' },
    { title: 'BCrypt Salted Password Hashing', desc: 'Work factor 10 hashing defends against dictionary and rainbow table attacks.' },
    { title: 'Method-Level RBAC', desc: 'Spring Security enforces hasRole(\'ADMIN\'), hasRole(\'EMPLOYEE\'), hasRole(\'CITIZEN\').' },
    { title: 'SQLi & XSS Prevention', desc: 'Parameterized Spring Data JPA queries and React automatic HTML entity escaping.' },
    { title: 'RFC 7807 Global Exception Handling', desc: 'Centralized @RestControllerAdvice eliminates credential leakage in stack traces.' }
  ];

  secFeatures.forEach((s, idx) => {
    const y = 2.4 + idx * 0.82;
    slide.addText(`🔒  ${s.title}`, {
      x: 1.1, y, w: 5.0, h: 0.3,
      fontSize: 11, fontFace: 'Arial', bold: true, color: C.textDark
    });
    slide.addText(s.desc, {
      x: 1.4, y: y + 0.26, w: 4.7, h: 0.45,
      fontSize: 9.5, fontFace: 'Arial', color: C.textMuted, lineSpacing: 13
    });
  });

  // Right Column: Automated Test Verification
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: 1.7, w: 5.6, h: 5.0,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('57 Automated Tests (100% Pass Rate)', {
    x: 7.2, y: 1.9, w: 5.0, h: 0.4,
    fontSize: 15, fontFace: 'Arial', bold: true, color: C.emerald
  });

  // 100% Pass Badge
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.2, y: 2.4, w: 5.0, h: 0.7,
    fill: { color: 'ECFDF5' },
    line: { color: C.emerald, width: 1.5 }
  });
  slide.addText('TEST EXECUTION METRICS: 57 PASSED | 0 FAILED | 0 SKIPPED\nFrameworks: JUnit 5, Mockito, Spring Boot Test, MockMvc', {
    x: 7.2, y: 2.4, w: 5.0, h: 0.7,
    fontSize: 10, fontFace: 'Arial', bold: true, color: C.emerald, align: 'center', valign: 'middle'
  });

  const tests = [
    { name: 'DuplicateDetectionServiceTest', desc: 'Verifies Haversine accuracy, edge cases at 39m/41m/150m, and Jaccard token set thresholds.' },
    { name: 'SmartPriorityServiceTest', desc: 'Asserts priority formulas, keyword bonuses, aging calculations, and SLA tier mappings.' },
    { name: 'ComplaintControllerSecurityTest', desc: 'Validates 401 Unauthorized on missing JWT, 403 Forbidden on role mismatch.' },
    { name: 'ResolutionWorkflowIntegrationTest', desc: 'Verifies resolution rejection when photo is absent and reputation credit on confirmation.' }
  ];

  tests.forEach((t, i) => {
    const y = 3.25 + i * 0.82;
    slide.addText(`✓  ${t.name}`, {
      x: 7.2, y, w: 5.0, h: 0.3,
      fontSize: 10.5, fontFace: 'Arial', bold: true, color: C.primary
    });
    slide.addText(t.desc, {
      x: 7.5, y: y + 0.25, w: 4.7, h: 0.45,
      fontSize: 9.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 13
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 11: SECURITY & TESTING]\n"Security and quality assurance were paramount during development:\nFor security: We use BCrypt with cost factor 10 for password encryption, stateless JWT tokens with HMAC-SHA256 signatures, and role-based access control protecting every endpoint.\nFor verification: The repository is covered by 57 automated unit and integration tests passing at 100%.\nThese tests rigorously check Haversine boundary calculations, priority formulas, security filters, and resolution proof validations."`);
}

// ==========================================
// SLIDE 12: User Interface & Experience
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 4: Demonstration', 'User Interface & Frontend Interactive Workflows', 12);

  // 3 Portal Cards
  const portals = [
    {
      title: 'Citizen Portal & Map',
      badge: 'Public Web Application',
      color: C.primary,
      points: [
        'Interactive OpenStreetMap pinning using Leaflet',
        'Live duplicate alert modal as user enters location',
        'Direct photo evidence upload with file validation',
        'Feed of neighborhood issues with upvote counters',
        'Real-time ticket tracking timeline with status badges'
      ]
    },
    {
      title: 'Field Officer Mobile View',
      badge: 'Municipal Employee App',
      color: C.accent,
      points: [
        'Dedicated task queue filtered by assigned department',
        'Turn-by-turn coordinate view for site navigation',
        'One-click transition from ASSIGNED to IN_PROGRESS',
        'Camera capture integration for resolution proof',
        'Formal completion notes logging'
      ]
    },
    {
      title: 'Admin Command Center',
      badge: 'Executive Oversight',
      color: C.purple,
      points: [
        'Municipal dashboard with live KPI counters',
        'Category breakdown charts (Roads, Water, etc.)',
        'SLA breach escalation & overdue ticket alerts',
        'One-click department & officer assignment',
        'Spam rejection & citizen reputation adjustment'
      ]
    }
  ];

  portals.forEach((p, idx) => {
    const x = 0.8 + idx * 4.0;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 4.8,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 0.85,
      fill: { color: p.color }
    });
    slide.addText(p.title, {
      x: x + 0.2, y: 1.78, w: 3.3, h: 0.35,
      fontSize: 13, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center'
    });
    slide.addText(p.badge, {
      x: x + 0.2, y: 2.15, w: 3.3, h: 0.25,
      fontSize: 9.5, fontFace: 'Arial', color: 'E2E8F0', align: 'center'
    });

    slide.addText(p.points.map(pt => `•  ${pt}`).join('\n\n'), {
      x: x + 0.3, y: 2.75, w: 3.1, h: 3.5,
      fontSize: 11, fontFace: 'Arial', color: C.textDark, lineSpacing: 17
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 12: USER INTERFACE]\n"On the frontend, CivicFix provides tailored interfaces for each role:\nFor Citizens, the interface makes reporting intuitive—they drop a pin on Leaflet map, attach a photo, and immediately see if someone else reported it.\nFor Field Officers, the responsive layout works on mobile browsers so officers can view coordinates on-site and upload resolution photos directly from their phones.\nFor Administrators, the dashboard provides municipal-level KPIs, SLA escalation alerts, and assignment controls."`);
}

// ==========================================
// SLIDE 13: Feasibility Study & Real-World Impact
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 3: Feasibility', 'Project Feasibility & Municipal Socio-Economic Impact', 13);

  const feasibilities = [
    {
      title: 'Technical Feasibility',
      color: C.primary,
      points: [
        'Built on battle-tested enterprise technologies: Java 17/21, Spring Boot 3, MySQL 8.0, and React 18.',
        'High developer ecosystem support, extensive documentation, and zero proprietary licensing lock-ins.',
        'Horizontal scalability enabled by stateless JWT tokens and HikariCP connection pooling.'
      ]
    },
    {
      title: 'Operational Feasibility',
      color: C.accent,
      points: [
        'Intuitive UI requires zero technical training for general citizens and municipal field staff.',
        'Self-documenting workflows with automated email/in-app notifications for state changes.',
        'Seamless integration with standard municipal corporation administrative hierarchies.'
      ]
    },
    {
      title: 'Economic & Social Impact',
      color: C.emerald,
      points: [
        'Drastically slashes municipal waste: eliminates up to 70% of duplicate field investigation visits.',
        'Enforces contractor accountability: completely removes fraudulent ghost billings for unperformed work.',
        'Fosters civic engagement: citizens become active partners in urban maintenance and neighborhood safety.'
      ]
    }
  ];

  feasibilities.forEach((f, idx) => {
    const x = 0.8 + idx * 4.0;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 4.8,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 3.7, h: 0.65,
      fill: { color: f.color }
    });
    slide.addText(f.title, {
      x: x + 0.2, y: 1.7, w: 3.3, h: 0.65,
      fontSize: 13, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });
    slide.addText(f.points.map(pt => `•  ${pt}`).join('\n\n'), {
      x: x + 0.3, y: 2.55, w: 3.1, h: 3.7,
      fontSize: 11, fontFace: 'Arial', color: C.textDark, lineSpacing: 18
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 13: FEASIBILITY]\n"Looking at feasibility and impact:\nTechnically, CivicFix is built entirely on open-source, proven industry standards like Spring Boot and React, making deployment cost-effective.\nOperationally, the clean UI requires zero training for field staff or citizens.\nAnd economically and socially, it eliminates the massive financial waste of duplicate contractor visits and prevents ghost closures, ensuring taxpayers see real, verified results."`);
}

// ==========================================
// SLIDE 14: Future Scope & Roadmap
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Chapter 5: Future Scope', 'Future Enhancements & Technology Roadmap', 14);

  const futureCards = [
    {
      title: 'AI Image Verification (Computer Vision)',
      badge: 'Phase 2: ML Integration',
      color: C.primary,
      desc: 'Integrate pre-trained Vision AI models (TensorFlow / OpenCV) to automatically classify pothole depth, garbage volume, and verify that resolution photos actually fix the reported issue.'
    },
    {
      title: 'WhatsApp & SMS Grievance Bot',
      badge: 'Phase 2: Accessibility',
      color: C.accent,
      desc: 'Enable citizens to report issues directly via WhatsApp Business API by sending GPS live location and a photo, bridging the digital divide for elderly and non-smartphone users.'
    },
    {
      title: 'Smart City IoT Sensor Integration',
      badge: 'Phase 3: Smart Cities',
      color: C.purple,
      desc: 'Connect ultrasonic fill-level sensors in public garbage bins and acoustic water leak detectors to automatically spawn prioritized complaints before citizens even notice.'
    },
    {
      title: 'Native Mobile App (React Native)',
      badge: 'Phase 3: Field Deployment',
      color: C.emerald,
      desc: 'Compile shared React components into iOS and Android apps with offline caching, background geofencing, and push notifications for field municipal teams.'
    }
  ];

  futureCards.forEach((c, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.8 + col * 5.95;
    const y = 1.7 + row * 2.45;

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.75, h: 2.25,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.25, y: y + 0.2, w: 2.2, h: 0.3,
      fill: { color: c.color, transparency: 85 },
      line: { color: c.color, width: 1 }
    });
    slide.addText(c.badge.toUpperCase(), {
      x: x + 0.25, y: y + 0.2, w: 2.2, h: 0.3,
      fontSize: 8.5, fontFace: 'Arial', bold: true, color: c.color, align: 'center', valign: 'middle'
    });

    slide.addText(c.title, {
      x: x + 0.25, y: y + 0.58, w: 5.25, h: 0.35,
      fontSize: 13, fontFace: 'Arial', bold: true, color: C.textDark
    });
    slide.addText(c.desc, {
      x: x + 0.25, y: y + 0.95, w: 5.25, h: 1.15,
      fontSize: 10.5, fontFace: 'Arial', color: C.textMuted, lineSpacing: 16
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 14: FUTURE SCOPE]\n"While CivicFix is already a complete full-stack platform, we have mapped out exciting future enhancements:\n1. Computer Vision: To automatically analyze uploaded photos for pothole depth or trash severity.\n2. WhatsApp Grievance Bot: Letting citizens drop a location and photo on WhatsApp.\n3. IoT Smart City Sensors: For ultrasonic garbage bin sensors that automatically create tickets when full.\n4. Native Mobile Applications for offline field worker operations."`);
}

// ==========================================
// SLIDE 15: Conclusion & Summary
// ==========================================
{
  const slide = pptx.addSlide();
  applySlideTemplate(slide, 'Conclusion', 'Summary of Achievements & Engineering Takeaways', 15);

  // 4 Summary Metrics Cards
  const stats = [
    { num: '57 / 57', label: 'Automated Tests Passed', color: C.emerald },
    { num: '10 Tables', label: 'Normalized Relational Schema (3NF)', color: C.primary },
    { num: '0–100 SLA', label: 'Dynamic Urgency Priority Scoring', color: C.amber },
    { num: '150m + NLP', label: 'Geospatial Duplicate Suppression', color: C.purple }
  ];

  stats.forEach((st, idx) => {
    const x = 0.8 + idx * 3.0;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 1.7, w: 2.7, h: 1.4,
      fill: { color: C.cardBg },
      line: { color: C.cardBorder, width: 1.5 }
    });
    slide.addText(st.num, {
      x: x + 0.1, y: 1.85, w: 2.5, h: 0.55,
      fontSize: 22, fontFace: 'Arial', bold: true, color: st.color, align: 'center'
    });
    slide.addText(st.label, {
      x: x + 0.1, y: 2.45, w: 2.5, h: 0.45,
      fontSize: 10, fontFace: 'Arial', bold: true, color: C.textDark, align: 'center'
    });
  });

  // Main Conclusion Points
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 3.3, w: 11.7, h: 3.4,
    fill: { color: C.cardBg },
    line: { color: C.cardBorder, width: 1.5 }
  });
  slide.addText('Core Engineering Takeaways & Academic Deliverables:', {
    x: 1.1, y: 3.5, w: 11.1, h: 0.35,
    fontSize: 14, fontFace: 'Arial', bold: true, color: C.primaryDark
  });

  const takeaways = [
    'Successfully solved municipal grievance opacity using modern full-stack decoupled architecture.',
    'Eliminated duplicate ticket congestion using great-circle Haversine trigonometry combined with Jaccard token set similarity.',
    'Replaced inefficient FIFO queues with a fair, automated 0–100 SLA priority formula factoring in safety hazards and community votes.',
    'Enforced zero-trust resolution accountability requiring photographic evidence from field staff before ticket closure.',
    'Demonstrated robust software engineering discipline with 57 automated tests, comprehensive documentation, and strict role-based access control.'
  ];

  takeaways.forEach((t, i) => {
    slide.addText(`✓  ${t}`, {
      x: 1.1, y: 3.95 + i * 0.48, w: 11.1, h: 0.42,
      fontSize: 11.5, fontFace: 'Arial', color: C.textDark, lineSpacing: 16
    });
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 15: CONCLUSION]\n"In conclusion, CivicFix proves that thoughtful software engineering can solve persistent real-world governance challenges. By replacing blind FIFO queues with mathematical priority scoring, suppressing duplicates with geospatial calculations, and requiring photo proof for ticket closure, CivicFix transforms municipal problem-solving into a transparent, accountable, and citizen-first experience."`);
}

// ==========================================
// SLIDE 16: Q&A / Thank You Slide (Dark Academic Elegance)
// ==========================================
{
  const slide = pptx.addSlide();
  slide.background = { color: C.bgDark };

  slide.addText('THANK YOU', {
    x: 1.2, y: 1.5, w: 10.93, h: 0.9,
    fontSize: 46, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center'
  });
  slide.addText('Questions & Answers / Viva Discussion', {
    x: 1.2, y: 2.45, w: 10.93, h: 0.5,
    fontSize: 22, fontFace: 'Arial', bold: true, color: '60A5FA', align: 'center'
  });

  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 3.3, w: 8.33, h: 2.8,
    fill: { color: C.bgNavy },
    line: { color: '334155', width: 1.5 }
  });

  slide.addText('Project: CivicFix — Smart Civic Issue Reporting & Resolution Platform', {
    x: 2.8, y: 3.55, w: 7.73, h: 0.35,
    fontSize: 13, fontFace: 'Arial', bold: true, color: 'FFFFFF', align: 'center'
  });
  slide.addText('Candidate: Omji Savita | Roll No: 24116002349', {
    x: 2.8, y: 3.95, w: 7.73, h: 0.35,
    fontSize: 12, fontFace: 'Arial', color: 'CBD5E1', align: 'center'
  });
  slide.addText('Bachelor of Computer Applications (BCA)', {
    x: 2.8, y: 4.35, w: 7.73, h: 0.35,
    fontSize: 11, fontFace: 'Arial', color: '94A3B8', align: 'center'
  });
  slide.addText('PSIT College of Higher Education, Kanpur\n(Affiliated to Chhatrapati Shahu Ji Maharaj University, Kanpur)', {
    x: 2.8, y: 4.75, w: 7.73, h: 0.6,
    fontSize: 11, fontFace: 'Arial', color: '94A3B8', align: 'center', lineSpacing: 16
  });

  slide.addText('October 2026', {
    x: 1.2, y: 6.4, w: 10.93, h: 0.35,
    fontSize: 11, fontFace: 'Arial', color: '64748B', align: 'center'
  });

  slide.addNotes(`[SPEAKER SCRIPT - SLIDE 16: Q&A]\n"Thank you very much, respected supervisor and examiners. I am now open to your questions and feedback regarding the architecture, algorithms, or implementation of CivicFix."`);
}

// Generate the PPTX File
const outputDocsPath = path.join(__dirname, '..', 'CivicFix_Classroom_Presentation.pptx');
const outputDesktopPath = path.join('C:', 'Users', 'Administrator', 'Desktop', 'CivicFix_Classroom_Presentation.pptx');

pptx.writeFile({ fileName: outputDocsPath })
  .then(fileName => {
    console.log(`[SUCCESS] Presentation generated in project directory: ${outputDocsPath}`);
    // Copy to Desktop as well
    fs.copyFileSync(outputDocsPath, outputDesktopPath);
    console.log(`[SUCCESS] Presentation copied to Desktop: ${outputDesktopPath}`);
  })
  .catch(err => {
    console.error('[ERROR] Failed to generate PPTX:', err);
    process.exit(1);
  });
