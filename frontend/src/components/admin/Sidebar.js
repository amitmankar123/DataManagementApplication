import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar" aria-label="Sidebar Navigation">
      <div className="sidebar-header">
        <span className="sidebar-logo" aria-label="Admin Panel Logo" style={{marginRight: 10}}>
          <i className="fa-solid fa-gear"></i>
        </span>
        Admin Panel
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/" className="nav-link" end>
          <span className="nav-icon"><i className="fa-solid fa-gauge"></i></span>
          Dashboard
        </NavLink>
        <NavLink to="/admin/projects" className="nav-link">
          <span className="nav-icon"><i className="fa-solid fa-folder"></i></span>
          Project Management
        </NavLink>
        <NavLink to="/admin/clients" className="nav-link">
          <span className="nav-icon"><i className="fa-solid fa-users"></i></span>
          Client Management
        </NavLink>
        <NavLink to="/admin/contact" className="nav-link">
          <span className="nav-icon"><i className="fa-solid fa-envelope"></i></span>
          Contact Form Details
        </NavLink>
        <NavLink to="/admin/subscribers" className="nav-link">
          <span className="nav-icon"><i className="fa-solid fa-envelope-open-text"></i></span>
          Newsletter Subscribers
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar; 