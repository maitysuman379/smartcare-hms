const {
  getAllPrescriptionItems,
  getPrescriptionItemById,
  getPrescriptionItemsByPrescriptionId,
  getPrescriptionItemsByMedicineId,
  createPrescriptionItem,
  updatePrescriptionItem,
  deletePrescriptionItem,
} = require("../models/prescriptionItemModel");

// Get all prescription items
const getPrescriptionItems = async (req, res) => {
  try {
    const items = await getAllPrescriptionItems();

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Get prescription items error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prescription items",
      error: error.message,
    });
  }
};

// Get prescription item by ID
const getPrescriptionItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await getPrescriptionItemById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Prescription item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Get prescription item error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prescription item",
      error: error.message,
    });
  }
};

// Get items by prescription
const getItemsByPrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const items = await getPrescriptionItemsByPrescriptionId(prescriptionId);

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Get prescription items by prescription error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prescription items",
      error: error.message,
    });
  }
};

// Get items by medicine
const getItemsByMedicine = async (req, res) => {
  try {
    const { medicineId } = req.params;

    const items = await getPrescriptionItemsByMedicineId(medicineId);

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Get prescription items by medicine error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prescription items",
      error: error.message,
    });
  }
};

// Create prescription item
const addPrescriptionItem = async (req, res) => {
  try {
    const {
      prescription_id,
      medicine_id,
      dosage,
      frequency,
      duration,
      quantity,
      instructions,
    } = req.body;

    if (!prescription_id || !medicine_id) {
      return res.status(400).json({
        success: false,
        message: "prescription_id and medicine_id are required",
      });
    }

    const itemId = await createPrescriptionItem({
      prescription_id,
      medicine_id,
      dosage,
      frequency,
      duration,
      quantity,
      instructions,
    });

    const item = await getPrescriptionItemById(itemId);

    res.status(201).json({
      success: true,
      message: "Prescription item created successfully",
      item,
    });
  } catch (error) {
    console.error("Create prescription item error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid prescription or medicine ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create prescription item",
      error: error.message,
    });
  }
};

// Update prescription item
const editPrescriptionItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      prescription_id,
      medicine_id,
      dosage,
      frequency,
      duration,
      quantity,
      instructions,
    } = req.body;

    if (!prescription_id || !medicine_id) {
      return res.status(400).json({
        success: false,
        message: "prescription_id and medicine_id are required",
      });
    }

    const affectedRows = await updatePrescriptionItem(id, {
      prescription_id,
      medicine_id,
      dosage,
      frequency,
      duration,
      quantity,
      instructions,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Prescription item not found",
      });
    }

    const item = await getPrescriptionItemById(id);

    res.status(200).json({
      success: true,
      message: "Prescription item updated successfully",
      item,
    });
  } catch (error) {
    console.error("Update prescription item error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid prescription or medicine ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update prescription item",
      error: error.message,
    });
  }
};

// Delete prescription item
const removePrescriptionItem = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deletePrescriptionItem(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Prescription item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prescription item deleted successfully",
    });
  } catch (error) {
    console.error("Delete prescription item error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete prescription item",
      error: error.message,
    });
  }
};

module.exports = {
  getPrescriptionItems,
  getPrescriptionItem,
  getItemsByPrescription,
  getItemsByMedicine,
  addPrescriptionItem,
  editPrescriptionItem,
  removePrescriptionItem,
};
