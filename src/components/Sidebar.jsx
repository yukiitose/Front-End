// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Navigation links for the sidebar
const navLinks = [
  { path: '/',         label: 'Dashboard',          icon: '📊' },
  { path: '/programs', label: 'Program Offerings',  icon: '🎓' },
  { path: '/subjects', label: 'Subject Offerings',  icon: '📚' },
];

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

      {/* Sidebar header */}
      <div className="sidebar-header">
        <span>Navigation</span>
      </div>

      {/* Navigation links */}
      <nav className="sidebar-nav">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            <span className="sidebar-icon">{link.icon}</span>
            <span className="sidebar-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar footer */}
      <div className="sidebar-footer">
        <p>School CMS v1.0</p>
      </div>

    </aside>
  );
}

export default Sidebar;