import { useState } from "react";
import { useNavigate } from "react-router-dom";

const symptomOptions = [
  "Fatigue",
  "Frequent urination",
  "Excessive thirst",
  "Chest pain",
  "Shortness of breath",
  "Swelling in legs/ankles",
  "Nausea",
  "Blurred vision",
];

export default function HealthProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    bpSys: "",
    bpDia: "",
    glucose: "",
    smoking: "no",
    familyHistory: "no",
    symptoms: [],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleSymptom = (symptom) => {
    setForm((prev) => {
      const has = prev.symptoms.includes(symptom);
      return {
        ...prev,
        symptoms: has
          ? prev.symptoms.filter((s) => s !== symptom)
          : [...prev.symptoms, symptom],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.age ||
      !form.height ||
      !form.weight ||
      !form.bpSys ||
      !form.bpDia ||
      !form.glucose
    ) {
      setError("Please fill in all vitals fields.");
      return;
    }

    // TODO: replace with a real call to the AI prediction API (Flask) once it exists.
    console.log("Health profile submitted:", form);
    navigate("/patient/dashboard");
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Patient</div>
        <h1 className="page-title">Health Profile</h1>
        <p className="page-subtitle">
          Fill in your vitals and symptoms — our AI model will predict your risk
          and match you with the right doctor.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic vitals */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 16 }}>Basic Vitals</h3>
          <div className="grid grid-3">
            <div className="form-row">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                placeholder="e.g. 34"
                value={form.age}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="height">Height (cm)</label>
              <input
                id="height"
                name="height"
                type="number"
                placeholder="e.g. 170"
                value={form.height}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                id="weight"
                name="weight"
                type="number"
                placeholder="e.g. 78"
                value={form.weight}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Clinical readings */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 16 }}>Clinical Readings</h3>
          <div className="grid grid-3">
            <div className="form-row">
              <label htmlFor="bpSys">BP — Systolic</label>
              <input
                id="bpSys"
                name="bpSys"
                type="number"
                placeholder="e.g. 130"
                value={form.bpSys}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="bpDia">BP — Diastolic</label>
              <input
                id="bpDia"
                name="bpDia"
                type="number"
                placeholder="e.g. 85"
                value={form.bpDia}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="glucose">Glucose (mg/dL)</label>
              <input
                id="glucose"
                name="glucose"
                type="number"
                placeholder="e.g. 110"
                value={form.glucose}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Habits & history */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 16 }}>Habits & Family History</h3>
          <div className="grid grid-2">
            <div className="form-row">
              <label htmlFor="smoking">Do you smoke?</label>
              <select
                id="smoking"
                name="smoking"
                value={form.smoking}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="familyHistory">
                Family history of chronic illness?
              </label>
              <select
                id="familyHistory"
                name="familyHistory"
                value={form.familyHistory}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ marginBottom: 6 }}>Symptoms</h3>
          <p
            style={{
              fontSize: 13,
              color: "var(--color-ink-soft)",
              marginBottom: 16,
            }}
          >
            Select any symptoms you're currently experiencing.
          </p>
          <div className="symptom-grid">
            {symptomOptions.map((symptom) => {
              const active = form.symptoms.includes(symptom);
              return (
                <button
                  type="button"
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={
                    active ? "symptom-chip symptom-chip-active" : "symptom-chip"
                  }
                >
                  {symptom}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="auth-error" style={{ marginBottom: 16 }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary">
          Submit & Get AI Assessment
        </button>
      </form>

      <style>{`
        .symptom-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .symptom-chip {
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid var(--color-line);
          background: white;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-ink-soft);
          cursor: pointer;
        }
        .symptom-chip:hover {
          border-color: var(--color-primary);
        }
        .symptom-chip-active {
          background: var(--color-primary-soft);
          border-color: var(--color-primary);
          color: var(--color-primary);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
