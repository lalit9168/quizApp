import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// Helper to generate a unique quiz code
async function generateUniqueQuizCode() {
  let code;
  let exists = true;

  while (exists) {
    code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const existing = await Quiz.findOne({ quizCode: code });
    exists = !!existing;
  }

  return code;
}

// Create a new quiz (admin only)
router.post("/create", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can create quizzes" });
    }

    const { title, questions, duration } = req.body;
    const quizCode = await generateUniqueQuizCode();

    const quiz = new Quiz({
      title,
      quizCode,
      createdBy: decoded.username,
      questions,
      duration,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz created", quizCode });
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern?.quizCode) {
      res.status(409).json({ message: "Quiz code already exists. Try again." });
    } else {
      res.status(500).json({ message: "Error creating quiz" });
    }
  }
});

// Get all quizzes (admin access)
router.get("/all", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "title quizCode questions");
    res.json(quizzes);
  } catch (error) {
    console.error("Failed to get quizzes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get quiz by quiz code
router.get("/code/:quizCode", async (req, res) => {
  const { quizCode } = req.params;
  try {
    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Submit quiz attempt (user)
router.post("/submit/:quizCode", async (req, res) => {
  const { quizCode } = req.params;
  const { token, score } = req.body;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const email = decoded.email;

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const alreadySubmitted = quiz.submissions?.some((s) => s.email === email);
    if (alreadySubmitted) {
      return res
        .status(403)
        .json({ message: "You have already attempted this quiz." });
    }

    quiz.submissions = quiz.submissions || [];
    quiz.submissions.push({ email, score });

    await quiz.save();
    res.status(200).json({ message: "Submission recorded successfully." });
  } catch (err) {
    console.error("Submit error:", err.message);
    res.status(500).json({ message: "Server error during submission" });
  }
});

// Delete quiz (admin only)
router.delete("/:quizCode", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can delete quizzes" });
    }

    const quiz = await Quiz.findOneAndDelete({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("Error deleting quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ New: Get all quiz submissions (admin only)
router.get("/submissions/all", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view submissions" });
    }

    const quizzes = await Quiz.find({}, "title quizCode submissions");
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching submissions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
