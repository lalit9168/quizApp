const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/quiz-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.use("/api/auth", authRoutes);     // Login & Register
app.use("/api/admin", adminRoutes);   // Admin features

// Step 6: Create admin user on first run
(async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin user created");
    }
  } catch (err) {
    console.error("❌ Failed to create admin user", err);
  }
})();

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
