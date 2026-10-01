import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, saveAuth } from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({
        email: form.email,
        password: form.password,
      });
      saveAuth({ token: data.token, user: data.user });

      // Redirect based on the role the backend returned
      const role = data.user.role;
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <h2>AI-assisted care, matched to the right specialist.</h2>
          <p>
            Submit your health profile and get connected with a doctor suited to
            your needs — faster, and with more clarity.
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
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="auth-forgot">
                  Forgot password?
                </a>
              </div>
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

            <button
              type="submit"
              className="btn btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/register">Register here</Link>
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
          background: linear-gradient(160deg, rgba(15,82,87,0.92), rgba(12,68,72,0.96));
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
          background: rgba(245, 248, 247, 0.55);
        }
        .auth-form-side .auth-card {
          position: relative;
          z-index: 1;
        }

        .auth-card {
          width: 100%;
          max-width: 380px;
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 40px 36px;
        }
        .auth-mobile-brand { display: none; }

        .auth-page .page-title { font-size: 24px; margin-bottom: 4px; }
        .auth-page .page-subtitle { margin-bottom: 26px; }

        .auth-label-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .auth-forgot {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
        }
        .auth-forgot:hover { text-decoration: underline; }

        .auth-submit { width: 100%; margin-top: 8px; }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }

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
