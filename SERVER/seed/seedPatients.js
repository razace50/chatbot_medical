require("dotenv").config();
const mongoose = require("mongoose");

const Patient = require("../models/Patient");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  await Patient.deleteMany();

  await Patient.insertMany([
    {
      name: "John Smith",
      age: 45,
      disease: "Gastritis",
      symptoms: [
        "stomach pain",
        "vomiting",
        "heartburn"
      ]
    },

    {
      name: "Sarah Johnson",
      age: 52,
      disease: "Diabetes",
      symptoms: [
        "frequent urination",
        "fatigue",
        "thirst"
      ]
    },

    {
      name: "Mike Brown",
      age: 33,
      disease: "Asthma",
      symptoms: [
        "shortness of breath",
        "cough",
        "wheezing"
      ]
    }
  ]);

  console.log("Patients Added");

  process.exit();
});
