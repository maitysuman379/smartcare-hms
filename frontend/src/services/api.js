const API_BASE_URL = "https://smartcare-hms-backend.vercel.app/api";

// Generic request helper — handles JSON, errors, and auth headers
async function request(endpoint, { method = "GET", body, token } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// ---- Auth ----
export function registerUser({ username, email, password, role }) {
  return request("/auth/register", {
    method: "POST",
    body: { username, email, password, role },
  });
}

export function loginUser({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: { email, password },
  });
}

// ---- Auth storage (localStorage) ----
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
  return raw ? JSON.parse(raw) : null;
}

// ---- Patient ----
export function getMyPatient() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request("/patients/me", {
    method: "GET",
    token,
  });
}

// ---- AI / Vitals ----
export function getMyLatestVitals() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request("/ai/vitals/me", {
    method: "GET",
    token,
  });
}

export function getMyPredictions() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request("/ai/my-predictions", {
    method: "GET",
    token,
  });
}

// ---- Doctors ----
export function getAllDoctors() {
  const token = getToken();

  return request("/doctors", {
    method: "GET",
    token,
  });
}

// ---- Appointments ----
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
    throw new Error("Authentication token not found");
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
    throw new Error("Authentication token not found");
  }

  return request(`/appointments/patient/${patientId}`, {
    method: "GET",
    token,
  });
}

export function getMyProfile() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request("/users/profile", {
    method: "GET",
    token,
  });
}

export function updateMyProfile(profileData) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request("/users/profile", {
    method: "PUT",
    token,
    body: profileData,
  });
}

// ---- Reviews ----

// Get publicly approved reviews
export function getPublicReviews() {
  return request("/reviews", {
    method: "GET",
  });
}

// Submit a review - PATIENT / DOCTOR
export function submitReview({ rating, review }) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request("/reviews", {
    method: "POST",
    token,
    body: {
      rating,
      review,
    },
  });
}

// Get all reviews - ADMIN
export function getAdminReviews() {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request("/reviews/admin", {
    method: "GET",
    token,
  });
}

// Approve / reject review - ADMIN
export function updateReviewStatus(reviewId, status) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request(`/reviews/admin/${reviewId}/status`, {
    method: "PATCH",
    token,
    body: {
      status,
    },
  });
}

// Delete review - ADMIN
export function deleteReview(reviewId) {
  const token = getToken();

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return request(`/reviews/admin/${reviewId}`, {
    method: "DELETE",
    token,
  });
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
