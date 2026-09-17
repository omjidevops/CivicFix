// ============================================================================
// DAY 16 & 17 — ROOT APPLICATION COMPONENT (App.jsx)
// Configures client-side Single Page Application (SPA) routing with React Router.
//
// Routing Architecture:
// /        → Home page (Hero, Stats, Grievance Feed, Features)
// /report  → ReportIssue page (Day 16 Controlled Form + Validation)
// /track   → TrackComplaint page (Grievance Status lookup)
// /about   → About page (Civic mission & transparency principles)
// /login   → Login page (Portal access)
// *        → NotFound (404 wildcard fallback)
// ============================================================================

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Pages
import Home from './pages/Home.jsx';
import CitizenDashboard from './pages/CitizenDashboard.jsx';
import ReportIssue from './pages/ReportIssue.jsx';
import TrackComplaint from './pages/TrackComplaint.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

import './styles/App.css';

function App() {
  return (
    <div className="app-root">
      {/* 1. Global Navigation Bar (Sticky across all routes) */}
      <Navbar />

      {/* 2. Dynamic Route View Switcher */}
      <main className="main-content">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Day 19: Citizen Dashboard Route */}
          <Route path="/dashboard" element={<CitizenDashboard />} />

          {/* Day 16: Report Issue Form Route */}
          <Route path="/report" element={<ReportIssue />} />

          {/* Grievance Tracking Route */}
          <Route path="/track" element={<TrackComplaint />} />

          {/* Portal Access Route */}
          <Route path="/login" element={<Login />} />

          {/* About Platform Route */}
          <Route path="/about" element={<About />} />

          {/* 404 Wildcard Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* 3. Global Municipal Footer */}
      <Footer />
    </div>
  );
}

export default App;
