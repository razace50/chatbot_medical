require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  const hashedPassword = await bcrypt.hash(
    "admin123",
    10
  );

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  console.log("Admin Created");

  process.exit();
});
