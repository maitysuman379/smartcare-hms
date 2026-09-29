const {
  getAllBills,
  getBillById,
  getBillsByPatientId,
  createBill,
  updateBill,
  deleteBill,
} = require("../models/billModel");

const allowedPaymentStatuses = ["PENDING", "PARTIAL", "PAID", "CANCELLED"];

// Calculate total bill amount
const calculateTotal = ({
  consultation_fee = 0,
  medicine_fee = 0,
  lab_fee = 0,
  other_fee = 0,
  discount = 0,
  tax = 0,
}) => {
  const subtotal =
    Number(consultation_fee) +
    Number(medicine_fee) +
    Number(lab_fee) +
    Number(other_fee);

  const total = subtotal - Number(discount) + Number(tax);

  return Number(total.toFixed(2));
};

// Validate fee values
const validateAmounts = (amounts) => {
  return Object.values(amounts).every(
    (value) => !isNaN(value) && Number(value) >= 0,
  );
};

// Get all bills
const getBills = async (req, res) => {
  try {
    const bills = await getAllBills();

    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    console.error("Get bills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bills",
      error: error.message,
    });
  }
};

// Get bill by ID
const getBill = async (req, res) => {
  try {
    const { id } = req.params;

    const bill = await getBillById(id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    res.status(200).json({
      success: true,
      bill,
    });
  } catch (error) {
    console.error("Get bill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bill",
      error: error.message,
    });
  }
};

// Get bills by patient
const getPatientBills = async (req, res) => {
  try {
    const { patientId } = req.params;

    const bills = await getBillsByPatientId(patientId);

    res.status(200).json({
      success: true,
      bills,
    });
  } catch (error) {
    console.error("Get patient bills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch patient bills",
      error: error.message,
    });
  }
};

// Create bill
const addBill = async (req, res) => {
  try {
    const {
      bill_number,
      patient_id,
      appointment_id,
      consultation_fee = 0,
      medicine_fee = 0,
      lab_fee = 0,
      other_fee = 0,
      discount = 0,
      tax = 0,
      payment_status = "PENDING",
    } = req.body;

    if (!bill_number || !patient_id) {
      return res.status(400).json({
        success: false,
        message: "bill_number and patient_id are required",
      });
    }

    if (
      !validateAmounts({
        consultation_fee,
        medicine_fee,
        lab_fee,
        other_fee,
        discount,
        tax,
      })
    ) {
      return res.status(400).json({
        success: false,
        message: "All fee amounts must be non-negative numbers",
      });
    }

    if (!allowedPaymentStatuses.includes(payment_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status",
      });
    }

    const total_amount = calculateTotal({
      consultation_fee,
      medicine_fee,
      lab_fee,
      other_fee,
      discount,
      tax,
    });

    if (total_amount < 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount cannot be negative",
      });
    }

    const billId = await createBill({
      bill_number,
      patient_id,
      appointment_id,
      consultation_fee,
      medicine_fee,
      lab_fee,
      other_fee,
      discount,
      tax,
      total_amount,
      payment_status,
    });

    const bill = await getBillById(billId);

    res.status(201).json({
      success: true,
      message: "Bill created successfully",
      bill,
    });
  } catch (error) {
    console.error("Create bill error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Bill number already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id or appointment_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create bill",
      error: error.message,
    });
  }
};

// Update bill
const editBill = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      bill_number,
      patient_id,
      appointment_id,
      consultation_fee = 0,
      medicine_fee = 0,
      lab_fee = 0,
      other_fee = 0,
      discount = 0,
      tax = 0,
      payment_status,
    } = req.body;

    if (!bill_number || !patient_id) {
      return res.status(400).json({
        success: false,
        message: "bill_number and patient_id are required",
      });
    }

    if (
      !validateAmounts({
        consultation_fee,
        medicine_fee,
        lab_fee,
        other_fee,
        discount,
        tax,
      })
    ) {
      return res.status(400).json({
        success: false,
        message: "All fee amounts must be non-negative numbers",
      });
    }

    if (!payment_status || !allowedPaymentStatuses.includes(payment_status)) {
      return res.status(400).json({
        success: false,
        message: "Valid payment status is required",
      });
    }

    const total_amount = calculateTotal({
      consultation_fee,
      medicine_fee,
      lab_fee,
      other_fee,
      discount,
      tax,
    });

    if (total_amount < 0) {
      return res.status(400).json({
        success: false,
        message: "Total amount cannot be negative",
      });
    }

    const affectedRows = await updateBill(id, {
      bill_number,
      patient_id,
      appointment_id,
      consultation_fee,
      medicine_fee,
      lab_fee,
      other_fee,
      discount,
      tax,
      total_amount,
      payment_status,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    const bill = await getBillById(id);

    res.status(200).json({
      success: true,
      message: "Bill updated successfully",
      bill,
    });
  } catch (error) {
    console.error("Update bill error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        message: "Bill number already exists",
      });
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid patient_id or appointment_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update bill",
      error: error.message,
    });
  }
};

// Delete bill
const removeBill = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteBill(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bill deleted successfully",
    });
  } catch (error) {
    console.error("Delete bill error:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete bill because it has related payments",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete bill",
      error: error.message,
    });
  }
};

module.exports = {
  getBills,
  getBill,
  getPatientBills,
  addBill,
  editBill,
  removeBill,
};
