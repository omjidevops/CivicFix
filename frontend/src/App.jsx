// ============================================================================
// PART 14 — APP COMPONENT (App.jsx)
// The root application component combining all modular CivicFix building blocks.
//
// Component Hierarchy:
// App
// ├── Navbar
// ├── Hero
// ├── Stats
// ├── IssueCard (Reusable issue showcase)
// ├── Features
// └── Footer
// ============================================================================

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import IssueCard from './components/IssueCard.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import './styles/App.css';

function App() {
  return (
    <div className="app-root">
      {/* 1. Header & Sticky Navigation */}
      <Navbar />

      {/* 2. Main Civic Content */}
      <main>
        {/* Hero Section with Call to Action */}
        <Hero />

        {/* Public Statistics Bar */}
        <Stats />

        {/* Reusable Issue Card Section */}
        <section className="issues-section" id="issues">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Grievance Showcase</span>
              <h2 className="section-heading">Recent Civic Issues</h2>
              <p className="section-description">
                Explore infrastructure issues reported by citizens in real time.
              </p>
            </div>

            <div className="issues-grid">
              {/* Reusable IssueCard Component rendered multiple times */}
              <IssueCard />
              <IssueCard />
              <IssueCard />
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
