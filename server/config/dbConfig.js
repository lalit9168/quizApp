const mongoose = require("mongoose");
require("dotenv").config(); // Load env vars

mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("✅ MongoDB connected successfully");
});

connection.on("error", (err) => {
  console.log("❌ MongoDB connection failed:", err);
});

module.exports = connection;
