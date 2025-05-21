import React, { useState, useEffect } from 'react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  });
  const [visitors, setVisitors] = useState([]);
  const [lastFetch, setLastFetch] = useState(null);

  useEffect(() => {
    const fetchVisitors = async () => {
      // Don't fetch if we've fetched in the last 30 seconds
      if (lastFetch && (new Date().getTime() - lastFetch) < 30000) {
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        const response = await fetch('http://localhost:5002/api/visitors', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          // Token expired or invalid
          handleLogout();
          throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch visitors');
        }

        const data = await response.json();
        setVisitors(data);
        setLastFetch(new Date().getTime());
      } catch (error) {
        console.error('Error fetching visitors:', error);
        setError(error.message || 'Error loading visitor data');
      } finally {
        setLoading(false);
      }
    };

    if (loggedIn) {
      fetchVisitors();
      // Set up auto-refresh every 30 seconds
      const interval = setInterval(fetchVisitors, 30000);
      return () => clearInterval(interval);
    }
  }, [loggedIn, lastFetch]);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In a real app, this would be an API call to validate credentials
      // For demo purposes, we're using hardcoded credentials
      if (username === 'admin' && password === 'admin@123') {
        const token = btoa(username + ':' + new Date().getTime()); // Simple token generation
        localStorage.setItem('adminToken', token);
        setLoggedIn(true);
        setError('');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setLoggedIn(false);
    setVisitors([]);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        {loggedIn && (
          <button onClick={handleLogout} className="secondary">
            Sign Out
          </button>
        )}
      </div>

      {!loggedIn ? (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-container">
            <button onClick={handleLogin}>
              Sign In
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {loading && <p className="loading-message">Loading...</p>}
        </>
      ) : (
        <div>
          <h2>Welcome, Admin!</h2>
          <div className="admin-table-container">
            <h3 className="admin-table-title">Visitor Entries</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Apartment</th>
                    <th>Vehicle Type</th>
                    <th>Vehicle Number</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map(visitor => (
                    <tr key={visitor.id}>
                      <td>{visitor.username}</td>
                      <td>{visitor.apartmentNumber}</td>
                      <td>{visitor.vehicleType}</td>
                      <td>{visitor.vehicleNumber}</td>
                      <td>{visitor.purposeofVisit}</td>
                      <td>{visitor.durationofVisit}</td>
                      <td>{new Date(visitor.dateofEntry).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
