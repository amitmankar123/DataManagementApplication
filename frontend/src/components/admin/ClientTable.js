import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clients/getClients');
      setClients(response.data || []);
      setError('');
    } catch (error) {
      setError('Backend not available. Please ensure your API server is running.');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Client List</h1>
          <p className="admin-subtitle">All clients in your portfolio</p>
        </div>
        <div className="admin-card">
          <p>Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1 className="admin-title">Client List</h1>
        <p className="admin-subtitle">All clients in your portfolio</p>
      </div>

      {error && (
        <div className="admin-card">
          <p style={{ color: '#dc3545' }}>{error}</p>
        </div>
      )}

      <div className="admin-card">
        <div className="flex flex-between" style={{ marginBottom: '20px' }}>
          <h3>Clients ({clients.length})</h3>
          <button 
            className="btn btn-primary"
            onClick={fetchClients}
          >
            Refresh
          </button>
        </div>

        {clients.length === 0 ? (
          <p>No clients found. Add your first client!</p>
        ) : (
          <div className="admin-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={client._id || index}>
                    <td>
                      {client.image ? (
                        <img 
                          src={client.image} 
                          alt={client.name}
                          className="admin-avatar"
                        />
                      ) : (
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          backgroundColor: '#f8f9fa', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666',
                          border: '3px solid #fff',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}>
                          {client.name ? client.name.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </td>
                    <td>
                      <strong>{client.name}</strong>
                    </td>
                    <td>{client.designation}</td>
                    <td>
                      <div style={{ 
                        maxWidth: '300px', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {client.description}
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-primary" style={{ marginRight: '5px' }}>
                        Edit
                      </button>
                      <button className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientTable; 