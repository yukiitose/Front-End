// src/App.jsx
import React from 'react';
import Login from './components/Login';

function App() {
  function handleLogin(data) {
    if (data.redirect_url) {
      window.location.href = data.redirect_url;
    } else {
      window.location.href = 'http://hibaya_it15_enrollment_system.test/dashboard';
    }
  }
  return <Login onLogin={handleLogin} />;
}

export default App;