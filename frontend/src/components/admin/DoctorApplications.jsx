import { useCallback, useEffect, useState } from "react";

import {
  getDoctorRequests,
  getDoctorRequestById,
  reviewDoctorRequest,
  approveDoctorRequest,
  rejectDoctorRequest,
} from "../../services/api.js";

export default function DoctorApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [selected, setSelected] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getDoctorRequests();
      setApplications(response.data ?? []);
    } catch (err) {
      setError(err.message || "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  async function viewApplication(id) {
    setActionError("");

    try {
      const response = await getDoctorRequestById(id);
      setSelected(response.data);
    } catch (err) {
      setActionError(err.message || "Could not load application.");
    }
  }

  async function markUnderReview(id) {
    setBusyId(id);
    setActionError("");

    try {
      await reviewDoctorRequest(id);
      await loadApplications();
      await viewApplication(id);
    } catch (err) {
      setActionError(err.message || "Review action failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function approveApplication(application) {
    const complete =
      application.full_name?.trim() &&
      application.phone?.trim() &&
      application.specialization?.trim() &&
      application.qualification?.trim() &&
      application.license_number?.trim();

    if (!complete) {
      setActionError(
        "Profile incomplete. Required fields must be completed before approval.",
      );
      return;
    }

    const confirmed = window.confirm(
      "Have you verified this doctor's documents and license?",
    );

    if (!confirmed) return;

    setBusyId(application.application_id);
    setActionError("");

    try {
      await approveDoctorRequest(application.application_id);
      setSelected(null);
      await loadApplications();
    } catch (err) {
      setActionError(err.message || "Approval failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function rejectApplication(application) {
    const reason = rejectionReason.trim();

    if (!reason) {
      setActionError("Please enter a rejection reason.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to reject this application?",
    );

    if (!confirmed) return;

    setBusyId(application.application_id);
    setActionError("");

    try {
      await rejectDoctorRequest(application.application_id, reason);
      setSelected(null);
      setRejectionReason("");
      await loadApplications();
    } catch (err) {
      setActionError(err.message || "Rejection failed.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="card" style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <h3>Doctor Applications</h3>
          <p style={{ color: "var(--color-ink-soft)", fontSize: 13 }}>
            Review and manage new doctor registrations.
          </p>
        </div>

        <button
          className="btn btn-outline"
          onClick={loadApplications}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {error && <p className="auth-error">{error}</p>}
      {actionError && <p className="auth-error">{actionError}</p>}

      {loading ? (
        <p>Loading doctor applications...</p>
      ) : applications.length === 0 ? (
        <p style={{ color: "var(--color-ink-soft)" }}>
          No pending doctor applications.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Email</th>
                <th>Application status</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.application_id}>
                  <td>{app.full_name || app.username || "Unnamed"}</td>
                  <td>{app.email}</td>
                  <td>
                    <span className="badge badge-medium">
                      {app.application_status}
                    </span>
                  </td>
                  <td>
                    {app.submitted_at
                      ? new Date(app.submitted_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline"
                      onClick={() => viewApplication(app.application_id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div
          style={{
            marginTop: 20,
            padding: 18,
            border: "1px solid var(--color-line)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <h3>Application Details</h3>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSelected(null);
                setActionError("");
              }}
            >
              Close
            </button>
          </div>

          <div className="grid grid-2" style={{ marginTop: 12 }}>
            <p>
              <strong>Name:</strong> {selected.full_name || "Not provided"}
            </p>
            <p>
              <strong>Email:</strong> {selected.email || "Not provided"}
            </p>
            <p>
              <strong>Phone:</strong> {selected.phone || "Not provided"}
            </p>
            <p>
              <strong>Specialization:</strong>{" "}
              {selected.specialization || "Not provided"}
            </p>
            <p>
              <strong>Qualification:</strong>{" "}
              {selected.qualification || "Not provided"}
            </p>
            <p>
              <strong>Experience:</strong> {selected.experience_years ?? 0}{" "}
              years
            </p>
            <p>
              <strong>License:</strong>{" "}
              {selected.license_number || "Not provided"}
            </p>
            <p>
              <strong>Department ID:</strong>{" "}
              {selected.department_id ?? "Not assigned"}
            </p>
            <p>
              <strong>Consultation fee:</strong> ₹
              {selected.consultation_fee ?? "0.00"}
            </p>
            <p>
              <strong>Address:</strong> {selected.address || "Not provided"}
            </p>
            <p>
              <strong>City:</strong> {selected.city || "Not provided"}
            </p>
            <p>
              <strong>State:</strong> {selected.state || "Not provided"}
            </p>
            <p>
              <strong>Pincode:</strong> {selected.pincode || "Not provided"}
            </p>
            <p>
              <strong>Status:</strong> {selected.application_status}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 16,
            }}
          >
            {["PENDING_DOCUMENTS", "UNDER_REVIEW"].includes(
              selected.application_status,
            ) && (
              <button
                className="btn btn-outline"
                disabled={busyId === selected.application_id}
                onClick={() => markUnderReview(selected.application_id)}
              >
                Mark Under Review
              </button>
            )}

            <button
              className="btn btn-primary"
              disabled={busyId === selected.application_id}
              onClick={() => approveApplication(selected)}
            >
              Approve
            </button>
          </div>

          <div style={{ marginTop: 16 }}>
            <label htmlFor="rejectionReason">Rejection reason</label>
            <textarea
              id="rejectionReason"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Explain why this application is being rejected"
              style={{ display: "block", width: "100%", marginTop: 8 }}
            />

            <button
              className="btn btn-outline"
              style={{ marginTop: 10 }}
              disabled={busyId === selected.application_id}
              onClick={() => rejectApplication(selected)}
            >
              Reject Application
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
