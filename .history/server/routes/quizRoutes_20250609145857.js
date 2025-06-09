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

    const now = new Date();
    const end = new Date(now.getTime() + duration * 60000); // ➕ Add duration in ms

    const quiz = new Quiz({
      title,
      quizCode,
      createdBy: decoded.username,
      questions,
      duration,
      startTime: null,
      endTime: null,
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
  const { token, score, selectedAnswers, name, address, education } = req.body;

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

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    quiz.submissions = quiz.submissions || [];
    quiz.submissions.push({
      email,
      score,
      date,
      time,
      name: name || decoded.name || "User",
      address,
      education,
      selectedAnswers,
    });

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

// ✅ New: Get submissions for a specific quiz (admin only)
router.get("/submissions/:quizCode", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view submissions" });
    }

    const quiz = await Quiz.findOne(
      { quizCode: req.params.quizCode },
      "submissions"
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz.submissions || []);
  } catch (err) {
    console.error("Error fetching quiz submissions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Leaderboard Route
router.get("/leaderboard/:quizCode", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const topScorers = quiz.submissions
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json(topScorers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Average Score Route
router.get("/average-score/:quizCode", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const scores = quiz.submissions.map((s) => s.score);
    const avg =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    res.json({ averageScore: avg });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ User History Route
router.get("/user-history/:email", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ "submissions.email": req.params.email });
    const history = [];

    quizzes.forEach((quiz) => {
      const sub = quiz.submissions.find((s) => s.email === req.params.email);
      if (sub) {
        history.push({
          title: quiz.title,
          quizCode: quiz.quizCode,
          score: sub.score,
          date: sub.date,
        });
      }
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST: Register quiz start time for a user
router.post("/start/:quizCode", async (req, res) => {
  const { token } = req.body;
  const { quizCode } = req.params;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const email = decoded.email;
    const name = decoded.name || "User";

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.submissions = quiz.submissions || [];

    const existingSubmission = quiz.submissions.find((s) => s.email === email);

    if (existingSubmission) {
      return res.status(200).json({ message: "Already started" }); // Optional: prevent multiple starts
    }

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    quiz.submissions.push({
      email,
      name,
      date,
      time,
      startedAt: now,
    });

    await quiz.save();
    res.status(200).json({ message: "Start time recorded" });
  } catch (err) {
    console.error("Start error:", err.message);
    res.status(500).json({ message: "Server error during start" });
  }
});





// Get all quizzes (admin access)
router.get("/attempted", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "title quizCode questions");
    res.json(quizzes);
  } catch (error) {
    console.error("Failed to get quizzes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});




export default router;
