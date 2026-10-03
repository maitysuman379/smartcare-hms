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
  margin: 0 auto;
  padding: 32px 20px 64px;
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.pp-page .pp-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(15, 47, 51, 0.06),
    0 16px 36px rgba(15, 47, 51, 0.12);
}

.pp-page .pp-card-head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--pp-border);
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
  .pp-page { padding: 20px 14px 48px; }

  .pp-page .pp-hero {
    flex-direction: column;
    text-align: center;
    padding: 28px 18px;
  }

  .pp-page .pp-badges { justify-content: center; }
  .pp-page .pp-card { padding: 20px 18px 22px; }
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

/* ---------- Helpers and small components (outside render) ---------- */
const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

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

function Card({ icon, iconClass = "", title, subtitle, children }) {
  return (
    <section className="pp-card">
      <div className="pp-card-head">
        <div className={`pp-card-icon ${iconClass}`}>{icon}</div>
        <div>
          <h2 className="pp-card-title">{title}</h2>
          <p className="pp-card-sub">{subtitle}</p>
        </div>
      </div>
      <div className="pp-grid">{children}</div>
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
          username: profile.username,
          profile_image: base64Image,
          phone: profile.phone,
          date_of_birth: profile.date_of_birth,
          gender: profile.gender,
          address: profile.address,
          city: profile.city,
          state: profile.state,
          pincode: profile.pincode,
          emergency_contact_name: profile.emergency_contact_name,
          emergency_contact_phone: profile.emergency_contact_phone,
          emergency_contact_relation: profile.emergency_contact_relation,
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
      >
        <InfoItem label="Username" value={profile.username} />
        <InfoItem label="Email" value={profile.email} />
        <InfoItem label="Phone" value={profile.phone} />
        <InfoItem
          label="Date of Birth"
          value={formatDate(profile.date_of_birth)}
        />
        <InfoItem label="Gender" value={profile.gender} />
        <InfoItem label="City" value={profile.city} />
        <InfoItem label="State" value={profile.state} />
        <InfoItem label="Pincode" value={profile.pincode} />
        <InfoItem label="Address" value={profile.address} full />
      </Card>

      {/* Emergency Contact */}
      <Card
        icon={<AlertIcon />}
        iconClass="pp-card-icon--red"
        title="Emergency Contact"
        subtitle="Contact information for emergencies"
      >
        <InfoItem label="Contact Name" value={profile.emergency_contact_name} />
        <InfoItem label="Phone" value={profile.emergency_contact_phone} />
        <InfoItem label="Relation" value={profile.emergency_contact_relation} />
      </Card>

      {/* Account Information */}
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
    </Shell>
  );
}

export default MyProfile;
