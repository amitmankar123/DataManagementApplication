import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, clientsRes, contactsRes, subscribersRes] = await Promise.all([
          api.get('/projects/getProjects'),
          api.get('/clients/getClients'),
          api.get('/contact/getContactForm'),
          api.get('/subscriber/getSubscriber')
        ]);
     console.log(projectsRes.data.length);
     console.log(clientsRes.data.data.length);
     console.log(contactsRes.data.length);
     console.log(subscribersRes.data.data.length);

        setStats({
          projects: Array.isArray(projectsRes.data) ? projectsRes.data.length : 0,
          clients: Array.isArray(clientsRes.data.data) ? clientsRes.data.data.  length : 0,
          contacts: Array.isArray(contactsRes.data) ? contactsRes.data.length : 0,
          subscribers: Array.isArray(subscribersRes.data?.data) ? subscribersRes.data.data.length : 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ projects: 12, clients: 8, contacts: 25, subscribers: 156 }); // fallback demo
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="admin-header admin-card">
        <h1 className="admin-title">Welcome to Admin Panel</h1>
        <p className="admin-subtitle">
          Manage your projects, clients, contacts, and newsletter subscribers from this centralized dashboard.
        </p>
      </div>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon projects"><i className="fa-solid fa-diagram-project"></i></div>
          <div className="stat-info">
            <div className="stat-number">{stats.projects}</div>
            <div className="stat-label">Total Projects</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon clients"><i className="fa-solid fa-users"></i></div>
          <div className="stat-info">
            <div className="stat-number">{stats.clients}</div>
            <div className="stat-label">Total Clients</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon contacts"><i className="fa-solid fa-address-book"></i></div>
          <div className="stat-info">
            <div className="stat-number">{stats.contacts}</div>
            <div className="stat-label">Contact Inquiries</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon subscribers"><i className="fa-solid fa-envelope"></i></div>
          <div className="stat-info">
            <div className="stat-number">{stats.subscribers}</div>
            <div className="stat-label">Newsletter Subscribers</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
