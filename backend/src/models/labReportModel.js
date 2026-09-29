const pool = require("../config/db");

// Get all lab reports
const getAllLabReports = async () => {
  const [rows] = await pool.query(`
    SELECT
      lr.id,
      lr.lab_order_id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lr.result,
      lr.result_value,
      lr.unit,
      lr.reference_range,
      lr.report_file,
      lr.remarks,
      lr.report_date
    FROM lab_reports lr
    INNER JOIN lab_orders lo ON lr.lab_order_id = lo.id
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    ORDER BY lr.report_date DESC
  `);

  return rows;
};

// Get lab report by ID
const getLabReportById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      lr.id,
      lr.lab_order_id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lr.result,
      lr.result_value,
      lr.unit,
      lr.reference_range,
      lr.report_file,
      lr.remarks,
      lr.report_date
    FROM lab_reports lr
    INNER JOIN lab_orders lo ON lr.lab_order_id = lo.id
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    WHERE lr.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Get lab report by lab order
const getLabReportByOrderId = async (labOrderId) => {
  const [rows] = await pool.query(
    `
    SELECT
      lr.id,
      lr.lab_order_id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lr.result,
      lr.result_value,
      lr.unit,
      lr.reference_range,
      lr.report_file,
      lr.remarks,
      lr.report_date
    FROM lab_reports lr
    INNER JOIN lab_orders lo ON lr.lab_order_id = lo.id
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    WHERE lr.lab_order_id = ?
    LIMIT 1
    `,
    [labOrderId],
  );

  return rows[0];
};

// Get lab reports by patient
const getLabReportsByPatientId = async (patientId) => {
  const [rows] = await pool.query(
    `
    SELECT
      lr.id,
      lr.lab_order_id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lr.result,
      lr.result_value,
      lr.unit,
      lr.reference_range,
      lr.report_file,
      lr.remarks,
      lr.report_date
    FROM lab_reports lr
    INNER JOIN lab_orders lo ON lr.lab_order_id = lo.id
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    WHERE lo.patient_id = ?
    ORDER BY lr.report_date DESC
    `,
    [patientId],
  );

  return rows;
};

// Get lab reports by doctor
const getLabReportsByDoctorId = async (doctorId) => {
  const [rows] = await pool.query(
    `
    SELECT
      lr.id,
      lr.lab_order_id,
      lo.patient_id,
      p.name AS patient_name,
      lo.doctor_id,
      d.name AS doctor_name,
      d.specialization,
      lo.test_id,
      lt.test_name,
      lr.result,
      lr.result_value,
      lr.unit,
      lr.reference_range,
      lr.report_file,
      lr.remarks,
      lr.report_date
    FROM lab_reports lr
    INNER JOIN lab_orders lo ON lr.lab_order_id = lo.id
    INNER JOIN patients p ON lo.patient_id = p.id
    INNER JOIN doctors d ON lo.doctor_id = d.id
    INNER JOIN lab_tests lt ON lo.test_id = lt.id
    WHERE lo.doctor_id = ?
    ORDER BY lr.report_date DESC
    `,
    [doctorId],
  );

  return rows;
};

// Create lab report
const createLabReport = async (reportData) => {
  const {
    lab_order_id,
    result,
    result_value,
    unit,
    reference_range,
    report_file,
    remarks,
  } = reportData;

  const [dbResult] = await pool.query(
    `
    INSERT INTO lab_reports (
      lab_order_id,
      result,
      result_value,
      unit,
      reference_range,
      report_file,
      remarks
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      lab_order_id,
      result || null,
      result_value || null,
      unit || null,
      reference_range || null,
      report_file || null,
      remarks || null,
    ],
  );

  return dbResult.insertId;
};

// Update lab report
const updateLabReport = async (id, reportData) => {
  const {
    lab_order_id,
    result,
    result_value,
    unit,
    reference_range,
    report_file,
    remarks,
  } = reportData;

  const [dbResult] = await pool.query(
    `
    UPDATE lab_reports
    SET
      lab_order_id = ?,
      result = ?,
      result_value = ?,
      unit = ?,
      reference_range = ?,
      report_file = ?,
      remarks = ?
    WHERE id = ?
    `,
    [
      lab_order_id,
      result || null,
      result_value || null,
      unit || null,
      reference_range || null,
      report_file || null,
      remarks || null,
      id,
    ],
  );

  return dbResult.affectedRows;
};

// Delete lab report
const deleteLabReport = async (id) => {
  const [dbResult] = await pool.query(`DELETE FROM lab_reports WHERE id = ?`, [
    id,
  ]);

  return dbResult.affectedRows;
};

module.exports = {
  getAllLabReports,
  getLabReportById,
  getLabReportByOrderId,
  getLabReportsByPatientId,
  getLabReportsByDoctorId,
  createLabReport,
  updateLabReport,
  deleteLabReport,
};
