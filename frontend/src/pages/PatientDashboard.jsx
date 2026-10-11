import { useEffect, useState } from "react";

import {
  getMyPatient,
  getMyLatestVitals,
  getMyPredictions,
  getAllDoctors,
  createAppointment,
  getPatientAppointments,
} from "../services/api.js";

// Backend statuses: SCHEDULED, CONFIRMED, COMPLETED, CANCELLED, NO_SHOW
const statusLabel = (status) =>
  String(status || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

const statusClass = (status) => {
  const value = String(status || "").toUpperCase();

  if (value === "COMPLETED") return "badge-low";
  if (value === "CANCELLED" || value === "NO_SHOW") return "badge-high";

  return "badge-medium";
};

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");

  const [vitals, setVitals] = useState(null);
  const [vitalsLoading, setVitalsLoading] = useState(true);
  const [vitalsError, setVitalsError] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(true);
  const [predictionError, setPredictionError] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // LOAD LOGGED-IN PATIENT
  // ==========================================

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true);
        setProfileError("");

        const data = await getMyPatient();

        setPatient(data.patient);
      } catch (error) {
        console.error("Failed to load patient profile:", error);

        setProfileError(error.message || "Failed to load patient profile");
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, []);

  // ==========================================
  // LOAD PATIENT APPOINTMENTS
  // ==========================================

  const loadAppointments = async (patientId) => {
    try {
      const data = await getPatientAppointments(patientId);

      const formatted = (data.appointments || []).map((appt) => ({
        id: appt.id,
        appointment_code: appt.appointment_code,
        doctor: appt.doctor_name,
        specialization: appt.specialization,
        date: appt.appointment_date
          ? String(appt.appointment_date).slice(0, 10)
          : "",
        time: appt.appointment_time,
        status: appt.status,
      }));

      setAppointments(formatted);
    } catch (err) {
      console.error("Failed to load appointments:", err);
    }
  };

  useEffect(() => {
    if (patient?.id) {
      loadAppointments(patient.id);
    }
  }, [patient]);

  // ==========================================
  // LOAD LATEST VITALS
  // ==========================================

  useEffect(() => {
    async function fetchVitals() {
      try {
        const data = await getMyLatestVitals();
        setVitals(data.vitals);
      } catch (err) {
        setVitalsError(err.message || "Failed to load vitals.");
      } finally {
        setVitalsLoading(false);
      }
    }

    fetchVitals();
  }, []);

  // ==========================================
  // LOAD LATEST AI PREDICTION
  // ==========================================

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const data = await getMyPredictions();
        const latest =
          data.predictions && data.predictions.length > 0
            ? data.predictions[0]
            : null;
        setPrediction(latest);
      } catch (err) {
        setPredictionError(err.message || "Failed to load AI prediction.");
      } finally {
        setPredictionLoading(false);
      }
    }

    fetchPrediction();
  }, []);

  // ==========================================
  // LOAD DOCTORS
  // ==========================================

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const data = await getAllDoctors();
        setDoctors(data.doctors || []);
      } catch (err) {
        console.error("Failed to load doctors:", err);
      } finally {
        setDoctorsLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  // ==========================================
  // DISEASE → DOCTOR MATCHING
  // ==========================================

  function getSpecializationForPrediction(pred) {
    if (!pred) return null;

    const text = (
      pred.disease_type ||
      pred.prediction_result ||
      ""
    ).toLowerCase();

    if (text.includes("heart")) return "Cardiology";
    if (text.includes("diabetes")) return "Endocrinology";
    if (text.includes("kidney")) return "Nephrology";

    return null;
  }

  function findMatchedDoctor(pred, doctorsList) {
    const specialization = getSpecializationForPrediction(pred);

    const availableDoctors = doctorsList.filter(
      (d) => d.availability_status === "AVAILABLE",
    );

    if (specialization) {
      const specialist = availableDoctors.find(
        (d) => d.specialization === specialization,
      );
      if (specialist) return specialist;
    }

    return (
      availableDoctors.find((d) => d.specialization === "General Medicine") ||
      null
    );
  }

  const realMatchedDoctor = findMatchedDoctor(prediction, doctors);

  // Risk level shown on the AI card
  const riskPercent = prediction ? Number(prediction.risk_percentage) : 0;
  const riskLabel =
    riskPercent >= 70 ? "HIGH" : riskPercent >= 40 ? "MEDIUM" : "LOW";
  const riskClass =
    riskPercent >= 70
      ? "badge-high"
      : riskPercent >= 40
        ? "badge-medium"
        : "badge-low";

  // Vitals tiles
  const vitalTiles = vitals
    ? [
        { label: "BMI", value: Number(vitals.bmi), unit: "" },
        {
          label: "Blood Pressure",
          value: `${Number(vitals.blood_pressure_systolic)}/${Number(
            vitals.blood_pressure_diastolic,
          )}`,
          unit: "mmHg",
        },
        {
          label: "Glucose",
          value: Number(vitals.blood_glucose),
          unit: "mg/dL",
        },
      ]
    : [];

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");
    const hour = Number(hours);

    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    return `${String(formattedHour).padStart(2, "0")}:${minutes} ${period}`;
  };

  // ==========================================
  // BOOKING FORM
  // ==========================================

  const handleBookingChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBookingMessage("");

    if (!bookingForm.date || !bookingForm.time) {
      setError("Please select both a date and a time.");
      return;
    }

    if (!realMatchedDoctor) {
      setError("No matched doctor available to book with.");
      return;
    }

    try {
      setBookingLoading(true);

      const appointmentCode = `APT-${Date.now()}`;

      await createAppointment({
        appointment_code: appointmentCode,
        patient_id: patient.id,
        doctor_id: realMatchedDoctor.id,
        appointment_date: bookingForm.date,
        appointment_time: bookingForm.time,
        reason: "AI-recommended doctor appointment",
      });

      // Reload from the server so the list always matches the database
      await loadAppointments(patient.id);

      setShowBookingForm(false);
      setBookingForm({ date: "", time: "" });
      setBookingMessage(`Appointment booked with ${realMatchedDoctor.name}.`);
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setError(err.message || "Failed to book appointment.");
    } finally {
      setBookingLoading(false);
    }
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="page-eyebrow">Patient</div>

          <h1 className="page-title">Loading...</h1>

          <p className="page-subtitle">Loading your patient profile.</p>
        </div>

        <div className="card">
          <p style={{ color: "var(--color-ink-soft)" }}>Please wait...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE ERROR
  // ==========================================

  if (profileError) {
    return (
      <div>
        <div className="page-header">
          <div className="page-eyebrow">Patient</div>

          <h1 className="page-title">Unable to load profile</h1>

          <p className="page-subtitle">
            We could not load your patient information.
          </p>
        </div>

        <div className="card">
          <p className="auth-error">{profileError}</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NO PATIENT DATA
  // ==========================================

  if (!patient) {
    return (
      <div>
        <div className="page-header">
          <div className="page-eyebrow">Patient</div>

          <h1 className="page-title">Patient profile not found</h1>

          <p className="page-subtitle">
            No patient profile is associated with your account.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PATIENT DASHBOARD
  // ==========================================

  return (
    <div>
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="page-header">
        <div className="page-eyebrow">Patient</div>

        <h1 className="page-title">Welcome, {patient.name.split(" ")[0]}</h1>

        <p className="page-subtitle">
          Here's an overview of your health profile and upcoming appointments.
        </p>
      </div>

      {/* ==========================================
          AI PREDICTION + MATCHED DOCTOR
      ========================================== */}

      <div className="grid grid-2 dash-block">
        {/* AI Prediction card */}

        <div className="card">
          <h3 className="card-title">AI Health Assessment</h3>

          {predictionLoading ? (
            <p className="empty-note">Loading AI assessment...</p>
          ) : predictionError ? (
            <p className="auth-error">{predictionError}</p>
          ) : !prediction ? (
            <p className="empty-note">
              No AI assessment yet. Submit your health profile to get one.
            </p>
          ) : (
            <>
              <div className="risk-row">
                <span className={`badge ${riskClass}`}>{riskLabel} RISK</span>

                <span className="risk-score">{riskPercent}% risk score</span>
              </div>

              <p className="condition-line">
                Predicted condition:{" "}
                <strong>{prediction.prediction_result}</strong>
              </p>

              <p className="small-note">
                Based on your submitted vitals and symptoms.
              </p>
            </>
          )}
        </div>

        {/* Matched doctor card */}

        <div className="card">
          <h3 className="card-title">Matched Doctor</h3>

          {doctorsLoading || predictionLoading ? (
            <p className="empty-note">Finding your matched doctor...</p>
          ) : !realMatchedDoctor ? (
            <p className="empty-note">No available doctor found right now.</p>
          ) : (
            <>
              <p className="doctor-name">{realMatchedDoctor.name}</p>

              <p className="doctor-meta">
                {realMatchedDoctor.specialization} ·{" "}
                {realMatchedDoctor.experience_years} years experience
              </p>

              <div className="doctor-actions">
                <span className="badge badge-low">Available</span>

                {!showBookingForm && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setBookingMessage("");
                      setShowBookingForm(true);
                    }}
                  >
                    Book Appointment
                  </button>
                )}
              </div>

              {bookingMessage && !showBookingForm && (
                <p className="success-note">{bookingMessage}</p>
              )}
            </>
          )}

          {showBookingForm && (
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="grid grid-2">
                <div className="form-row">
                  <label htmlFor="date">Date</label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={bookingForm.date}
                    onChange={handleBookingChange}
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="time">Time</label>

                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={bookingForm.time}
                    onChange={handleBookingChange}
                  />
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}

              <div className="booking-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  disabled={bookingLoading}
                  onClick={() => {
                    setShowBookingForm(false);
                    setError("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ==========================================
          HEALTH VITALS
      ========================================== */}

      <div className="card dash-block">
        <h3 className="card-title">Health Vitals</h3>

        {vitalsLoading ? (
          <p className="empty-note">Loading vitals...</p>
        ) : vitalsError ? (
          <p className="auth-error">{vitalsError}</p>
        ) : !vitals ? (
          <p className="empty-note">No vitals submitted yet.</p>
        ) : (
          <div className="vitals-grid">
            {vitalTiles.map((tile) => (
              <div key={tile.label} className="vital-tile">
                <p className="vital-label">{tile.label}</p>

                <p className="vital-value">
                  {tile.value}
                  {tile.unit && <span className="vital-unit">{tile.unit}</span>}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==========================================
          APPOINTMENTS
      ========================================== */}

      <div className="card">
        <h3 className="card-title">Appointments</h3>

        {appointments.length === 0 ? (
          <p className="empty-note">
            No appointments yet. Book one with your matched doctor.
          </p>
        ) : (
          <div className="table-scroll">
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

                    <td>{formatTime(appt.time)}</td>

                    <td>
                      <span className={`badge ${statusClass(appt.status)}`}>
                        {statusLabel(appt.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==========================================
          LOCAL STYLES
      ========================================== */}

      <style>{`
        .dash-block {
          margin-bottom: 20px;
        }

        .card-title {
          margin-bottom: 14px;
          font-size: 17px;
        }

        .empty-note {
          margin: 0;
          font-size: 14px;
          color: var(--color-ink-soft);
        }

        .small-note {
          margin: 0;
          font-size: 13px;
          color: var(--color-ink-soft);
        }

        .success-note {
          margin: 14px 0 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-success);
        }

        .risk-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 10px;
        }

        .risk-score {
          font-size: 14px;
          color: var(--color-ink-soft);
        }

        .condition-line {
          margin: 0 0 4px;
          font-size: 15px;
        }

        .doctor-name {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 700;
        }

        .doctor-meta {
          margin: 0 0 14px;
          font-size: 14px;
          color: var(--color-ink-soft);
        }

        .doctor-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .booking-form {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--color-line);
        }

        .booking-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .booking-actions .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .vitals-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .vital-tile {
          background: var(--color-bg);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
        }

        .vital-label {
          margin: 0 0 4px;
          font-size: 12px;
          color: var(--color-ink-soft);
        }

        .vital-value {
          margin: 0;
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
        }

        .vital-unit {
          margin-left: 4px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          color: var(--color-ink-soft);
        }

        @media (max-width: 600px) {
          .vitals-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
