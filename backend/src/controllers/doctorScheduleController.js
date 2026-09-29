const {
  getAllDoctorSchedules,
  getDoctorScheduleById,
  getSchedulesByDoctorId,
  createDoctorSchedule,
  updateDoctorSchedule,
  deleteDoctorSchedule,
} = require("../models/doctorScheduleModel");

// Get all doctor schedules
const getDoctorSchedules = async (req, res) => {
  try {
    const schedules = await getAllDoctorSchedules();

    res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error("Get doctor schedules error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor schedules",
      error: error.message,
    });
  }
};

// Get schedule by ID
const getDoctorSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await getDoctorScheduleById(id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Doctor schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      schedule,
    });
  } catch (error) {
    console.error("Get doctor schedule error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor schedule",
      error: error.message,
    });
  }
};

// Get schedules for a specific doctor
const getDoctorSchedulesByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const schedules = await getSchedulesByDoctorId(doctorId);

    res.status(200).json({
      success: true,
      schedules,
    });
  } catch (error) {
    console.error("Get doctor schedules by doctor error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor schedules",
      error: error.message,
    });
  }
};

// Create doctor schedule
const addDoctorSchedule = async (req, res) => {
  try {
    const { doctor_id, day_of_week, start_time, end_time, is_available } =
      req.body;

    // Required fields
    if (!doctor_id || !day_of_week || !start_time || !end_time) {
      return res.status(400).json({
        success: false,
        message: "doctor_id, day_of_week, start_time and end_time are required",
      });
    }

    // Validate day of week
    const allowedDays = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    if (!allowedDays.includes(day_of_week)) {
      return res.status(400).json({
        success: false,
        message: "Invalid day_of_week",
      });
    }

    // Validate availability
    if (
      is_available !== undefined &&
      is_available !== 0 &&
      is_available !== 1 &&
      is_available !== true &&
      is_available !== false
    ) {
      return res.status(400).json({
        success: false,
        message: "is_available must be 0, 1, true or false",
      });
    }

    // Validate time range
    if (start_time >= end_time) {
      return res.status(400).json({
        success: false,
        message: "start_time must be earlier than end_time",
      });
    }

    const scheduleId = await createDoctorSchedule({
      doctor_id,
      day_of_week,
      start_time,
      end_time,
      is_available,
    });

    res.status(201).json({
      success: true,
      message: "Doctor schedule created successfully",
      schedule: {
        id: scheduleId,
        doctor_id,
        day_of_week,
        start_time,
        end_time,
        is_available: is_available ?? 1,
      },
    });
  } catch (error) {
    console.error("Create doctor schedule error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid doctor_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create doctor schedule",
      error: error.message,
    });
  }
};

// Update doctor schedule
const editDoctorSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const { doctor_id, day_of_week, start_time, end_time, is_available } =
      req.body;

    if (!doctor_id || !day_of_week || !start_time || !end_time) {
      return res.status(400).json({
        success: false,
        message: "doctor_id, day_of_week, start_time and end_time are required",
      });
    }

    const allowedDays = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];

    if (!allowedDays.includes(day_of_week)) {
      return res.status(400).json({
        success: false,
        message: "Invalid day_of_week",
      });
    }

    if (
      is_available !== undefined &&
      is_available !== 0 &&
      is_available !== 1 &&
      is_available !== true &&
      is_available !== false
    ) {
      return res.status(400).json({
        success: false,
        message: "is_available must be 0, 1, true or false",
      });
    }

    if (start_time >= end_time) {
      return res.status(400).json({
        success: false,
        message: "start_time must be earlier than end_time",
      });
    }

    const affectedRows = await updateDoctorSchedule(id, {
      doctor_id,
      day_of_week,
      start_time,
      end_time,
      is_available,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor schedule updated successfully",
    });
  } catch (error) {
    console.error("Update doctor schedule error:", error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "Invalid doctor_id",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update doctor schedule",
      error: error.message,
    });
  }
};

// Delete doctor schedule
const removeDoctorSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const affectedRows = await deleteDoctorSchedule(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Doctor schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor schedule deleted successfully",
    });
  } catch (error) {
    console.error("Delete doctor schedule error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete doctor schedule",
      error: error.message,
    });
  }
};

module.exports = {
  getDoctorSchedules,
  getDoctorSchedule,
  getDoctorSchedulesByDoctor,
  addDoctorSchedule,
  editDoctorSchedule,
  removeDoctorSchedule,
};
