// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

function Navbar({ toggleSidebar, onLogout }) {
  return (
    <nav className="navbar">

      {/* Left side: hamburger menu + portal name */}
      <div className="navbar-left">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Logo + portal name matching UM style */}
        <div className="navbar-brand">
          <div className="nav-logo-icon">H</div>
          <span className="nav-portal-name">
            <span className="nav-bold">hibaya</span>portal
          </span>
        </div>
      </div>

      {/* Right side: user info + logout */}
      <div className="navbar-right">
        {/* Notification bell */}
        <div className="notif-bell">
          🔔
          <span className="notif-count">8</span>
        </div>

        {/* User name */}
        <span className="user-name">👤 KENNETH ADRIAN</span>

        {/* Logout button */}
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;