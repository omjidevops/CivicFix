// ============================================================================
// CIVICFIX — DAY 40: ROOT APPLICATION WITH AUTHENTICATION & ROUTE GUARDS (App.jsx)
// Configures client-side Single Page Application (SPA) routing with React Router.
//
// Routing Architecture:
// /          → Home page (Public)
// /dashboard → CitizenDashboard (Protected: requires authentication)
// /report    → ReportIssue form (Protected: requires authentication)
// /track     → TrackComplaint (Public status lookup)
// /login     → Login page (Public credentials submission)
// /register  → Register page (Public citizen sign-up)
// /about     → About platform (Public)
// *          → NotFound (404 wildcard fallback)
// ============================================================================

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Pages
import Home from './pages/Home.jsx';
import CitizenDashboard from './pages/CitizenDashboard.jsx';
import ReportIssue from './pages/ReportIssue.jsx';
import TrackComplaint from './pages/TrackComplaint.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app-root">
        {/* 1. Global Navigation Bar */}
        <Navbar />

        {/* 2. Dynamic Route View Switcher */}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes (Require Valid Authentication) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportIssue />
                </ProtectedRoute>
              }
            />

            {/* 404 Wildcard Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* 3. Global Municipal Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
