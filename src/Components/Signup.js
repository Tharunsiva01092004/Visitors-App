import React, { useState } from 'react';

export default function Signup() {
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [form, setForm] = useState({
    username: '',
    apartmentNumber: '',
    vehicleType: '',
    vehicleNumber: '',
    purposeofVisit: '',
    durationofVisit: '',
    dateofEntry: ''
  });

  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const validateForm = () => {
    const newErrors = [];

    // Username validation
    if (form.username.length < 3) {
      newErrors.push('Username must be at least 3 characters');
    }

    // Apartment number validation
    if (!/^[A-Za-z]?\d+$/.test(form.apartmentNumber)) {
      newErrors.push('Invalid apartment number');
    }

    // Vehicle number validation
    const vehicleNumberRegex = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;
    if (!vehicleNumberRegex.test(form.vehicleNumber)) {
      newErrors.push('Invalid vehicle number');
    }

    // Purpose of visit validation
    if (!form.purposeofVisit.trim()) {
      newErrors.push('Purpose of visit is required');
    }

    // Duration validation
    const durationRegex = /^\d+\s+(hour|hours|day|days)$/i;
    if (!durationRegex.test(form.durationofVisit)) {
      newErrors.push('Invalid duration format');
    }

    // Date validation
    const selectedDate = new Date(form.dateofEntry);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.push('Date cannot be in the past');
    }

    setErrorMessages(newErrors);
    if (newErrors.length > 0) {
      setShowErrorPopup(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save visitor data');
      }

      setSubmitStatus({ type: 'success', message: 'Visitor entry recorded successfully!' });
      setForm({
        username: '',
        apartmentNumber: '',
        vehicleType: '',
        vehicleNumber: '',
        purposeofVisit: '',
        durationofVisit: '',
        dateofEntry: ''
      });
    } catch (error) {
      console.error('Error saving visitor data:', error);
      setSubmitStatus({ type: 'error', message: error.message || 'Error saving visitor data. Please try again.' });
    }
  }

  return (
    <div className="signup-container">
      {showErrorPopup && (
        <div className="error-popup">
          <div className="error-popup-content">
            <h3>Please fix the following errors:</h3>
            <ul>
              {errorMessages.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button onClick={() => setShowErrorPopup(false)} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
      
      <h2>Visitor Entry Form</h2>
      {submitStatus.message && (
        <div className={`status-message ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="signup-form">
        <div>
          <label>Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className={errorMessages.length > 0 ? 'error-input' : ''}
            />
            
        </div>
        <div>
            <label>Apartment Number</label>
            <input
              type="text"
              name="apartmentNumber"
              value={form.apartmentNumber}
              onChange={handleChange}
              required
              className={errorMessages.length > 0 ? 'error-input' : ''}
            />
            
        </div>
        <div>
            <label>Vehicle Type</label>
            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              required
            >
              <option value="">Select vehicle type</option>
              <option value="2 wheeler">2 Wheeler</option>
              <option value="4 wheeler">4 Wheeler</option>
              <option value="other">Other</option>
            </select>

        </div>
        <div>
            <label>Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={form.vehicleNumber}
              onChange={handleChange}
              required
              className={errorMessages.length > 0 ? 'error-input' : ''}
            />
            
        </div>
        <div>
            <label>Purpose of Visit</label>
            <input
              type="text"
              name="purposeofVisit"
              value={form.purposeofVisit}
              onChange={handleChange}
              required
              className={errorMessages.length > 0 ? 'error-input' : ''}
            />
            
        </div>
        <div>
            <label>Duration of Visit</label>
            <input
              type="text"
              name="durationofVisit"
              value={form.durationofVisit}
              onChange={handleChange}
              required
              className={errorMessages.length > 0 ? 'error-input' : ''}
            />
            
        </div>
        <div>
            <label>Date of Visit</label>
            <input
              type="date"
              name="dateofEntry"
              value={form.dateofEntry}
              onChange={handleChange}
              required
              className={errorMessages.length > 0 ? 'error-input' : ''}
              min={new Date().toISOString().split('T')[0]}
            />
            
        </div>
        
        <div className="button-container">
          <button type="submit">Submit Entry</button>
          <button type="button" className="secondary" onClick={() => setForm({
            username: '',
            apartmentNumber: '',
            vehicleType: '',
            vehicleNumber: '',
            purposeofVisit: '',
            durationofVisit: '',
            dateofEntry: ''
          })}>Clear Form</button>
        </div>
      </form>
    </div>
  );
};