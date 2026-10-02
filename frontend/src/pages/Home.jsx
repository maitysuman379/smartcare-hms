import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  logout,
  getMyPatient,
  getAllDoctors,
  createAppointment,
} from "../services/api.js";

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
  {
    title: "Register",
    desc: "Create your patient account in under a minute.",
  },
  {
    title: "Fill health profile",
    desc: "Submit your vitals and symptoms.",
  },
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
  const navigate = useNavigate();

  const user = getCurrentUser();
  const userRole = user?.role || null;

  /* --------------------------------
     NAVBAR STATE
  -------------------------------- */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /* --------------------------------
     DOCTORS
  -------------------------------- */
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [doctorsError, setDoctorsError] = useState("");

  /* --------------------------------
     APPOINTMENT
  -------------------------------- */
  const [appointmentPatient, setAppointmentPatient] = useState(null);

  const [appointmentForm, setAppointmentForm] = useState({
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });

  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const [appointmentMessage, setAppointmentMessage] = useState("");
  const [appointmentError, setAppointmentError] = useState("");

  /* --------------------------------
     LOAD REAL DOCTORS
  -------------------------------- */
  useEffect(() => {
    async function loadDoctors() {
      try {
        setDoctorsLoading(true);
        setDoctorsError("");

        const data = await getAllDoctors();

        setDoctors(data.doctors || []);
      } catch (error) {
        console.error("Failed to load doctors:", error);

        setDoctorsError(
          error.message || "Failed to load doctors from the server.",
        );
      } finally {
        setDoctorsLoading(false);
      }
    }

    loadDoctors();
  }, []);

  /* --------------------------------
     LOAD PATIENT PROFILE
     Only for logged-in patients
  -------------------------------- */
  useEffect(() => {
    async function loadPatient() {
      if (userRole !== "PATIENT") {
        setAppointmentPatient(null);
        return;
      }

      try {
        const data = await getMyPatient();

        setAppointmentPatient(data.patient);
      } catch (error) {
        console.error("Failed to load patient profile:", error);

        setAppointmentError(error.message || "Failed to load patient profile.");
      }
    }

    loadPatient();
  }, [userRole]);

  /* --------------------------------
     TODAY'S DATE
     Used as minimum appointment date
  -------------------------------- */
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* --------------------------------
     LOGOUT
  -------------------------------- */
  const handleLogout = () => {
    logout();

    setProfileOpen(false);
    setMobileMenuOpen(false);

    navigate("/");
  };

  /* --------------------------------
     DASHBOARD
  -------------------------------- */
  const handleDashboard = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);

    if (userRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (userRole === "DOCTOR") {
      navigate("/doctor/dashboard");
    } else if (userRole === "PATIENT") {
      navigate("/patient/dashboard");
    }
  };

  /* --------------------------------
     APPOINTMENT INPUT CHANGE
  -------------------------------- */
  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;

    setAppointmentForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAppointmentError("");
    setAppointmentMessage("");
  };

  /* --------------------------------
     MANUAL APPOINTMENT SUBMIT
  -------------------------------- */
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    setAppointmentError("");
    setAppointmentMessage("");

    /* Patient login required */
    if (!user) {
      setAppointmentError(
        "Please login as a patient before booking an appointment.",
      );

      navigate("/login");
      return;
    }

    if (userRole !== "PATIENT") {
      setAppointmentError(
        "Only patient accounts can book appointments from this form.",
      );
      return;
    }

    /* Patient profile required */
    if (!appointmentPatient?.id) {
      setAppointmentError(
        "Patient profile not found. Please complete your patient profile.",
      );
      return;
    }

    /* Required fields */
    if (
      !appointmentForm.doctor_id ||
      !appointmentForm.appointment_date ||
      !appointmentForm.appointment_time
    ) {
      setAppointmentError(
        "Please select a doctor, appointment date and appointment time.",
      );
      return;
    }

    /* Prevent past date */
    if (appointmentForm.appointment_date < getTodayDate()) {
      setAppointmentError("Appointment date cannot be in the past.");
      return;
    }

    try {
      setAppointmentLoading(true);

      const appointmentCode = `APT-${Date.now()}`;

      await createAppointment({
        appointment_code: appointmentCode,
        patient_id: appointmentPatient.id,
        doctor_id: Number(appointmentForm.doctor_id),
        appointment_date: appointmentForm.appointment_date,
        appointment_time: appointmentForm.appointment_time,
        reason:
          appointmentForm.reason.trim() ||
          "Manual appointment booking from home page",
      });

      setAppointmentMessage(
        `Appointment booked successfully. Appointment code: ${appointmentCode}`,
      );

      setAppointmentForm({
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
      });
    } catch (error) {
      console.error("Appointment booking error:", error);

      setAppointmentError(error.message || "Failed to book appointment.");
    } finally {
      setAppointmentLoading(false);
    }
  };

  /* --------------------------------
     AVAILABLE DOCTORS
  -------------------------------- */
  const availableDoctors = doctors.filter(
    (doctor) => doctor.availability_status === "AVAILABLE",
  );

  return (
    <div className="home-page">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="home-nav">
        <div className="home-nav-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>

        {/* --------------------------------
            NAVIGATION LINKS
        -------------------------------- */}
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

          <a href="#appointment" onClick={() => setMobileMenuOpen(false)}>
            Appointment
          </a>

          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </a>

          {/* Mobile login/register */}
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

          {/* Mobile dashboard */}
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

        {/* --------------------------------
            RIGHT SIDE ACTIONS
        -------------------------------- */}
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
            /* --------------------------------
               PROFILE
            -------------------------------- */
            <div className="profile-menu">
              <button
                type="button"
                className="profile-button"
                onClick={() => {
                  setProfileOpen((prev) => !prev);
                  setMobileMenuOpen(false);
                }}
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
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

                  {user.role === "PATIENT" && (
                    <Link
                      to="/patient/health-profile"
                      onClick={() => setProfileOpen(false)}
                    >
                      Health Profile
                    </Link>
                  )}

                  <Link to="/profile" onClick={() => setProfileOpen(false)}>
                    My Profile
                  </Link>

                  <button type="button" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* --------------------------------
              HAMBURGER
          -------------------------------- */}
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

      {/* =========================================================
          HERO
      ========================================================= */}
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
            {!user ? (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Get Started
                </Link>

                <Link to="/login" className="btn btn-ghost btn-lg">
                  Log in
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate("/patient/health-profile")}
              >
                Get Started
              </button>
            )}
          </div>

          <div className="home-hero-stats">
            <div>
              <strong>3</strong>
              <span>Conditions screened</span>
            </div>

            <div>
              <strong>{doctors.length}</strong>
              <span>Specialist doctors</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Booking access</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
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
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <div className="service-icon">{service.icon}</div>

              <h3>{service.title}</h3>

              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section id="how" className="home-section home-section-alt">
        <div className="home-section-head">
          <div className="page-eyebrow">Simple process</div>

          <h2 className="home-section-title">How it works</h2>
        </div>

        <div className="home-steps">
          {steps.map((step, index) => (
            <div key={step.title} className="home-step">
              <div className="home-step-number">{index + 1}</div>

              <h3>{step.title}</h3>

              <p>{step.desc}</p>

              {index < steps.length - 1 && (
                <div className="home-step-connector" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          DOCTORS
      ========================================================= */}
      <section id="doctors" className="home-section">
        <div className="home-section-head">
          <div className="page-eyebrow">Meet the team</div>

          <h2 className="home-section-title">Our doctors</h2>
        </div>

        {doctorsLoading && (
          <div className="home-status">Loading doctors...</div>
        )}

        {doctorsError && <div className="home-error">{doctorsError}</div>}

        {!doctorsLoading && !doctorsError && doctors.length === 0 && (
          <div className="home-status">No doctors available.</div>
        )}

        <div className="grid grid-3">
          {doctors.map((doctor) => {
            const isAvailable = doctor.availability_status === "AVAILABLE";

            const initials = (doctor.name || "Doctor")
              .replace(/^Dr\.\s*/i, "")
              .split(" ")
              .filter(Boolean)
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-avatar">{initials}</div>

                <h3>{doctor.name}</h3>

                <p>
                  {doctor.specialization || "General Medicine"}
                  {doctor.experience ? ` · ${doctor.experience}` : ""}
                </p>

                <span
                  className={`badge ${
                    isAvailable ? "badge-low" : "badge-medium"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          MANUAL APPOINTMENT
      ========================================================= */}
      <section id="appointment" className="home-appointment-section">
        <div className="home-section-head">
          <div className="page-eyebrow">Book your visit</div>

          <h2 className="home-section-title">Book an appointment</h2>

          <p className="home-section-sub">
            Choose a doctor, select your preferred date and time, and submit
            your appointment request.
          </p>
        </div>

        <div className="appointment-layout">
          {/* Appointment Form */}
          <div className="appointment-form-card">
            <form onSubmit={handleAppointmentSubmit}>
              <div className="appointment-form-grid">
                {/* Doctor */}
                <div className="appointment-field">
                  <label htmlFor="doctor_id">Select Doctor</label>

                  <select
                    id="doctor_id"
                    name="doctor_id"
                    value={appointmentForm.doctor_id}
                    onChange={handleAppointmentChange}
                    disabled={
                      appointmentLoading || availableDoctors.length === 0
                    }
                  >
                    <option value="">Select Doctor</option>

                    {availableDoctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} — {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="appointment-field">
                  <label htmlFor="appointment_date">Appointment Date</label>

                  <input
                    id="appointment_date"
                    type="date"
                    name="appointment_date"
                    value={appointmentForm.appointment_date}
                    min={getTodayDate()}
                    onChange={handleAppointmentChange}
                    disabled={appointmentLoading}
                  />
                </div>

                {/* Time */}
                <div className="appointment-field">
                  <label htmlFor="appointment_time">Appointment Time</label>

                  <input
                    id="appointment_time"
                    type="time"
                    name="appointment_time"
                    value={appointmentForm.appointment_time}
                    onChange={handleAppointmentChange}
                    disabled={appointmentLoading}
                  />
                </div>

                {/* Reason */}
                <div className="appointment-field">
                  <label htmlFor="reason">Reason for Visit</label>

                  <input
                    id="reason"
                    type="text"
                    name="reason"
                    value={appointmentForm.reason}
                    onChange={handleAppointmentChange}
                    placeholder="e.g. Routine checkup"
                    disabled={appointmentLoading}
                  />
                </div>

                {/* Message */}
                {appointmentError && (
                  <div className="appointment-message appointment-message-error">
                    {appointmentError}
                  </div>
                )}

                {appointmentMessage && (
                  <div className="appointment-message appointment-message-success">
                    {appointmentMessage}
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  className="btn btn-primary appointment-submit"
                  disabled={appointmentLoading}
                >
                  {appointmentLoading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>

          {/* Appointment Information */}
          <div className="appointment-info-card">
            <h3>Why book with SmartCare?</h3>

            <p>
              Manage your hospital appointments directly through the SmartCare
              HMS platform.
            </p>

            <div className="appointment-info-list">
              <div>
                <span>✓</span>
                <p>Choose from available doctors</p>
              </div>

              <div>
                <span>✓</span>
                <p>Select your preferred date and time</p>
              </div>

              <div>
                <span>✓</span>
                <p>Appointment is stored in the HMS database</p>
              </div>

              <div>
                <span>✓</span>
                <p>View your appointment from your dashboard</p>
              </div>

              <div>
                <span>✓</span>
                <p>AI-recommended appointments are also supported</p>
              </div>
            </div>

            {!user && (
              <div className="appointment-login-note">
                Please <Link to="/login">log in</Link> as a patient to book an
                appointment.
              </div>
            )}

            {user && userRole !== "PATIENT" && (
              <div className="appointment-login-note">
                Appointment booking from this page is available for patient
                accounts.
              </div>
            )}

            {userRole === "PATIENT" && appointmentPatient && (
              <div className="appointment-patient-info">
                <strong>Booking for:</strong>

                <span>{appointmentPatient.name}</span>

                <small>Patient ID: {appointmentPatient.id}</small>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT
      ========================================================= */}
      <section id="contact" className="home-section home-section-alt">
        <div className="home-section-head">
          <div className="page-eyebrow">Get in touch</div>

          <h2 className="home-section-title">Contact us</h2>
        </div>

        <div className="home-contact">
          <div className="home-contact-card">
            <div className="home-contact-icon">☎</div>

            <strong>Phone</strong>

            <p>+91 8967333550</p>
            <hr />
            <p>+91 8145508186</p>
          </div>

          <div className="home-contact-card">
            <div className="home-contact-icon">✉</div>

            <strong>Email</strong>

            <p>smartcarehms@gmail.com</p>
            <hr />
            <p>devsuman.in@gmail.com</p>
          </div>

          <div className="home-contact-card">
            <div className="home-contact-icon">⚲</div>

            <strong>Address</strong>

            <p>SmartCare HMS</p>
            <hr />
            <p>
              {" "}
              Haldia Institute of Technology, ICARE Complex, Haldia, Purba
              Medinipur, West Bengal, India.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="home-footer">
        <div className="home-nav-brand">
          <span className="auth-mark">+</span>
          <span>SmartCare HMS</span>
        </div>

        <span>© 2026 SmartCare HMS. Academic project — MCA 3rd semester.</span>
      </footer>

      {/* =========================================================
          STYLES
      ========================================================= */}
      <style>{`
        /* =====================================================
           GENERAL
        ===================================================== */

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

        /* =====================================================
           NAVBAR
        ===================================================== */

        .home-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-line);
          position: sticky;
          top: 0;
          z-index: 1000;
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
          align-items: center;
          gap: 30px;
        }

        .home-nav-links a {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-ink-soft);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .home-nav-links a:hover {
          color: var(--color-primary);
        }

        .home-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .home-hero {
          background:
            var(--color-primary)
            url('/health-bg-pattern.svg')
            center / cover
            no-repeat;

          background-blend-mode: soft-light;

          position: relative;

          padding: 110px 40px 90px;

          display: flex;
          justify-content: center;

          overflow: hidden;
        }

        .home-hero::before {
          content: "";
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              160deg,
              rgba(15, 82, 87, 0.94),
              rgba(12, 68, 72, 0.97)
            );
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

          background: rgba(255, 255, 255, 0.14);

          border: 1px solid rgba(255, 255, 255, 0.3);

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

        .home-hero-text h1 span {
          color: #a8e6d8;
        }

        .home-hero-text p {
          font-size: 16px;

          line-height: 1.65;

          color: rgba(255, 255, 255, 0.85);

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

        .btn-lg {
          padding: 13px 26px;
          font-size: 15px;
        }

        .btn-ghost {
          background: rgba(255, 255, 255, 0.12);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .home-hero-stats {
          display: flex;

          justify-content: center;

          gap: 48px;

          border-top: 1px solid rgba(255, 255, 255, 0.2);

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

          color: rgba(255, 255, 255, 0.7);
        }

        /* =====================================================
           COMMON SECTIONS
        ===================================================== */

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

          max-width: 500px;

          margin: 0 auto;

          line-height: 1.6;
        }

        /* =====================================================
           SERVICES
        ===================================================== */

        .service-card {
          background: var(--color-surface);

          border: 1px solid var(--color-line);

          border-radius: var(--radius-lg);

          box-shadow: var(--shadow-card);

          padding: 30px 24px;

          text-align: center;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .service-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 28px rgba(15, 82, 87, 0.14);
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

        .service-card h3 {
          font-size: 17px;

          margin-bottom: 8px;
        }

        .service-card p {
          font-size: 14px;

          color: var(--color-ink-soft);

          line-height: 1.5;

          margin: 0;
        }

        /* =====================================================
           HOW IT WORKS
        ===================================================== */

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

        .home-step h3 {
          font-size: 15px;

          margin-bottom: 6px;
        }

        .home-step p {
          font-size: 13px;

          color: var(--color-ink-soft);

          margin: 0;

          line-height: 1.5;
        }

        .home-step-connector {
          position: absolute;

          top: 19px;

          left: calc(50% + 30px);

          width: calc(100% - 20px);

          height: 2px;

          background: var(--color-line);
        }

        /* =====================================================
           DOCTORS
        ===================================================== */

        .doctor-card {
          background: var(--color-surface);

          border: 1px solid var(--color-line);

          border-radius: var(--radius-lg);

          box-shadow: var(--shadow-card);

          padding: 28px 20px;

          text-align: center;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .doctor-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 28px rgba(15, 82, 87, 0.14);
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

        .doctor-card h3 {
          font-size: 15px;

          margin-bottom: 4px;
        }

        .doctor-card p {
          font-size: 13px;

          color: var(--color-ink-soft);

          margin-bottom: 12px;
        }

        .home-status {
          text-align: center;

          padding: 20px;

          color: var(--color-ink-soft);
        }

        .home-error {
          max-width: 700px;

          margin: 0 auto 20px;

          padding: 12px 16px;

          border-radius: 8px;

          background: #fff1f1;

          color: #b42318;

          border: 1px solid #f3caca;

          font-size: 14px;

          text-align: center;
        }

        /* =====================================================
           MANUAL APPOINTMENT
        ===================================================== */

        .home-appointment-section {
          padding: 80px 40px;

          background: #dff6f7;
        }

        .appointment-layout {
          max-width: 1100px;

          margin: 0 auto;

          display: grid;

          grid-template-columns: 1.35fr 0.9fr;

          gap: 26px;

          align-items: start;
        }

        .appointment-form-card {
          background: white;

          border-radius: 14px;

          padding: 28px;

          box-shadow:
            0 8px 28px rgba(15, 82, 87, 0.1);

          border: 1px solid var(--color-line);
        }

        .appointment-form-grid {
          display: grid;

          grid-template-columns: repeat(2, 1fr);

          gap: 18px;
        }

        .appointment-field {
          display: flex;

          flex-direction: column;

          gap: 7px;
        }

        .appointment-field label {
          font-size: 13px;

          font-weight: 600;

          color: var(--color-ink);
        }

        .appointment-field input,
        .appointment-field select {
          width: 100%;

          box-sizing: border-box;

          height: 44px;

          border: 1px solid var(--color-line);

          border-radius: 7px;

          background: white;

          padding: 0 12px;

          font-size: 13px;

          color: var(--color-ink);

          outline: none;
        }

        .appointment-field input:focus,
        .appointment-field select:focus {
          border-color: var(--color-primary);

          box-shadow:
            0 0 0 3px rgba(15, 82, 87, 0.08);
        }

        .appointment-field:nth-child(4) {
          grid-column: 1 / -1;
        }

        .appointment-message {
          grid-column: 1 / -1;

          padding: 12px 14px;

          border-radius: 8px;

          font-size: 13px;

          line-height: 1.5;
        }

        .appointment-message-error {
          background: #fff1f1;

          color: #b42318;

          border: 1px solid #f1c6c6;
        }

        .appointment-message-success {
          background: #edf9f3;

          color: #18794e;

          border: 1px solid #b9e4cc;
        }

        .appointment-submit {
          grid-column: 1 / -1;

          width: 100%;

          height: 44px;

          cursor: pointer;
        }

        .appointment-submit:disabled {
          opacity: 0.65;

          cursor: not-allowed;
        }

        .appointment-info-card {
          background: #f8fbff;

          border: 1px solid var(--color-line);

          border-radius: 14px;

          padding: 30px;

          box-shadow:
            0 8px 28px rgba(15, 82, 87, 0.08);
        }

        .appointment-info-card h3 {
          color: #006dcc;

          font-size: 22px;

          margin-bottom: 12px;
        }

        .appointment-info-card > p {
          color: var(--color-ink-soft);

          font-size: 14px;

          line-height: 1.6;

          margin-bottom: 22px;
        }

        .appointment-info-list {
          display: flex;

          flex-direction: column;

          gap: 13px;
        }

        .appointment-info-list div {
          display: flex;

          gap: 10px;

          align-items: flex-start;
        }

        .appointment-info-list span {
          color: var(--color-primary);

          font-weight: 800;

          font-size: 15px;
        }

        .appointment-info-list p {
          margin: 0;

          font-size: 13px;

          color: var(--color-ink-soft);

          line-height: 1.4;
        }

        .appointment-login-note {
          margin-top: 22px;

          padding: 12px 14px;

          background: var(--color-primary-soft);

          border-radius: 8px;

          color: var(--color-ink-soft);

          font-size: 13px;

          line-height: 1.5;
        }

        .appointment-login-note a {
          color: var(--color-primary);

          font-weight: 700;
        }

        .appointment-patient-info {
          margin-top: 20px;

          padding: 14px;

          border-radius: 8px;

          background: #eef8f8;

          display: flex;

          flex-direction: column;

          gap: 4px;

          font-size: 13px;
        }

        .appointment-patient-info strong {
          color: var(--color-primary);
        }

        .appointment-patient-info span {
          font-weight: 700;

          color: var(--color-ink);
        }

        .appointment-patient-info small {
          color: var(--color-ink-soft);
        }

        /* =====================================================
           CONTACT
        ===================================================== */

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

        .home-contact-card p {
          font-size: 14px;

          color: var(--color-ink-soft);

          margin: 0;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

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

        .home-footer .home-nav-brand {
          justify-content: center;
        }

        /* =====================================================
           PROFILE
        ===================================================== */

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

          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.12);

          padding: 10px;

          z-index: 2000;
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

        .profile-dropdown button,
.profile-dropdown a {
  display: block;

  width: 100%;

  border: 0;

  background: transparent;

  padding: 10px;

  margin: 0;

  box-sizing: border-box;

  text-align: left;

  text-decoration: none;

  border-radius: 8px;

  cursor: pointer;

  font-size: 13px;

  font-family: inherit;

  color: var(--color-ink);
}

.profile-dropdown button:hover,
.profile-dropdown a:hover {
  background: var(--color-primary-soft);

  color: var(--color-primary);

  text-decoration: none;
}

        /* =====================================================
           HAMBURGER
        ===================================================== */

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

        /* =====================================================
           RESPONSIVE
        ===================================================== */

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

          /* Hide desktop Login/Register */
          .home-nav-actions > .btn {
            display: none;
          }

          /* Show hamburger */
          .hamburger-button {
            display: flex;
          }

          /* Mobile menu */
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

            box-shadow:
              0 8px 20px rgba(0, 0, 0, 0.08);

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

          .home-nav-links .mobile-dashboard-link {
            display: block;

            border: 0;

            background: transparent;

            color: var(--color-ink-soft);

            font-size: 14px;

            font-weight: 600;

            cursor: pointer;
          }

          /* Profile stays visible */
          .profile-menu {
            display: block;
          }

          /* Hero */
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

          /* Steps */
          .home-steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .home-step-connector {
            display: none;
          }

          /* Appointment */
          .home-appointment-section {
            padding: 60px 20px;
          }

          .appointment-layout {
            grid-template-columns: 1fr;
          }

          .appointment-form-grid {
            grid-template-columns: 1fr;
          }

          .appointment-field:nth-child(4) {
            grid-column: auto;
          }

          .appointment-message {
            grid-column: auto;
          }

          .appointment-submit {
            grid-column: auto;
          }

          /* Contact */
          .home-contact {
            grid-template-columns: 1fr;
          }

          .home-section {
            padding: 48px 20px;
          }
        }

        @media (max-width: 560px) {
          .home-nav {
            padding: 12px 14px;
          }

          .home-nav-brand {
            font-size: 14px;
          }

          .auth-mark {
            width: 24px;
            height: 24px;
          }

          .profile-button {
            width: 38px;
            height: 38px;
          }

          .profile-icon {
            width: 30px;
            height: 30px;
          }

          .hamburger-button {
            width: 38px;
            height: 38px;
          }

          .home-hero {
            padding: 65px 18px 50px;
          }

          .home-hero-text h1 {
            font-size: 27px;
          }

          .home-hero-text p {
            font-size: 14px;
          }

          .home-hero-actions {
            flex-direction: column;
          }

          .home-hero-actions .btn {
            width: 100%;
          }

          .home-hero-stats {
            gap: 20px;
          }

          .home-steps {
            grid-template-columns: 1fr;
          }

          .appointment-form-card,
          .appointment-info-card {
            padding: 20px;
          }

          .home-footer {
            padding: 26px 18px;
          }
        }
      `}</style>
    </div>
  );
}
