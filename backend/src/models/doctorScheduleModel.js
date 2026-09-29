const pool = require("../config/db");

// Get all doctor schedules
const getAllDoctorSchedules = async () => {
  const [rows] = await pool.query(`
    SELECT
      ds.id,
      ds.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      ds.day_of_week,
      ds.start_time,
      ds.end_time,
      ds.is_available
    FROM doctor_schedules ds
    INNER JOIN doctors d
      ON ds.doctor_id = d.id
    ORDER BY
      d.name ASC,
      FIELD(
        ds.day_of_week,
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY'
      ),
      ds.start_time ASC
  `);

  return rows;
};

// Get schedule by ID
const getDoctorScheduleById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      ds.id,
      ds.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      ds.day_of_week,
      ds.start_time,
      ds.end_time,
      ds.is_available
    FROM doctor_schedules ds
    INNER JOIN doctors d
      ON ds.doctor_id = d.id
    WHERE ds.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get schedules for a specific doctor
const getSchedulesByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
    SELECT
      ds.id,
      ds.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      ds.day_of_week,
      ds.start_time,
      ds.end_time,
      ds.is_available
    FROM doctor_schedules ds
    INNER JOIN doctors d
      ON ds.doctor_id = d.id
    WHERE ds.doctor_id = ?
    ORDER BY
      FIELD(
        ds.day_of_week,
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY'
      ),
      ds.start_time ASC
    `,
    [doctorId],
  );

  return rows;
};

// Create doctor schedule
const createDoctorSchedule = async (scheduleData) => {
  const { doctor_id, day_of_week, start_time, end_time, is_available } =
    scheduleData;

  const [result] = await pool.query(
    `
    INSERT INTO doctor_schedules (
      doctor_id,
      day_of_week,
      start_time,
      end_time,
      is_available
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [doctor_id, day_of_week, start_time, end_time, is_available ?? 1],
  );

  return result.insertId;
};

// Update doctor schedule
const updateDoctorSchedule = async (id, scheduleData) => {
  const { doctor_id, day_of_week, start_time, end_time, is_available } =
    scheduleData;

  const [result] = await pool.query(
    `
    UPDATE doctor_schedules
    SET
      doctor_id = ?,
      day_of_week = ?,
      start_time = ?,
      end_time = ?,
      is_available = ?
    WHERE id = ?
    `,
    [doctor_id, day_of_week, start_time, end_time, is_available ?? 1, id],
  );

  return result.affectedRows;
};

// Delete doctor schedule
const deleteDoctorSchedule = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM doctor_schedules
    WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
};

module.exports = {
  getAllDoctorSchedules,
  getDoctorScheduleById,
  getSchedulesByDoctorId,
  createDoctorSchedule,
  updateDoctorSchedule,
  deleteDoctorSchedule,
};
