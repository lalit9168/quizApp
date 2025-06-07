import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Quiz from '../models/Quiz.js'; // Also make sure to include `.js` if using ES modules

const router = express.Router();

async function generateUniqueQuizCode() {
  let code;
  let exists = true;

  while (exists) {
    code = crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g., "A1B2C3"
    const existing = await Quiz.findOne({ quizCode: code });
    exists = !!existing;
  }

  return code;
}

router.post('/create', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create quizzes' });
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
    res.status(201).json({ message: 'Quiz created', quizCode });
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern?.quizCode) {
      res.status(409).json({ message: 'Quiz code already exists. Try again.' });
    } else {
      res.status(500).json({ message: 'Error creating quiz' });
    }
  }
});

export default router;
