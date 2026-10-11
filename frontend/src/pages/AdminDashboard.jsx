import { useState } from "react";

import ProfileMenu from "../components/ProfileMenu.jsx";
import DoctorApplications from "../components/admin/DoctorApplications.jsx";
import {
  allDoctors,
  allPatientsOverview,
  appointments as initialAppointments,
} from "../services/mockData.js";

/* ---------- Styles (self-contained: every rule is scoped under .ad-page) ---------- */
const styles = `
.ad-page {
  --ad-bg: #f3f8f8;
  --ad-card: #ffffff;
  --ad-text: #0f2f33;
  --ad-soft: #5b7479;
  --ad-border: #dbe7e8;
  --ad-tile: #f3f8f8;
  --ad-brand: #0f5a5e;
  --ad-brand-2: #178a86;
  --ad-mint: #a7e8d8;
  --ad-danger: #dc2626;
  --ad-danger-bg: #fee2e2;
  --ad-success-bg: #dcfce7;
  --ad-warn: #b45309;
  --ad-warn-bg: #fef3c7;
  --ad-radius: 20px;
  --ad-shadow: 0 1px 2px rgba(15, 47, 51, 0.05),
    0 8px 24px rgba(15, 47, 51, 0.07);

  position: fixed;
  inset: 0;
  z-index: 1500;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: var(--ad-bg);
  color: var(--ad-text);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.ad-page *,
.ad-page *::before,
.ad-page *::after {
  box-sizing: border-box;
}

.ad-page :where(h1, h2, h3, p) {
  margin: 0;
}

.ad-page :is(h1, h2, h3) {
  font-family: inherit;
}

.ad-page :focus-visible {
  outline: 2px solid var(--ad-brand);
  outline-offset: 2px;
}

/* Top bar */
.ad-page .ad-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--ad-border);
}

.ad-page .ad-topbar-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.ad-page .ad-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 800;
  color: var(--ad-brand);
}

.ad-page .ad-brand-mark {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: var(--ad-brand);
  color: #ffffff;
  font-weight: 800;
}

/* Page body */
.ad-page .ad-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 28px 20px 64px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* Header */
.ad-page .ad-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ad-brand);
  background: color-mix(in srgb, var(--ad-brand) 10%, transparent);
  padding: 5px 12px;
  border-radius: 999px;
}

.ad-page .ad-title {
  margin: 12px 0 6px;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--ad-text);
}

.ad-page .ad-subtitle {
  font-size: 15px;
  color: var(--ad-soft);
}

/* Hero */
.ad-page .ad-hero {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 28px;
  border-radius: var(--ad-radius);
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 20%, rgba(167, 232, 216, 0.22), transparent 40%),
    radial-gradient(circle at 90% 85%, rgba(167, 232, 216, 0.14), transparent 45%),
    linear-gradient(135deg, #0f4c55 0%, #0d5a5c 55%, #0b4247 100%);
  box-shadow: 0 16px 40px rgba(15, 76, 85, 0.28);
}

.ad-page .ad-hero-icon {
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--ad-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 4px solid rgba(167, 232, 216, 0.6);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.ad-page .ad-hero-icon svg {
  width: 38px;
  height: 38px;
}

.ad-page .ad-hero-info {
  min-width: 0;
  flex: 1 1 220px;
}

.ad-page .ad-hero-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
}

.ad-page .ad-hero-sub {
  margin: 4px 0 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.ad-page .ad-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ad-page .ad-hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: var(--ad-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 1px solid rgba(167, 232, 216, 0.5);
}

.ad-page .ad-stats {
  flex: 1 1 320px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.ad-page .ad-stat {
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(167, 232, 216, 0.3);
}

.ad-page .ad-stat-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
}

.ad-page .ad-stat-value {
  margin-top: 2px;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
}

/* Cards */
.ad-page .ad-two {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  align-items: start;
}

.ad-page .ad-card {
  padding: 26px 28px 28px;
  background: var(--ad-card);
  border: 1px solid var(--ad-border);
  border-radius: var(--ad-radius);
  box-shadow: var(--ad-shadow);
  min-width: 0;
}

.ad-page .ad-card-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--ad-border);
}

.ad-page .ad-card-titles {
  flex: 1 1 150px;
  min-width: 0;
}

.ad-page .ad-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--ad-text);
}

.ad-page .ad-card-sub {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--ad-soft);
}

.ad-page .ad-card-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: var(--ad-brand);
  background: color-mix(in srgb, var(--ad-brand) 12%, transparent);
}

.ad-page .ad-card-icon svg {
  width: 20px;
  height: 20px;
}

.ad-page .ad-card-icon--red {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.12);
}

.ad-page .ad-card-icon--green {
  color: #16a34a;
  background: rgba(22, 163, 74, 0.12);
}

.ad-page .ad-card-icon--amber {
  color: #b45309;
  background: rgba(217, 119, 6, 0.14);
}

.ad-page .ad-count {
  font-size: 12px;
  font-weight: 700;
  color: var(--ad-brand);
  background: color-mix(in srgb, var(--ad-brand) 10%, transparent);
  padding: 4px 11px;
  border-radius: 999px;
}

.ad-page .ad-empty {
  font-size: 14px;
  color: var(--ad-soft);
}

.ad-page .ad-error {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ad-danger);
  background: var(--ad-danger-bg);
}

/* Badges */
.ad-page .ad-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.ad-page .ad-badge--low {
  color: #15803d;
  background: var(--ad-success-bg);
}

.ad-page .ad-badge--medium {
  color: var(--ad-warn);
  background: var(--ad-warn-bg);
}

.ad-page .ad-badge--high {
  color: #b91c1c;
  background: var(--ad-danger-bg);
}

/* Form */
.ad-page .ad-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  margin-bottom: 22px;
  border-radius: 16px;
  background: var(--ad-tile);
  border: 1px solid var(--ad-border);
}

.ad-page .ad-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
}

.ad-page .ad-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid var(--ad-border);
}

.ad-page .ad-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ad-soft);
}

.ad-page .ad-input {
  display: block;
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.4;
  color: var(--ad-text);
  background: #ffffff;
  border: 1px solid var(--ad-border);
  border-radius: 10px;
}

.ad-page .ad-input:focus {
  outline: none;
  border-color: var(--ad-brand);
  box-shadow: 0 0 0 3px rgba(15, 90, 94, 0.14);
}

.ad-page .ad-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Buttons */
.ad-page .ad-btn {
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

.ad-page .ad-btn svg {
  width: 15px;
  height: 15px;
}

.ad-page .ad-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.ad-page .ad-btn--primary {
  padding: 11px 22px;
  font-size: 14px;
  color: #ffffff;
  background: var(--ad-brand);
}

.ad-page .ad-btn--primary:hover:not(:disabled) {
  background: #0c4a4d;
}

.ad-page .ad-btn--ghost {
  color: var(--ad-brand);
  background: #ffffff;
  border-color: var(--ad-border);
}

.ad-page .ad-btn--ghost:hover:not(:disabled) {
  border-color: var(--ad-brand);
  background: color-mix(in srgb, var(--ad-brand) 6%, #ffffff);
}

.ad-page .ad-btn--sm {
  padding: 6px 12px;
  font-size: 12px;
}

.ad-page .ad-btn--danger {
  color: var(--ad-danger);
  border-color: color-mix(in srgb, var(--ad-danger) 45%, #ffffff);
}

.ad-page .ad-btn--danger:hover:not(:disabled) {
  border-color: var(--ad-danger);
  background: #fff7f7;
}

/* Filter tabs */
.ad-page .ad-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ad-page .ad-tab {
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid var(--ad-border);
  background: #ffffff;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--ad-soft);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease,
    color 0.15s ease;
}

.ad-page .ad-tab:hover {
  border-color: var(--ad-brand);
}

.ad-page .ad-tab--active {
  color: var(--ad-brand);
  border-color: var(--ad-brand);
  background: color-mix(in srgb, var(--ad-brand) 10%, #ffffff);
}

/* Search */
.ad-page .ad-search {
  width: 100%;
  max-width: 220px;
}

/* Tables */
.ad-page .ad-table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.ad-page .ad-table {
  width: 100%;
  min-width: 420px;
  border-collapse: collapse;
  font-size: 14px;
}

.ad-page .ad-table--wide {
  min-width: 720px;
}

.ad-page .ad-table th {
  padding: 10px 12px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--ad-soft);
  border-bottom: 1px solid var(--ad-border);
}

.ad-page .ad-table td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--ad-border);
  vertical-align: middle;
}

.ad-page .ad-table tbody tr:last-child td {
  border-bottom: none;
}

.ad-page .ad-table tbody tr:hover {
  background: var(--ad-tile);
}

.ad-page .ad-row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* Responsive */
@media (max-width: 860px) {
  .ad-page .ad-two { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .ad-page .ad-topbar-inner { padding: 8px 14px; }
  .ad-page .ad-main { padding: 18px 14px 40px; }

  .ad-page .ad-hero {
    flex-direction: column;
    text-align: center;
    padding: 24px 18px;
  }

  .ad-page .ad-badges { justify-content: center; }
  .ad-page .ad-stats { width: 100%; flex-basis: auto; }
  .ad-page .ad-stat-value { font-size: 24px; }
  .ad-page .ad-card { padding: 20px 18px 22px; }
  .ad-page .ad-search { max-width: none; }

  /* 16px inputs stop mobile browsers from zooming in on focus */
  .ad-page .ad-input { font-size: 16px; }
}

@media (max-width: 480px) {
  .ad-page .ad-brand-name { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ad-page .ad-btn,
  .ad-page .ad-tab { transition: none; }
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

const ShieldIcon = () => (
  <Svg>
    <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Svg>
);
const StethoscopeIcon = () => (
  <Svg>
    <path d="M6 3v6a4 4 0 0 0 8 0V3" />
    <path d="M10 13v2a5 5 0 0 0 10 0v-2" />
    <circle cx="20" cy="11" r="2" />
  </Svg>
);
const CalendarIcon = () => (
  <Svg>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Svg>
);
const AlertIcon = () => (
  <Svg>
    <path d="M12 3l10 18H2L12 3z" />
    <path d="M12 10v5M12 18h.01" />
  </Svg>
);
const UsersIcon = () => (
  <Svg>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5c1.9.8 3 2.6 3 5.5" />
  </Svg>
);
const PlusIcon = () => (
  <Svg>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

/* ---------- Constants ---------- */
const emptyDoctorForm = {
  name: "",
  specialization: "",
  qualification: "",
  experience: "",
  fee: "",
  available: true,
};

const statusFilters = ["All", "Pending", "Completed", "Cancelled"];

const statusBadgeClass = (status) => {
  if (status === "Completed") return "ad-badge--low";
  if (status === "Cancelled") return "ad-badge--high";
  return "ad-badge--medium";
};

/* ---------- Small components (outside render so inputs keep focus) ---------- */
function Card({
  icon,
  iconClass = "",
  title,
  subtitle,
  action = null,
  children,
}) {
  return (
    <section className="ad-card">
      <div className="ad-card-head">
        <div className={`ad-card-icon ${iconClass}`}>{icon}</div>

        <div className="ad-card-titles">
          <h2 className="ad-card-title">{title}</h2>
          <p className="ad-card-sub">{subtitle}</p>
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}

function FormField({ id, label, children }) {
  return (
    <div className="ad-item">
      <label className="ad-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

// The page frame: its own top bar and scroll area, independent of the app layout
function Shell({ children }) {
  return (
    <div className="ad-page">
      <style>{styles}</style>

      <header className="ad-topbar">
        <div className="ad-topbar-inner">
          <div className="ad-brand">
            <span className="ad-brand-mark">+</span>
            <span className="ad-brand-name">SmartCare HMS</span>
          </div>

          <ProfileMenu />
        </div>
      </header>

      <main className="ad-main">{children}</main>
    </div>
  );
}

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState(allDoctors);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyDoctorForm);
  const [error, setError] = useState("");

  const [appointments, setAppointments] = useState(initialAppointments);
  const [statusFilter, setStatusFilter] = useState("All");
  const [patientSearch, setPatientSearch] = useState("");

  const highRiskPatients = allPatientsOverview.filter(
    (patient) => patient.riskLevel === "high",
  );

  const filteredAppointments =
    statusFilter === "All"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === statusFilter,
        );

  const filteredPatients = allPatientsOverview.filter((patient) =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()),
  );

  const cancelAppointment = (id) => {
    const confirmed = window.confirm("Cancel this appointment?");

    if (confirmed) {
      setAppointments((previous) =>
        previous.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: "Cancelled" }
            : appointment,
        ),
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setForm(emptyDoctorForm);
    setEditingId(null);
    setError("");
    setShowForm(true);
  };

  const openEditForm = (doctor) => {
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      fee: doctor.fee,
      available: doctor.available,
    });

    setEditingId(doctor.id);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyDoctorForm);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.specialization.trim() ||
      !String(form.experience).trim() ||
      form.fee === "" ||
      Number(form.fee) < 0
    ) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    const doctorData = {
      ...form,
      name: form.name.trim(),
      specialization: form.specialization.trim(),
      qualification: form.qualification.trim(),
      fee: Number(form.fee),
    };

    if (editingId !== null) {
      setDoctors((previous) =>
        previous.map((doctor) =>
          doctor.id === editingId ? { ...doctor, ...doctorData } : doctor,
        ),
      );
    } else {
      setDoctors((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...doctorData,
        },
      ]);
    }

    closeForm();
  };

  const removeDoctor = (id) => {
    const confirmed = window.confirm(
      "Remove this doctor? This cannot be undone.",
    );

    if (confirmed) {
      setDoctors((previous) => previous.filter((doctor) => doctor.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setDoctors((previous) =>
      previous.map((doctor) =>
        doctor.id === id ? { ...doctor, available: !doctor.available } : doctor,
      ),
    );
  };

  const pendingCount = appointments.filter(
    (appointment) => appointment.status === "Pending",
  ).length;

  return (
    <Shell>
      {/* Page Header */}
      <div>
        <span className="ad-eyebrow">ADMIN</span>
        <h1 className="ad-title">Admin Dashboard</h1>
        <p className="ad-subtitle">
          Manage doctors, monitor patients, and track hospital activity.
        </p>
      </div>

      {/* Summary */}
      <div className="ad-hero">
        <div className="ad-hero-icon">
          <ShieldIcon />
        </div>

        <div className="ad-hero-info">
          <h2 className="ad-hero-title">Hospital overview</h2>
          <p className="ad-hero-sub">Live totals from your hospital data.</p>

          <div className="ad-badges">
            <span className="ad-hero-badge">{pendingCount} pending</span>
            <span className="ad-hero-badge">
              {highRiskPatients.length} high-risk
            </span>
          </div>
        </div>

        <div className="ad-stats">
          <div className="ad-stat">
            <p className="ad-stat-label">Doctors</p>
            <p className="ad-stat-value">{doctors.length}</p>
          </div>

          <div className="ad-stat">
            <p className="ad-stat-label">Patients</p>
            <p className="ad-stat-value">{allPatientsOverview.length}</p>
          </div>

          <div className="ad-stat">
            <p className="ad-stat-label">Appointments</p>
            <p className="ad-stat-value">{appointments.length}</p>
          </div>
        </div>
      </div>

      {/* Doctor Applications */}
      <DoctorApplications />

      {/* Manage Doctors */}
      <Card
        icon={<StethoscopeIcon />}
        iconClass="ad-card-icon--green"
        title="Manage Doctors"
        subtitle="Add, edit, or remove doctors"
        action={
          !showForm ? (
            <button
              type="button"
              className="ad-btn ad-btn--primary"
              onClick={openAddForm}
            >
              <PlusIcon />
              Add Doctor
            </button>
          ) : null
        }
      >
        {showForm && (
          <form onSubmit={handleSubmit} className="ad-form" noValidate>
            <div className="ad-grid">
              <FormField id="ad-name" label="Full name *">
                <input
                  id="ad-name"
                  name="name"
                  type="text"
                  className="ad-input"
                  placeholder="Dr. Full Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </FormField>

              <FormField id="ad-specialization" label="Specialization *">
                <input
                  id="ad-specialization"
                  name="specialization"
                  type="text"
                  className="ad-input"
                  placeholder="e.g. Cardiologist"
                  value={form.specialization}
                  onChange={handleChange}
                />
              </FormField>

              <FormField id="ad-qualification" label="Qualification">
                <input
                  id="ad-qualification"
                  name="qualification"
                  type="text"
                  className="ad-input"
                  placeholder="e.g. MBBS, MD"
                  value={form.qualification}
                  onChange={handleChange}
                />
              </FormField>

              <FormField id="ad-experience" label="Experience *">
                <input
                  id="ad-experience"
                  name="experience"
                  type="text"
                  className="ad-input"
                  placeholder="e.g. 5 years"
                  value={form.experience}
                  onChange={handleChange}
                />
              </FormField>

              <FormField id="ad-fee" label="Consultation fee (₹) *">
                <input
                  id="ad-fee"
                  name="fee"
                  type="number"
                  min="0"
                  className="ad-input"
                  placeholder="e.g. 500"
                  value={form.fee}
                  onChange={handleChange}
                />
              </FormField>

              <FormField id="ad-available" label="Availability">
                <select
                  id="ad-available"
                  name="available"
                  className="ad-input"
                  value={String(form.available)}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      available: event.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </FormField>
            </div>

            {error && (
              <p className="ad-error" role="alert">
                {error}
              </p>
            )}

            <div className="ad-actions">
              <button type="submit" className="ad-btn ad-btn--primary">
                {editingId !== null ? "Save Changes" : "Add Doctor"}
              </button>

              <button
                type="button"
                className="ad-btn ad-btn--ghost"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="ad-table-scroll">
          <table className="ad-table ad-table--wide">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="ad-empty">
                    No doctors available.
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.experience}</td>
                    <td>₹{doctor.fee}</td>

                    <td>
                      <span
                        className={`ad-badge ${
                          doctor.available
                            ? "ad-badge--low"
                            : "ad-badge--medium"
                        }`}
                      >
                        {doctor.available ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td>
                      <div className="ad-row-actions">
                        <button
                          type="button"
                          className="ad-btn ad-btn--ghost ad-btn--sm"
                          onClick={() => toggleAvailability(doctor.id)}
                        >
                          Toggle
                        </button>

                        <button
                          type="button"
                          className="ad-btn ad-btn--ghost ad-btn--sm"
                          onClick={() => openEditForm(doctor)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="ad-btn ad-btn--ghost ad-btn--sm ad-btn--danger"
                          onClick={() => removeDoctor(doctor.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* All Appointments */}
      <Card
        icon={<CalendarIcon />}
        title="All Appointments"
        subtitle="Filter by status and cancel pending visits"
        action={
          <div className="ad-tabs">
            {statusFilters.map((status) => (
              <button
                type="button"
                key={status}
                aria-pressed={statusFilter === status}
                className={`ad-tab${
                  statusFilter === status ? " ad-tab--active" : ""
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        }
      >
        {filteredAppointments.length === 0 ? (
          <p className="ad-empty">No appointments match this filter.</p>
        ) : (
          <div className="ad-table-scroll">
            <table className="ad-table ad-table--wide">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.patient}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.specialization}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>

                    <td>
                      <span
                        className={`ad-badge ${statusBadgeClass(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td>
                      {appointment.status === "Pending" && (
                        <button
                          type="button"
                          className="ad-btn ad-btn--ghost ad-btn--sm ad-btn--danger"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Patient sections */}
      <div className="ad-two">
        <Card
          icon={<AlertIcon />}
          iconClass="ad-card-icon--red"
          title="High-Risk Patient Alerts"
          subtitle="Patients needing attention"
          action={
            highRiskPatients.length > 0 ? (
              <span className="ad-count">{highRiskPatients.length}</span>
            ) : null
          }
        >
          {highRiskPatients.length === 0 ? (
            <p className="ad-empty">No high-risk patients right now.</p>
          ) : (
            <div className="ad-table-scroll">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Condition</th>
                    <th>Risk</th>
                  </tr>
                </thead>

                <tbody>
                  {highRiskPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.predictedDisease}</td>
                      <td>
                        <span className="ad-badge ad-badge--high">
                          {patient.riskPercentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card
          icon={<UsersIcon />}
          iconClass="ad-card-icon--amber"
          title="All Patients Overview"
          subtitle="Search patients by name"
          action={
            <input
              type="text"
              className="ad-input ad-search"
              aria-label="Search patients by name"
              placeholder="Search by name..."
              value={patientSearch}
              onChange={(event) => setPatientSearch(event.target.value)}
            />
          }
        >
          {filteredPatients.length === 0 ? (
            <p className="ad-empty">No patients match "{patientSearch}".</p>
          ) : (
            <div className="ad-table-scroll">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Condition</th>
                    <th>Risk</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.predictedDisease}</td>
                      <td>
                        <span
                          className={`ad-badge ad-badge--${patient.riskLevel}`}
                        >
                          {patient.riskPercentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </Shell>
  );
}
