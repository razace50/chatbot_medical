const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String,
  disease: String,
  symptoms: [String],
  history: String,
});

module.exports = mongoose.model("Patient", patientSchema);