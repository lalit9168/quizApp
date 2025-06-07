const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateQuizCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. "A1B2C3"
}

router.post('/create', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY'); // replace with your actual key

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create quizzes' });
    }

    const { title, questions } = req.body;

    const quiz = new Quiz({
      title,
      quizCode: generateQuizCode(),
      createdBy: decoded.username,
      questions
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created', quizCode: quiz.quizCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating quiz' });
  }
});

module.exports = router;
