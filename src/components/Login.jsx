// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleLogin() {
    setError('');

    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    setLoading(true);

    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method:  'POST',
        signal:  controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify({
          email:    email,
          password: password,
        }),
      });

      clearTimeout(timeout);

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user',  JSON.stringify(data.user));
        onLogin(data);
      } else {
        setError(data.message || 'Invalid credentials.');
      }

    } catch (err) {
      clearTimeout(timeout);
      if (err.name === 'AbortError') {
        setError('Request timed out. Make sure Laravel is running.');
      } else {
        setError('Cannot connect to server. Make sure Laravel is running.');
      }
      console.error('Login error:', err);
    }

    setLoading(false);
  }

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="welcome-content">
          <h1 className="welcome-heading">
            Welcome to <span className="school-highlight">HibayaAP</span>
          </h1>
          <p className="welcome-tagline">The first in leadership education</p>

          <div className="welcome-block">
            <p className="welcome-block-label">
              For <strong>New Student Registration</strong>{' '}
              <span className="link-text">click here</span>
            </p>
            <p className="welcome-block-text">
              Hi! Registering with HibayaAP opens the doors to globally
              recognized quality, affordable, and open education.
            </p>
            <p className="welcome-block-text">See you at HibayaAP!</p>
          </div>

          <div className="welcome-block">
            <p className="welcome-block-label">
              Connect To <strong>HibayaAP Alumni - Tagum Campus</strong>{' '}
              <span className="link-text">click here</span>
            </p>
            <p className="welcome-block-text">
              Greetings! We are conducting an Alumni Tracer Study to update
              our database. All responses are recorded anonymously.
            </p>
            <p className="welcome-block-text">Thank you!!</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          <div className="login-logo">
            <div className="logo-icon">
              <span className="logo-letter">H</span>
            </div>
            <h2 className="portal-name">
              <span className="portal-bold">hibaya</span>portal
            </h2>
          </div>

          <h3 className="campus-name">Tagum Campus</h3>

          <form className="login-form" onSubmit={handleLogin}>

            <div className="login-form">

  <div className="input-group">
    <input
      type="text"
      className="login-input"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  <div className="input-group input-password">
    <input
      type={showPass ? 'text' : 'password'}
      className="login-input"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
      type="button"
      className="toggle-pass"
      onClick={() => setShowPass(!showPass)}
    >
      {showPass ? 'Hide' : 'Show'}
    </button>
  </div>

  {error && (
    <div className="error-message">
      Warning: {error}
    </div>
  )}

  <button
    type="button"
    className={`login-btn ${loading ? 'loading' : ''}`}
    disabled={loading}
    onClick={handleLogin}
  >
    {loading ? 'Logging in...' : 'Login'}
  </button>

</div>

          </form>

          <p className="access-note">
            If you have received an access code sent via SMS or given to you
            by the admission officer, please{' '}
            <span className="link-text-dark">click here to create your password</span>.
          </p>

          <p className="forgot-pass">Forgot Your Password?</p>

        </div>
      </div>
            
    </div>
  );
}

export default Login;