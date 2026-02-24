// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProgramList from './components/ProgramList';
import SubjectList from './components/SubjectList';
import './App.css';

function App() {

  // Track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Controls whether the sidebar is open or closed
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Called by Login.jsx when credentials are correct
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // Called by Navbar logout button
  function handleLogout() {
    setIsLoggedIn(false);
  }

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  // ── If NOT logged in → show the Login page ──
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // ── If logged in → show the main app ──
  return (
    <Router>
      <div className="app-wrapper">

        {/* Top navigation bar */}
        <Navbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />

        <div className="app-body">

          {/* Left sidebar navigation */}
          <Sidebar isOpen={sidebarOpen} />

          {/* Main content area */}
          <main className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
            <Routes>
              <Route path="/"          element={<Dashboard />} />
              <Route path="/programs"  element={<ProgramList />} />
              <Route path="/subjects"  element={<SubjectList />} />
            </Routes>
          </main>

        </div>
      </div>
    </Router>
  );
}

export default App;