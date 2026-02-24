// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {

  // State for the form inputs
  const [studentId, setStudentId] = useState('');
  const [password,  setPassword]  = useState('');
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  // Mock credentials — in a real app this would be an API call
  const MOCK_ID       = 'admin';
  const MOCK_PASSWORD = 'admin123';

  function handleLogin(e) {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!studentId || !password) {
      setError('Please fill out all fields.');
      return;
    }

    // Simulate a loading state
    setLoading(true);

    setTimeout(() => {
      if (studentId === MOCK_ID && password === MOCK_PASSWORD) {
        // Success — tell App.jsx that we are logged in
        onLogin();
      } else {
        setError('Invalid Student ID or Password. Try admin / admin123');
        setLoading(false);
      }
    }, 1000);
  }

  return (
    <div className="login-page">

      {/* ── LEFT SIDE: Welcome message ── */}
      <div className="login-left">
        <div className="welcome-content">

          <h1 className="welcome-heading">
            Welcome to <span className="school-highlight">UM</span>
          </h1>
          <p className="welcome-tagline">The first in leadership education</p>

          <div className="welcome-block">
            <p className="welcome-block-label">
              For <strong>New Student Registration</strong>{' '}
              <span className="link-text">click here</span>
            </p>
            <p className="welcome-block-text">
              Hi, Ga! Registering with HibayaAP opens the doors to globally
              recognized quality, affordable, and open education; and where we
              aim to develop diamonds in the rough.
            </p>
            <p className="welcome-block-text">See you at HibayaAP!</p>
          </div>

          <div className="welcome-block">
            <p className="welcome-block-label">
              Connect To{' '}
              <strong>UM AP Alumni — Tagum Campus</strong>{' '}
              <span className="link-text">click here</span>
            </p>
            <p className="welcome-block-text">
              Greetings! We are conducting an Alumni Tracer Study to update our
              database which will subsequently be used to assess graduate
              employability. All responses are recorded anonymously so feel free
              to provide honest feedback.
            </p>
            <p className="welcome-block-text">Thank you!!</p>
          </div>

        </div>
      </div>

      {/* ── RIGHT SIDE: Login Card ── */}
      <div className="login-right">
        <div className="login-card">

          {/* Logo area */}
          <div className="login-logo">
            <div className="logo-icon">
              <span className="logo-letter">UM</span>
            </div>
            <h2 className="portal-name">
              <span className="portal-bold">Student</span>portal
            </h2>
          </div>

          {/* Campus label */}
          <h3 className="campus-name">Tagum Campus</h3>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleLogin}>

            {/* Student ID input */}
            <div className="input-group">
              <input
                type="text"
                className="login-input"
                placeholder="Student ID Number or Email"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>

            {/* Password input */}
            <div className="input-group input-password">
              <input
                type={showPass ? 'text' : 'password'}
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Toggle show/hide password */}
              <button
                type="button"
                className="toggle-pass"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? '👁' : '👁'}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              className={`login-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>

          </form>

          {/* Access code message */}
          <p className="access-note">
            If you have received an access code sent via SMS or given to you by
            the admission officer, please{' '}
            <span className="link-text-dark">
              🔗 click here to create your password
            </span>
            .
          </p>

          {/* Forgot password */}
          <p className="forgot-pass">Forgot Your Password?</p>

        </div>
      </div>

    </div>
  );
}

export default Login;