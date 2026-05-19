const express = require("express");
const router = express.Router();
const {
  createPatient,
  getPatients,
  getPatientById,
} = require("../controllers/patientController");

router.post("/", createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);

module.exports = router;
