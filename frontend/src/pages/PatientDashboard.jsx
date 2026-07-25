import {
  currentPatient,
  healthProfile,
  aiPrediction,
  matchedDoctor,
  appointments,
} from "../services/mockData.js";

export default function PatientDashboard() {
  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Patient</div>
        <h1 className="page-title">
          Welcome, {currentPatient.name.split(" ")[0]}
        </h1>
        <p className="page-subtitle">
          Here's an overview of your health profile and upcoming appointments.
        </p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: 20 }}>
        {/* AI Prediction card */}
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>AI Health Assessment</h3>
          {healthProfile.submitted ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span className={`badge badge-${aiPrediction.riskLevel}`}>
                  {aiPrediction.riskLevel.toUpperCase()} RISK
                </span>
                <span style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>
                  {aiPrediction.riskPercentage}% risk score
                </span>
              </div>
              <p style={{ fontSize: 15, marginBottom: 4 }}>
                Predicted condition: <strong>{aiPrediction.disease}</strong>
              </p>
              <p style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>
                Based on your submitted vitals and symptoms.
              </p>
            </>
          ) : (
            <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
              You haven't submitted your health profile yet.
            </p>
          )}
        </div>

        {/* Matched doctor card */}
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Matched Doctor</h3>
          <p style={{ fontSize: 15, marginBottom: 4 }}>
            <strong>{matchedDoctor.name}</strong>
          </p>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-ink-soft)",
              marginBottom: 10,
            }}
          >
            {matchedDoctor.specialization} · {matchedDoctor.experience}{" "}
            experience
          </p>
          <span
            className={`badge ${matchedDoctor.available ? "badge-low" : "badge-medium"}`}
          >
            {matchedDoctor.available ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Health vitals card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 16 }}>Health Vitals</h3>
        <div className="grid grid-3">
          <div>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-ink-soft)",
                marginBottom: 4,
              }}
            >
              BMI
            </p>
            <p style={{ fontSize: 20, fontWeight: 700 }}>{healthProfile.bmi}</p>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-ink-soft)",
                marginBottom: 4,
              }}
            >
              Blood Pressure
            </p>
            <p style={{ fontSize: 20, fontWeight: 700 }}>
              {healthProfile.bpSys}/{healthProfile.bpDia}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                color: "var(--color-ink-soft)",
                marginBottom: 4,
              }}
            >
              Glucose
            </p>
            <p style={{ fontSize: 20, fontWeight: 700 }}>
              {healthProfile.glucose} mg/dL
            </p>
          </div>
        </div>
      </div>

      {/* Appointments table */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>Appointments</h3>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.doctor}</td>
                <td>{appt.specialization}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>
                  <span
                    className={`badge ${
                      appt.status === "Completed" ? "badge-low" : "badge-medium"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
