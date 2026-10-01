const db = require("../config/db");

const {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../models/appointmentModel");

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get appointments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

// Get appointment by ID
const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await getAppointmentById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Get appointment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch appointment",
      error: error.message,
    });
  }
};

// Get appointments by patient
// Get appointments by patient
const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Patients can only view their own appointments
    if (req.user.role === "PATIENT") {
      const [rows] = await db.execute(
        `
        SELECT id
        FROM patients
        WHERE user_id = ?
        LIMIT 1
        `,
        [req.user.id],
      );

      if (rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Patient profile not found",
        });
      }

      const loggedInPatientId = rows[0].id;

      if (Number(patientId) !== Number(loggedInPatientId)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    const appointments = await getAppointmentsByPatientId(patientId);

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get patient appointments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient appointments",
      error: error.message,
    });
  }
};

// Get appointments by doctor
const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await getAppointmentsByDoctorId(doctorId);

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Get doctor appointments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor appointments",
      error: error.message,
    });
  }
};

// Create appointment
const addAppointment = async (req, res) => {
  try {
    const {
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
      status,
      appointment_type,
      notes,
    } = req.body;

    // Required fields
    if (
      !appointment_code ||
      !patient_id ||
      !doctor_id ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        success: false,
        message:
          "appointment_code, patient_id, doctor_id, appointment_date and appointment_time are required",
      });
    }

    // Validate status
    const allowedStatuses = [
      "SCHEDULED",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
      "NO_SHOW",
    ];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Use SCHEDULED, CONFIRMED, COMPLETED, CANCELLED or NO_SHOW",
      });
    }

    // Validate appointment type
    const allowedTypes = ["IN_PERSON", "ONLINE"];

    if (appointment_type && !allowedTypes.includes(appointment_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment_type. Use IN_PERSON or ONLINE",
      });
    }

    const appointmentId = await createAppointment({
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
      status,
      appointment_type,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: {
        id: appointmentId,
        appointment_code,
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        reason: reason || null,
        status: status || "SCHEDULED",
        appointment_type: appointment_type || "IN_PERSON",
        notes: notes || null,
      },
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Appointment code already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id or doctor_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

// Update appointment
const editAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
      status,
      appointment_type,
      notes,
    } = req.body;

    if (
      !appointment_code ||
      !patient_id ||
      !doctor_id ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        success: false,
        message:
          "appointment_code, patient_id, doctor_id, appointment_date and appointment_time are required",
      });
    }

    const allowedStatuses = [
      "SCHEDULED",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
      "NO_SHOW",
    ];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status. Use SCHEDULED, CONFIRMED, COMPLETED, CANCELLED or NO_SHOW",
      });
    }

    const allowedTypes = ["IN_PERSON", "ONLINE"];

    if (appointment_type && !allowedTypes.includes(appointment_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment_type. Use IN_PERSON or ONLINE",
      });
    }

    const affectedRows = await updateAppointment(id, {
      appointment_code,
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      reason,
      status,
      appointment_type,
      notes,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
    });
  } catch (error) {
    console.error("Update appointment error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Appointment code already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id or doctor_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};

// Delete appointment
const removeAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteAppointment(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Delete appointment error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  addAppointment,
  editAppointment,
  removeAppointment,
};
