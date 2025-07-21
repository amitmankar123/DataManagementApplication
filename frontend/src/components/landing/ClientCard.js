import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

const ClientCard = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/clients/getClients');
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
      <div className="clients-container">
        <div className="loading">Loading clients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="clients-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="clients-container">
      {clients.length === 0 ? (
        <div className="no-clients">
          <p>No clients available at the moment.</p>
        </div>
      ) : (
        <div className="clients-grid">
          {clients.map((client, index) => (
            <div key={client._id || index} className="client-card">
              <div className="client-avatar">
                {client.image ? (
                  <img 
                    src={client.image} 
                    alt={client.name}
                    className="client-img"
                  />
                ) : (
                  <div className="client-placeholder">
                    {client.name ? client.name.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
              </div>
              <div className="client-content">
                <h3 className="client-name">{client.name}</h3>
                <p className="client-designation">{client.designation}</p>
                <p className="client-description">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientCard; 