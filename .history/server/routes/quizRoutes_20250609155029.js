import express from "express";
import * as quizController from "../controllers/quiz.controller";

const router = express.Router();

// Simple logger middleware
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
}

router.use(logger);

router.post("/create", quizController.createQuiz);
router.get("/all", quizController.getAllQuizzes);
router.get("/code/:quizCode", quizController.getQuizByCode);
router.post("/submit/:quizCode", quizController.submitQuizAttempt);
router.delete("/:quizCode", quizController.deleteQuiz);
router.get("/submissions/all", quizController.getAllSubmissions);
router.get("/submissions/:quizCode", quizController.getSubmissionsByQuiz);
router.get("/leaderboard/:quizCode", quizController.getLeaderboard);
router.get("/average-score/:quizCode", quizController.getAverageScore);
router.get("/user-history/:email", quizController.getUserHistory);
router.post("/start/:quizCode", quizController.startQuiz);
router.get("/attempted-quiz", quizController.getAttemptedQuiz);

export default router;
