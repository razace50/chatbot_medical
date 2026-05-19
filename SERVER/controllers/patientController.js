const Patient = require("../models/Patient");

exports.createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);

    await patient.save();

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.json(patients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    res.json(patient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};