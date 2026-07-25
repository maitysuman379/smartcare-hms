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
      <div className="auth-card card">
        <div className="auth-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>

        <h1 className="page-title">Create your account</h1>
        <p className="page-subtitle">Register to get started with SmartCare.</p>

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

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg) url('/health-bg-pattern.svg') center / cover no-repeat;
          padding: 20px;
        }
        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 32px;
        }
        .auth-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          color: var(--color-primary);
          margin-bottom: 20px;
        }
        .auth-mark {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: var(--color-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }
        .auth-page .page-title { font-size: 22px; margin-bottom: 4px; }
        .auth-page .page-subtitle { margin-bottom: 24px; }
        .auth-submit { width: 100%; margin-top: 6px; }
        .auth-error {
          color: var(--color-danger);
          font-size: 13px;
          margin: -8px 0 12px;
        }
        .auth-footer-text {
          text-align: center;
          font-size: 13px;
          color: var(--color-ink-soft);
          margin-top: 20px;
        }
        .auth-footer-text a {
          color: var(--color-primary);
          font-weight: 600;
          text-decoration: none;
        }
        .auth-footer-text a:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}
