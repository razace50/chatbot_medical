const express = require("express");

const router = express.Router();

const {
  chatWithPatient,
} = require("../controllers/chatController");

router.post("/", chatWithPatient);

module.exports = router;