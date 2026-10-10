import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, sendOtp } from "../services/api.js";

const RESEND_COOLDOWN_SECONDS = 60;

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState("form");
  // "form" | "verify" | "doctor-pending"

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);

  const normalizedEmail = form.email.trim().toLowerCase();

  // OTP resend countdown
  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = setTimeout(() => {
      setResendSeconds((seconds) => seconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendSeconds]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
  };

  // Request email verification code
  const requestCode = async () => {
    setLoading(true);
    setError("");

    try {
      await sendOtp({
        email: normalizedEmail,
      });

      setResendSeconds(RESEND_COOLDOWN_SECONDS);
      return true;
    } catch (err) {
      const message = err.message || "Could not send the code.";

      // An earlier OTP may still be valid if resend is rate-limited.
      if (/^please wait/i.test(message)) {
        const match = message.match(/(\d+)/);

        setResendSeconds(match ? Number(match[1]) : RESEND_COOLDOWN_SECONDS);

        setInfo("A code was already sent a moment ago. Check your inbox.");

        return true;
      }

      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Step 1: Validate registration form and send OTP
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setInfo("");

    if (
      !form.name.trim() ||
      !normalizedEmail ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (new TextEncoder().encode(form.password).length > 72) {
      setError("Password must not exceed 72 UTF-8 bytes.");
      return;
    }

    const sent = await requestCode();

    if (sent) {
      setOtp("");
      setStep("verify");
    }
  };

  // Step 2: Verify OTP and register account
  const handleVerifySubmit = async (e) => {
    e.preventDefault();

    setError("");
    setInfo("");

    if (otp.length !== 6) {
      setError("Enter the 6-digit code from your email.");
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        username: form.name.trim(),
        email: normalizedEmail,
        password: form.password,
        role: form.role.toUpperCase(),
        otp,
      });

      if (form.role === "doctor") {
        // Doctor account must remain PENDING until admin approval.
        setStep("doctor-pending");
        setOtp("");
        setError("");
        setInfo("");
      } else {
        // Preserve the existing patient registration flow.
        navigate("/login", {
          state: {
            message: "Registration successful. You can now log in.",
          },
        });
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (loading || resendSeconds > 0) return;

    setError("");
    setInfo("");

    const sent = await requestCode();

    if (sent) {
      setOtp("");
      setInfo("A new code has been sent to your email.");
    }
  };

  // Return to registration form
  const handleBack = () => {
    setStep("form");
    setOtp("");
    setError("");
    setInfo("");
  };

  return (
    <div className="auth-page">
      {/* Left panel: brand and introduction */}
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

      {/* Right panel: registration and verification */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-mobile-brand">
            <span className="auth-mark">+</span>
            <span>SmartCare HMS</span>
          </div>

          {/* STEP 1: Registration form */}
          {step === "form" && (
            <>
              <h1 className="page-title">Create your account</h1>

              <p className="page-subtitle">
                Register to get started with SmartCare.
              </p>

              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <label htmlFor="name">Full name</label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="email">Email</label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    maxLength={255}
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="role">Register as</label>

                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
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
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="confirmPassword">Confirm password</label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>

                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}

                {info && (
                  <p className="auth-info" role="status">
                    {info}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                >
                  {loading ? "Sending code..." : "Send verification code"}
                </button>
              </form>

              <p className="auth-footer-text">
                Already have an account? <Link to="/login">Log in here</Link>
              </p>
            </>
          )}

          {/* STEP 2: Email OTP verification */}
          {step === "verify" && (
            <>
              <h1 className="page-title">Verify your email</h1>

              <p className="page-subtitle">
                We sent a 6-digit code to <strong>{normalizedEmail}</strong>. It
                expires in 10 minutes.
              </p>

              <form onSubmit={handleVerifySubmit}>
                <div className="form-row">
                  <label htmlFor="otp">Verification code</label>

                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="123456"
                    className="otp-input"
                    value={otp}
                    onChange={handleOtpChange}
                    required
                  />
                </div>

                {info && (
                  <p className="auth-info" role="status">
                    {info}
                  </p>
                )}

                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary auth-submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & create account"}
                </button>

                <div className="otp-actions">
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={handleResend}
                    disabled={loading || resendSeconds > 0}
                  >
                    {resendSeconds > 0
                      ? `Resend code in ${resendSeconds}s`
                      : "Resend code"}
                  </button>

                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Edit details
                  </button>
                </div>
              </form>
            </>
          )}

          {/* STEP 3: Doctor pending-verification confirmation */}
          {step === "doctor-pending" && (
            <>
              <div className="pending-icon" aria-hidden="true">
                <span>✓</span>
              </div>

              <h1 className="page-title">
                Doctor Registration – Pending Verification
              </h1>

              <p className="page-subtitle">
                Your registration application has been submitted successfully.
              </p>

              <div className="doctor-pending-message">
                <p>
                  Please submit the required documents and provide your complete
                  contact details, including your phone number and residential
                  address, to the hospital administrator within 7 days of
                  registration for verification.
                </p>

                <p>
                  <strong>Important Notice:</strong> If you fail to provide the
                  required documents and information within 7 days, your
                  application may be rejected, and your registration records may
                  be deleted from our database in accordance with our
                  data-retention policy.
                </p>

                <p>
                  Your account will remain in PENDING status until the
                  administrator verifies your information, completes your
                  professional profile, and approves your application.
                </p>

                <p>Thank you for choosing SmartCare HMS.</p>

                <p>
                  <strong>SmartCare HMS – Healthcare Management System</strong>
                </p>
              </div>

              <button
                type="button"
                className="btn btn-primary auth-submit"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>
            </>
          )}
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

        .auth-panel > * {
          position: relative;
          z-index: 1;
        }

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

        /* Right form side */
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
          max-width: 440px;
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 40px 36px;
        }

        .auth-mobile-brand {
          display: none;
        }

        .auth-page .page-title {
          font-size: 24px;
          line-height: 1.35;
          margin-bottom: 4px;
          overflow-wrap: anywhere;
        }

        .auth-page .page-subtitle {
          margin-bottom: 26px;
        }

        .auth-submit {
          width: 100%;
          margin-top: 8px;
        }

        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-error {
          color: var(--color-danger);
          font-size: 13px;
          margin: 0 0 12px;
        }

        .auth-info {
          color: var(--color-primary);
          font-size: 13px;
          margin: 0 0 12px;
        }

        .otp-input {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 8px;
          padding: 12px;
        }

        .otp-actions {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 18px;
        }

        .auth-link-btn {
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-primary);
          cursor: pointer;
        }

        .auth-link-btn:hover:not(:disabled) {
          text-decoration: underline;
        }

        .auth-link-btn:disabled {
          color: var(--color-ink-soft);
          cursor: not-allowed;
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

        .auth-footer-text a:hover {
          text-decoration: underline;
        }

        /* Doctor pending confirmation */
        .pending-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(15, 130, 100, 0.12);
          color: var(--color-primary);
          font-size: 26px;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .doctor-pending-message {
          font-size: 13px;
          line-height: 1.7;
          color: var(--color-ink);
          overflow-wrap: anywhere;
        }

        .doctor-pending-message p {
          margin: 0 0 16px;
        }

        .doctor-pending-message strong {
          font-weight: 700;
        }

        @media (max-width: 860px) {
          .auth-panel {
            display: none;
          }

          .auth-form-side {
            min-height: 100vh;
            padding: 16px;
          }

          .auth-card {
            max-height: calc(100vh - 32px);
            padding: 32px 24px;
          }

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

        @media (max-width: 400px) {
          .auth-card {
            padding: 28px 18px;
          }

          .otp-actions {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
