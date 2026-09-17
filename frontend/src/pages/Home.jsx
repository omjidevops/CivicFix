// ============================================================================
// PAGE: Home.jsx (Route: "/")
// The central landing page of the CivicFix platform.
// Assembles Hero, Stats, Interactive Lab, Live Grievance Feed, and Features.
// ============================================================================

import { useState } from 'react';
import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import IssueCard from '../components/IssueCard.jsx';
import CategoryList from '../components/CategoryList.jsx';
import Counter from '../components/Counter.jsx';
import Features from '../components/Features.jsx';

function Home() {
  const [citizenName, setCitizenName] = useState("");

  const civicCategories = [
    "Roads & Pavements",
    "Sanitation & Waste",
    "Street Lighting",
    "Water Supply",
    "Drainage"
  ];

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Civic Statistics Bar */}
      <Stats />

      {/* 3. Interactive Learning Lab */}
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
            <Counter />

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

      {/* 4. Live Grievances Showcase */}
      <section className="issues-section" id="issues">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Community Reports</span>
            <h2 className="section-heading">Live Grievance Feed</h2>
            <p className="section-description">
              Click <strong>"▲ Support Issue"</strong> to upvote, or <strong>"▼ Show Details"</strong> to expand complaint data.
            </p>
          </div>

          <CategoryList categories={civicCategories} />

          <div className="issues-grid">
            <IssueCard
              title="Road Damage"
              category="Roads"
              description="Large pothole near main commercial junction causing traffic hazard."
              status="Pending"
              upvotes={25}
              isVerified={true}
            />

            <IssueCard
              title="Garbage Overflow"
              category="Sanitation"
              description="Garbage has not been collected for 3 days near community park."
              status="In Progress"
              upvotes={42}
              isVerified={false}
            />

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

      {/* 5. Platform Features */}
      <Features />
    </div>
  );
}

export default Home;
