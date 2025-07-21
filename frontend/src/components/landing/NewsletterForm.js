import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post('http://localhost:5000/api/subscriber/createSubscriber', { email });
      
      setMessage({ type: 'success', text: 'Thank you for subscribing to our newsletter!' });
      setEmail('');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error subscribing to newsletter.';
      setMessage({ 
        type: 'error', 
        text: errorMessage.includes('exists') ? 'This email is already subscribed!' : errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter-form-container">
      {message.text && (
        <div className={`newsletter-alert newsletter-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="newsletter-input-group">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="btn btn-primary newsletter-btn"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm; 