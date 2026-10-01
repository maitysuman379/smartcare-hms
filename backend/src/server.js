require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorScheduleRoutes = require("./routes/doctorScheduleRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const prescriptionItemRoutes = require("./routes/prescriptionItemRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const labTestRoutes = require("./routes/labTestRoutes");
const labOrderRoutes = require("./routes/labOrderRoutes");
const labReportRoutes = require("./routes/labReportRoutes");
const billRoutes = require("./routes/billRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const aiPatientVitalsRoutes = require("./routes/aiPatientVitalsRoutes");

const app = express();

// ========================================
// Middleware
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// Basic Health Check
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SmartCare HMS API is running",
  });
});

// ========================================
// Database Health Check
// ========================================

app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS status");

    res.status(200).json({
      success: true,
      message: "Backend and MySQL are connected",
      database: rows[0].status === 1,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// ========================================
// Authentication Routes
// ========================================

app.use("/api/auth", authRoutes);

// ========================================
// User Routes
// ========================================

app.use("/api/users", userRoutes);

// ========================================
// Department Routes
// ========================================

app.use("/api/departments", departmentRoutes);

// ========================================
// Doctor Routes
// ========================================

app.use("/api/doctors", doctorRoutes);

// ========================================
// patients Routes
// ========================================

app.use("/api/patients", patientRoutes);

// ========================================
// doctor-schedules Routes
// ========================================

app.use("/api/doctor-schedules", doctorScheduleRoutes);

// ========================================
// appointments Routes
// ========================================

app.use("/api/appointments", appointmentRoutes);

// ========================================
// medical-records Routes
// ========================================

app.use("/api/medical-records", medicalRecordRoutes);

// ========================================
// prescriptions Routes
// ========================================

app.use("/api/prescriptions", prescriptionRoutes);

// ========================================
// prescription-items Routes
// ========================================

app.use("/api/prescription-items", prescriptionItemRoutes);

// ========================================
// medicines Routes
// ========================================

app.use("/api/medicines", medicineRoutes);

// ========================================
// lab-tests Routes
// ========================================

app.use("/api/lab-tests", labTestRoutes);

// ========================================
// lab-orders Routes
// ========================================

app.use("/api/lab-orders", labOrderRoutes);

// ========================================
// lab-reports Routes
// ========================================

app.use("/api/lab-reports", labReportRoutes);

// ========================================
// bills Routes
// ========================================

app.use("/api/bills", billRoutes);

// ========================================
// notifications Routes
// ========================================

app.use("/api/notifications", notificationRoutes);

// ========================================
// AI Routes
// ========================================

app.use("/api/ai", aiRoutes);

// ========================================
// AI/vitals Routes
// ========================================

app.use("/api/ai/vitals", aiPatientVitalsRoutes);

// ========================================
// 404 - Route Not Found
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ========================================
// Global Error Handler
// ========================================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ========================================
// Start Server
// ========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
