import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/api.js";

/* ---------- Styles (kept inside this file) ---------- */
const styles = `
.pm-root {
  --pm-card: #ffffff;
  --pm-text: #0f2f33;
  --pm-soft: #5b7479;
  --pm-border: #dbe7e8;
  --pm-hover: #eef6f6;
  --pm-brand: #0f5a5e;
  --pm-brand-2: #178a86;
  --pm-danger: #dc2626;
  --pm-danger-bg: rgba(220, 38, 38, 0.08);

  position: relative;
  display: inline-block;
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* Avatar button */
.pm-root .pm-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 4px;
  border-radius: 999px;
  border: 1px solid var(--pm-border);
  background: var(--pm-card);
  color: var(--pm-text);
  cursor: pointer;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.pm-root .pm-trigger:hover,
.pm-root .pm-trigger[aria-expanded="true"] {
  border-color: var(--pm-brand);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--pm-brand) 15%, transparent);
}

.pm-root .pm-trigger:focus-visible {
  outline: 2px solid var(--pm-brand);
  outline-offset: 2px;
}

.pm-root .pm-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--pm-brand), var(--pm-brand-2));
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
}

.pm-root .pm-avatar--lg {
  width: 44px;
  height: 44px;
  font-size: 18px;
}

.pm-root .pm-chevron {
  width: 16px;
  height: 16px;
  color: var(--pm-soft);
  transition: transform 0.2s ease;
}

.pm-root .pm-trigger[aria-expanded="true"] .pm-chevron {
  transform: rotate(180deg);
}

/* Dropdown */
.pm-root .pm-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  z-index: 1000;
  width: 260px;
  padding: 8px;
  background: var(--pm-card);
  border: 1px solid var(--pm-border);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(15, 23, 42, 0.05),
    0 20px 40px rgba(15, 23, 42, 0.16);
  transform-origin: top right;
  animation: pm-pop 0.16s ease-out;
}

@keyframes pm-pop {
  from { opacity: 0; transform: translateY(-6px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* User header */
.pm-root .pm-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 14px;
  margin-bottom: 6px;
  border-bottom: 1px solid var(--pm-border);
}

.pm-root .pm-user {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.pm-root .pm-name {
  color: var(--pm-text);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pm-root .pm-role {
  align-self: flex-start;
  padding: 2px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pm-brand);
  background: color-mix(in srgb, var(--pm-brand) 12%, transparent);
}

/* Menu items (buttons and links) */
.pm-root .pm-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--pm-text);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: background 0.15s ease, color 0.15s ease;
}

.pm-root .pm-item:hover,
.pm-root .pm-item:focus-visible {
  background: var(--pm-hover);
  outline: none;
}

.pm-root .pm-item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--pm-soft);
  transition: color 0.15s ease;
}

.pm-root .pm-item:hover svg {
  color: var(--pm-brand);
}

.pm-root .pm-divider {
  height: 1px;
  margin: 6px 4px;
  background: var(--pm-border);
}

.pm-root .pm-item--danger {
  color: var(--pm-danger);
}

.pm-root .pm-item--danger svg {
  color: var(--pm-danger);
}

.pm-root .pm-item--danger:hover {
  background: var(--pm-danger-bg);
}

.pm-root .pm-item--danger:hover svg {
  color: var(--pm-danger);
}

@media (max-width: 480px) {
  .pm-root .pm-dropdown { width: min(260px, calc(100vw - 24px)); }
}

@media (prefers-reduced-motion: reduce) {
  .pm-root .pm-dropdown { animation: none; }
  .pm-root .pm-chevron,
  .pm-root .pm-trigger,
  .pm-root .pm-item { transition: none; }
}
`;

/* ---------- Inline SVG icons ---------- */
const Svg = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const ChevronIcon = () => (
  <Svg className="pm-chevron">
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
const DashboardIcon = () => (
  <Svg>
    <rect x="3" y="3" width="7" height="9" rx="1.5" />
    <rect x="14" y="3" width="7" height="5" rx="1.5" />
    <rect x="14" y="12" width="7" height="9" rx="1.5" />
    <rect x="3" y="16" width="7" height="5" rx="1.5" />
  </Svg>
);
const HeartIcon = () => (
  <Svg>
    <path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z" />
  </Svg>
);
const UserIcon = () => (
  <Svg>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Svg>
);
const LogoutIcon = () => (
  <Svg>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </Svg>
);

export default function ProfileMenu() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);

  /* Close on outside click and Escape */
  useEffect(() => {
    if (!profileOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const handleDashboard = () => {
    setProfileOpen(false);

    if (user?.role === "PATIENT") {
      navigate("/patient/dashboard");
    } else if (user?.role === "DOCTOR") {
      navigate("/doctor/dashboard");
    } else if (user?.role === "ADMIN") {
      navigate("/admin/dashboard");
    }
  };

  if (!user) {
    return null;
  }

  const initial = user.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="pm-root" ref={menuRef}>
      <style>{styles}</style>

      <button
        type="button"
        className="pm-trigger"
        onClick={() => setProfileOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={profileOpen}
        aria-haspopup="menu"
      >
        <span className="pm-avatar">{initial}</span>
        <ChevronIcon />
      </button>

      {profileOpen && (
        <div className="pm-dropdown" role="menu">
          <div className="pm-header">
            <span className="pm-avatar pm-avatar--lg">{initial}</span>
            <div className="pm-user">
              <strong className="pm-name">{user.username}</strong>
              <span className="pm-role">{user.role}</span>
            </div>
          </div>

          <button
            type="button"
            className="pm-item"
            role="menuitem"
            onClick={handleDashboard}
          >
            <DashboardIcon />
            Dashboard
          </button>

          {user.role === "PATIENT" && (
            <Link
              to="/patient/health-profile"
              className="pm-item"
              role="menuitem"
              onClick={() => setProfileOpen(false)}
            >
              <HeartIcon />
              Health Profile
            </Link>
          )}

          <Link
            to="/profile"
            className="pm-item"
            role="menuitem"
            onClick={() => setProfileOpen(false)}
          >
            <UserIcon />
            My Profile
          </Link>

          <div className="pm-divider" />

          <button
            type="button"
            className="pm-item pm-item--danger"
            role="menuitem"
            onClick={handleLogout}
          >
            <LogoutIcon />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
