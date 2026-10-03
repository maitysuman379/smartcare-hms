import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import ProfileMenu from "./ProfileMenu.jsx";

export default function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div className="global-topbar">
          <ProfileMenu />
        </div>

        <Outlet />
      </main>
    </div>
  );
}
