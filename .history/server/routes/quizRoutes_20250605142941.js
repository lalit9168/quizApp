import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Quiz from '../models/Quiz.js'; // Make sure the model file uses ESM too

const router = express.Router();

function generateQuizCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. "A1B2C3"
}

router.post('/create', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace with env var in prod

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create quizzes' });
    }

    const { title, questions } = req.body;

    const quiz = new Quiz({
      title,
      quizCode: generateQuizCode(),
      createdBy: decoded.username,
      questions,
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created', quizCode: quiz.quizCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating quiz' });
  }

  // Get all quizzes
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'email');
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
  
});

export default router;
