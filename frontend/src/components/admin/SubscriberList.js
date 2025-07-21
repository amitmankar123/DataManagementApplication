import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/api'; // using axios directly, or use your api service

const SubscriberList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/subscriber/getSubscriber');
      const data = response.data;

      if (data.success && Array.isArray(data.data)) {
        setSubscribers(data.data);
      } else {
        setSubscribers([]);
      }

      setError('');
    } catch (error) {
      setError('Backend not available. Please ensure your API server is running.');
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-header admin-card">
        <h1 className="admin-title">Newsletter Subscribers</h1>
        <p className="admin-subtitle">View and manage all newsletter subscribers</p>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: 20 }}>Subscribers List</h3>
        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <p>Loading subscribers...</p>
        ) : subscribers.length === 0 ? (
          <p>No subscribers found.</p>
        ) : (
          <div className="admin-table">
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Email</th>
                  <th>Subscribed On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, idx) => (
                  <tr key={subscriber._id}>
                    <td>{idx + 1}</td>
                    <td>{subscriber.email || 'N/A'}</td>
                    <td>{subscriber.subscribedAt?.slice(0, 10) || 'N/A'}</td>
                    <td>

                      <button
                        className="btn btn-danger"
                        style={{ padding: '6px 10px' }}
                        title="Remove"
                      >
                        <i className="fa-solid fa-trash">delete</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriberList;
