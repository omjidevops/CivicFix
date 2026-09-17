// ============================================================================
// DAY 15 — ROOT APPLICATION COMPONENT (App.jsx)
// Combines PROPS with REACT STATE (useState) and EVENT HANDLING (onClick, onChange).
//
// Interactive Features Added:
// 1. Controlled Input with onChange (Live Citizen greeting)
// 2. Interactive Click Counter component (Counter.jsx)
// 3. Dynamic Upvote & Support interaction on IssueCards (IssueCard.jsx)
// 4. Conditional details expansion on IssueCards
// ============================================================================

import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import IssueCard from './components/IssueCard.jsx';
import CategoryList from './components/CategoryList.jsx';
import Counter from './components/Counter.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import './styles/App.css';

function App() {
  // Part 9 & 10: Controlled input state using useState and onChange
  const [citizenName, setCitizenName] = useState("");

  // Static list of categories passed to CategoryList via Props
  const civicCategories = [
    "Roads & Pavements",
    "Sanitation & Waste",
    "Street Lighting",
    "Water Supply",
    "Drainage"
  ];

  return (
    <div className="app-root">
      {/* 1. Header & Navigation */}
      <Navbar />

      {/* 2. Main Civic Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Civic Statistics Bar */}
        <Stats />

        {/* ================================================================
            PART 17 — COMMUNITY SUPPORT DEMO & INTERACTIVE LAB (DAY 15)
            ================================================================ */}
        <section className="interactive-demo-section">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Interactive Learning Lab</span>
              <h2 className="section-heading">State & Event Handling Demo</h2>
              <p className="section-description">
                Experience real-time UI updates powered by React useState, onClick, and onChange.
              </p>
            </div>

            <div className="interactive-demo-grid">
              {/* Demo A: Click Counter Component */}
              <Counter />

              {/* Demo B: Controlled Input with onChange */}
              <div className="demo-card">
                <h3 className="demo-card-title">Controlled Input (onChange)</h3>
                <p className="demo-card-subtitle">
                  Type your name to see React State capture keystrokes in real time.
                </p>

                <input
                  type="text"
                  className="demo-input"
                  value={citizenName}
                  onChange={(event) => setCitizenName(event.target.value)}
                  placeholder="Enter your name (e.g. Rahul)..."
                />

                {citizenName ? (
                  <div className="demo-greeting-box">
                    👋 Welcome, Citizen <strong>{citizenName}</strong>! Your local ward portal is active.
                  </div>
                ) : (
                  <p style={{ marginTop: '12px', fontSize: '0.82rem', color: '#9ca3af' }}>
                    * Start typing above to trigger real-time State updates.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            GRIEVANCE SHOWCASE (REUSABLE CARDS WITH PROPS + LOCAL STATE)
            ================================================================ */}
        <section className="issues-section" id="issues">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Community Reports</span>
              <h2 className="section-heading">Live Grievance Feed</h2>
              <p className="section-description">
                Click <strong>"▲ Support Issue"</strong> to upvote, or <strong>"▼ Show Details"</strong> to expand complaint data.
              </p>
            </div>

            {/* Array Prop demo */}
            <CategoryList categories={civicCategories} />

            <div className="issues-grid">
              {/* Interactive Card 1 */}
              <IssueCard
                title="Road Damage"
                category="Roads"
                description="Large pothole near main commercial junction causing traffic hazard."
                status="Pending"
                upvotes={25}
                isVerified={true}
              />

              {/* Interactive Card 2 */}
              <IssueCard
                title="Garbage Overflow"
                category="Sanitation"
                description="Garbage has not been collected for 3 days near community park."
                status="In Progress"
                upvotes={42}
                isVerified={false}
              />

              {/* Interactive Card 3 */}
              <IssueCard
                title="Street Light Problem"
                category="Electricity"
                description="Street light pole #14 is non-functional at night near bus stop."
                status="Verified"
                upvotes={18}
                isVerified={true}
              />
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <Features />
      </main>

      {/* 3. Municipal Footer */}
      <Footer />
    </div>
  );
}

export default App;
