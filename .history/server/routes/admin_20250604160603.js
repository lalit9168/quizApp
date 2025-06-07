const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Question = require("../models/Question");
const adminAuth = require("../middlewares/adminAuth");

// View all users
router.get("/users", adminAuth, async (req, res) => {
  const users = await User.find({ role: "user" });
  res.send(users);
});

// Delete a user
router.delete("/users/:id", adminAuth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: "User deleted" });
});

// Add question
router.post("/questions", adminAuth, async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.send(question);
});

// Delete question
router.delete("/questions/:id", adminAuth, async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.send({ message: "Question deleted" });
});

module.exports = router;
