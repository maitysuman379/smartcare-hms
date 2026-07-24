import { NavLink } from "react-router-dom";

const navSections = [
  {
    label: "Patient",
    links: [
      { to: "/patient/health-profile", label: "Health Profile" },
      { to: "/patient/dashboard", label: "My Dashboard" },
    ],
  },
  {
    label: "Doctor",
    links: [{ to: "/doctor/dashboard", label: "Doctor Dashboard" }],
  },
  {
    label: "Admin",
    links: [{ to: "/admin/dashboard", label: "Admin Dashboard" }],
  },
];

export default function Sidebar() {
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
        <NavLink to="/login" className="sidebar-link">
          Log out
        </NavLink>
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
        .sidebar-nav { flex: 1; }
        .sidebar-section { margin-bottom: 20px; }
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
          padding: 9px 10px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-ink-soft);
          text-decoration: none;
        }
        .sidebar-link:hover { background: var(--color-bg); color: var(--color-ink); }
        .sidebar-link-active {
          background: var(--color-primary-soft);
          color: var(--color-primary);
          font-weight: 700;
        }
        .sidebar-footer {
          border-top: 1px solid var(--color-line);
          padding-top: 12px;
        }
        @media (max-width: 900px) {
          .sidebar { display: none; }
        }
      `}</style>
    </aside>
  );
}
