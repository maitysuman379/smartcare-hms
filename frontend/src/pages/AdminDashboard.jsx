import { useState } from "react";
import {
  allDoctors,
  allPatientsOverview,
  appointments,
} from "../services/mockData.js";

const emptyDoctorForm = {
  name: "",
  specialization: "",
  qualification: "",
  experience: "",
  fee: "",
  available: true,
};

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState(allDoctors);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyDoctorForm);
  const [error, setError] = useState("");

  const highRiskPatients = allPatientsOverview.filter(
    (p) => p.riskLevel === "high",
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.specialization || !form.experience || !form.fee) {
      setError("Please fill in all required fields.");
      return;
    }

    if (editingId) {
      // Edit existing doctor
      setDoctors((prev) =>
        prev.map((d) => (d.id === editingId ? { ...d, ...form } : d)),
      );
    } else {
      // Add new doctor
      const newDoctor = {
        id: Date.now(),
        ...form,
      };
      setDoctors((prev) => [...prev, newDoctor]);
    }

    closeForm();
  };

  const removeDoctor = (id) => {
    const confirmed = window.confirm(
      "Remove this doctor? This cannot be undone.",
    );
    if (confirmed) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d)),
    );
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Admin</div>
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">
          Manage doctors, monitor patients, and track hospital activity.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <div className="card">
          <p
            style={{
              fontSize: 12,
              color: "var(--color-ink-soft)",
              marginBottom: 6,
            }}
          >
            Total Doctors
          </p>
          <p style={{ fontSize: 26, fontWeight: 800 }}>{doctors.length}</p>
        </div>
        <div className="card">
          <p
            style={{
              fontSize: 12,
              color: "var(--color-ink-soft)",
              marginBottom: 6,
            }}
          >
            Total Patients
          </p>
          <p style={{ fontSize: 26, fontWeight: 800 }}>
            {allPatientsOverview.length}
          </p>
        </div>
        <div className="card">
          <p
            style={{
              fontSize: 12,
              color: "var(--color-ink-soft)",
              marginBottom: 6,
            }}
          >
            Total Appointments
          </p>
          <p style={{ fontSize: 26, fontWeight: 800 }}>{appointments.length}</p>
        </div>
      </div>

      {/* Doctor management */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h3>Manage Doctors</h3>
          {!showForm && (
            <button className="btn btn-primary" onClick={openAddForm}>
              + Add Doctor
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="doctor-form">
            <div className="grid grid-2">
              <div className="form-row">
                <label htmlFor="name">Full name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Dr. Full Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="specialization">Specialization *</label>
                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="e.g. Cardiologist"
                  value={form.specialization}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="qualification">Qualification</label>
                <input
                  id="qualification"
                  name="qualification"
                  type="text"
                  placeholder="e.g. MBBS, MD"
                  value={form.qualification}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="experience">Experience *</label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  placeholder="e.g. 5 years"
                  value={form.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="fee">Consultation fee (₹) *</label>
                <input
                  id="fee"
                  name="fee"
                  type="number"
                  placeholder="e.g. 500"
                  value={form.fee}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="available">Availability</label>
                <select
                  id="available"
                  name="available"
                  value={form.available}
                  onChange={(e) =>
                    setForm({ ...form, available: e.target.value === "true" })
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </div>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <div style={{ display: "flex", gap: 10 }}>
              <button type="submit" className="btn btn-primary">
                {editingId ? "Save Changes" : "Add Doctor"}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <table style={{ marginTop: showForm ? 20 : 0 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Fee</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.specialization}</td>
                <td>{d.experience}</td>
                <td>₹{d.fee}</td>
                <td>
                  <span
                    className={`badge ${d.available ? "badge-low" : "badge-medium"}`}
                  >
                    {d.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: "6px 10px", fontSize: 12 }}
                      onClick={() => toggleAvailability(d.id)}
                    >
                      Toggle
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ padding: "6px 10px", fontSize: 12 }}
                      onClick={() => openEditForm(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{
                        padding: "6px 10px",
                        fontSize: 12,
                        color: "var(--color-danger)",
                        borderColor: "var(--color-danger)",
                      }}
                      onClick={() => removeDoctor(d.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="grid grid-2"
        style={{ marginBottom: 20, alignItems: "start" }}
      >
        {/* High-risk alerts */}
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>⚠️ High-Risk Patient Alerts</h3>
          {highRiskPatients.length === 0 ? (
            <p style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>
              No high-risk patients right now.
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Condition</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {highRiskPatients.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.predictedDisease}</td>
                    <td>
                      <span className="badge badge-high">
                        {p.riskPercentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* All patients overview */}
        <div className="card">
          <h3 style={{ marginBottom: 16 }}>All Patients Overview</h3>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Condition</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {allPatientsOverview.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.predictedDisease}</td>
                  <td>
                    <span className={`badge badge-${p.riskLevel}`}>
                      {p.riskPercentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .doctor-form {
          background: var(--color-bg);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}
