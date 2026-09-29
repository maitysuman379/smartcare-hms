const {
  getAllMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../models/medicineModel");

// Get all medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await getAllMedicines();

    res.status(200).json({
      success: true,
      medicines,
    });
  } catch (error) {
    console.error("Get medicines error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
      error: error.message,
    });
  }
};

// Get medicine by ID
const getMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await getMedicineById(id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      medicine,
    });
  } catch (error) {
    console.error("Get medicine error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine",
      error: error.message,
    });
  }
};

// Create medicine
const addMedicine = async (req, res) => {
  try {
    const {
      name,
      generic_name,
      manufacturer,
      description,
      stock_quantity,
      unit_price,
      expiry_date,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Medicine name is required",
      });
    }

    if (
      stock_quantity !== undefined &&
      (isNaN(stock_quantity) || Number(stock_quantity) < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "stock_quantity must be a non-negative number",
      });
    }

    if (
      unit_price !== undefined &&
      (isNaN(unit_price) || Number(unit_price) < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "unit_price must be a non-negative number",
      });
    }

    const medicineId = await createMedicine({
      name,
      generic_name,
      manufacturer,
      description,
      stock_quantity,
      unit_price,
      expiry_date,
    });

    const medicine = await getMedicineById(medicineId);

    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      medicine,
    });
  } catch (error) {
    console.error("Create medicine error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create medicine",
      error: error.message,
    });
  }
};

// Update medicine
const editMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      generic_name,
      manufacturer,
      description,
      stock_quantity,
      unit_price,
      expiry_date,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Medicine name is required",
      });
    }

    if (
      stock_quantity !== undefined &&
      (isNaN(stock_quantity) || Number(stock_quantity) < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "stock_quantity must be a non-negative number",
      });
    }

    if (
      unit_price !== undefined &&
      (isNaN(unit_price) || Number(unit_price) < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "unit_price must be a non-negative number",
      });
    }

    const affectedRows = await updateMedicine(id, {
      name,
      generic_name,
      manufacturer,
      description,
      stock_quantity,
      unit_price,
      expiry_date,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    const medicine = await getMedicineById(id);

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      medicine,
    });
  } catch (error) {
    console.error("Update medicine error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update medicine",
      error: error.message,
    });
  }
};

// Delete medicine
const removeMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteMedicine(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    console.error("Delete medicine error:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete medicine because it is used in a prescription",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete medicine",
      error: error.message,
    });
  }
};

module.exports = {
  getMedicines,
  getMedicine,
  addMedicine,
  editMedicine,
  removeMedicine,
};
