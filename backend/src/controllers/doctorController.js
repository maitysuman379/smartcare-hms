const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
} = require("../models/doctorModel");

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Get doctors error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

// Get doctor by ID
const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await getDoctorById(id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("Get doctor error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};

// Create doctor
const addDoctor = async (req, res) => {
  try {
    const {
      user_id,
      name,
      email,
      phone,
      specialization,
      qualification,
      experience_years,
      license_number,
      department_id,
      consultation_fee,
      availability_status,
      profile_image,
    } = req.body;

    // Required fields
    if (!user_id || !name || !email || !specialization) {
      return res.status(400).json({
        success: false,
        message: "user_id, name, email and specialization are required",
      });
    }

    // Validate availability status
    const allowedStatuses = ["AVAILABLE", "UNAVAILABLE"];

    if (availability_status && !allowedStatuses.includes(availability_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability_status. Use AVAILABLE or UNAVAILABLE",
      });
    }

    const doctorId = await createDoctor({
      user_id,
      name,
      email,
      phone,
      specialization,
      qualification,
      experience_years,
      license_number,
      department_id,
      consultation_fee,
      availability_status,
      profile_image,
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      doctor: {
        id: doctorId,
        user_id,
        name,
        email,
        phone: phone || null,
        specialization,
        qualification: qualification || null,
        experience_years: experience_years ?? 0,
        license_number: license_number || null,
        department_id: department_id || null,
        consultation_fee: consultation_fee ?? 0.0,
        availability_status: availability_status || "AVAILABLE",
        profile_image: profile_image || null,
      },
    });
  } catch (error) {
    console.error("Create doctor error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message:
          "Doctor with the provided user_id, email or license_number already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid user_id or department_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

// Update doctor
const editDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      specialization,
      qualification,
      experience_years,
      license_number,
      department_id,
      consultation_fee,
      availability_status,
      profile_image,
    } = req.body;

    if (!name || !email || !specialization) {
      return res.status(400).json({
        success: false,
        message: "name, email and specialization are required",
      });
    }

    const allowedStatuses = ["AVAILABLE", "UNAVAILABLE"];

    if (availability_status && !allowedStatuses.includes(availability_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid availability_status. Use AVAILABLE or UNAVAILABLE",
      });
    }

    const affectedRows = await updateDoctor(id, {
      name,
      email,
      phone,
      specialization,
      qualification,
      experience_years,
      license_number,
      department_id,
      consultation_fee,
      availability_status,
      profile_image,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
    });
  } catch (error) {
    console.error("Update doctor error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Doctor email or license_number already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid department_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update doctor",
      error: error.message,
    });
  }
};

module.exports = {
  getDoctors,
  getDoctor,
  addDoctor,
  editDoctor,
};
