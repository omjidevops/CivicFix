// ============================================================================
// DAY 14 — ROOT APPLICATION COMPONENT (App.jsx)
// Demonstrates Parent → Child data flow via Props across CivicFix components.
//
// Component Hierarchy:
// App (Parent)
// ├── Navbar
// ├── Hero
// ├── Stats (Parent of StatsCard)
// │   ├── StatsCard (Props: number, label)
// │   ├── StatsCard (Props: number, label)
// │   ├── StatsCard (Props: number, label)
// │   └── StatsCard (Props: number, label)
// ├── Issues Section
// │   ├── CategoryList (Array Prop: categories)
// │   ├── IssueCard (Props: title, category, description, status, upvotes, isVerified)
// │   ├── IssueCard (Props: title, category, description, status, upvotes, isVerified)
// │   └── IssueCard (Props: title, category, description, status, upvotes, isVerified)
// ├── Features
// └── Footer
// ============================================================================

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import IssueCard from './components/IssueCard.jsx';
import CategoryList from './components/CategoryList.jsx';
import Features from './components/Features.jsx';
import Footer from './components/Footer.jsx';
import './styles/App.css';

function App() {
  // Part 11: Array of civic categories to demonstrate Array Prop
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

        {/* Civic Statistics Bar (Uses reusable StatsCard inside) */}
        <Stats />

        {/* Reusable Issue Cards Section */}
        <section className="issues-section" id="issues">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Grievance Showcase</span>
              <h2 className="section-heading">Live Community Reports</h2>
              <p className="section-description">
                Demonstrating one reusable IssueCard receiving different Props from App.
              </p>
            </div>

            {/* Part 11: Passing Array as a Prop */}
            <CategoryList categories={civicCategories} />

            <div className="issues-grid">
              {/* Part 7: Reusable IssueCard 1 — Road Damage */}
              <IssueCard
                title="Road Damage"
                category="Roads"
                description="Large pothole near the main commercial junction causing traffic slowdown."
                status="Pending"
                upvotes={25}
                isVerified={true}
              />

              {/* Part 7: Reusable IssueCard 2 — Garbage Overflow */}
              <IssueCard
                title="Garbage Overflow"
                category="Sanitation"
                description="Garbage has not been collected for 3 days near the community park."
                status="In Progress"
                upvotes={42}
                isVerified={false}
              />

              {/* Part 7: Reusable IssueCard 3 — Street Light Problem */}
              <IssueCard
                title="Street Light Problem"
                category="Electricity"
                description="Street light pole #14 is flickering and non-functional at night."
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
