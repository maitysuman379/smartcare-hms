import { Link } from "react-router-dom";
import { allDoctors } from "../services/mockData.js";

const services = [
  {
    title: "Heart Disease",
    desc: "AI-based risk screening from your vitals — BP, cholesterol indicators, and history.",
  },
  {
    title: "Diabetes",
    desc: "Glucose-based risk prediction, matched instantly with an Endocrinologist.",
  },
  {
    title: "Kidney Disease",
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
  return (
    <div className="home-page">
      {/* Navbar */}
      <header className="home-nav">
        <div className="home-nav-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>
        <nav className="home-nav-links">
          <a href="#services">Services</a>
          <a href="#doctors">Doctors</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="home-nav-actions">
          <Link to="/login" className="btn btn-outline">
            Log in
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-text">
          <h1>AI-assisted care, matched to the right specialist.</h1>
          <p>
            Submit your health profile and let SmartCare's AI model predict your
            risk for Heart Disease, Diabetes, or Kidney Disease — then connect
            you with the right doctor, automatically.
          </p>
          <div className="home-hero-actions">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline">
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="home-section">
        <div className="page-eyebrow" style={{ textAlign: "center" }}>
          What we screen for
        </div>
        <h2 className="home-section-title">Our Services</h2>
        <div className="grid grid-3">
          {services.map((s) => (
            <div key={s.title} className="card">
              <h3 style={{ marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="home-section home-section-alt">
        <div className="page-eyebrow" style={{ textAlign: "center" }}>
          Simple process
        </div>
        <h2 className="home-section-title">How It Works</h2>
        <div className="home-steps">
          {steps.map((step, i) => (
            <div key={step.title} className="home-step">
              <div className="home-step-number">{i + 1}</div>
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="home-section">
        <div className="page-eyebrow" style={{ textAlign: "center" }}>
          Meet the team
        </div>
        <h2 className="home-section-title">Our Doctors</h2>
        <div className="grid grid-3">
          {allDoctors.map((doc) => (
            <div key={doc.id} className="card">
              <h3 style={{ marginBottom: 4 }}>{doc.name}</h3>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--color-ink-soft)",
                  marginBottom: 10,
                }}
              >
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
        <div className="page-eyebrow" style={{ textAlign: "center" }}>
          Get in touch
        </div>
        <h2 className="home-section-title">Contact Us</h2>
        <div className="home-contact">
          <div>
            <strong>Phone</strong>
            <p>+91 98765 43210</p>
          </div>
          <div>
            <strong>Email</strong>
            <p>contact@smartcarehms.example</p>
          </div>
          <div>
            <strong>Address</strong>
            <p>SmartCare HMS, 12 Health Street, Kolkata, WB</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
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
        }

        .home-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
          background: var(--color-surface);
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
        .home-nav-links {
          display: flex;
          gap: 28px;
        }
        .home-nav-links a {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-ink-soft);
          text-decoration: none;
        }
        .home-nav-links a:hover { color: var(--color-primary); }
        .home-nav-actions {
          display: flex;
          gap: 10px;
        }

        .home-hero {
          background: var(--color-primary) url('/health-bg-pattern.svg') center / cover no-repeat;
          background-blend-mode: soft-light;
          position: relative;
          padding: 90px 40px;
          display: flex;
          justify-content: center;
        }
        .home-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(15,82,87,0.92), rgba(12,68,72,0.96));
        }
        .home-hero-text {
          position: relative;
          z-index: 1;
          max-width: 620px;
          text-align: center;
          color: white;
        }
        .home-hero-text h1 {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 18px;
        }
        .home-hero-text p {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          margin-bottom: 28px;
        }
        .home-hero-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .home-section {
          padding: 64px 40px;
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
        .home-section-title {
          font-size: 26px;
          text-align: center;
          margin-bottom: 32px;
        }

        .home-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .home-step {
          text-align: center;
        }
        .home-step-number {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--color-primary-soft);
          color: var(--color-primary);
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }

        .home-contact {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          text-align: center;
        }
        .home-contact strong {
          display: block;
          font-size: 13px;
          color: var(--color-primary);
          margin-bottom: 6px;
        }
        .home-contact p {
          font-size: 14px;
          color: var(--color-ink-soft);
          margin: 0;
        }

        .home-footer {
          padding: 24px 40px;
          text-align: center;
          font-size: 13px;
          color: var(--color-ink-soft);
          border-top: 1px solid var(--color-line);
        }

        @media (max-width: 860px) {
          .home-nav-links { display: none; }
          .home-hero-text h1 { font-size: 28px; }
          .home-steps { grid-template-columns: repeat(2, 1fr); }
          .home-contact { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
