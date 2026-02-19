import './App.css'
import { useState } from "react";


function App() {
  const [showPass, setShowPass] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!studentId || !password) {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <div className="um-page">
        <div className="um-bg" />

        <div className="um-left">
          <div className="um-welcome-label">University of Mindanao</div>
          <h1 className="um-welcome-title">
            Welcome to <span>UM</span>
          </h1>
          <p className="um-welcome-sub">The first in leadership education</p>

          <div className="um-info-cards">
            <div className="um-card">
              <div className="um-card-tag">Alumni</div>
              <a href="#" className="um-card-link">
                Connect To UM Alumni – Digos Campus
              </a>
              <p className="um-card-text">
                We are conducting an Alumni Tracer Study to update our database and assess graduate employability. Please complete the online survey to share your experience and current career status.
              </p>
            </div>
            <div className="um-card">
              <div className="um-card-tag">New Students</div>
              <a href="#" className="um-card-link">
                New Student Registration — click here
              </a>
              <p className="um-card-text">
                Registering with UM opens the doors to globally recognized quality, affordable, and open education. We aim to develop diamonds in the rough. See you at UM!
              </p>
            </div>
          </div>
        </div>

        <div className="um-right">
          <div className={`um-login-card ${shaking ? "shake" : ""}`}>
            <div className="um-logo-area">
              <div className="um-logo-ring">
                <span className="um-logo-icon">UM</span>
              </div>
              <div className="um-portal-label">
                <strong>student</strong>portal
              </div>
              <div className="um-campus-badge">Digos Campus</div>
            </div>

            <form className="um-form" onSubmit={handleLogin}>
              <div className="um-field">
                <input
                  type="text"
                  placeholder="Student ID Number or Email"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              <div className="um-field">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="um-field-icon"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁"}
                </span>
              </div>

              <button className="um-btn-login" type="submit" disabled={loading}>
                {loading ? "Logging in…" : <>Login <span className="um-btn-arrow">→</span></>}
              </button>
            </form>

            <div className="um-divider">or</div>

            <div className="um-access-notice">
              If you received an access code via SMS or from the admission officer,{" "}
              <a href="#">🔑 click here to create your password</a>
            </div>

            <div className="um-forgot">
              <a href="#">Forgot Your Password?</a>
            </div>
          </div>
        </div>

        <div className="um-feedback-tab">Help &amp; Feedback</div>
      </div>
    </>
  );
}

export default App;
