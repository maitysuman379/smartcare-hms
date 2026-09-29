const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
} = require("../models/departmentModel");

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await getAllDepartments();

    res.status(200).json({
      success: true,
      departments,
    });
  } catch (error) {
    console.error("Get departments error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
      error: error.message,
    });
  }
};

// Get department by ID
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await getDepartmentById(id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    console.error("Get department error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch department",
      error: error.message,
    });
  }
};

// Create department
const addDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Department name is required",
      });
    }

    const departmentId = await createDepartment({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      department: {
        id: departmentId,
        name,
        description: description || null,
      },
    });
  } catch (error) {
    console.error("Create department error:", error);

    // Duplicate department name
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Department name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create department",
      error: error.message,
    });
  }
};

// Update department
const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Department name is required",
      });
    }

    const affectedRows = await updateDepartment(id, {
      name,
      description,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
    });
  } catch (error) {
    console.error("Update department error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Department name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update department",
      error: error.message,
    });
  }
};

module.exports = {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
};
