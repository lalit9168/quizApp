import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import GuestQuiz from '../models/GuestQuiz.js';

const router = express.Router();

const generateQuizCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

// Admin creates guest quiz
router.post('/create', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

    const { title, questions } = req.body;

    const quiz = new GuestQuiz({
      title,
      quizCode: generateQuizCode(),
      createdBy: decoded.email,
      questions,
    });

    await quiz.save();
    res.status(201).json({ message: 'Guest quiz created', quizCode: quiz.quizCode });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all guest quizzes (for admin)
router.get('/all', async (req, res) => {
  try {
    const quizzes = await GuestQuiz.find({}, "title quizCode questions");
    res.json(quizzes);
  } catch {
    res.status(500).json({ message: 'Failed to get guest quizzes' });
  }
});

// Get guest quiz by code
router.get('/code/:quizCode', async (req, res) => {
  const { quizCode } = req.params;
  try {
    const quiz = await GuestQuiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit guest attempt
router.post('/attempt/:quizCode', async (req, res) => {
  const { quizCode } = req.params;
  const { name, score } = req.body;

  try {
    const quiz = await GuestQuiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const alreadyAttempted = quiz.guestAttempts.find(a => a.name === name);
    if (alreadyAttempted) return res.status(400).json({ message: 'Already attempted' });

    quiz.guestAttempts.push({ name, score });
    await quiz.save();

    res.status(200).json({ message: 'Score submitted' });
  } catch {
    res.status(500).json({ message: 'Error submitting attempt' });
  }
});



export default router;
