import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('http://localhost:5000/api/projects/getProjects');
      setProjects(Array.isArray(response.data.data) ? response.data.data : []);
      setError('');
    } catch (error) {
      setError('Backend not available. Please ensure your API server is running.');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-card">
      <div className="flex flex-between" style={{ marginBottom: '20px' }}>
        <h3>Project List ({projects.length})</h3>
        <button className="btn btn-primary" onClick={fetchProjects}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <div className="toast error">{error}</div>
      ) : projects.length === 0 ? (
        <p>No projects found. Add some to display here.</p>
      ) : (
        <div className="admin-table">
          <table className="table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <tr key={project._id || idx}>
                  <td>
                    {project.image ? (
                      <img
                        src={project.image}
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
                    <div
                      style={{
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {project.description}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      title="Edit"
                      style={{ marginRight: 8 }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn btn-danger" title="Delete">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
