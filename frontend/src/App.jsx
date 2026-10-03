import { Routes, Route, Navigate } from "react-router-dom";
import MyProfile from "./pages/MyProfile";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import HealthProfile from "./pages/HealthProfile.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public pages: no sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App pages: wrapped in Layout (sidebar + content area) */}
      <Route element={<Layout />}>
        <Route path="/patient/health-profile" element={<HealthProfile />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<MyProfile />} />
      </Route>

      {/* Default: unmatched URLs go to Home instead of Login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
