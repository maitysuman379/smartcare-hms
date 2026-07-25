import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }

    // TODO: replace with a real API call once the backend exists.
    // For now, just fake a successful login and redirect based on a simple guess.
    console.log("Login attempt:", form);
    navigate("/patient/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>

        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">Log in to continue to your dashboard.</p>

        <form onSubmit={handleSubmit}>
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

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-primary auth-submit">
            Log in
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Register here</Link>
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
          max-width: 380px;
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
