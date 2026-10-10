const jwt = require("jsonwebtoken");
const { findUserByIdForAuth } = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // Always load the current account state from MySQL.
    const user = await findUserByIdForAuth(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Account not found",
      });
    }

    // Never trust the status or role embedded in an old JWT.
    if (user.status !== "ACTIVE") {
      const messages = {
        PENDING: "Your account is pending administrator verification.",
        REJECTED:
          "Your application has been rejected. Contact the administrator.",
        INACTIVE: "Your account is inactive. Contact the administrator.",
        BLOCKED: "Your account has been blocked.",
      };

      return res.status(403).json({
        success: false,
        status: user.status,
        message:
          messages[user.status] ||
          "Your account is not authorized to access this resource.",
      });
    }

    // Use current database values, not role/status from the JWT.
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    return next();
  } catch (error) {
    if (
      error.name !== "JsonWebTokenError" &&
      error.name !== "TokenExpiredError" &&
      error.name !== "NotBeforeError"
    ) {
      console.error("Authentication middleware error:", error);
    }

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication verification failed",
    });
  }
};

module.exports = authMiddleware;
