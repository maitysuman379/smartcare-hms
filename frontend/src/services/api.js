const API_BASE_URL = "https://smartcare-hms-backend.vercel.app/api";

// ==================================================
// GENERIC REQUEST HELPER
// ==================================================

async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

// ==================================================
// PATIENT / DOCTOR AUTHENTICATION
// ==================================================

export function sendOtp({ email }) {
  return request("/auth/send-otp", {
    method: "POST",
    body: { email },
  });
}

export function registerUser({ username, email, password, role, otp }) {
  return request("/auth/register", {
    method: "POST",
    body: { username, email, password, role, otp },
  });
}

export function loginUser({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

// ==================================================
// PATIENT / DOCTOR SESSION STORAGE
// ==================================================

const TOKEN_KEY = "smartcare_token";
const USER_KEY = "smartcare_user";

export function saveAuth({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);

  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// ==================================================
// ADMIN AUTHENTICATION
// Uses the existing POST /auth/login endpoint.
// ==================================================

const ADMIN_TOKEN_KEY = "smartcare_admin_token";
const ADMIN_USER_KEY = "smartcare_admin_user";

export async function loginAdmin({ email, password }) {
  const response = await request("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  // Only accept an ADMIN account in the admin portal.
  if (response.user?.role !== "ADMIN" || !response.token) {
    throw new Error("This account does not have admin access.");
  }

  return response;
}

export function saveAdminAuth({ token, user }) {
  if (!token || user?.role !== "ADMIN") {
    throw new Error("Cannot save an invalid admin session.");
  }

  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getCurrentAdmin() {
  const raw = localStorage.getItem(ADMIN_USER_KEY);

  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

// Use the admin token for admin-only API requests.
function getRequiredAdminToken() {
  const admin = getCurrentAdmin();
  const token = getAdminToken();

  if (!token || admin?.role !== "ADMIN") {
    throw new Error("Please sign in with an admin account.");
  }

  return token;
}

// ==================================================
// PATIENT APIs
// ==================================================

export function getMyPatient() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request("/patients/me", {
    method: "GET",
    token,
  });
}

// ==================================================
// AI / VITALS APIs
// ==================================================

export function getMyLatestVitals() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request("/ai/vitals/me", {
    method: "GET",
    token,
  });
}

export function getMyPredictions() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request("/ai/my-predictions", {
    method: "GET",
    token,
  });
}

// ==================================================
// DOCTOR APIs
// ==================================================

export function getAllDoctors() {
  const token = getToken();

  return request("/doctors", {
    method: "GET",
    token,
  });
}

// ==================================================
// APPOINTMENT APIs
// ==================================================

export function createAppointment({
  appointment_code,
  patient_id,
  doctor_id,
  appointment_date,
  appointment_time,
  reason,
}) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request("/appointments", {
    method: "POST",
    token,
    body: {
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
    },
  });
}

export function getPatientAppointments(patientId) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request(`/appointments/patient/${patientId}`, {
    method: "GET",
    token,
  });
}

// ==================================================
// PROFILE APIs
// ==================================================

export function getMyProfile() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request("/users/profile", {
    method: "GET",
    token,
  });
}

export function updateMyProfile(profileData) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request("/users/profile", {
    method: "PUT",
    token,
    body: profileData,
  });
}

// ==================================================
// REVIEW APIs
// ==================================================

export function getPublicReviews() {
  return request("/reviews", {
    method: "GET",
  });
}

export function submitReview({ rating, review }) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found.");
  }

  return request("/reviews", {
    method: "POST",
    token,
    body: { rating, review },
  });
}

// Admin review management
export function getAdminReviews() {
  return request("/reviews/admin", {
    method: "GET",
    token: getRequiredAdminToken(),
  });
}

export function updateReviewStatus(reviewId, status) {
  return request(`/reviews/admin/${reviewId}/status`, {
    method: "PATCH",
    token: getRequiredAdminToken(),
    body: { status },
  });
}

export function deleteReview(reviewId) {
  return request(`/reviews/admin/${reviewId}`, {
    method: "DELETE",
    token: getRequiredAdminToken(),
  });
}

/* ==================================================
   ADMIN DOCTOR APPLICATION APIs
================================================== */

export function getDoctorRequests() {
  return request("/admin/doctor-requests", {
    method: "GET",
    token: getRequiredAdminToken(),
  });
}

export function getDoctorRequestById(applicationId) {
  return request(`/admin/doctor-requests/${applicationId}`, {
    method: "GET",
    token: getRequiredAdminToken(),
  });
}

export function reviewDoctorRequest(applicationId) {
  return request(`/admin/doctor-requests/${applicationId}/review`, {
    method: "PATCH",
    token: getRequiredAdminToken(),
  });
}

export function approveDoctorRequest(applicationId) {
  return request(`/admin/doctor-requests/${applicationId}/approve`, {
    method: "PATCH",
    token: getRequiredAdminToken(),
    body: { documentsVerified: true },
  });
}

export function rejectDoctorRequest(applicationId, reason) {
  return request(`/admin/doctor-requests/${applicationId}/reject`, {
    method: "PATCH",
    token: getRequiredAdminToken(),
    body: { reason },
  });
}
