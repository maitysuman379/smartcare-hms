import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileMenu from "../components/ProfileMenu.jsx";
import {
  getMyPatient,
  getMyLatestVitals,
  getMyPredictions,
  getAllDoctors,
  createAppointment,
  getPatientAppointments,
} from "../services/api.js";

/* ---------- Styles (self-contained: every rule is scoped under .pd-page) ---------- */
const styles = `
.pd-page {
  --pd-bg: #f3f8f8;
  --pd-card: #ffffff;
  --pd-text: #0f2f33;
  --pd-soft: #5b7479;
  --pd-border: #dbe7e8;
  --pd-tile: #f3f8f8;
  --pd-brand: #0f5a5e;
  --pd-brand-2: #178a86;
  --pd-mint: #a7e8d8;
  --pd-danger: #dc2626;
  --pd-danger-bg: #fee2e2;
  --pd-success: #16a34a;
  --pd-success-bg: #dcfce7;
  --pd-warn: #b45309;
  --pd-warn-bg: #fef3c7;
  --pd-radius: 20px;
  --pd-shadow: 0 1px 2px rgba(15, 47, 51, 0.05),
    0 8px 24px rgba(15, 47, 51, 0.07);

  position: fixed;
  inset: 0;
  z-index: 1500;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: var(--pd-bg);
  color: var(--pd-text);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.pd-page *,
.pd-page *::before,
.pd-page *::after {
  box-sizing: border-box;
}

.pd-page :where(h1, h2, h3, p) {
  margin: 0;
}

.pd-page :is(h1, h2, h3) {
  font-family: inherit;
}

.pd-page :focus-visible {
  outline: 2px solid var(--pd-brand);
  outline-offset: 2px;
}

/* Top bar */
.pd-page .pd-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--pd-border);
}

.pd-page .pd-topbar-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pd-page .pd-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 800;
  color: var(--pd-brand);
}

.pd-page .pd-brand-mark {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: var(--pd-brand);
  color: #ffffff;
  font-weight: 800;
}

/* Page body */
.pd-page .pd-main {
  max-width: 960px;
  margin: 0 auto;
  padding: 28px 20px 64px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* Header */
.pd-page .pd-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pd-brand);
  background: color-mix(in srgb, var(--pd-brand) 10%, transparent);
  padding: 5px 12px;
  border-radius: 999px;
}

.pd-page .pd-title {
  margin: 12px 0 6px;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--pd-text);
}

.pd-page .pd-subtitle {
  font-size: 15px;
  color: var(--pd-soft);
}

/* Hero */
.pd-page .pd-hero {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 28px;
  border-radius: var(--pd-radius);
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 20%, rgba(167, 232, 216, 0.22), transparent 40%),
    radial-gradient(circle at 90% 85%, rgba(167, 232, 216, 0.14), transparent 45%),
    linear-gradient(135deg, #0f4c55 0%, #0d5a5c 55%, #0b4247 100%);
  box-shadow: 0 16px 40px rgba(15, 76, 85, 0.28);
}

.pd-page .pd-hero-icon {
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--pd-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 4px solid rgba(167, 232, 216, 0.6);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.pd-page .pd-hero-icon svg {
  width: 38px;
  height: 38px;
}

.pd-page .pd-hero-info {
  min-width: 0;
  flex: 1 1 240px;
}

.pd-page .pd-hero-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
}

.pd-page .pd-hero-sub {
  margin: 4px 0 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.pd-page .pd-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pd-page .pd-hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: var(--pd-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 1px solid rgba(167, 232, 216, 0.5);
}

.pd-page .pd-progress {
  flex: 0 1 220px;
  min-width: 180px;
  margin-left: auto;
}

.pd-page .pd-progress-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
}

.pd-page .pd-progress-top strong {
  color: #ffffff;
}

.pd-page .pd-progress-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.pd-page .pd-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--pd-mint);
  transition: width 0.25s ease;
}

/* Cards */
.pd-page .pd-two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  align-items: start;
}

.pd-page .pd-card {
  padding: 26px 28px 28px;
  background: var(--pd-card);
  border: 1px solid var(--pd-border);
  border-radius: var(--pd-radius);
  box-shadow: var(--pd-shadow);
  min-width: 0;
}

.pd-page .pd-card-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--pd-border);
}

.pd-page .pd-card-titles {
  flex: 1 1 140px;
  min-width: 0;
}

.pd-page .pd-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--pd-text);
}

.pd-page .pd-card-sub {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--pd-soft);
}

.pd-page .pd-card-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: var(--pd-brand);
  background: color-mix(in srgb, var(--pd-brand) 12%, transparent);
}

.pd-page .pd-card-icon svg {
  width: 20px;
  height: 20px;
}

.pd-page .pd-card-icon--red {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.12);
}

.pd-page .pd-card-icon--green {
  color: #16a34a;
  background: rgba(22, 163, 74, 0.12);
}

.pd-page .pd-card-icon--amber {
  color: #b45309;
  background: rgba(217, 119, 6, 0.14);
}

.pd-page .pd-count {
  margin-left: auto;
  font-size: 12px;
  font-weight: 700;
  color: var(--pd-brand);
  background: color-mix(in srgb, var(--pd-brand) 10%, transparent);
  padding: 4px 11px;
  border-radius: 999px;
}

/* Text helpers */
.pd-page .pd-empty {
  font-size: 14px;
  color: var(--pd-soft);
}

.pd-page .pd-small {
  font-size: 13px;
  color: var(--pd-soft);
}

.pd-page .pd-success {
  margin-top: 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--pd-success);
}

.pd-page .pd-error {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--pd-danger);
  background: var(--pd-danger-bg);
}

/* Badges */
.pd-page .pd-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.pd-page .pd-badge--low {
  color: #15803d;
  background: var(--pd-success-bg);
}

.pd-page .pd-badge--medium {
  color: var(--pd-warn);
  background: var(--pd-warn-bg);
}

.pd-page .pd-badge--high {
  color: #b91c1c;
  background: var(--pd-danger-bg);
}

/* Assessment */
.pd-page .pd-risk-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.pd-page .pd-risk-score {
  font-size: 14px;
  color: var(--pd-soft);
}

.pd-page .pd-condition {
  padding: 14px 16px;
  margin-bottom: 12px;
  border-radius: 14px;
  background: var(--pd-tile);
}

.pd-page .pd-condition-label {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pd-soft);
}

.pd-page .pd-condition-value {
  font-size: 16px;
  font-weight: 700;
}

/* Doctor */
.pd-page .pd-doctor-name {
  font-size: 18px;
  font-weight: 700;
}

.pd-page .pd-doctor-meta {
  margin: 2px 0 16px;
  font-size: 14px;
  color: var(--pd-soft);
}

.pd-page .pd-doctor-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

/* Booking form */
.pd-page .pd-booking {
  margin-top: 18px;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border-top: 1px solid var(--pd-border);
}

.pd-page .pd-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
}

.pd-page .pd-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--pd-tile);
}

.pd-page .pd-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pd-soft);
}

.pd-page .pd-input {
  display: block;
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.4;
  color: var(--pd-text);
  background: #ffffff;
  border: 1px solid var(--pd-border);
  border-radius: 10px;
}

.pd-page .pd-input:focus {
  outline: none;
  border-color: var(--pd-brand);
  box-shadow: 0 0 0 3px rgba(15, 90, 94, 0.14);
}

.pd-page .pd-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Buttons */
.pd-page .pd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease,
    transform 0.1s ease;
}

.pd-page .pd-btn svg {
  width: 15px;
  height: 15px;
}

.pd-page .pd-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.pd-page .pd-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.pd-page .pd-btn--primary {
  padding: 11px 22px;
  font-size: 14px;
  color: #ffffff;
  background: var(--pd-brand);
}

.pd-page .pd-btn--primary:hover:not(:disabled) {
  background: #0c4a4d;
}

.pd-page .pd-btn--ghost {
  color: var(--pd-brand);
  background: #ffffff;
  border-color: var(--pd-border);
}

.pd-page .pd-btn--ghost:hover:not(:disabled) {
  border-color: var(--pd-brand);
  background: color-mix(in srgb, var(--pd-brand) 6%, #ffffff);
}

/* Vitals */
.pd-page .pd-vitals {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.pd-page .pd-vital {
  padding: 16px;
  border-radius: 14px;
  background: var(--pd-tile);
}

.pd-page .pd-vital-label {
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pd-soft);
}

.pd-page .pd-vital-value {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.pd-page .pd-vital-unit {
  margin-left: 5px;
  font-size: 12px;
  font-weight: 600;
  color: var(--pd-soft);
}

/* Table */
.pd-page .pd-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.pd-page .pd-table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  font-size: 14px;
}

.pd-page .pd-table th {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pd-soft);
  border-bottom: 1px solid var(--pd-border);
}

.pd-page .pd-table td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--pd-border);
  vertical-align: middle;
}

.pd-page .pd-table tbody tr:last-child td {
  border-bottom: none;
}

.pd-page .pd-table tbody tr:hover {
  background: var(--pd-tile);
}

/* Responsive */
@media (max-width: 760px) {
  .pd-page .pd-two { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .pd-page .pd-topbar-inner { padding: 8px 14px; }
  .pd-page .pd-main { padding: 18px 14px 40px; }

  .pd-page .pd-hero {
    flex-direction: column;
    text-align: center;
    padding: 24px 18px;
  }

  .pd-page .pd-badges { justify-content: center; }
  .pd-page .pd-progress { width: 100%; flex-basis: auto; margin-left: 0; }
  .pd-page .pd-card { padding: 20px 18px 22px; }
  .pd-page .pd-vitals { grid-template-columns: 1fr; }

  /* 16px inputs stop mobile browsers from zooming in on focus */
  .pd-page .pd-input { font-size: 16px; }
}

@media (max-width: 480px) {
  .pd-page .pd-brand-name { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .pd-page .pd-progress-fill { transition: none; }
}
`;

/* ---------- Icons ---------- */
const Svg = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const HeartPulseIcon = () => (
  <Svg>
    <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" />
    <path d="M7 12h2l1.5-3 2 6 1.5-3h3" />
  </Svg>
);
const SparkIcon = () => (
  <Svg>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
  </Svg>
);
const StethoscopeIcon = () => (
  <Svg>
    <path d="M6 3v6a4 4 0 0 0 8 0V3" />
    <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
    <circle cx="20" cy="11" r="2" />
  </Svg>
);
const ActivityIcon = () => (
  <Svg>
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </Svg>
);
const CalendarIcon = () => (
  <Svg>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);
const PlusIcon = () => (
  <Svg>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

/* ---------- Helpers (outside render) ---------- */
// Backend statuses: SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW
const statusLabel = (status) =>
  String(status || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

const statusClass = (status) => {
  const value = String(status || "").toUpperCase();

  if (value === "COMPLETED") return "pd-badge--low";
  if (value === "CANCELLED" || value === "NO_SHOW") return "pd-badge--high";

  return "pd-badge--medium";
};

const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${String(formattedHour).padStart(2, "0")}:${minutes} ${period}`;
};

const getSpecializationForPrediction = (pred) => {
  if (!pred) return null;

  const text = (
    pred.disease_type ||
    pred.prediction_result ||
    ""
  ).toLowerCase();

  if (text.includes("heart")) return "Cardiology";
  if (text.includes("diabetes")) return "Endocrinology";
  if (text.includes("kidney")) return "Nephrology";

  return null;
};

const findMatchedDoctor = (pred, doctorsList) => {
  const specialization = getSpecializationForPrediction(pred);

  const availableDoctors = doctorsList.filter(
    (d) => d.availability_status === "AVAILABLE",
  );

  if (specialization) {
    const specialist = availableDoctors.find(
      (d) => d.specialization === specialization,
    );
    if (specialist) return specialist;
  }

  return (
    availableDoctors.find((d) => d.specialization === "General Medicine") ||
    null
  );
};

/* ---------- Small components (outside render so inputs keep focus) ---------- */
function Card({
  icon,
  iconClass = "",
  title,
  subtitle,
  badge = null,
  children,
}) {
  return (
    <section className="pd-card">
      <div className="pd-card-head">
        <div className={`pd-card-icon ${iconClass}`}>{icon}</div>

        <div className="pd-card-titles">
          <h2 className="pd-card-title">{title}</h2>
          <p className="pd-card-sub">{subtitle}</p>
        </div>

        {badge}
      </div>

      {children}
    </section>
  );
}

// The page frame: its own top bar and scroll area, independent of the app layout
function Shell({ children }) {
  return (
    <div className="pd-page">
      <style>{styles}</style>

      <header className="pd-topbar">
        <div className="pd-topbar-inner">
          <div className="pd-brand">
            <span className="pd-brand-mark">+</span>
            <span className="pd-brand-name">SmartCare HMS</span>
          </div>

          <ProfileMenu />
        </div>
      </header>

      <main className="pd-main">{children}</main>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div>
      <span className="pd-eyebrow">PATIENT</span>
      <h1 className="pd-title">{title}</h1>
      <p className="pd-subtitle">{subtitle}</p>
    </div>
  );
}

export default function PatientDashboard() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const [vitals, setVitals] = useState(null);
  const [vitalsLoading, setVitalsLoading] = useState(true);
  const [vitalsError, setVitalsError] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(true);
  const [predictionError, setPredictionError] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({ date: "", time: "" });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // LOAD LOGGED-IN PATIENT
  // ==========================================

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true);
        setProfileError("");

        const data = await getMyPatient();

        setPatient(data.patient);
      } catch (err) {
        console.error("Failed to load patient profile:", err);

        setProfileError(err.message || "Failed to load patient profile");
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, []);

  // ==========================================
  // LOAD PATIENT APPOINTMENTS
  // ==========================================

  const loadAppointments = async (patientId) => {
    try {
      const data = await getPatientAppointments(patientId);

      const formatted = (data.appointments || []).map((appt) => ({
        id: appt.id,
        appointment_code: appt.appointment_code,
        doctor: appt.doctor_name,
        specialization: appt.specialization,
        date: appt.appointment_date
          ? String(appt.appointment_date).slice(0, 10)
          : "",
        time: appt.appointment_time,
        status: appt.status,
      }));

      setAppointments(formatted);
    } catch (err) {
      console.error("Failed to load appointments:", err);
    }
  };

  useEffect(() => {
    if (patient?.id) {
      loadAppointments(patient.id);
    }
  }, [patient]);

  // ==========================================
  // LOAD LATEST VITALS
  // ==========================================

  useEffect(() => {
    async function fetchVitals() {
      try {
        const data = await getMyLatestVitals();
        setVitals(data.vitals);
      } catch (err) {
        setVitalsError(err.message || "Failed to load vitals.");
      } finally {
        setVitalsLoading(false);
      }
    }

    fetchVitals();
  }, []);

  // ==========================================
  // LOAD LATEST AI PREDICTION
  // ==========================================

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const data = await getMyPredictions();
        const latest =
          data.predictions && data.predictions.length > 0
            ? data.predictions[0]
            : null;
        setPrediction(latest);
      } catch (err) {
        setPredictionError(err.message || "Failed to load AI prediction.");
      } finally {
        setPredictionLoading(false);
      }
    }

    fetchPrediction();
  }, []);

  // ==========================================
  // LOAD DOCTORS
  // ==========================================

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getAllDoctors();
        setDoctors(data.doctors || []);
      } catch (err) {
        console.error("Failed to load doctors:", err);
      } finally {
        setDoctorsLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  // ==========================================
  // DERIVED VALUES
  // ==========================================

  const realMatchedDoctor = findMatchedDoctor(prediction, doctors);

  const riskPercent = prediction ? Number(prediction.risk_percentage) : 0;
  const riskLabel =
    riskPercent >= 70 ? "HIGH" : riskPercent >= 40 ? "MEDIUM" : "LOW";
  const riskClass =
    riskPercent >= 70
      ? "pd-badge--high"
      : riskPercent >= 40
        ? "pd-badge--medium"
        : "pd-badge--low";

  const vitalTiles = vitals
    ? [
        { label: "BMI", value: Number(vitals.bmi), unit: "" },
        {
          label: "Blood Pressure",
          value: `${Number(vitals.blood_pressure_systolic)}/${Number(
            vitals.blood_pressure_diastolic,
          )}`,
          unit: "mmHg",
        },
        {
          label: "Glucose",
          value: Number(vitals.blood_glucose),
          unit: "mg/dL",
        },
      ]
    : [];

  // ==========================================
  // BOOKING FORM
  // ==========================================

  const handleBookingChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBookingMessage("");

    if (!bookingForm.date || !bookingForm.time) {
      setError("Please select both a date and a time.");
      return;
    }

    if (!realMatchedDoctor) {
      setError("No matched doctor available to book with.");
      return;
    }

    try {
      setBookingLoading(true);

      const appointmentCode = `APT-${Date.now()}`;

      await createAppointment({
        appointment_code: appointmentCode,
        patient_id: patient.id,
        doctor_id: realMatchedDoctor.id,
        appointment_date: bookingForm.date,
        appointment_time: bookingForm.time,
        reason: "AI-recommended doctor appointment",
      });

      // Reload from the server so the list always matches the database
      await loadAppointments(patient.id);

      setShowBookingForm(false);
      setBookingForm({ date: "", time: "" });
      setBookingMessage(`Appointment booked with ${realMatchedDoctor.name}.`);
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setError(err.message || "Failed to book appointment.");
    } finally {
      setBookingLoading(false);
    }
  };

  // ==========================================
  // LOADING / ERROR / EMPTY STATES
  // ==========================================

  if (loading) {
    return (
      <Shell>
        <PageHeader
          title="Loading..."
          subtitle="Loading your patient profile."
        />

        <div className="pd-card">
          <p className="pd-empty">Please wait...</p>
        </div>
      </Shell>
    );
  }

  if (profileError) {
    return (
      <Shell>
        <PageHeader
          title="Unable to load profile"
          subtitle="We could not load your patient information."
        />

        <div className="pd-card">
          <p className="pd-error" role="alert">
            {profileError}
          </p>
        </div>
      </Shell>
    );
  }

  if (!patient) {
    return (
      <Shell>
        <PageHeader
          title="Patient profile not found"
          subtitle="No patient profile is associated with your account."
        />
      </Shell>
    );
  }

  // ==========================================
  // PATIENT DASHBOARD
  // ==========================================

  return (
    <Shell>
      {/* Page Header */}
      <PageHeader
        title={`Welcome, ${patient.name.split(" ")[0]}`}
        subtitle="Here's an overview of your health profile and upcoming appointments."
      />

      {/* Summary hero */}
      <div className="pd-hero">
        <div className="pd-hero-icon">
          <HeartPulseIcon />
        </div>

        <div className="pd-hero-info">
          <h2 className="pd-hero-title">Your health snapshot</h2>
          <p className="pd-hero-sub">Latest data from your health profile.</p>

          <div className="pd-badges">
            <span className="pd-hero-badge">
              {prediction ? `${riskLabel} risk` : "No assessment yet"}
            </span>

            <span className="pd-hero-badge">
              BMI {vitals ? Number(vitals.bmi) : "—"}
            </span>

            <span className="pd-hero-badge">
              {appointments.length}{" "}
              {appointments.length === 1 ? "appointment" : "appointments"}
            </span>
          </div>
        </div>

        <div className="pd-progress">
          <div className="pd-progress-top">
            <span>Risk score</span>
            <strong>{prediction ? `${riskPercent}%` : "—"}</strong>
          </div>

          <div
            className="pd-progress-track"
            role="progressbar"
            aria-label="Risk score"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={riskPercent}
          >
            <div
              className="pd-progress-fill"
              style={{ width: `${Math.min(Math.max(riskPercent, 0), 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* AI prediction + matched doctor */}
      <div className="pd-two">
        <Card
          icon={<SparkIcon />}
          iconClass="pd-card-icon--amber"
          title="AI Health Assessment"
          subtitle="Based on your vitals and symptoms"
        >
          {predictionLoading ? (
            <p className="pd-empty">Loading AI assessment...</p>
          ) : predictionError ? (
            <p className="pd-error" role="alert">
              {predictionError}
            </p>
          ) : !prediction ? (
            <p className="pd-empty">
              No AI assessment yet. Submit your health profile to get one.
            </p>
          ) : (
            <>
              <div className="pd-risk-row">
                <span className={`pd-badge ${riskClass}`}>
                  {riskLabel} RISK
                </span>

                <span className="pd-risk-score">{riskPercent}% risk score</span>
              </div>

              <div className="pd-condition">
                <span className="pd-condition-label">Predicted condition</span>
                <span className="pd-condition-value">
                  {prediction.prediction_result}
                </span>
              </div>

              <p className="pd-small">
                This is a screening estimate, not a medical diagnosis.
              </p>
            </>
          )}
        </Card>

        <Card
          icon={<StethoscopeIcon />}
          iconClass="pd-card-icon--green"
          title="Matched Doctor"
          subtitle="Recommended from your assessment"
        >
          {doctorsLoading || predictionLoading ? (
            <p className="pd-empty">Finding your matched doctor...</p>
          ) : !realMatchedDoctor ? (
            <p className="pd-empty">No available doctor found right now.</p>
          ) : (
            <>
              <p className="pd-doctor-name">{realMatchedDoctor.name}</p>

              <p className="pd-doctor-meta">
                {realMatchedDoctor.specialization} ·{" "}
                {realMatchedDoctor.experience_years} years experience
              </p>

              <div className="pd-doctor-actions">
                <span className="pd-badge pd-badge--low">Available</span>

                {!showBookingForm && (
                  <button
                    type="button"
                    className="pd-btn pd-btn--primary"
                    onClick={() => {
                      setBookingMessage("");
                      setShowBookingForm(true);
                    }}
                  >
                    <PlusIcon />
                    Book Appointment
                  </button>
                )}
              </div>

              {bookingMessage && !showBookingForm && (
                <p className="pd-success" role="status">
                  {bookingMessage}
                </p>
              )}
            </>
          )}

          {showBookingForm && (
            <form
              onSubmit={handleBookingSubmit}
              className="pd-booking"
              noValidate
            >
              <div className="pd-grid">
                <div className="pd-item">
                  <label className="pd-label" htmlFor="pd-date">
                    Date
                  </label>

                  <input
                    id="pd-date"
                    name="date"
                    type="date"
                    className="pd-input"
                    value={bookingForm.date}
                    onChange={handleBookingChange}
                  />
                </div>

                <div className="pd-item">
                  <label className="pd-label" htmlFor="pd-time">
                    Time
                  </label>

                  <input
                    id="pd-time"
                    name="time"
                    type="time"
                    className="pd-input"
                    value={bookingForm.time}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>

              {error && (
                <p className="pd-error" role="alert">
                  {error}
                </p>
              )}

              <div className="pd-actions">
                <button
                  type="submit"
                  className="pd-btn pd-btn--primary"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>

                <button
                  type="button"
                  className="pd-btn pd-btn--ghost"
                  disabled={bookingLoading}
                  onClick={() => {
                    setShowBookingForm(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Card>
      </div>

      {/* Vitals */}
      <Card
        icon={<ActivityIcon />}
        iconClass="pd-card-icon--red"
        title="Health Vitals"
        subtitle="Your most recent readings"
        badge={
          <button
            type="button"
            className="pd-btn pd-btn--ghost"
            onClick={() => navigate("/patient/health-profile")}
          >
            Update
          </button>
        }
      >
        {vitalsLoading ? (
          <p className="pd-empty">Loading vitals...</p>
        ) : vitalsError ? (
          <p className="pd-error" role="alert">
            {vitalsError}
          </p>
        ) : !vitals ? (
          <p className="pd-empty">No vitals submitted yet.</p>
        ) : (
          <div className="pd-vitals">
            {vitalTiles.map((tile) => (
              <div key={tile.label} className="pd-vital">
                <p className="pd-vital-label">{tile.label}</p>

                <p className="pd-vital-value">
                  {tile.value}
                  {tile.unit && (
                    <span className="pd-vital-unit">{tile.unit}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Appointments */}
      <Card
        icon={<CalendarIcon />}
        title="Appointments"
        subtitle="Your booked visits"
        badge={
          appointments.length > 0 ? (
            <span className="pd-count">{appointments.length} total</span>
          ) : null
        }
      >
        {appointments.length === 0 ? (
          <p className="pd-empty">
            No appointments yet. Book one with your matched doctor.
          </p>
        ) : (
          <div className="pd-table-scroll">
            <table className="pd-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>{appt.doctor}</td>
                    <td>{appt.specialization}</td>
                    <td>{appt.date}</td>
                    <td>{formatTime(appt.time)}</td>
                    <td>
                      <span className={`pd-badge ${statusClass(appt.status)}`}>
                        {statusLabel(appt.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </Shell>
  );
}
