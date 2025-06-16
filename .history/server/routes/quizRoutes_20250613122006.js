import express from "express";
import * as quizController from "../controllers/quiz.controller.js";
import auth from "../middlewares/auth.js";
import Submission from "../models/QuizResult.js"; // Assuming you're using QuizResult.js as Submission

const router = express.Router();

// Logger middleware (optional but useful)
function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Status: ${status} - ${duration}ms`
    );
  });

  next();
}

router.use(logger);

// ✅ Get all user scores (requires authentication)
router.get('/user-scores', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ email: req.user.email })
      .populate('quiz', 'title questions')
      .sort({ createdAt: -1 });

    const scores = submissions.map(sub => ({
      quizId: sub.quiz._id,
      quizTitle: sub.quiz.title,
      quizCode: sub.quizCode,
      score: sub.score,
      totalQuestions: sub.quiz.questions.length,
      createdAt: sub.createdAt
    }));

    res.json(scores);
  } catch (err) {
    console.error("Error fetching user scores:", err);
    res.status(500).send("Server Error");
  }
});

// ✅ Core Quiz Routes
router.post("/create", quizController.createQuiz);
router.get("/all", quizController.getAllQuizzes);
router.get("/code/:quizCode", quizController.getQuizByCode);
router.post("/submit/:quizCode", quizController.submitQuizAttempt);
router.delete("/:quizCode", quizController.deleteQuiz);

// ✅ Quiz Submissions & Scores
router.get("/submissions/all", quizController.getAllSubmissions);
router.get("/submissions/:quizCode", quizController.getSubmissionsByQuiz);
router.get("/leaderboard/:quizCode", quizController.getLeaderboard);
router.get("/average-score/:quizCode", quizController.getAverageScore);

// ✅ User Activity
router.get("/user-history/:email", quizController.getUserHistory);
router.get("/attempted-quiz", quizController.getAttemptedQuiz);
router.post("/start/:quizCode", quizController.startQuiz);

export default router;
