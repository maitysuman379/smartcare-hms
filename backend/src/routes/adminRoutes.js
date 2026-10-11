const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// All routes below require an authenticated ADMIN.
router.use(authMiddleware, adminMiddleware);

// GET /api/admin/doctor-requests
// List applications awaiting review or documents.
router.get("/doctor-requests", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        da.id AS application_id,
        da.user_id,
        u.username,
        u.email,
        u.status AS user_status,
        da.full_name,
        da.phone,
        da.address,
        da.city,
        da.state,
        da.pincode,
        da.specialization,
        da.qualification,
        da.experience_years,
        da.license_number,
        da.department_id,
        da.consultation_fee,
        da.application_status,
        da.submitted_at,
        da.deadline_at,
        da.reviewed_by,
        da.reviewed_at
      FROM doctor_applications da
      JOIN users u ON u.id = da.user_id
      WHERE da.application_status IN (
        'PENDING_DOCUMENTS',
        'UNDER_REVIEW'
      )
      ORDER BY da.submitted_at ASC
    `);

    return res.json({ success: true, data: rows });
  } catch (error) {
    console.error("List doctor requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load doctor requests",
    });
  }
});

// GET /api/admin/doctor-requests/:id
router.get("/doctor-requests/:id", async (req, res) => {
  const applicationId = Number(req.params.id);

  if (!Number.isSafeInteger(applicationId) || applicationId < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid application ID",
    });
  }

  try {
    const [rows] = await pool.query(
      `SELECT da.*, u.username, u.email, u.status AS user_status
       FROM doctor_applications da
       JOIN users u ON u.id = da.user_id
       WHERE da.id = ?
       LIMIT 1`,
      [applicationId],
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Doctor application not found",
      });
    }

    return res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Get doctor request error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load doctor application",
    });
  }
});

// PATCH /api/admin/doctor-requests/:id/review
router.patch("/doctor-requests/:id/review", async (req, res) => {
  const applicationId = Number(req.params.id);

  if (!Number.isSafeInteger(applicationId) || applicationId < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid application ID",
    });
  }

  try {
    const [result] = await pool.query(
      `UPDATE doctor_applications
       SET application_status = 'UNDER_REVIEW',
           reviewed_by = ?,
           reviewed_at = NOW()
       WHERE id = ?
         AND application_status IN ('PENDING_DOCUMENTS', 'UNDER_REVIEW')`,
      [req.user.id, applicationId],
    );

    if (!result.affectedRows) {
      return res.status(409).json({
        success: false,
        message: "Application not found or cannot be reviewed",
      });
    }

    return res.json({
      success: true,
      message: "Application marked as under review",
    });
  } catch (error) {
    console.error("Review doctor request error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update application",
    });
  }
});

// PATCH /api/admin/doctor-requests/:id/reject
router.patch("/doctor-requests/:id/reject", async (req, res) => {
  const applicationId = Number(req.params.id);
  const reason =
    typeof req.body?.reason === "string" ? req.body.reason.trim() : "";

  if (!Number.isSafeInteger(applicationId) || applicationId < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid application ID",
    });
  }

  if (!reason) {
    return res.status(400).json({
      success: false,
      message: "A rejection reason is required",
    });
  }

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.query(
      `SELECT id, user_id, application_status
       FROM doctor_applications
       WHERE id = ?
       FOR UPDATE`,
      [applicationId],
    );

    if (
      !rows.length ||
      !["PENDING_DOCUMENTS", "UNDER_REVIEW"].includes(
        rows[0].application_status,
      )
    ) {
      await connection.rollback();
      return res.status(409).json({
        success: false,
        message: "Application not found or already finalized",
      });
    }

    const application = rows[0];

    await connection.query(
      `UPDATE doctor_applications
       SET application_status = 'REJECTED',
           rejection_reason = ?,
           reviewed_by = ?,
           reviewed_at = NOW()
       WHERE id = ?`,
      [reason, req.user.id, applicationId],
    );

    await connection.query(
      `UPDATE users
       SET status = 'REJECTED'
       WHERE id = ? AND role = 'DOCTOR'`,
      [application.user_id],
    );

    await connection.commit();

    return res.json({
      success: true,
      message: "Doctor application rejected",
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Reject doctor request error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reject application",
    });
  } finally {
    if (connection) connection.release();
  }
});

// PATCH /api/admin/doctor-requests/:id/approve
router.patch("/doctor-requests/:id/approve", async (req, res) => {
  const applicationId = Number(req.params.id);

  if (!Number.isSafeInteger(applicationId) || applicationId < 1) {
    return res.status(400).json({
      success: false,
      message: "Invalid application ID",
    });
  }

  // The database currently has no document-verification records.
  // Require explicit confirmation that the admin verified documents
  // outside this API before approving.
  if (req.body?.documentsVerified !== true) {
    return res.status(400).json({
      success: false,
      message: "Verify the doctor's documents before approval",
    });
  }

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.query(
      `SELECT
         da.*,
         u.email,
         u.status AS user_status
       FROM doctor_applications da
       JOIN users u ON u.id = da.user_id
       WHERE da.id = ? AND u.role = 'DOCTOR'
       FOR UPDATE`,
      [applicationId],
    );

    if (
      !rows.length ||
      !["PENDING_DOCUMENTS", "UNDER_REVIEW"].includes(
        rows[0].application_status,
      )
    ) {
      await connection.rollback();
      return res.status(409).json({
        success: false,
        message: "Application not found or already finalized",
      });
    }

    const application = rows[0];

    const requiredFields = [
      "full_name",
      "phone",
      "specialization",
      "qualification",
      "license_number",
    ];

    const missingFields = requiredFields.filter(
      (field) =>
        typeof application[field] !== "string" || !application[field].trim(),
    );

    if (missingFields.length) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Complete the required profile fields before approval",
        missingFields,
      });
    }

    const [existingDoctors] = await connection.query(
      "SELECT id FROM doctors WHERE user_id = ? LIMIT 1",
      [application.user_id],
    );

    const doctorData = [
      application.full_name,
      application.email,
      application.phone,
      application.specialization,
      application.qualification,
      application.experience_years ?? 0,
      application.license_number,
      application.department_id || null,
      application.consultation_fee ?? 0,
    ];

    if (existingDoctors.length) {
      await connection.query(
        `UPDATE doctors
         SET name = ?,
             email = ?,
             phone = ?,
             specialization = ?,
             qualification = ?,
             experience_years = ?,
             license_number = ?,
             department_id = ?,
             consultation_fee = ?
         WHERE user_id = ?`,
        [...doctorData, application.user_id],
      );
    } else {
      await connection.query(
        `INSERT INTO doctors (
           user_id, name, email, phone, specialization,
           qualification, experience_years, license_number,
           department_id, consultation_fee
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [application.user_id, ...doctorData],
      );
    }

    await connection.query(
      `UPDATE doctor_applications
       SET application_status = 'APPROVED',
           reviewed_by = ?,
           reviewed_at = NOW(),
           rejection_reason = NULL
       WHERE id = ?`,
      [req.user.id, applicationId],
    );

    await connection.query(
      `UPDATE users
       SET status = 'ACTIVE'
       WHERE id = ? AND role = 'DOCTOR'`,
      [application.user_id],
    );

    await connection.commit();

    return res.json({
      success: true,
      message: "Doctor application approved",
    });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Approve doctor request error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Doctor email or license number already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to approve doctor application",
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
