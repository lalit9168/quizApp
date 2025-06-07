import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// Helper: Generate a unique quiz code (6 hex chars, uppercase)
async function generateUniqueQuizCode() {
  let code;
  let exists = true;

  while (exists) {
    code = crypto.randomBytes(3).toString('hex').toUpperCase();
    const existing = await Quiz.findOne({ quizCode: code });
    exists = !!existing;
  }

  return code;
}

// Middleware to verify JWT and optionally check admin role
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store decoded token payload in req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

function verifyAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
}

// Create a new quiz (admin only)
router.post('/create', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, questions, timeLimit } = req.body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }

    if (!timeLimit || typeof timeLimit !== 'number' || timeLimit <= 0) {
      return res.status(400).json({ message: 'Valid timeLimit (number > 0) is required' });
    }

    const quizCode = await generateUniqueQuizCode();

    const quiz = new Quiz({
      title,
      quizCode,
      createdBy: req.user.username,
      questions,
      timeLimit,
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created', quizCode });
  } catch (err) {
    console.error('Error creating quiz:', err);

    if (err.code === 11000 && err.keyPattern?.quizCode) {
      return res.status(409).json({ message: 'Quiz code already exists. Try again.' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all quizzes (admin access)
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'title quizCode questions timeLimit');
    res.json(quizzes);
  } catch (err) {
    console.error('Failed to get quizzes:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get quiz by quiz code (public)
router.get('/code/:quizCode', async (req, res) => {
  const { quizCode } = req.params;

  try {
    const quiz = await Quiz.findOne({ quizCode }, '-submissions'); // exclude submissions for public

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.json(quiz);
  } catch (err) {
    console.error('Error fetching quiz:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Submit quiz attempt (user)
router.post('/submit/:quizCode', async (req, res) => {
  const { quizCode } = req.params;
  const { token, score } = req.body;

  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ message: 'Invalid score' });
    }

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const alreadySubmitted = quiz.submissions?.some((s) => s.email === email);
    if (alreadySubmitted) {
      return res.status(403).json({ message: 'You have already attempted this quiz.' });
    }

    quiz.submissions = quiz.submissions || [];
    quiz.submissions.push({ email, score });

    await quiz.save();

    res.status(200).json({ message: 'Submission recorded successfully' });
  } catch (err) {
    console.error('Submit error:', err.message);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
});

// Delete quiz (admin only)
router.delete('/:quizCode', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({ quizCode: req.params.quizCode });

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    console.error('Error deleting quiz:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all quiz submissions (admin only)
router.get('/submissions/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, 'title quizCode submissions');
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching submissions:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get submissions for a specific quiz (admin only)
router.get('/submissions/:quizCode', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode }, 'submissions');

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.json(quiz.submissions || []);
  } catch (err) {
    console.error('Error fetching quiz submissions:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
