const express = require("express");
const router = express.Router();

const {
  createPatient,
  getPatients,
  getPatientById,
} = require("../controllers/patientController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPatient);
router.get("/", authMiddleware, getPatients);
router.get("/:id", authMiddleware, getPatientById);

module.exports = router;
