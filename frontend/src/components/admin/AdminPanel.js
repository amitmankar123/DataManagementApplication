import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProjectForm from './ProjectForm';
import ProjectTable from './ProjectTable';
import ClientForm from './ClientForm';
import ClientTable from './ClientTable';
import ContactList from './ContactList';
import SubscriberList from './SubscriberList';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Sidebar />
     
      <main className="admin-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectForm />} />
          <Route path="/projects/list" element={<ProjectTable />} />
          <Route path="/clients" element={<ClientForm />} />
          <Route path="/clients/list" element={<ClientTable />} />
          <Route path="/contact" element={<ContactList />} />
          <Route path="/subscribers" element={<SubscriberList />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel; 