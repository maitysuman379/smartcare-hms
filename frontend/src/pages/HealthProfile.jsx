import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileMenu from "../components/ProfileMenu.jsx";

/* ---------- Styles (self-contained: every rule is scoped under .hp-page) ---------- */
const styles = `
.hp-page {
  --hp-bg: #f3f8f8;
  --hp-card: #ffffff;
  --hp-text: #0f2f33;
  --hp-soft: #5b7479;
  --hp-border: #dbe7e8;
  --hp-tile: #f3f8f8;
  --hp-brand: #0f5a5e;
  --hp-brand-2: #178a86;
  --hp-mint: #a7e8d8;
  --hp-danger: #dc2626;
  --hp-danger-bg: #fee2e2;
  --hp-radius: 20px;
  --hp-shadow: 0 1px 2px rgba(15, 47, 51, 0.05),
    0 8px 24px rgba(15, 47, 51, 0.07);

  /* Full-screen page that does not depend on the app layout */
  position: fixed;
  inset: 0;
  z-index: 1500;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background: var(--hp-bg);
  color: var(--hp-text);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.hp-page *,
.hp-page *::before,
.hp-page *::after {
  box-sizing: border-box;
}

.hp-page :where(h1, h2, h3, p) {
  margin: 0;
}

.hp-page :is(h1, h2, h3) {
  font-family: inherit;
}

.hp-page :focus-visible {
  outline: 2px solid var(--hp-brand);
  outline-offset: 2px;
}

/* Top bar */
.hp-page .hp-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--hp-border);
}

.hp-page .hp-topbar-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.hp-page .hp-topbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.hp-page .hp-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 800;
  color: var(--hp-brand);
}

.hp-page .hp-brand-mark {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: var(--hp-brand);
  color: #ffffff;
  font-weight: 800;
}

/* Page body */
.hp-page .hp-main {
  max-width: 960px;
  margin: 0 auto;
  padding: 28px 20px 64px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* Header */
.hp-page .hp-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--hp-brand);
  background: color-mix(in srgb, var(--hp-brand) 10%, transparent);
  padding: 5px 12px;
  border-radius: 999px;
}

.hp-page .hp-title {
  margin: 12px 0 6px;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--hp-text);
}

.hp-page .hp-subtitle {
  font-size: 15px;
  color: var(--hp-soft);
}

/* Summary card */
.hp-page .hp-hero {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 28px;
  border-radius: var(--hp-radius);
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 20%, rgba(167, 232, 216, 0.22), transparent 40%),
    radial-gradient(circle at 90% 85%, rgba(167, 232, 216, 0.14), transparent 45%),
    linear-gradient(135deg, #0f4c55 0%, #0d5a5c 55%, #0b4247 100%);
  box-shadow: 0 16px 40px rgba(15, 76, 85, 0.28);
}

.hp-page .hp-hero-icon {
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--hp-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 4px solid rgba(167, 232, 216, 0.6);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.hp-page .hp-hero-icon svg {
  width: 38px;
  height: 38px;
}

.hp-page .hp-hero-info {
  min-width: 0;
  flex: 1 1 240px;
}

.hp-page .hp-hero-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
}

.hp-page .hp-hero-sub {
  margin: 4px 0 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.hp-page .hp-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hp-page .hp-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: var(--hp-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 1px solid rgba(167, 232, 216, 0.5);
}

.hp-page .hp-progress {
  flex: 0 1 220px;
  min-width: 180px;
  margin-left: auto;
}

.hp-page .hp-progress-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
}

.hp-page .hp-progress-top strong {
  color: #ffffff;
}

.hp-page .hp-progress-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.hp-page .hp-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--hp-mint);
  transition: width 0.25s ease;
}

/* Section cards */
.hp-page .hp-card {
  padding: 26px 28px 28px;
  background: var(--hp-card);
  border: 1px solid var(--hp-border);
  border-radius: var(--hp-radius);
  box-shadow: var(--hp-shadow);
}

.hp-page .hp-card-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--hp-border);
}

.hp-page .hp-card-titles {
  flex: 1 1 170px;
  min-width: 0;
}

.hp-page .hp-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--hp-text);
}

.hp-page .hp-card-sub {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--hp-soft);
}

.hp-page .hp-card-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: var(--hp-brand);
  background: color-mix(in srgb, var(--hp-brand) 12%, transparent);
}

.hp-page .hp-card-icon svg {
  width: 20px;
  height: 20px;
}

.hp-page .hp-card-icon--red {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.12);
}

.hp-page .hp-card-icon--green {
  color: #16a34a;
  background: rgba(22, 163, 74, 0.12);
}

.hp-page .hp-card-icon--amber {
  color: #b45309;
  background: rgba(217, 119, 6, 0.14);
}

.hp-page .hp-count {
  margin-left: auto;
  font-size: 12px;
  font-weight: 700;
  color: var(--hp-brand);
  background: color-mix(in srgb, var(--hp-brand) 10%, transparent);
  padding: 4px 11px;
  border-radius: 999px;
}

/* Field tiles */
.hp-page .hp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
}

.hp-page .hp-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--hp-tile);
  border: 1px solid transparent;
}

.hp-page .hp-item--error {
  border-color: var(--hp-danger);
  background: #fff7f7;
}

.hp-page .hp-label {
  display: block;
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hp-soft);
}

.hp-page .hp-input {
  display: block;
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.4;
  color: var(--hp-text);
  background: #ffffff;
  border: 1px solid var(--hp-border);
  border-radius: 10px;
}

.hp-page .hp-input:focus {
  outline: none;
  border-color: var(--hp-brand);
  box-shadow: 0 0 0 3px rgba(15, 90, 94, 0.14);
}

.hp-page .hp-input[aria-invalid="true"] {
  border-color: var(--hp-danger);
}

.hp-page .hp-field-error {
  font-size: 12px;
  font-weight: 600;
  color: var(--hp-danger);
}

/* Symptom chips */
.hp-page .hp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hp-page .hp-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 15px;
  border-radius: 999px;
  border: 1px solid var(--hp-border);
  background: #ffffff;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--hp-soft);
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease,
    color 0.15s ease;
}

.hp-page .hp-chip:hover {
  border-color: var(--hp-brand);
}

.hp-page .hp-chip--active {
  color: var(--hp-brand);
  border-color: var(--hp-brand);
  background: color-mix(in srgb, var(--hp-brand) 10%, #ffffff);
}

/* Buttons */
.hp-page .hp-btn {
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

.hp-page .hp-btn svg {
  width: 15px;
  height: 15px;
}

.hp-page .hp-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.hp-page .hp-btn--primary {
  padding: 13px 26px;
  font-size: 15px;
  color: #ffffff;
  background: var(--hp-brand);
}

.hp-page .hp-btn--primary:hover:not(:disabled) {
  background: #0c4a4d;
}

.hp-page .hp-btn--ghost {
  color: var(--hp-brand);
  background: #ffffff;
  border-color: var(--hp-border);
}

.hp-page .hp-btn--ghost:hover:not(:disabled) {
  border-color: var(--hp-brand);
  background: color-mix(in srgb, var(--hp-brand) 6%, #ffffff);
}

/* Submit row */
.hp-page .hp-submit {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hp-page .hp-form-error {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--hp-danger);
  background: var(--hp-danger-bg);
}

.hp-page .hp-submit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
}

.hp-page .hp-note {
  flex: 1 1 260px;
  font-size: 12px;
  color: var(--hp-soft);
}

/* Responsive */
@media (max-width: 640px) {
  .hp-page .hp-topbar-inner { padding: 8px 14px; }
  .hp-page .hp-main { padding: 18px 14px 40px; }

  .hp-page .hp-hero {
    flex-direction: column;
    text-align: center;
    padding: 24px 18px;
  }

  .hp-page .hp-badges { justify-content: center; }
  .hp-page .hp-progress { width: 100%; flex-basis: auto; margin-left: 0; }
  .hp-page .hp-card { padding: 20px 18px 22px; }

  /* 16px inputs stop mobile browsers from zooming in on focus */
  .hp-page .hp-input { font-size: 16px; }

  .hp-page .hp-submit-row { flex-direction: column-reverse; align-items: stretch; }
  .hp-page .hp-btn--primary { width: 100%; }
}

@media (max-width: 480px) {
  .hp-page .hp-brand-name { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hp-page .hp-progress-fill,
  .hp-page .hp-chip { transition: none; }
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

const ArrowLeftIcon = () => (
  <Svg>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </Svg>
);
const HeartPulseIcon = () => (
  <Svg>
    <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" />
    <path d="M7 12h2l1.5-3 2 6 1.5-3h3" />
  </Svg>
);
const UserIcon = () => (
  <Svg>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Svg>
);
const ActivityIcon = () => (
  <Svg>
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </Svg>
);
const UsersIcon = () => (
  <Svg>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.5c1.9.8 3 2.6 3 5.5" />
  </Svg>
);
const ThermometerIcon = () => (
  <Svg>
    <path d="M10 4a2 2 0 1 1 4 0v9.2a4 4 0 1 1-4 0V4z" />
  </Svg>
);

/* ---------- Constants ---------- */
const symptomOptions = [
  "Fatigue",
  "Frequent urination",
  "Excessive thirst",
  "Chest pain",
  "Shortness of breath",
  "Swelling in legs/ankles",
  "Nausea",
  "Blurred vision",
];

const INITIAL_FORM = {
  age: "",
  height: "",
  weight: "",
  bpSys: "",
  bpDia: "",
  glucose: "",
  smoking: "no",
  familyHistory: "no",
  symptoms: [],
};

// Required number fields, in the order they appear on screen
const REQUIRED_FIELDS = [
  "age",
  "height",
  "weight",
  "bpSys",
  "bpDia",
  "glucose",
];

const RULES = {
  age: { min: 1, max: 120, whole: true },
  height: { min: 50, max: 250 },
  weight: { min: 10, max: 300 },
  bpSys: { min: 70, max: 250 },
  bpDia: { min: 40, max: 150 },
  glucose: { min: 30, max: 600 },
};

/* ---------- Helpers (outside render) ---------- */
const isFilled = (value) => String(value ?? "").trim() !== "";

const validate = (form) => {
  const errors = {};

  REQUIRED_FIELDS.forEach((name) => {
    const rule = RULES[name];
    const raw = String(form[name] ?? "").trim();

    if (raw === "") {
      errors[name] = "This field is required.";
      return;
    }

    const value = Number(raw);

    if (!Number.isFinite(value)) {
      errors[name] = "Enter a number.";
    } else if (rule.whole && !Number.isInteger(value)) {
      errors[name] = "Enter a whole number.";
    } else if (value < rule.min || value > rule.max) {
      errors[name] = `Enter a value between ${rule.min} and ${rule.max}.`;
    }
  });

  if (
    !errors.bpSys &&
    !errors.bpDia &&
    Number(form.bpSys) <= Number(form.bpDia)
  ) {
    errors.bpSys = "Systolic must be higher than diastolic.";
  }

  return errors;
};

const calculateBmi = (heightCm, weightKg) => {
  const h = Number(heightCm);
  const w = Number(weightKg);

  const heightOk = h >= RULES.height.min && h <= RULES.height.max;
  const weightOk = w >= RULES.weight.min && w <= RULES.weight.max;

  if (!heightOk || !weightOk) return null;

  return Math.round((w / (h / 100) ** 2) * 10) / 10;
};

const bmiCategory = (bmi) => {
  if (bmi === null) return "";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";

  return "Obese";
};

/* ---------- Small components (outside render so inputs keep focus) ---------- */
function NumberField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  step = "any",
  inputMode = "decimal",
}) {
  const blockKeys = (event) => {
    if (["e", "E", "+", "-"].includes(event.key)) event.preventDefault();
  };

  return (
    <div className={`hp-item${error ? " hp-item--error" : ""}`}>
      <label className="hp-label" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        name={name}
        type="number"
        inputMode={inputMode}
        className="hp-input"
        value={value}
        onChange={onChange}
        onKeyDown={blockKeys}
        onWheel={(event) => event.currentTarget.blur()}
        placeholder={placeholder}
        step={step}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && (
        <span id={`${id}-error`} className="hp-field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function SelectField({ id, name, label, value, onChange, children }) {
  return (
    <div className="hp-item">
      <label className="hp-label" htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        name={name}
        className="hp-input"
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
}

function Card({
  icon,
  iconClass = "",
  title,
  subtitle,
  badge = null,
  children,
}) {
  return (
    <section className="hp-card">
      <div className="hp-card-head">
        <div className={`hp-card-icon ${iconClass}`}>{icon}</div>

        <div className="hp-card-titles">
          <h2 className="hp-card-title">{title}</h2>
          <p className="hp-card-sub">{subtitle}</p>
        </div>

        {badge}
      </div>

      {children}
    </section>
  );
}

// The page frame: its own top bar and scroll area, independent of the app layout
function Shell({ onBack, children }) {
  return (
    <div className="hp-page">
      <style>{styles}</style>

      <header className="hp-topbar">
        <div className="hp-topbar-inner">
          <div className="hp-topbar-left">
            <button
              type="button"
              className="hp-btn hp-btn--ghost"
              onClick={onBack}
            >
              <ArrowLeftIcon />
              Back
            </button>

            <div className="hp-brand">
              <span className="hp-brand-mark">+</span>
              <span className="hp-brand-name">SmartCare HMS</span>
            </div>
          </div>

          <ProfileMenu />
        </div>
      </header>

      <main className="hp-main">{children}</main>
    </div>
  );
}

export default function HealthProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/patient/dashboard");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear the message for a field as soon as the user edits it
    setErrors((prev) => {
      if (!prev[name]) return prev;

      const next = { ...prev };
      delete next[name];

      return next;
    });
  };

  const toggleSymptom = (symptom) => {
    setForm((prev) => {
      const has = prev.symptoms.includes(symptom);

      return {
        ...prev,
        symptoms: has
          ? prev.symptoms.filter((s) => s !== symptom)
          : [...prev.symptoms, symptom],
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = validate(form);
    setErrors(found);

    const firstInvalid = REQUIRED_FIELDS.find((name) => found[name]);

    if (firstInvalid) {
      document.getElementById(`hp-${firstInvalid}`)?.focus();
      return;
    }

    // TODO: replace with real API calls (save vitals + AI prediction).
    console.log("Health profile submitted:", form);
    navigate("/patient/dashboard");
  };

  // Live summary shown in the top card
  const filledCount = REQUIRED_FIELDS.filter((name) =>
    isFilled(form[name]),
  ).length;
  const bmi = calculateBmi(form.height, form.weight);
  const bmiLabel = bmiCategory(bmi);
  const bpText =
    isFilled(form.bpSys) && isFilled(form.bpDia)
      ? `${form.bpSys}/${form.bpDia} mmHg`
      : "—";
  const symptomCount = form.symptoms.length;
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Shell onBack={goBack}>
      {/* Page Header */}
      <div>
        <span className="hp-eyebrow">PATIENT</span>
        <h1 className="hp-title">Health Profile</h1>
        <p className="hp-subtitle">
          Fill in your vitals and symptoms — our AI model will predict your risk
          and match you with the right doctor.
        </p>
      </div>

      {/* Live summary */}
      <div className="hp-hero">
        <div className="hp-hero-icon">
          <HeartPulseIcon />
        </div>

        <div className="hp-hero-info">
          <h2 className="hp-hero-title">Your health snapshot</h2>
          <p className="hp-hero-sub">Updates as you fill in the form.</p>

          <div className="hp-badges">
            <span className="hp-badge">
              BMI {bmi === null ? "—" : bmi}
              {bmiLabel && ` · ${bmiLabel}`}
            </span>

            <span className="hp-badge">BP {bpText}</span>

            <span className="hp-badge">
              {symptomCount} {symptomCount === 1 ? "symptom" : "symptoms"}
            </span>
          </div>
        </div>

        <div className="hp-progress">
          <div className="hp-progress-top">
            <span>Required fields</span>
            <strong>
              {filledCount}/{REQUIRED_FIELDS.length}
            </strong>
          </div>

          <div
            className="hp-progress-track"
            role="progressbar"
            aria-label="Required fields completed"
            aria-valuemin={0}
            aria-valuemax={REQUIRED_FIELDS.length}
            aria-valuenow={filledCount}
          >
            <div
              className="hp-progress-fill"
              style={{
                width: `${(filledCount / REQUIRED_FIELDS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="hp-main-form">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Basic vitals */}
          <Card
            icon={<UserIcon />}
            title="Basic Vitals"
            subtitle="Your age, height and weight"
          >
            <div className="hp-grid">
              <NumberField
                id="hp-age"
                name="age"
                label="Age"
                inputMode="numeric"
                step={1}
                placeholder="e.g. 34"
                value={form.age}
                onChange={handleChange}
                error={errors.age}
              />

              <NumberField
                id="hp-height"
                name="height"
                label="Height (cm)"
                placeholder="e.g. 170"
                value={form.height}
                onChange={handleChange}
                error={errors.height}
              />

              <NumberField
                id="hp-weight"
                name="weight"
                label="Weight (kg)"
                placeholder="e.g. 78"
                value={form.weight}
                onChange={handleChange}
                error={errors.weight}
              />
            </div>
          </Card>

          {/* Clinical readings */}
          <Card
            icon={<ActivityIcon />}
            iconClass="hp-card-icon--red"
            title="Clinical Readings"
            subtitle="Blood pressure and blood glucose"
          >
            <div className="hp-grid">
              <NumberField
                id="hp-bpSys"
                name="bpSys"
                label="BP — Systolic"
                inputMode="numeric"
                step={1}
                placeholder="e.g. 130"
                value={form.bpSys}
                onChange={handleChange}
                error={errors.bpSys}
              />

              <NumberField
                id="hp-bpDia"
                name="bpDia"
                label="BP — Diastolic"
                inputMode="numeric"
                step={1}
                placeholder="e.g. 85"
                value={form.bpDia}
                onChange={handleChange}
                error={errors.bpDia}
              />

              <NumberField
                id="hp-glucose"
                name="glucose"
                label="Glucose (mg/dL)"
                placeholder="e.g. 110"
                value={form.glucose}
                onChange={handleChange}
                error={errors.glucose}
              />
            </div>
          </Card>

          {/* Habits & history */}
          <Card
            icon={<UsersIcon />}
            iconClass="hp-card-icon--green"
            title="Habits & Family History"
            subtitle="Lifestyle and family background"
          >
            <div className="hp-grid">
              <SelectField
                id="hp-smoking"
                name="smoking"
                label="Do you smoke?"
                value={form.smoking}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </SelectField>

              <SelectField
                id="hp-familyHistory"
                name="familyHistory"
                label="Family history of chronic illness?"
                value={form.familyHistory}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </SelectField>
            </div>
          </Card>

          {/* Symptoms */}
          <Card
            icon={<ThermometerIcon />}
            iconClass="hp-card-icon--amber"
            title="Symptoms"
            subtitle="Select any symptoms you're currently experiencing"
            badge={
              symptomCount > 0 ? (
                <span className="hp-count">{symptomCount} selected</span>
              ) : null
            }
          >
            <div className="hp-chips">
              {symptomOptions.map((symptom) => {
                const active = form.symptoms.includes(symptom);

                return (
                  <button
                    type="button"
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    aria-pressed={active}
                    className={`hp-chip${active ? " hp-chip--active" : ""}`}
                  >
                    {active && <span aria-hidden="true">✓</span>}
                    {symptom}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Submit */}
          <div className="hp-submit">
            {hasErrors && (
              <p className="hp-form-error" role="alert">
                Please fix the highlighted fields.
              </p>
            )}

            <div className="hp-submit-row">
              <p className="hp-note">
                The result is a screening estimate, not a medical diagnosis.
                Please consult a doctor for medical advice.
              </p>

              <button type="submit" className="hp-btn hp-btn--primary">
                Submit & Get AI Assessment
              </button>
            </div>
          </div>
        </div>
      </form>
    </Shell>
  );
}
