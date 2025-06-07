import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Quiz from '../models/Quiz';

router.post('/create', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create quizzes' });
    }

    const { title, questions, duration } = req.body; // ✅ FIXED HERE
    const quizCode = await generateUniqueQuizCode();

    const quiz = new Quiz({
      title,
      quizCode,
      createdBy: decoded.username,
      questions,
      duration, // ✅ FIXED HERE
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