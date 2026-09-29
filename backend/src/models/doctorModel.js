const pool = require("../config/db");

// Get all doctors
const getAllDoctors = async () => {
  const [rows] = await pool.query(`
    SELECT
      d.id,
      d.user_id,
      d.name,
      d.email,
      d.phone,
      d.specialization,
      d.qualification,
      d.experience_years,
      d.license_number,
      d.department_id,
      dep.name AS department_name,
      d.consultation_fee,
      d.availability_status,
      d.profile_image,
      d.created_at
    FROM doctors d
    LEFT JOIN departments dep
      ON d.department_id = dep.id
    ORDER BY d.name ASC
  `);

  return rows;
};

// Get doctor by ID
const getDoctorById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      d.id,
      d.user_id,
      d.name,
      d.email,
      d.phone,
      d.specialization,
      d.qualification,
      d.experience_years,
      d.license_number,
      d.department_id,
      dep.name AS department_name,
      d.consultation_fee,
      d.availability_status,
      d.profile_image,
      d.created_at
    FROM doctors d
    LEFT JOIN departments dep
      ON d.department_id = dep.id
    WHERE d.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Create doctor
const createDoctor = async (doctorData) => {
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
  } = doctorData;

  const [result] = await pool.query(
    `
    INSERT INTO doctors (
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
      profile_image
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      user_id,
      name,
      email,
      phone || null,
      specialization,
      qualification || null,
      experience_years ?? 0,
      license_number || null,
      department_id || null,
      consultation_fee ?? 0.0,
      availability_status || "AVAILABLE",
      profile_image || null,
    ],
  );

  return result.insertId;
};

// Update doctor
const updateDoctor = async (id, doctorData) => {
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
  } = doctorData;

  const [result] = await pool.query(
    `
    UPDATE doctors
    SET
      name = ?,
      email = ?,
      phone = ?,
      specialization = ?,
      qualification = ?,
      experience_years = ?,
      license_number = ?,
      department_id = ?,
      consultation_fee = ?,
      availability_status = ?,
      profile_image = ?
    WHERE id = ?
    `,
    [
      name,
      email,
      phone || null,
      specialization,
      qualification || null,
      experience_years ?? 0,
      license_number || null,
      department_id || null,
      consultation_fee ?? 0.0,
      availability_status || "AVAILABLE",
      profile_image || null,
      id,
    ],
  );

  return result.affectedRows;
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
};
