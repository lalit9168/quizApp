import express from "express";
import * as quizController from "../controllers/quiz.controller.js";

const router = express.Router();
// In your backend routes
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
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Improved logger middleware
function logger(req, res, next) {
  const start = Date.now();  // Capture the time when the request starts
  
  // Format log details
  const logDetails = () => {
    const duration = Date.now() - start;  // Calculate request duration
    const status = res.statusCode;  // Capture the response status code

    // Log the method, URL, status, and response time in milliseconds
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - Status: ${status} - ${duration}ms`
    );
  };

  // Attach a listener to log once the response is sent
  res.on('finish', logDetails);
  
  next();  // Pass control to the next middleware/route handler
}

router.use(logger);

// Define routes
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
