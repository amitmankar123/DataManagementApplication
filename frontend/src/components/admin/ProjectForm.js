import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/getProjects');
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
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
      setMessage({ type: 'error', text: 'Please select an image for the project' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);

      await api.post('/projects/createProject', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage({ type: 'success', text: 'Project created successfully!' });
      setFormData({ name: '', description: '', image: null });
      document.getElementById('project-image').value = '';

      fetchProjects();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error creating project'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-header admin-card">
        <h1 className="admin-title">Project Management</h1>
        <p className="admin-subtitle">Add and manage your projects</p>
      </div>

      <div className="admin-card">
        <h3>Add New Project</h3>
        {message.text && <div className={`toast ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Project Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="project-image">Project Image</label>
            <input
              type="file"
              id="project-image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Add Project'}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h3>Project List</h3>
        <div className="admin-table">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project._id || idx}>
                  <td>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="admin-avatar"
                      />
                    ) : (
                      <div className="admin-avatar">
                        {project.name?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                  </td>
                  <td>{project.name}</td>
                  <td>
                    <div style={{
                      maxWidth: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {project.description}
                    </div>
                  </td>
                  <td>
                   
                    <button className="btn btn-danger" title="Delete">
                      <i className="fa-solid fa-trash">Delete</i>
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
