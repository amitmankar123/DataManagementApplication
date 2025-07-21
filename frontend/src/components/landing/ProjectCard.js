import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './components.css';

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/projects/getProjects');
      setProjects(response.data || []);
      setError('');
    } catch (error) {
      setError('Backend not available. Please ensure your API server is running.');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="projects-container">
        <div className="loading">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      {projects.length === 0 ? (
        <div className="no-projects">
          <p>No projects available at the moment.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project._id || index} className="project-card">
              <div className="project-image">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="project-img"
                  />
                ) : (
                  <div className="project-placeholder">
                    <span>No Image</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">
                  {project.description}
                </p>
                <button className="btn btn-primary project-btn">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard; 