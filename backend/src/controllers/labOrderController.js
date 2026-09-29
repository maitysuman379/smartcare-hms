const {
  getAllLabOrders,
  getLabOrderById,
  getLabOrdersByPatientId,
  getLabOrdersByDoctorId,
  createLabOrder,
  updateLabOrder,
  deleteLabOrder,
} = require("../models/labOrderModel");

const allowedStatuses = [
  "ORDERED",
  "SAMPLE_COLLECTED",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
];

// Get all lab orders
const getLabOrders = async (req, res) => {
  try {
    const labOrders = await getAllLabOrders();

    res.status(200).json({
      success: true,
      labOrders,
    });
  } catch (error) {
    console.error("Get lab orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lab orders",
      error: error.message,
    });
  }
};

// Get lab order by ID
const getLabOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const labOrder = await getLabOrderById(id);

    if (!labOrder) {
      return res.status(404).json({
        success: false,
        message: "Lab order not found",
      });
    }

    res.status(200).json({
      success: true,
      labOrder,
    });
  } catch (error) {
    console.error("Get lab order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lab order",
      error: error.message,
    });
  }
};

// Get lab orders by patient
const getPatientLabOrders = async (req, res) => {
  try {
    const { patientId } = req.params;

    const labOrders = await getLabOrdersByPatientId(patientId);

    res.status(200).json({
      success: true,
      labOrders,
    });
  } catch (error) {
    console.error("Get patient lab orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient lab orders",
      error: error.message,
    });
  }
};

// Get lab orders by doctor
const getDoctorLabOrders = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const labOrders = await getLabOrdersByDoctorId(doctorId);

    res.status(200).json({
      success: true,
      labOrders,
    });
  } catch (error) {
    console.error("Get doctor lab orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor lab orders",
      error: error.message,
    });
  }
};

// Create lab order
const addLabOrder = async (req, res) => {
  try {
    const { patient_id, doctor_id, test_id, status, notes } = req.body;

    if (!patient_id || !doctor_id || !test_id) {
      return res.status(400).json({
        success: false,
        message: "patient_id, doctor_id and test_id are required",
      });
    }

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lab order status",
      });
    }

    const labOrderId = await createLabOrder({
      patient_id,
      doctor_id,
      test_id,
      status,
      notes,
    });

    const labOrder = await getLabOrderById(labOrderId);

    res.status(201).json({
      success: true,
      message: "Lab order created successfully",
      labOrder,
    });
  } catch (error) {
    console.error("Create lab order error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id, doctor_id or test_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create lab order",
      error: error.message,
    });
  }
};

// Update lab order
const editLabOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { patient_id, doctor_id, test_id, status, notes } = req.body;

    if (!patient_id || !doctor_id || !test_id) {
      return res.status(400).json({
        success: false,
        message: "patient_id, doctor_id and test_id are required",
      });
    }

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Valid status is required",
      });
    }

    const affectedRows = await updateLabOrder(id, {
      patient_id,
      doctor_id,
      test_id,
      status,
      notes,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Lab order not found",
      });
    }

    const labOrder = await getLabOrderById(id);

    res.status(200).json({
      success: true,
      message: "Lab order updated successfully",
      labOrder,
    });
  } catch (error) {
    console.error("Update lab order error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id, doctor_id or test_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update lab order",
      error: error.message,
    });
  }
};

// Delete lab order
const removeLabOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteLabOrder(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Lab order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab order deleted successfully",
    });
  } catch (error) {
    console.error("Delete lab order error:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete lab order because it has a lab report",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete lab order",
      error: error.message,
    });
  }
};

module.exports = {
  getLabOrders,
  getLabOrder,
  getPatientLabOrders,
  getDoctorLabOrders,
  addLabOrder,
  editLabOrder,
  removeLabOrder,
};
