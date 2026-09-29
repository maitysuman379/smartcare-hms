const {
  getAllLabTests,
  getLabTestById,
  createLabTest,
  updateLabTest,
  deleteLabTest,
} = require("../models/labTestModel");

// Get all lab tests
const getLabTests = async (req, res) => {
  try {
    const labTests = await getAllLabTests();

    res.status(200).json({
      success: true,
      labTests,
    });
  } catch (error) {
    console.error("Get lab tests error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lab tests",
      error: error.message,
    });
  }
};

// Get lab test by ID
const getLabTest = async (req, res) => {
  try {
    const { id } = req.params;

    const labTest = await getLabTestById(id);

    if (!labTest) {
      return res.status(404).json({
        success: false,
        message: "Lab test not found",
      });
    }

    res.status(200).json({
      success: true,
      labTest,
    });
  } catch (error) {
    console.error("Get lab test error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lab test",
      error: error.message,
    });
  }
};

// Create lab test
const addLabTest = async (req, res) => {
  try {
    const { test_name, description, normal_range, price } = req.body;

    if (!test_name) {
      return res.status(400).json({
        success: false,
        message: "Test name is required",
      });
    }

    if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
      return res.status(400).json({
        success: false,
        message: "price must be a non-negative number",
      });
    }

    const labTestId = await createLabTest({
      test_name,
      description,
      normal_range,
      price,
    });

    const labTest = await getLabTestById(labTestId);

    res.status(201).json({
      success: true,
      message: "Lab test created successfully",
      labTest,
    });
  } catch (error) {
    console.error("Create lab test error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create lab test",
      error: error.message,
    });
  }
};

// Update lab test
const editLabTest = async (req, res) => {
  try {
    const { id } = req.params;

    const { test_name, description, normal_range, price } = req.body;

    if (!test_name) {
      return res.status(400).json({
        success: false,
        message: "Test name is required",
      });
    }

    if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
      return res.status(400).json({
        success: false,
        message: "price must be a non-negative number",
      });
    }

    const affectedRows = await updateLabTest(id, {
      test_name,
      description,
      normal_range,
      price,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Lab test not found",
      });
    }

    const labTest = await getLabTestById(id);

    res.status(200).json({
      success: true,
      message: "Lab test updated successfully",
      labTest,
    });
  } catch (error) {
    console.error("Update lab test error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update lab test",
      error: error.message,
    });
  }
};

// Delete lab test
const removeLabTest = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteLabTest(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Lab test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab test deleted successfully",
    });
  } catch (error) {
    console.error("Delete lab test error:", error);

    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete lab test because it is used in a lab order",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete lab test",
      error: error.message,
    });
  }
};

module.exports = {
  getLabTests,
  getLabTest,
  addLabTest,
  editLabTest,
  removeLabTest,
};
