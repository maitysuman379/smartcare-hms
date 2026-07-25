import { useState } from "react";
import { currentDoctor, doctorPatients } from "../services/mockData.js";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState(doctorPatients);

  const markCompleted = (id) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Completed" } : p)),
    );
  };

  const pendingCount = patients.filter((p) => p.status === "Pending").length;
  const highRiskCount = patients.filter((p) => p.riskLevel === "high").length;

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Doctor</div>
        <h1 className="page-title">Welcome, {currentDoctor.name}</h1>
        <p className="page-subtitle">
          {currentDoctor.specialization} · {currentDoctor.experience} experience
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
            Total Patients
          </p>
          <p style={{ fontSize: 26, fontWeight: 800 }}>{patients.length}</p>
        </div>
        <div className="card">
          <p
            style={{
              fontSize: 12,
              color: "var(--color-ink-soft)",
              marginBottom: 6,
            }}
          >
            Pending Appointments
          </p>
          <p style={{ fontSize: 26, fontWeight: 800 }}>{pendingCount}</p>
        </div>
        <div className="card">
          <p
            style={{
              fontSize: 12,
              color: "var(--color-ink-soft)",
              marginBottom: 6,
            }}
          >
            High-Risk Patients
          </p>
          <p
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "var(--color-danger)",
            }}
          >
            {highRiskCount}
          </p>
        </div>
      </div>

      {/* Patient list */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>
          Patients matching your specialization ({currentDoctor.specialization})
        </h3>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Age / Gender</th>
              <th>Predicted Condition</th>
              <th>Risk</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  {p.age} / {p.gender}
                </td>
                <td>{p.predictedDisease}</td>
                <td>
                  <span className={`badge badge-${p.riskLevel}`}>
                    {p.riskPercentage}%
                  </span>
                </td>
                <td>{p.lastVisit}</td>
                <td>
                  <span
                    className={`badge ${p.status === "Completed" ? "badge-low" : "badge-medium"}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  {p.status === "Pending" && (
                    <button
                      className="btn btn-outline"
                      style={{ padding: "6px 12px", fontSize: 12 }}
                      onClick={() => markCompleted(p.id)}
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
