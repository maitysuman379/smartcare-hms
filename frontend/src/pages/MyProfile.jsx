import { useEffect, useState } from "react";
import {
  getMyProfile,
  updateMyProfile,
  getToken,
  saveAuth,
} from "../services/api.js";

/* ---------- Styles (kept inside this file, unique "pp-" class names) ---------- */
const styles = `
.pp-page {
  --pp-card: #ffffff;
  --pp-text: #0f2f33;
  --pp-soft: #5b7479;
  --pp-border: #dbe7e8;
  --pp-tile: #f3f8f8;
  --pp-brand: #0f5a5e;
  --pp-brand-2: #178a86;
  --pp-mint: #a7e8d8;
  --pp-success: #15803d;
  --pp-success-bg: #dcfce7;
  --pp-danger: #dc2626;
  --pp-danger-bg: #fee2e2;
  --pp-radius: 20px;
  --pp-shadow: 0 1px 2px rgba(15, 47, 51, 0.05),
    0 8px 24px rgba(15, 47, 51, 0.07);

  max-width: 960px;
  margin: 0;
  padding: 0 0 56px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  color: var(--pp-text);
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
}

.pp-page *,
.pp-page *::before,
.pp-page *::after {
  box-sizing: border-box;
}

/* Header */
.pp-page .pp-eyebrow {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pp-brand);
  background: color-mix(in srgb, var(--pp-brand) 10%, transparent);
  padding: 5px 12px;
  border-radius: 999px;
}

.pp-page .pp-title {
  margin: 12px 0 6px;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--pp-text);
}

.pp-page .pp-subtitle {
  margin: 0;
  font-size: 15px;
  color: var(--pp-soft);
}

/* Hero */
.pp-page .pp-hero {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 32px 28px;
  border-radius: var(--pp-radius);
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 20%, rgba(167, 232, 216, 0.22), transparent 40%),
    radial-gradient(circle at 90% 85%, rgba(167, 232, 216, 0.14), transparent 45%),
    linear-gradient(135deg, #0f4c55 0%, #0d5a5c 55%, #0b4247 100%);
  box-shadow: 0 16px 40px rgba(15, 76, 85, 0.28);
}

.pp-page .pp-avatar {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 38px;
  font-weight: 800;
  color: var(--pp-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 4px solid rgba(167, 232, 216, 0.6);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.pp-page .pp-hero-info {
  min-width: 0;
}

.pp-page .pp-hero-name {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #ffffff;
}

.pp-page .pp-hero-email {
  margin: 4px 0 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  word-break: break-all;
}

.pp-page .pp-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pp-page .pp-role,
.pp-page .pp-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
}

.pp-page .pp-role {
  color: var(--pp-mint);
  background: rgba(167, 232, 216, 0.16);
  border: 1px solid rgba(167, 232, 216, 0.5);
}

.pp-page .pp-status--active {
  color: var(--pp-success);
  background: var(--pp-success-bg);
}

.pp-page .pp-status--inactive {
  color: var(--pp-danger);
  background: var(--pp-danger-bg);
}

.pp-page .pp-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pp-pulse 2s infinite;
}

@keyframes pp-pulse {
  0%   { box-shadow: 0 0 0 0 color-mix(in srgb, currentColor 45%, transparent); }
  70%  { box-shadow: 0 0 0 7px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

/* Photo upload */
.pp-page .pp-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.pp-page .pp-avatar {
  position: relative;
  overflow: hidden;
}

.pp-page .pp-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pp-page .pp-avatar-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(11, 66, 71, 0.65);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.pp-page .pp-camera {
  position: absolute;
  right: 0;
  bottom: 4px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffffff;
  color: var(--pp-brand);
  border: 1px solid var(--pp-border);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.pp-page .pp-camera svg {
  width: 17px;
  height: 17px;
}

.pp-page .pp-camera:hover {
  transform: scale(1.1);
  background: var(--pp-brand);
  color: var(--pp-mint);
}

.pp-page .pp-camera--busy {
  pointer-events: none;
  opacity: 0.7;
}

.pp-page .pp-photo-error {
  margin: 10px 0 0;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 13px;
  color: #fecaca;
  background: rgba(220, 38, 38, 0.25);
}

/* Section cards */
.pp-page .pp-card {
  padding: 26px 28px 28px;
  background: var(--pp-card);
  border: 1px solid var(--pp-border);
  border-radius: var(--pp-radius);
  box-shadow: var(--pp-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.pp-page .pp-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(15, 47, 51, 0.06),
    0 16px 36px rgba(15, 47, 51, 0.12);
}

/* A card being edited stays still and gets a brand outline */
.pp-page .pp-card--editing,
.pp-page .pp-card--editing:hover {
  transform: none;
  border-color: var(--pp-brand);
}

.pp-page .pp-card-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--pp-border);
}

.pp-page .pp-card-titles {
  flex: 1 1 170px;
  min-width: 0;
}

.pp-page .pp-card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--pp-text);
}

.pp-page .pp-card-sub {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--pp-soft);
}

.pp-page .pp-card-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: var(--pp-brand);
  background: color-mix(in srgb, var(--pp-brand) 12%, transparent);
}

.pp-page .pp-card-icon svg {
  width: 20px;
  height: 20px;
}

.pp-page .pp-card-icon--red {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.12);
}

.pp-page .pp-card-icon--green {
  color: #16a34a;
  background: rgba(22, 163, 74, 0.12);
}

/* Buttons */
.pp-page .pp-btn {
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
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease,
    transform 0.1s ease;
}

.pp-page .pp-btn svg {
  width: 15px;
  height: 15px;
}

.pp-page .pp-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.pp-page .pp-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.pp-page .pp-btn--primary {
  color: #ffffff;
  background: var(--pp-brand);
}

.pp-page .pp-btn--primary:hover:not(:disabled) {
  background: #0c4a4d;
}

.pp-page .pp-btn--ghost {
  color: var(--pp-brand);
  background: #ffffff;
  border-color: var(--pp-border);
}

.pp-page .pp-btn--ghost:hover:not(:disabled) {
  border-color: var(--pp-brand);
  background: color-mix(in srgb, var(--pp-brand) 6%, #ffffff);
}

.pp-page .pp-edit-btn {
  margin-left: auto;
}

/* Info tiles */
.pp-page .pp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  background: transparent;
  border: 0;
  padding: 0;
}

.pp-page .pp-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--pp-tile);
  border: 1px solid transparent;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.pp-page .pp-item:hover {
  border-color: var(--pp-border);
  background: color-mix(in srgb, var(--pp-brand) 6%, var(--pp-tile));
}

.pp-page .pp-item--full {
  grid-column: 1 / -1;
}

.pp-page .pp-label {
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pp-soft);
}

.pp-page .pp-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--pp-text);
  word-break: break-word;
}

.pp-page .pp-value--empty {
  font-weight: 400;
  font-style: italic;
  color: var(--pp-soft);
}

.pp-page .pp-value--active {
  color: var(--pp-success);
}

/* Edit form */
.pp-page .pp-field:hover {
  border-color: transparent;
  background: var(--pp-tile);
}

.pp-page .pp-input {
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 15px;
  color: var(--pp-text);
  background: #ffffff;
  border: 1px solid var(--pp-border);
  border-radius: 10px;
}

.pp-page textarea.pp-input {
  resize: vertical;
  line-height: 1.5;
}

.pp-page .pp-input:focus {
  outline: none;
  border-color: var(--pp-brand);
  box-shadow: 0 0 0 3px rgba(15, 90, 94, 0.14);
}

.pp-page .pp-hint {
  grid-column: 1 / -1;
  margin: 0;
  font-size: 12px;
  color: var(--pp-soft);
}

.pp-page .pp-form-footer {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.pp-page .pp-form-error {
  margin: 0;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--pp-danger);
  background: var(--pp-danger-bg);
}

.pp-page .pp-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Saved message */
.pp-page .pp-toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2000;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--pp-success);
  background: var(--pp-success-bg);
  border: 1px solid rgba(21, 128, 61, 0.25);
  box-shadow: 0 10px 28px rgba(15, 47, 51, 0.18);
}

/* Loading and error */
.pp-page .pp-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 80px 20px;
  color: var(--pp-soft);
}

.pp-page .pp-spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid var(--pp-border);
  border-top-color: var(--pp-brand);
  animation: pp-spin 0.8s linear infinite;
}

@keyframes pp-spin {
  to { transform: rotate(360deg); }
}

.pp-page .pp-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 24px;
  text-align: center;
  background: var(--pp-card);
  border: 1px solid var(--pp-border);
  border-radius: var(--pp-radius);
  box-shadow: var(--pp-shadow);
}

.pp-page .pp-error h2 {
  margin: 0;
  color: var(--pp-text);
}

.pp-page .pp-error p {
  margin: 0;
  color: var(--pp-soft);
}

.pp-page .pp-error-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: 24px;
  font-weight: 800;
  color: var(--pp-danger);
  background: var(--pp-danger-bg);
}

/* Responsive */
@media (max-width: 640px) {
  .pp-page { padding: 0 0 40px; }

  .pp-page .pp-hero {
    flex-direction: column;
    text-align: center;
    padding: 28px 18px;
  }

  .pp-page .pp-badges { justify-content: center; }
  .pp-page .pp-card { padding: 20px 18px 22px; }

  /* 16px inputs stop mobile browsers from zooming in on focus */
  .pp-page .pp-input { font-size: 16px; }

  .pp-page .pp-form-actions .pp-btn { flex: 1; }

  .pp-page .pp-toast {
    left: 14px;
    right: 14px;
    bottom: 14px;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pp-page .pp-dot,
  .pp-page .pp-spinner { animation: none; }
  .pp-page .pp-card { transition: none; }
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

const UserIcon = () => (
  <Svg>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Svg>
);
const AlertIcon = () => (
  <Svg>
    <path d="M12 3 2 20h20L12 3z" />
    <path d="M12 10v4M12 17.5v.01" />
  </Svg>
);
const ShieldIcon = () => (
  <Svg>
    <path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6l-8-3z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

const CameraIcon = () => (
  <Svg>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </Svg>
);

const PencilIcon = () => (
  <Svg>
    <path d="M4 20h4L19 9l-4-4L4 16v4z" />
    <path d="m13.5 6.5 4 4" />
  </Svg>
);

/* ---------- Constants ---------- */
const PERSONAL_FIELDS = [
  "phone",
  "date_of_birth",
  "gender",
  "city",
  "state",
  "pincode",
  "address",
];

const EMERGENCY_FIELDS = [
  "emergency_contact_name",
  "emergency_contact_phone",
  "emergency_contact_relation",
];

const PHONE_FIELDS = ["phone", "emergency_contact_phone"];

const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

const PHONE_REGEX = /^\+?\d{10,13}$/;
const PINCODE_REGEX = /^\d{6}$/;

/* ---------- Helpers (outside render) ---------- */
const pad = (n) => String(n).padStart(2, "0");

const todayLocal = () => {
  const now = new Date();

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

// Real timestamps (account created / updated)
const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// A date-of-birth can arrive as "YYYY-MM-DD" or as an ISO timestamp.
// Return the stored calendar day as "YYYY-MM-DD" either way.
const toDateOnly = (value) => {
  if (!value) return "";

  const text = String(value);

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  const d = new Date(text);

  if (Number.isNaN(d.getTime())) return "";

  const isUtcMidnight =
    d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0;

  return isUtcMidnight
    ? `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
    : `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const formatDateOnly = (value) => {
  const ymd = toDateOnly(value);

  if (!ymd) return "";

  return new Date(`${ymd}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

const genderLabel = (value) => {
  if (!value) return "";

  const match = GENDER_OPTIONS.find(
    (option) => option.value === String(value).toUpperCase(),
  );

  return match ? match.label : value;
};

const stripPhone = (value) => String(value ?? "").replace(/[\s-]/g, "");

// Empty text becomes null so optional database columns stay clean
const clean = (value) => {
  const text = String(value ?? "").trim();

  return text === "" ? null : text;
};

const validateDraft = (section, draft) => {
  const phoneOk = (value) =>
    !stripPhone(value) || PHONE_REGEX.test(stripPhone(value));

  if (section === "personal") {
    if (!phoneOk(draft.phone)) {
      return "Enter a valid phone number (10 to 13 digits).";
    }

    if (draft.pincode && !PINCODE_REGEX.test(String(draft.pincode).trim())) {
      return "Pincode must be 6 digits.";
    }

    if (draft.date_of_birth) {
      if (draft.date_of_birth > todayLocal()) {
        return "Date of birth cannot be in the future.";
      }

      if (draft.date_of_birth < "1900-01-01") {
        return "Enter a valid date of birth.";
      }
    }
  } else if (!phoneOk(draft.emergency_contact_phone)) {
    return "Enter a valid emergency contact phone number (10 to 13 digits).";
  }

  return "";
};

/* ---------- Small components (outside render so inputs keep focus) ---------- */
function InfoItem({ label, value, full = false, valueClass = "" }) {
  return (
    <div className={`pp-item${full ? " pp-item--full" : ""}`}>
      <span className="pp-label">{label}</span>
      <span
        className={`pp-value${value ? "" : " pp-value--empty"} ${valueClass}`}
      >
        {value || "Not provided"}
      </span>
    </div>
  );
}

function Field({ id, label, full = false, children }) {
  return (
    <div className={`pp-item pp-field${full ? " pp-item--full" : ""}`}>
      <label className="pp-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  maxLength,
  placeholder,
  inputMode,
  autoComplete,
  min,
  max,
  full = false,
}) {
  return (
    <Field id={id} label={label} full={full}>
      <input
        id={id}
        name={name}
        type={type}
        className="pp-input"
        value={value ?? ""}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        min={min}
        max={max}
      />
    </Field>
  );
}

function EditButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      className="pp-btn pp-btn--ghost pp-edit-btn"
      onClick={onClick}
      disabled={disabled}
    >
      <PencilIcon />
      Edit
    </button>
  );
}

function FormFooter({ error, saving, onCancel }) {
  return (
    <div className="pp-form-footer">
      {error && (
        <p className="pp-form-error" role="alert">
          {error}
        </p>
      )}

      <div className="pp-form-actions">
        <button
          type="button"
          className="pp-btn pp-btn--ghost"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="pp-btn pp-btn--primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function Card({
  icon,
  iconClass = "",
  title,
  subtitle,
  action = null,
  editing = false,
  onSubmit,
  children,
}) {
  return (
    <section className={`pp-card${editing ? " pp-card--editing" : ""}`}>
      <div className="pp-card-head">
        <div className={`pp-card-icon ${iconClass}`}>{icon}</div>

        <div className="pp-card-titles">
          <h2 className="pp-card-title">{title}</h2>
          <p className="pp-card-sub">{subtitle}</p>
        </div>

        {action}
      </div>

      {onSubmit ? (
        <form className="pp-grid" onSubmit={onSubmit} noValidate>
          {children}
        </form>
      ) : (
        <div className="pp-grid">{children}</div>
      )}
    </section>
  );
}

function Shell({ children }) {
  return (
    <div className="pp-page">
      <style>{styles}</style>
      {children}
    </div>
  );
}

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Editing: null | "personal" | "emergency"
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyProfile();
        setProfile(response.user);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Hide the "saved" message after a few seconds
  useEffect(() => {
    if (!saveMessage) return undefined;

    const timer = setTimeout(() => setSaveMessage(""), 3500);

    return () => clearTimeout(timer);
  }, [saveMessage]);

  // Every field the update endpoint accepts, in the shape it expects.
  // Always sending the full set means a save can never blank out other fields.
  const buildBase = () => ({
    username: profile.username,
    profile_image: profile.profile_image ?? null,
    phone: profile.phone ?? null,
    date_of_birth: toDateOnly(profile.date_of_birth) || null,
    gender: profile.gender ?? null,
    address: profile.address ?? null,
    city: profile.city ?? null,
    state: profile.state ?? null,
    pincode: profile.pincode ?? null,
    emergency_contact_name: profile.emergency_contact_name ?? null,
    emergency_contact_phone: profile.emergency_contact_phone ?? null,
    emergency_contact_relation: profile.emergency_contact_relation ?? null,
  });

  const buildPayload = (section, values) => {
    const payload = buildBase();
    const fields = section === "personal" ? PERSONAL_FIELDS : EMERGENCY_FIELDS;

    fields.forEach((field) => {
      payload[field] = PHONE_FIELDS.includes(field)
        ? clean(stripPhone(values[field]))
        : clean(values[field]);
    });

    return payload;
  };

  const startEdit = (section) => {
    const fields = section === "personal" ? PERSONAL_FIELDS : EMERGENCY_FIELDS;
    const next = {};

    fields.forEach((field) => {
      if (field === "date_of_birth") {
        next[field] = toDateOnly(profile[field]);
      } else if (field === "gender") {
        next[field] = String(profile[field] || "").toUpperCase();
      } else {
        next[field] = profile[field] ?? "";
      }
    });

    setDraft(next);
    setFormError("");
    setEditing(section);
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft({});
    setFormError("");
  };

  const handleDraftChange = (event) => {
    const { name, value } = event.target;

    setDraft((prev) => ({
      ...prev,
      [name]: name === "pincode" ? value.replace(/\D/g, "").slice(0, 6) : value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!editing || saving) return;

    const section = editing;
    const problem = validateDraft(section, draft);

    if (problem) {
      setFormError(problem);
      return;
    }

    try {
      setSaving(true);
      setFormError("");

      const payload = buildPayload(section, draft);
      const response = await updateMyProfile(payload);

      setProfile(response.user ? response.user : { ...profile, ...payload });
      setEditing(null);
      setDraft({});
      setSaveMessage(
        section === "personal"
          ? "Personal information updated."
          : "Emergency contact updated.",
      );
    } catch (err) {
      console.error("Failed to save profile:", err);
      setFormError(err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhotoError("");

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Please select a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Image size must be less than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64Image = reader.result;

        setPreviewImage(base64Image);
        setSavingPhoto(true);

        const response = await updateMyProfile({
          ...buildBase(),
          profile_image: base64Image,
        });

        if (response.success && response.user) {
          setProfile(response.user);

          const token = getToken();

          if (token) {
            saveAuth({ token, user: response.user });
          }

          setPreviewImage("");
          setPhotoError("");
        }
      } catch (err) {
        console.error("Failed to save profile photo:", err);
        setPhotoError(err.message || "Failed to save profile photo.");
        setPreviewImage("");
      } finally {
        setSavingPhoto(false);
      }
    };

    reader.onerror = () => {
      setPhotoError("Failed to read the selected image.");
      setSavingPhoto(false);
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  if (loading) {
    return (
      <Shell>
        <div className="pp-loading">
          <div className="pp-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell>
        <div className="pp-error">
          <div className="pp-error-icon">!</div>
          <h2>Unable to load profile</h2>
          <p>{error}</p>
        </div>
      </Shell>
    );
  }

  if (!profile) {
    return (
      <Shell>
        <div className="pp-error">
          <h2>Profile not found</h2>
          <p>We couldn't find your profile information.</p>
        </div>
      </Shell>
    );
  }

  const initial = profile.username?.charAt(0).toUpperCase() || "U";
  const isActive = profile.status === "ACTIVE";
  const profileImage = previewImage || profile.profile_image || "";
  const editingPersonal = editing === "personal";
  const editingEmergency = editing === "emergency";

  return (
    <Shell>
      {/* Page Header */}
      <div>
        <span className="pp-eyebrow">ACCOUNT</span>
        <h1 className="pp-title">My Profile</h1>
        <p className="pp-subtitle">
          Manage and view your personal account information.
        </p>
      </div>

      {/* Profile Hero */}
      <div className="pp-hero">
        <div className="pp-avatar-wrap">
          <div className="pp-avatar">
            {profileImage ? (
              <img src={profileImage} alt={`${profile.username} avatar`} />
            ) : (
              initial
            )}
            {savingPhoto && <div className="pp-avatar-overlay">Saving…</div>}
          </div>

          <label
            htmlFor="pp-photo-input"
            className={`pp-camera${savingPhoto ? " pp-camera--busy" : ""}`}
            title={profile.profile_image ? "Change photo" : "Add photo"}
          >
            <CameraIcon />
          </label>

          <input
            id="pp-photo-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            disabled={savingPhoto}
            hidden
          />
        </div>

        <div className="pp-hero-info">
          <h2 className="pp-hero-name">{profile.username}</h2>
          <p className="pp-hero-email">{profile.email}</p>

          <div className="pp-badges">
            <span className="pp-role">{profile.role}</span>

            <span
              className={`pp-status ${
                isActive ? "pp-status--active" : "pp-status--inactive"
              }`}
            >
              <span className="pp-dot"></span>
              {profile.status}
            </span>
          </div>

          {photoError && <p className="pp-photo-error">{photoError}</p>}
        </div>
      </div>

      {/* Personal Information */}
      <Card
        icon={<UserIcon />}
        title="Personal Information"
        subtitle="Your basic personal details"
        editing={editingPersonal}
        onSubmit={editingPersonal ? handleSave : undefined}
        action={
          editingPersonal ? null : (
            <EditButton
              onClick={() => startEdit("personal")}
              disabled={editing !== null}
            />
          )
        }
      >
        {editingPersonal ? (
          <>
            <InfoItem label="Username" value={profile.username} />
            <InfoItem label="Email" value={profile.email} />

            <TextField
              id="pp-phone"
              name="phone"
              label="Phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={15}
              placeholder="e.g. 9876543210"
              value={draft.phone}
              onChange={handleDraftChange}
            />

            <TextField
              id="pp-dob"
              name="date_of_birth"
              label="Date of Birth"
              type="date"
              min="1900-01-01"
              max={todayLocal()}
              value={draft.date_of_birth}
              onChange={handleDraftChange}
            />

            <Field id="pp-gender" label="Gender">
              <select
                id="pp-gender"
                name="gender"
                className="pp-input"
                value={draft.gender ?? ""}
                onChange={handleDraftChange}
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <TextField
              id="pp-city"
              name="city"
              label="City"
              autoComplete="address-level2"
              maxLength={100}
              value={draft.city}
              onChange={handleDraftChange}
            />

            <TextField
              id="pp-state"
              name="state"
              label="State"
              autoComplete="address-level1"
              maxLength={100}
              value={draft.state}
              onChange={handleDraftChange}
            />

            <TextField
              id="pp-pincode"
              name="pincode"
              label="Pincode"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              placeholder="6 digits"
              value={draft.pincode}
              onChange={handleDraftChange}
            />

            <Field id="pp-address" label="Address" full>
              <textarea
                id="pp-address"
                name="address"
                className="pp-input"
                rows={3}
                maxLength={500}
                autoComplete="street-address"
                value={draft.address ?? ""}
                onChange={handleDraftChange}
              />
            </Field>

            <p className="pp-hint">Username and email can't be changed here.</p>

            <FormFooter
              error={formError}
              saving={saving}
              onCancel={cancelEdit}
            />
          </>
        ) : (
          <>
            <InfoItem label="Username" value={profile.username} />
            <InfoItem label="Email" value={profile.email} />
            <InfoItem label="Phone" value={profile.phone} />
            <InfoItem
              label="Date of Birth"
              value={formatDateOnly(profile.date_of_birth)}
            />
            <InfoItem label="Gender" value={genderLabel(profile.gender)} />
            <InfoItem label="City" value={profile.city} />
            <InfoItem label="State" value={profile.state} />
            <InfoItem label="Pincode" value={profile.pincode} />
            <InfoItem label="Address" value={profile.address} full />
          </>
        )}
      </Card>

      {/* Emergency Contact */}
      <Card
        icon={<AlertIcon />}
        iconClass="pp-card-icon--red"
        title="Emergency Contact"
        subtitle="Contact information for emergencies"
        editing={editingEmergency}
        onSubmit={editingEmergency ? handleSave : undefined}
        action={
          editingEmergency ? null : (
            <EditButton
              onClick={() => startEdit("emergency")}
              disabled={editing !== null}
            />
          )
        }
      >
        {editingEmergency ? (
          <>
            <TextField
              id="pp-ec-name"
              name="emergency_contact_name"
              label="Contact Name"
              maxLength={100}
              value={draft.emergency_contact_name}
              onChange={handleDraftChange}
            />

            <TextField
              id="pp-ec-phone"
              name="emergency_contact_phone"
              label="Phone"
              type="tel"
              inputMode="tel"
              maxLength={15}
              placeholder="e.g. 9876543210"
              value={draft.emergency_contact_phone}
              onChange={handleDraftChange}
            />

            <TextField
              id="pp-ec-relation"
              name="emergency_contact_relation"
              label="Relation"
              maxLength={50}
              placeholder="e.g. Father, Spouse"
              value={draft.emergency_contact_relation}
              onChange={handleDraftChange}
            />

            <FormFooter
              error={formError}
              saving={saving}
              onCancel={cancelEdit}
            />
          </>
        ) : (
          <>
            <InfoItem
              label="Contact Name"
              value={profile.emergency_contact_name}
            />
            <InfoItem label="Phone" value={profile.emergency_contact_phone} />
            <InfoItem
              label="Relation"
              value={profile.emergency_contact_relation}
            />
          </>
        )}
      </Card>

      {/* Account Information (read-only) */}
      <Card
        icon={<ShieldIcon />}
        iconClass="pp-card-icon--green"
        title="Account Information"
        subtitle="Your SmartCare account details"
      >
        <InfoItem label="Account Role" value={profile.role} />
        <InfoItem
          label="Account Status"
          value={profile.status}
          valueClass={isActive ? "pp-value--active" : ""}
        />
        <InfoItem label="Email" value={profile.email} />
        <InfoItem
          label="Account Created"
          value={formatDate(profile.created_at)}
        />
        <InfoItem label="Last Updated" value={formatDate(profile.updated_at)} />
      </Card>

      {saveMessage && (
        <div className="pp-toast" role="status">
          {saveMessage}
        </div>
      )}
    </Shell>
  );
}

export default MyProfile;
