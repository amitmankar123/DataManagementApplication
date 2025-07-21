import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    Full_Name: '',
    email: '',
    Mobile_Number: '',
    City: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post('http://localhost:5000/api/contact/createContactForm', formData);
      
      setMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
      setFormData({ Full_name: '', email: '', Mobile_number: '', City: '' });

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Error sending message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      {message.text && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Full_Name">Full Name *</label>
            <input
              type="text"
              id="Full_Name"
              name="Full_Name"
              className="form-control"
              value={formData.Full_Name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Mobile_Number">Phone Number *</label>
            <input
              type="tel"
              id="Mobile_Number"
              name="Mobile_Number"
              className="form-control"
              value={formData.Mobile_Number}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="City">City *</label>
            <input
              type="text"
              id="City"
              name="City"
              className="form-control"
              value={formData.City}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <button 
            type="submit" 
            className="btn btn-primary contact-btn"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 