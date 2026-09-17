// ============================================================================
// STEP 2: Root Application Component (App.jsx)
// Assembles all modular CivicFix components into a cohesive single-page view.
// ============================================================================

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import IssueCard from './components/IssueCard.jsx';
import IssueCardGarbage from './components/IssueCardGarbage.jsx';
import Workflow from './components/Workflow.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app-root">
      {/* 1. Header & Sticky Navigation */}
      <Navbar />

      {/* 2. Main Civic Content Container */}
      <main>
        {/* Hero Banner with Call-to-Action */}
        <Hero />

        {/* Civic Redressal Performance Metrics */}
        <Stats />

        {/* Live Grievances / Issue Cards Showcase */}
        <section className="issues-section" id="issues">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Community Reports</span>
              <h2 className="section-heading">Recent Grievances in Your City</h2>
              <p className="section-description">
                Browse localized public infrastructure complaints submitted by citizens.
              </p>
            </div>

            <div className="issues-grid">
              {/* Component Reusability in Action: Multiple cards rendered */}
              <IssueCard />
              <IssueCardGarbage />
              <IssueCard />
            </div>
          </div>
        </section>

        {/* Resolution Lifecycle Guide */}
        <Workflow />
      </main>

      {/* 3. Global Civic Portal Footer */}
      <Footer />
    </div>
  );
}

export default App;
