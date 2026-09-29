const {
  getAllPrescriptions,
  getPrescriptionById,
  getPrescriptionsByPatientId,
  getPrescriptionsByDoctorId,
  createPrescription,
  updatePrescription,
  deletePrescription,
} = require("../models/prescriptionModel");

// Get all prescriptions
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await getAllPrescriptions();

    res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.error("Get prescriptions error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prescriptions",
      error: error.message,
    });
  }
};

// Get prescription by ID
const getPrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const prescription = await getPrescriptionById(id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      success: true,
      prescription,
    });
  } catch (error) {
    console.error("Get prescription error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prescription",
      error: error.message,
    });
  }
};

// Get prescriptions by patient
const getPatientPrescriptions = async (req, res) => {
  try {
    const { patientId } = req.params;

    const prescriptions = await getPrescriptionsByPatientId(patientId);

    res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.error("Get patient prescriptions error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient prescriptions",
      error: error.message,
    });
  }
};

// Get prescriptions by doctor
const getDoctorPrescriptions = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const prescriptions = await getPrescriptionsByDoctorId(doctorId);

    res.status(200).json({
      success: true,
      prescriptions,
    });
  } catch (error) {
    console.error("Get doctor prescriptions error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor prescriptions",
      error: error.message,
    });
  }
};

// Create prescription
const addPrescription = async (req, res) => {
  try {
    const { patient_id, doctor_id, medical_record_id, instructions } = req.body;

    if (!patient_id || !doctor_id) {
      return res.status(400).json({
        success: false,
        message: "patient_id and doctor_id are required",
      });
    }

    const prescriptionId = await createPrescription({
      patient_id,
      doctor_id,
      medical_record_id,
      instructions,
    });

    const prescription = await getPrescriptionById(prescriptionId);

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      prescription,
    });
  } catch (error) {
    console.error("Create prescription error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient, doctor, or medical record ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create prescription",
      error: error.message,
    });
  }
};

// Update prescription
const editPrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const { patient_id, doctor_id, medical_record_id, instructions } = req.body;

    if (!patient_id || !doctor_id) {
      return res.status(400).json({
        success: false,
        message: "patient_id and doctor_id are required",
      });
    }

    const affectedRows = await updatePrescription(id, {
      patient_id,
      doctor_id,
      medical_record_id,
      instructions,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    const prescription = await getPrescriptionById(id);

    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      prescription,
    });
  } catch (error) {
    console.error("Update prescription error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient, doctor, or medical record ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update prescription",
      error: error.message,
    });
  }
};

// Delete prescription
const removePrescription = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deletePrescription(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    console.error("Delete prescription error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete prescription",
      error: error.message,
    });
  }
};

module.exports = {
  getPrescriptions,
  getPrescription,
  getPatientPrescriptions,
  getDoctorPrescriptions,
  addPrescription,
  editPrescription,
  removePrescription,
};
