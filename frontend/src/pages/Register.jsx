import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // TODO: replace with a real API call once the backend exists.
    console.log("Register attempt:", form);
    navigate("/login");
  };

  return (
    <div className="auth-page">
      {/* Left panel: brand + pattern */}
      <div className="auth-panel">
        <div className="auth-panel-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>

        <div className="auth-panel-copy">
          <h2>Join a smarter way to connect with the right care.</h2>
          <p>
            Register as a patient to get AI-assisted risk screening, or as a
            doctor to manage your matched patients — all in one place.
          </p>
        </div>

        <div className="auth-panel-stats">
          <div>
            <strong>3</strong>
            <span>Conditions screened</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Appointment booking</span>
          </div>
        </div>
      </div>

      {/* Right panel: form */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-mobile-brand">
            <span className="auth-mark">+</span>
            <span>SmartCare HMS</span>
          </div>

          <h1 className="page-title">Create your account</h1>
          <p className="page-subtitle">
            Register to get started with SmartCare.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="role">Register as</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="btn btn-primary auth-submit">
              Create account
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
        }

        .auth-panel {
          flex: 1;
          max-width: 480px;
          background: var(--color-primary) url('/health-bg-pattern.svg') center / cover no-repeat;
          background-blend-mode: soft-light;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 44px 40px;
          position: relative;
        }
        .auth-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(69, 142, 148, 0.92), rgba(12,68,72,0.96));
        }
        .auth-panel > * { position: relative; z-index: 1; }

        .auth-panel-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 17px;
        }
        .auth-mark {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: white;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          flex-shrink: 0;
        }

        .auth-panel-copy h2 {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 800;
          line-height: 1.3;
          margin-bottom: 14px;
          max-width: 360px;
        }
        .auth-panel-copy p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255,255,255,0.82);
          max-width: 340px;
          margin: 0;
        }

        .auth-panel-stats {
          display: flex;
          gap: 32px;
          border-top: 1px solid rgba(255,255,255,0.18);
          padding-top: 22px;
        }
        .auth-panel-stats strong {
          display: block;
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
        }
        .auth-panel-stats span {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }

        /* ---- Right form side (with its own subtle background) ---- */
        .auth-form-side {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg) url('/health-bg-pattern.svg') center / cover no-repeat;
          padding: 20px;
          position: relative;
        }
        .auth-form-side::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(245, 248, 247, 0.12);
        }
        .auth-form-side .auth-card {
          position: relative;
          z-index: 1;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 40px 36px;
        }
        .auth-mobile-brand { display: none; }

        .auth-page .page-title { font-size: 24px; margin-bottom: 4px; }
        .auth-page .page-subtitle { margin-bottom: 26px; }

        .auth-submit { width: 100%; margin-top: 8px; }

        .auth-error {
          color: var(--color-danger);
          font-size: 13px;
          margin: -8px 0 12px;
        }

        .auth-footer-text {
          text-align: center;
          font-size: 13px;
          color: var(--color-ink-soft);
          margin-top: 22px;
        }
        .auth-footer-text a {
          color: var(--color-primary);
          font-weight: 600;
          text-decoration: none;
        }
        .auth-footer-text a:hover { text-decoration: underline; }

        @media (max-width: 860px) {
          .auth-panel { display: none; }
          .auth-mobile-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: var(--font-display);
            font-weight: 800;
            font-size: 16px;
            color: var(--color-primary);
            margin-bottom: 22px;
          }
          .auth-mobile-brand .auth-mark {
            background: var(--color-primary);
            color: white;
          }
        }
      `}</style>
    </div>
  );
}
