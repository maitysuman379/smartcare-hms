import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin, saveAdminAuth } from "../services/api.js";

const styles = `
.admin-auth-page {
  --teal-900: #0b4a47;
  --teal-800: #0f5c58;
  --teal-700: #17706a;
  --teal-300: #7fd6c4;
  --mint-100: #dfe9e8;
  --mint-50: #f4f8f7;
  --ink: #0f2b2b;
  --muted: #4a6068;
  --border: #d5e2e0;
  --danger-bg: #fdecec;
  --danger-text: #b42318;

  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--mint-50);
  font-family: "Inter", "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--ink);
}

.admin-auth-card {
  width: 100%;
  max-width: 420px;
  padding: 36px 28px 28px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 45px rgba(11, 74, 71, 0.14);
  text-align: center;
}

.admin-auth-icon {
  width: 68px;
  height: 68px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(145deg, var(--teal-800), var(--teal-900));
  border-radius: 50%;
  border: 3px solid var(--teal-300);
  box-shadow: 0 10px 24px rgba(15, 92, 88, 0.35);
}

.admin-auth-card h1 {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.admin-auth-card > p {
  margin: 0 0 24px;
  font-size: 15px;
  color: var(--muted);
}

.admin-auth-error {
  margin-bottom: 18px;
  padding: 12px 14px;
  font-size: 14px;
  text-align: left;
  color: var(--danger-text);
  background: var(--danger-bg);
  border: 1px solid #f5c2c0;
  border-radius: 12px;
}

.admin-auth-card form {
  text-align: left;
}

.admin-auth-card label {
  display: block;
  margin: 14px 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--teal-800);
}

.admin-auth-card input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  font-size: 15px;
  font-family: inherit;
  color: var(--ink);
  background: var(--mint-50);
  border: 1.5px solid var(--border);
  border-radius: 12px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.admin-auth-card input::placeholder {
  color: #8aa09f;
}

.admin-auth-card input:focus {
  background: #ffffff;
  border-color: var(--teal-700);
  box-shadow: 0 0 0 4px rgba(23, 112, 106, 0.15);
}

.admin-auth-card button[type="submit"] {
  width: 100%;
  margin-top: 24px;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  font-family: inherit;
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(145deg, var(--teal-800), var(--teal-900));
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 22px rgba(15, 92, 88, 0.3);
  transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
}

.admin-auth-card button[type="submit"]:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(15, 92, 88, 0.38);
}

.admin-auth-card button[type="submit"]:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.admin-auth-footer {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--mint-100);
  font-size: 14px;
}

.admin-auth-footer a {
  font-weight: 600;
  color: var(--teal-700);
  text-decoration: none;
}

.admin-auth-footer a:hover {
  color: var(--teal-900);
  text-decoration: underline;
}

@media (max-width: 400px) {
  .admin-auth-card {
    padding: 28px 20px 22px;
    border-radius: 20px;
  }
}
`;

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginAdmin({ email, password });

      saveAdminAuth({
        token: response.token,
        user: response.user,
      });

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{styles}</style>

      <div className="admin-auth-page">
        <div className="admin-auth-card">
          <div className="admin-auth-icon">✚</div>

          <h1>Admin Portal</h1>
          <p>SmartCare Hospital Management System</p>

          {error && (
            <div className="admin-auth-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="admin-auth-footer">
            <Link to="/login">Return to Patient / Doctor Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
