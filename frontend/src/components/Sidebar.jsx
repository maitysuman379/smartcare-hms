import { NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../services/api.js";

export default function Sidebar() {
  const user = getCurrentUser();
  const role = user?.role;

  const navSections = [];

  if (role === "PATIENT") {
    navSections.push({
      label: "Patient",
      links: [
        { to: "/patient/health-profile", label: "Health Profile" },
        { to: "/patient/dashboard", label: "My Dashboard" },
      ],
    });
  }

  if (role === "DOCTOR") {
    navSections.push({
      label: "Doctor",
      links: [{ to: "/doctor/dashboard", label: "Doctor Dashboard" }],
    });
  }

  if (role === "ADMIN") {
    navSections.push({
      label: "Admin",
      links: [{ to: "/admin/dashboard", label: "Admin Dashboard" }],
    });
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-mark">+</span>
        <span>SmartCare</span>
      </div>

      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <div key={section.label} className="sidebar-section">
            <div className="sidebar-section-label">{section.label}</div>

            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-link sidebar-logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>

      <style>{`
        .sidebar {
          width: 230px;
          background: var(--color-surface);
          border-right: 1px solid var(--color-line);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          padding: 0 8px 24px;
          color: var(--color-primary);
        }

        .sidebar-mark {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: var(--color-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .sidebar-nav {
          flex: 1;
        }

        .sidebar-section {
          margin-bottom: 20px;
        }

        .sidebar-section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-ink-soft);
          font-weight: 700;
          padding: 0 8px;
          margin-bottom: 6px;
        }

        .sidebar-link {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-ink-soft);
          text-decoration: none;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .sidebar-link:hover {
          background: var(--color-bg);
          color: var(--color-ink);
        }

        .sidebar-link-active {
          background: var(--color-primary-soft);
          color: var(--color-primary);
          font-weight: 700;
        }

        .sidebar-footer {
          border-top: 1px solid var(--color-line);
          padding-top: 12px;
        }

        .sidebar-logout {
          color: var(--color-danger);
        }

        .sidebar-logout:hover {
          color: var(--color-danger);
        }

        @media (max-width: 900px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
