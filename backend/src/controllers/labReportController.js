const {
  getAllLabReports,
  getLabReportById,
  getLabReportByOrderId,
  getLabReportsByPatientId,
  getLabReportsByDoctorId,
  createLabReport,
  updateLabReport,
  deleteLabReport,
} = require("../models/labReportModel");

// Get all lab reports
const getLabReports = async (req, res) => {
  try {
    const labReports = await getAllLabReports();

    res.status(200).json({
      success: true,
      labReports,
    });
  } catch (error) {
    console.error("Get lab reports error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lab reports",
      error: error.message,
    });
  }
};

// Get lab report by ID
const getLabReport = async (req, res) => {
  try {
    const { id } = req.params;

    const labReport = await getLabReportById(id);

    if (!labReport) {
      return res.status(404).json({
        success: false,
        message: "Lab report not found",
      });
    }

    res.status(200).json({
      success: true,
      labReport,
    });
  } catch (error) {
    console.error("Get lab report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lab report",
      error: error.message,
    });
  }
};

// Get lab report by lab order
const getLabReportByOrder = async (req, res) => {
  try {
    const { labOrderId } = req.params;

    const labReport = await getLabReportByOrderId(labOrderId);

    if (!labReport) {
      return res.status(404).json({
        success: false,
        message: "Lab report not found for this lab order",
      });
    }

    res.status(200).json({
      success: true,
      labReport,
    });
  } catch (error) {
    console.error("Get lab report by order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lab report",
      error: error.message,
    });
  }
};

// Get lab reports by patient
const getPatientLabReports = async (req, res) => {
  try {
    const { patientId } = req.params;

    const labReports = await getLabReportsByPatientId(patientId);

    res.status(200).json({
      success: true,
      labReports,
    });
  } catch (error) {
    console.error("Get patient lab reports error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient lab reports",
      error: error.message,
    });
  }
};

// Get lab reports by doctor
const getDoctorLabReports = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const labReports = await getLabReportsByDoctorId(doctorId);

    res.status(200).json({
      success: true,
      labReports,
    });
  } catch (error) {
    console.error("Get doctor lab reports error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor lab reports",
      error: error.message,
    });
  }
};

// Create lab report
const addLabReport = async (req, res) => {
  try {
    const {
      lab_order_id,
      result,
      result_value,
      unit,
      reference_range,
      report_file,
      remarks,
    } = req.body;

    if (!lab_order_id) {
      return res.status(400).json({
        success: false,
        message: "lab_order_id is required",
      });
    }

    const labReportId = await createLabReport({
      lab_order_id,
      result,
      result_value,
      unit,
      reference_range,
      report_file,
      remarks,
    });

    const labReport = await getLabReportById(labReportId);

    res.status(201).json({
      success: true,
      message: "Lab report created successfully",
      labReport,
    });
  } catch (error) {
    console.error("Create lab report error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid lab_order_id",
      });
    }

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "A lab report already exists for this lab order",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create lab report",
      error: error.message,
    });
  }
};

// Update lab report
const editLabReport = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      lab_order_id,
      result,
      result_value,
      unit,
      reference_range,
      report_file,
      remarks,
    } = req.body;

    if (!lab_order_id) {
      return res.status(400).json({
        success: false,
        message: "lab_order_id is required",
      });
    }

    const affectedRows = await updateLabReport(id, {
      lab_order_id,
      result,
      result_value,
      unit,
      reference_range,
      report_file,
      remarks,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Lab report not found",
      });
    }

    const labReport = await getLabReportById(id);

    res.status(200).json({
      success: true,
      message: "Lab report updated successfully",
      labReport,
    });
  } catch (error) {
    console.error("Update lab report error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid lab_order_id",
      });
    }

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "A lab report already exists for this lab order",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update lab report",
      error: error.message,
    });
  }
};

// Delete lab report
const removeLabReport = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteLabReport(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Lab report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab report deleted successfully",
    });
  } catch (error) {
    console.error("Delete lab report error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete lab report",
      error: error.message,
    });
  }
};

module.exports = {
  getLabReports,
  getLabReport,
  getLabReportByOrder,
  getPatientLabReports,
  getDoctorLabReports,
  addLabReport,
  editLabReport,
  removeLabReport,
};
