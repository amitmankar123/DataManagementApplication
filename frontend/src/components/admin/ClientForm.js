import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await api.get('http://localhost:5000/api/clients/getClients');
      setClients(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      setClients([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setMessage({ type: 'error', text: 'Please select an image for the client' });
      return;
    }
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('image', formData.image);

      await api.post('/clients/createClient', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage({ type: 'success', text: 'Client created successfully!' });
      setFormData({ name: '', description: '', designation: '', image: null });
      document.getElementById('client-image').value = '';
      fetchClients();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error creating client' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-header admin-card">
        <h1 className="admin-title">Client Management</h1>
        <p className="admin-subtitle">Add and manage your clients</p>
      </div>

      <div className="admin-card">
        <h3>Add New Client</h3>
        {message.text && (
          <div className={`toast ${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Client Name</label>
            <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input type="text" id="designation" name="designation" className="form-control" value={formData.designation} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="client-image">Client Image</label>
            <input type="file" id="client-image" name="image" className="form-control" onChange={handleImageChange} accept="image/*" required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Client'}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h3>Client List</h3>
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
              {clients.map((client, idx) => (
                <tr key={client._id || idx}>
                  <td>
                    {client.imageUrl ? (
                      <img src={client.imageUrl} alt={client.name} className="admin-avatar" />
                    ) : (
                      <div className="admin-avatar">{client.name?.[0]?.toUpperCase() || '?'}</div>
                    )}
                  </td>
                  <td>{client.name}</td>
                  <td>{client.designation}</td>
                  <td>{client.description}</td>
                  <td>
                    <button className="btn btn-primary" title="Edit"><i className="fa-solid fa-pen"></i></button>
                    <button className="btn btn-danger" title="Delete"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClientForm;
