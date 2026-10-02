import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allDoctors } from "../services/mockData.js";
import { getCurrentUser, logout } from "../services/api.js";

const services = [
  {
    title: "Heart Disease",
    icon: "♥",
    desc: "AI-based risk screening from your vitals — BP, cholesterol indicators, and history.",
  },
  {
    title: "Diabetes",
    icon: "◈",
    desc: "Glucose-based risk prediction, matched instantly with an Endocrinologist.",
  },
  {
    title: "Kidney Disease",
    icon: "◐",
    desc: "Early risk detection so you get routed to a Nephrologist without delay.",
  },
];

const steps = [
  { title: "Register", desc: "Create your patient account in under a minute." },
  { title: "Fill health profile", desc: "Submit your vitals and symptoms." },
  {
    title: "Get matched",
    desc: "AI predicts risk and finds the right specialist.",
  },
  {
    title: "Book appointment",
    desc: "Confirm a slot with your matched doctor.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const handleDashboard = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);

    if (user?.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (user?.role === "DOCTOR") {
      navigate("/doctor/dashboard");
    } else if (user?.role === "PATIENT") {
      navigate("/patient/dashboard");
    }
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <header className="home-nav">
        <div className="home-nav-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>

        {/* Desktop navigation */}
        <nav
          className={`home-nav-links ${
            mobileMenuOpen ? "home-nav-links-open" : ""
          }`}
        >
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>
            Services
          </a>

          <a href="#how" onClick={() => setMobileMenuOpen(false)}>
            How it works
          </a>

          <a href="#doctors" onClick={() => setMobileMenuOpen(false)}>
            Doctors
          </a>

          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </a>

          {/* Mobile-only authentication links */}
          {!user && (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Log in
              </Link>

              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          )}

          {user && (
            <button
              type="button"
              className="mobile-dashboard-link"
              onClick={handleDashboard}
            >
              Dashboard
            </button>
          )}
        </nav>

        <div className="home-nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline">
                Log in
              </Link>

              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <div className="profile-menu">
              <button
                type="button"
                className="profile-button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setMobileMenuOpen(false);
                }}
                aria-label="Open profile menu"
              >
                <span className="profile-icon">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <strong>{user.username}</strong>
                    <span>{user.role}</span>
                  </div>

                  <button type="button" onClick={handleDashboard}>
                    Dashboard
                  </button>

                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="hamburger-button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-text">
          <span className="home-hero-badge">AI-powered diagnosis matching</span>
          <h1>
            Care that finds <span>the right specialist</span> for you.
          </h1>
          <p>
            Submit your health profile and let SmartCare's AI model predict your
            risk for Heart Disease, Diabetes, or Kidney Disease — then connect
            you with the right doctor, automatically.
          </p>
          <div className="home-hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-ghost btn-lg">
              Log in
            </Link>
          </div>
          <div className="home-hero-stats">
            <div>
              <strong>3</strong>
              <span>Conditions screened</span>
            </div>
            <div>
              <strong>{allDoctors.length}</strong>
              <span>Specialist doctors</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Booking access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="home-section">
        <div className="home-section-head">
          <div className="page-eyebrow">What we screen for</div>
          <h2 className="home-section-title">Our services</h2>
          <p className="home-section-sub">
            Three well-documented conditions, screened with a trained
            classification model.
          </p>
        </div>
        <div className="grid grid-3">
          {services.map((s) => (
            <div key={s.title} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="home-section home-section-alt">
        <div className="home-section-head">
          <div className="page-eyebrow">Simple process</div>
          <h2 className="home-section-title">How it works</h2>
        </div>
        <div className="home-steps">
          {steps.map((step, i) => (
            <div key={step.title} className="home-step">
              <div className="home-step-number">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              {i < steps.length - 1 && <div className="home-step-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="home-section">
        <div className="home-section-head">
          <div className="page-eyebrow">Meet the team</div>
          <h2 className="home-section-title">Our doctors</h2>
        </div>
        <div className="grid grid-3">
          {allDoctors.map((doc) => (
            <div key={doc.id} className="doctor-card">
              <div className="doctor-avatar">
                {doc.name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3>{doc.name}</h3>
              <p>
                {doc.specialization} · {doc.experience}
              </p>
              <span
                className={`badge ${doc.available ? "badge-low" : "badge-medium"}`}
              >
                {doc.available ? "Available" : "Unavailable"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="home-section home-section-alt">
        <div className="home-section-head">
          <div className="page-eyebrow">Get in touch</div>
          <h2 className="home-section-title">Contact us</h2>
        </div>
        <div className="home-contact">
          <div className="home-contact-card">
            <div className="home-contact-icon">☎</div>
            <strong>Phone</strong>
            <p>+91 98765 43210</p>
          </div>
          <div className="home-contact-card">
            <div className="home-contact-icon">✉</div>
            <strong>Email</strong>
            <p>contact@smartcarehms.example</p>
          </div>
          <div className="home-contact-card">
            <div className="home-contact-icon">⚲</div>
            <strong>Address</strong>
            <p>SmartCare HMS, 12 Health Street, Kolkata, WB</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-nav-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>
        <span>© 2026 SmartCare HMS. Academic project — MCA 3rd semester.</span>
      </footer>

      <style>{`
        .home-page {
          background: var(--color-bg);
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
          flex-shrink: 0;
        }

        /* ---- Navbar ---- */
        .home-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-line);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .home-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          color: var(--color-primary);
        }
        .home-nav-links { display: flex; gap: 30px; }
        .home-nav-links a {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-ink-soft);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .home-nav-links a:hover { color: var(--color-primary); }
        .home-nav-actions { display: flex; gap: 10px; }
        .btn-lg { padding: 13px 26px; font-size: 15px; }
        .btn-ghost {
          background: rgba(255,255,255,0.12);
          color: white;
          border: 1px solid rgba(255,255,255,0.35);
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.2); }

        /* ---- Hero ---- */
        .home-hero {
          background: var(--color-primary) url('/health-bg-pattern.svg') center / cover no-repeat;
          background-blend-mode: soft-light;
          position: relative;
          padding: 110px 40px 90px;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(15,82,87,0.94), rgba(12,68,72,0.97));
        }
        .home-hero-text {
          position: relative;
          z-index: 1;
          max-width: 680px;
          text-align: center;
          color: white;
        }
        .home-hero-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 22px;
        }
        .home-hero-text h1 {
          font-family: var(--font-display);
          font-size: 46px;
          font-weight: 800;
          line-height: 1.22;
          margin-bottom: 20px;
        }
        .home-hero-text h1 span { color: #A8E6D8; }
        .home-hero-text p {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255,255,255,0.85);
          margin-bottom: 32px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .home-hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          margin-bottom: 48px;
        }
        .home-hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          border-top: 1px solid rgba(255,255,255,0.2);
          padding-top: 28px;
        }
        .home-hero-stats strong {
          display: block;
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
        }
        .home-hero-stats span {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }

        /* ---- Sections ---- */
        .home-section {
          padding: 76px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .home-section-alt {
          background: var(--color-surface);
          max-width: none;
        }
        .home-section-alt > * {
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
        }
        .home-section-head {
          text-align: center;
          margin-bottom: 44px;
        }
        .home-section-title {
          font-size: 30px;
          margin-top: 6px;
          margin-bottom: 10px;
        }
        .home-section-sub {
          font-size: 15px;
          color: var(--color-ink-soft);
          max-width: 440px;
          margin: 0 auto;
        }

        /* ---- Service cards ---- */
        .service-card {
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 30px 24px;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(15,82,87,0.14);
        }
        .service-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--color-primary-soft);
          color: var(--color-primary);
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .service-card h3 { font-size: 17px; margin-bottom: 8px; }
        .service-card p { font-size: 14px; color: var(--color-ink-soft); line-height: 1.5; margin: 0; }

        /* ---- How it works ---- */
        .home-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .home-step {
          text-align: center;
          position: relative;
          padding: 0 8px;
        }
        .home-step-number {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          font-weight: 800;
          font-family: var(--font-display);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
          position: relative;
          z-index: 1;
        }
        .home-step h3 { font-size: 15px; margin-bottom: 6px; }
        .home-step p { font-size: 13px; color: var(--color-ink-soft); margin: 0; }
        .home-step-connector {
          position: absolute;
          top: 19px;
          left: calc(50% + 30px);
          width: calc(100% - 20px);
          height: 2px;
          background: var(--color-line);
        }

        /* ---- Doctor cards ---- */
        .doctor-card {
          background: var(--color-surface);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          padding: 28px 20px;
          text-align: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .doctor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(15,82,87,0.14);
        }
        .doctor-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--color-primary);
          color: white;
          font-weight: 800;
          font-family: var(--font-display);
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
        }
        .doctor-card h3 { font-size: 15px; margin-bottom: 4px; }
        .doctor-card p { font-size: 13px; color: var(--color-ink-soft); margin-bottom: 12px; }

        /* ---- Contact ---- */
        .home-contact {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .home-contact-card {
          text-align: center;
          background: var(--color-bg);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-md);
          padding: 28px 20px;
        }
        .home-contact-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--color-primary-soft);
          color: var(--color-primary);
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .home-contact-card strong {
          display: block;
          font-size: 13px;
          color: var(--color-primary);
          margin-bottom: 6px;
        }
        .home-contact-card p { font-size: 14px; color: var(--color-ink-soft); margin: 0; }

        /* ---- Footer ---- */
        .home-footer {
          padding: 32px 40px;
          text-align: center;
          font-size: 13px;
          color: var(--color-ink-soft);
          border-top: 1px solid var(--color-line);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .home-footer .home-nav-brand { justify-content: center; }

        /* ---- Profile ---- */

.profile-menu {
  position: relative;
}

.profile-button {
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-line);
  border-radius: 50%;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.profile-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 190px;
  background: white;
  border: 1px solid var(--color-line);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  padding: 10px;
  z-index: 100;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px;
  border-bottom: 1px solid var(--color-line);
  margin-bottom: 6px;
}

.profile-info strong {
  font-size: 14px;
  color: var(--color-ink);
}

.profile-info span {
  font-size: 11px;
  color: var(--color-ink-soft);
}

.profile-dropdown button {
  width: 100%;
  border: 0;
  background: transparent;
  padding: 10px;
  text-align: left;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}

.profile-dropdown button:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.hamburger-button {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: white;
  cursor: pointer;
  padding: 8px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.hamburger-button span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
}

.mobile-dashboard-link {
  display: none;
}

/* ---- Responsive Navbar ---- */

@media (max-width: 860px) {
  .home-nav {
    padding: 14px 20px;
    position: relative;
  }

  .home-nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Hide desktop auth buttons */
  .home-nav-actions > .btn {
    display: none;
  }

  /* Show hamburger */
  .hamburger-button {
    display: flex;
  }

  /* Mobile navigation menu */
  .home-nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: white;
    border-bottom: 1px solid var(--color-line);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    padding: 10px 20px;
  }

  .home-nav-links.home-nav-links-open {
    display: flex;
  }

  .home-nav-links a,
  .home-nav-links button {
    width: 100%;
    padding: 14px 4px;
    border-bottom: 1px solid var(--color-line);
    text-align: left;
  }

  .home-nav-links a:last-child {
    border-bottom: none;
  }

  .home-nav-links .mobile-dashboard-link {
    display: block;
    border: 0;
    background: transparent;
    color: var(--color-ink-soft);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Logged-in profile remains visible */
  .profile-menu {
    display: block;
  }

  .home-hero {
    padding: 80px 24px 60px;
  }

  .home-hero-text h1 {
    font-size: 30px;
  }

  .home-hero-stats {
    gap: 28px;
    flex-wrap: wrap;
  }

  .home-steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .home-step-connector {
    display: none;
  }

  .home-contact {
    grid-template-columns: 1fr;
  }

  .home-section {
    padding: 48px 20px;
  }
}
          .home-hero { padding: 80px 24px 60px; }
          .home-hero-text h1 { font-size: 30px; }
          .home-hero-stats { gap: 28px; flex-wrap: wrap; }
          .home-steps { grid-template-columns: repeat(2, 1fr); }
          .home-step-connector { display: none; }
          .home-contact { grid-template-columns: 1fr; }
          .home-section { padding: 48px 20px; }
        }
      `}</style>
    </div>
  );
}
