import jwt from "jsonwebtoken";
import crypto from "crypto";
import Quiz from "../models/Quiz.js";

// Helper to generate a unique quiz code
export async function generateUniqueQuizCode() {
  let code;
  let exists = true;

  while (exists) {
    code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const existing = await Quiz.findOne({ quizCode: code });
    exists = !!existing;
  }

  return code;
}

// Middleware helper for verifying admin token
export function verifyAdmin(token) {
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, "your_secret_key");
  if (decoded.role !== "admin") throw new Error("Forbidden");
  return decoded;
}

// Middleware helper for verifying user token
export function verifyUser(token) {
  if (!token) throw new Error("Unauthorized");
  const decoded = jwt.verify(token, "your_secret_key");
  return decoded;
}

// Create a new quiz (admin only)
export async function createQuiz(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    verifyAdmin(token);

    const { title, questions, duration } = req.body;
    const quizCode = await generateUniqueQuizCode();

    const quiz = new Quiz({
      title,
      quizCode,
      
      createdBy: jwt.decode(token).username,
      questions,
      duration,
      startTime: null,
      endTime: null,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz created", quizCode });
  } catch (err) {
    console.error("Create quiz error:", err.message);
    if (err.message === "Unauthorized") return res.status(401).json({ message: err.message });
    if (err.message === "Forbidden") return res.status(403).json({ message: err.message });
    if (err.code === 11000 && err.keyPattern?.quizCode) {
      return res.status(409).json({ message: "Quiz code already exists. Try again." });
    }
    res.status(500).json({ message: "Error creating quiz" });
  }
}

// Get all quizzes (admin access)
export async function getAllQuizzes(req, res) {
  try {
    const quizzes = await Quiz.find({}, "title quizCode questions");
    res.json(quizzes);
  } catch (error) {
    console.error("Failed to get quizzes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Get quiz by quiz code
export async function getQuizByCode(req, res) {
  try {
    const { quizCode } = req.params;
    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    console.error("Get quiz by code error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Submit quiz attempt (user)
export async function submitQuizAttempt(req, res) {
  try {
    const { quizCode } = req.params;
    const { token, score, selectedAnswers, name, address, education } = req.body;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = verifyUser(token);
    const email = decoded.email;

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const alreadySubmitted = quiz.submissions?.some((s) => s.email === email);
    if (alreadySubmitted) {
      return res.status(403).json({ message: "You have already attempted this quiz." });
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
}

// Delete quiz (admin only)
export async function deleteQuiz(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    verifyAdmin(token);

    const quiz = await Quiz.findOneAndDelete({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("Delete quiz error:", err.message);
    if (err.message === "Unauthorized") return res.status(401).json({ message: err.message });
    if (err.message === "Forbidden") return res.status(403).json({ message: err.message });
    res.status(500).json({ message: "Server error" });
  }
}

// Get all quiz submissions (admin only)
export async function getAllSubmissions(req, res) {
  try {
    verifyAdmin(req.headers.authorization?.split(" ")[1]);
    const quizzes = await Quiz.find({}, "title quizCode submissions");
    res.json(quizzes);
  } catch (err) {
    console.error("Get all submissions error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Get submissions for a specific quiz (admin only)
export async function getSubmissionsByQuiz(req, res) {
  try {
    verifyAdmin(req.headers.authorization?.split(" ")[1]);

    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode }, "submissions");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz.submissions || []);
  } catch (err) {
    console.error("Get submissions by quiz error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Leaderboard Route
export async function getLeaderboard(req, res) {
  try {
    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const topScorers = quiz.submissions
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json(topScorers);
  } catch (err) {
    console.error("Get leaderboard error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Average Score Route
export async function getAverageScore(req, res) {
  try {
    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const scores = quiz.submissions.map((s) => s.score);
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    res.json({ averageScore: avg });
  } catch (err) {
    console.error("Get average score error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

// User History Route
export async function getUserHistory(req, res) {
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
    console.error("Get user history error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

// Register quiz start time for a user
export async function startQuiz(req, res) {
  try {
    const { token } = req.body;
    const { quizCode } = req.params;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = verifyUser(token);
    const email = decoded.email;
    const name = decoded.name || "User";

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.submissions = quiz.submissions || [];

    const existingSubmission = quiz.submissions.find((s) => s.email === email);
    if (existingSubmission) {
      return res.status(200).json({ message: "Already started" }); // Optional
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
    console.error("Start quiz error:", err.message);
    res.status(500).json({ message: "Server error during start" });
  }
}

// Get attempted quizzes summary (all users)
export async function getAttemptedQuiz(req, res) {
  try {
    const quizzes = await Quiz.find({}, "quizCode title submissions.email");

    const result = quizzes.map((quiz) => ({
      quizCode: quiz.quizCode,
      title: quiz.title,
      attemptedUsers: quiz.submissions.map((sub) => sub.email),
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("Get attempted quiz error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




