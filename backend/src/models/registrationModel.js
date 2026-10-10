const pool = require("../config/db");

const createRegisteredAccount = async ({
  username,
  email,
  passwordHash,
  role,
}) => {
  const connection = await pool.getConnection();
  let transactionStarted = false;

  try {
    await connection.beginTransaction();
    transactionStarted = true;

    if (!["PATIENT", "DOCTOR"].includes(role)) {
      throw new Error("Unsupported registration role");
    }

    const status = role === "DOCTOR" ? "PENDING" : "ACTIVE";

    // Create the user account.
    const [userResult] = await connection.query(
      `INSERT INTO users
        (username, email, password_hash, role, status)
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, passwordHash, role, status],
    );

    const userId = userResult.insertId;

    let applicationId = null;
    let deadlineAt = null;

    if (role === "PATIENT") {
      // Preserve the existing patient registration workflow.
      await connection.query(
        `INSERT INTO patients
          (user_id, patient_code, name, email)
         VALUES (?, ?, ?, ?)`,
        [userId, `PAT-${userId}`, username, email],
      );
    }

    if (role === "DOCTOR") {
      // Create the doctor application with a seven-day deadline.
      const [applicationResult] = await connection.query(
        `INSERT INTO doctor_applications
          (
            user_id,
            full_name,
            application_status,
            deadline_at
          )
         VALUES (
            ?, ?, 'PENDING_DOCUMENTS',
            DATE_ADD(NOW(), INTERVAL 7 DAY)
         )`,
        [userId, username],
      );

      applicationId = applicationResult.insertId;

      // Read the actual deadline saved by MySQL.
      const [applicationRows] = await connection.query(
        `SELECT
           id,
           DATE_FORMAT(
             deadline_at,
             '%Y-%m-%d %H:%i:%s'
           ) AS deadlineAt
         FROM doctor_applications
         WHERE id = ?
         LIMIT 1`,
        [applicationId],
      );

      if (!applicationRows.length) {
        throw new Error("Doctor application was not found after creation");
      }

      deadlineAt = applicationRows[0].deadlineAt;
    }

    // Commit only after all required inserts succeed.
    await connection.commit();
    transactionStarted = false;

    return {
      userId,
      role,
      status,
      applicationId,
      deadlineAt,
    };
  } catch (error) {
    if (transactionStarted) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Registration rollback error:", rollbackError);
      }
    }

    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  createRegisteredAccount,
};
