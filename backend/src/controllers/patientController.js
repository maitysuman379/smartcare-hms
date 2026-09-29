const {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
} = require("../models/patientModel");

// Get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await getAllPatients();

    res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    console.error("Get patients error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
};

// Get patient by ID
const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await getPatientById(id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    console.error("Get patient error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
};

// Create patient
const addPatient = async (req, res) => {
  try {
    const {
      user_id,
      patient_code,
      name,
      email,
      phone,
      date_of_birth,
      gender,
      blood_group,
      address,
      emergency_contact_name,
      emergency_contact_phone,
      height_cm,
      weight_kg,
    } = req.body;

    // Required fields
    if (!patient_code || !name) {
      return res.status(400).json({
        success: false,
        message: "patient_code and name are required",
      });
    }

    // Validate gender
    const allowedGenders = ["MALE", "FEMALE", "OTHER"];

    if (gender && !allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender. Use MALE, FEMALE or OTHER",
      });
    }

    const patientId = await createPatient({
      user_id,
      patient_code,
      name,
      email,
      phone,
      date_of_birth,
      gender,
      blood_group,
      address,
      emergency_contact_name,
      emergency_contact_phone,
      height_cm,
      weight_kg,
    });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      patient: {
        id: patientId,
        user_id: user_id || null,
        patient_code,
        name,
        email: email || null,
        phone: phone || null,
        date_of_birth: date_of_birth || null,
        gender: gender || null,
        blood_group: blood_group || null,
        address: address || null,
        emergency_contact_name: emergency_contact_name || null,
        emergency_contact_phone: emergency_contact_phone || null,
        height_cm: height_cm ?? null,
        weight_kg: weight_kg ?? null,
      },
    });
  } catch (error) {
    console.error("Create patient error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Patient code, email or user_id already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid user_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create patient",
      error: error.message,
    });
  }
};

// Update patient
const editPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      patient_code,
      name,
      email,
      phone,
      date_of_birth,
      gender,
      blood_group,
      address,
      emergency_contact_name,
      emergency_contact_phone,
      height_cm,
      weight_kg,
    } = req.body;

    if (!patient_code || !name) {
      return res.status(400).json({
        success: false,
        message: "patient_code and name are required",
      });
    }

    // Validate gender
    const allowedGenders = ["MALE", "FEMALE", "OTHER"];

    if (gender && !allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gender. Use MALE, FEMALE or OTHER",
      });
    }

    const affectedRows = await updatePatient(id, {
      patient_code,
      name,
      email,
      phone,
      date_of_birth,
      gender,
      blood_group,
      address,
      emergency_contact_name,
      emergency_contact_phone,
      height_cm,
      weight_kg,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
    });
  } catch (error) {
    console.error("Update patient error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Patient code or email already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid user_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update patient",
      error: error.message,
    });
  }
};

module.exports = {
  getPatients,
  getPatient,
  addPatient,
  editPatient,
};
