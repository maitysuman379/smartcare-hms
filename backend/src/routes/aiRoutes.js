const express = require("express");

const {
  predictHeartDiseaseController,
  getMyPredictions,
  getPrediction,
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ========================================
// HEART DISEASE PREDICTION
// ========================================

router.post("/heart", authMiddleware, predictHeartDiseaseController);

// ========================================
// GET MY AI PREDICTIONS
// ========================================

router.get("/my-predictions", authMiddleware, getMyPredictions);

// ========================================
// GET PREDICTION BY ID
// ========================================

router.get("/prediction/:id", authMiddleware, getPrediction);

module.exports = router;
