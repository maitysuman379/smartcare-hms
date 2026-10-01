import { useEffect, useState } from "react";

import {
  getMyPatient,
  getMyLatestVitals,
  getMyPredictions,
  getAllDoctors,
  createAppointment,
  getPatientAppointments,
} from "../services/api.js";

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

  useEffect(() => {
    async function fetchAppointments() {
      if (!patient?.id) return;

      try {
        const data = await getPatientAppointments(patient.id);

        const formattedAppointments = (data.appointments || []).map((appt) => ({
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

        setAppointments(formattedAppointments);
      } catch (err) {
        console.error("Failed to load appointments:", err);
      }
    }

    fetchAppointments();
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

    if (!bookingForm.date || !bookingForm.time) {
      setError("Please select both a date and a time.");
      return;
    }

    if (!realMatchedDoctor) {
      setError("No matched doctor available to book with.");
      return;
    }

    try {
      const appointmentCode = `APT-${Date.now()}`;

      await createAppointment({
        appointment_code: appointmentCode,
        patient_id: patient.id,
        doctor_id: realMatchedDoctor.id,
        appointment_date: bookingForm.date,
        appointment_time: bookingForm.time,
        reason: "AI-recommended doctor appointment",
      });

      const newAppointment = {
        id: appointmentCode,
        doctor: realMatchedDoctor.name,
        specialization: realMatchedDoctor.specialization,
        date: bookingForm.date,
        time: bookingForm.time,
        status: "Pending",
      };

      setAppointments((prev) => [newAppointment, ...prev]);

      setShowBookingForm(false);

      setBookingForm({
        date: "",
        time: "",
      });
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setError(err.message || "Failed to book appointment.");
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

      <div className="grid grid-2" style={{ marginBottom: 20 }}>
        {/* AI Prediction card */}

        <div className="card">
          <h3 style={{ marginBottom: 12 }}>AI Health Assessment</h3>

          {predictionLoading ? (
            <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
              Loading AI assessment...
            </p>
          ) : predictionError ? (
            <p className="auth-error">{predictionError}</p>
          ) : !prediction ? (
            <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
              No AI assessment yet. Submit your health profile to get one.
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span
                  className={`badge ${
                    Number(prediction.risk_percentage) >= 70
                      ? "badge-high"
                      : Number(prediction.risk_percentage) >= 40
                        ? "badge-medium"
                        : "badge-low"
                  }`}
                >
                  {Number(prediction.risk_percentage) >= 70
                    ? "HIGH"
                    : Number(prediction.risk_percentage) >= 40
                      ? "MEDIUM"
                      : "LOW"}{" "}
                  RISK
                </span>

                <span style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>
                  {Number(prediction.risk_percentage)}% risk score
                </span>
              </div>

              <p style={{ fontSize: 15, marginBottom: 4 }}>
                Predicted condition:{" "}
                <strong>{prediction.prediction_result}</strong>
              </p>

              <p style={{ fontSize: 13, color: "var(--color-ink-soft)" }}>
                Based on your submitted vitals and symptoms.
              </p>
            </>
          )}
        </div>

        {/* Matched doctor card */}

        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Matched Doctor</h3>

          {doctorsLoading || predictionLoading ? (
            <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
              Finding your matched doctor...
            </p>
          ) : !realMatchedDoctor ? (
            <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
              No available doctor found right now.
            </p>
          ) : (
            <>
              <p style={{ fontSize: 15, marginBottom: 4 }}>
                <strong>{realMatchedDoctor.name}</strong>
              </p>

              <p
                style={{
                  fontSize: 14,
                  color: "var(--color-ink-soft)",
                  marginBottom: 14,
                }}
              >
                {realMatchedDoctor.specialization} ·{" "}
                {realMatchedDoctor.experience_years} years experience
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="badge badge-low">Available</span>

                {!showBookingForm && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowBookingForm(true)}
                  >
                    Book Appointment
                  </button>
                )}
              </div>
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

              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
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

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 16 }}>Health Vitals</h3>

        {vitalsLoading ? (
          <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
            Loading vitals...
          </p>
        ) : vitalsError ? (
          <p className="auth-error">{vitalsError}</p>
        ) : !vitals ? (
          <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
            No vitals submitted yet.
          </p>
        ) : (
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
              <p style={{ fontSize: 20, fontWeight: 700 }}>
                {Number(vitals.bmi)}
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
                Blood Pressure
              </p>
              <p style={{ fontSize: 20, fontWeight: 700 }}>
                {Number(vitals.blood_pressure_systolic)}/
                {Number(vitals.blood_pressure_diastolic)}
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
                {Number(vitals.blood_glucose)} mg/dL
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ==========================================
          APPOINTMENTS
      ========================================== */}

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

                <td>{formatTime(appt.time)}</td>

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

      {/* ==========================================
          LOCAL STYLES
      ========================================== */}

      <style>{`
        .booking-form {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--color-line);
        }
      `}</style>
    </div>
  );
}
