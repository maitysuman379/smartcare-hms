const {
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordsByPatientId,
  getMedicalRecordsByDoctorId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../models/medicalRecordModel");

// Get all medical records
const getMedicalRecords = async (req, res) => {
  try {
    const records = await getAllMedicalRecords();

    res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    console.error("Get medical records error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medical records",
      error: error.message,
    });
  }
};

// Get medical record by ID
const getMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await getMedicalRecordById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    res.status(200).json({
      success: true,
      record,
    });
  } catch (error) {
    console.error("Get medical record error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medical record",
      error: error.message,
    });
  }
};

// Get medical records by patient
const getPatientMedicalRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await getMedicalRecordsByPatientId(patientId);

    res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    console.error("Get patient medical records error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient medical records",
      error: error.message,
    });
  }
};

// Get medical records by doctor
const getDoctorMedicalRecords = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const records = await getMedicalRecordsByDoctorId(doctorId);

    res.status(200).json({
      success: true,
      records,
    });
  } catch (error) {
    console.error("Get doctor medical records error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor medical records",
      error: error.message,
    });
  }
};

// Create medical record
const addMedicalRecord = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      appointment_id,
      diagnosis,
      symptoms,
      treatment,
      medical_notes,
    } = req.body;

    // Required fields
    if (!patient_id || !doctor_id) {
      return res.status(400).json({
        success: false,
        message: "patient_id and doctor_id are required",
      });
    }

    const recordId = await createMedicalRecord({
      patient_id,
      doctor_id,
      appointment_id,
      diagnosis,
      symptoms,
      treatment,
      medical_notes,
    });

    res.status(201).json({
      success: true,
      message: "Medical record created successfully",
      record: {
        id: recordId,
        patient_id,
        doctor_id,
        appointment_id: appointment_id || null,
        diagnosis: diagnosis || null,
        symptoms: symptoms || null,
        treatment: treatment || null,
        medical_notes: medical_notes || null,
      },
    });
  } catch (error) {
    console.error("Create medical record error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id, doctor_id or appointment_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create medical record",
      error: error.message,
    });
  }
};

// Update medical record
const editMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      patient_id,
      doctor_id,
      appointment_id,
      diagnosis,
      symptoms,
      treatment,
      medical_notes,
    } = req.body;

    // Required fields
    if (!patient_id || !doctor_id) {
      return res.status(400).json({
        success: false,
        message: "patient_id and doctor_id are required",
      });
    }

    const affectedRows = await updateMedicalRecord(id, {
      patient_id,
      doctor_id,
      appointment_id,
      diagnosis,
      symptoms,
      treatment,
      medical_notes,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medical record updated successfully",
    });
  } catch (error) {
    console.error("Update medical record error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id, doctor_id or appointment_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update medical record",
      error: error.message,
    });
  }
};

// Delete medical record
const removeMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteMedicalRecord(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medical record deleted successfully",
    });
  } catch (error) {
    console.error("Delete medical record error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete medical record",
      error: error.message,
    });
  }
};

module.exports = {
  getMedicalRecords,
  getMedicalRecord,
  getPatientMedicalRecords,
  getDoctorMedicalRecords,
  addMedicalRecord,
  editMedicalRecord,
  removeMedicalRecord,
};
