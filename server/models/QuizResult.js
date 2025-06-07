// server/models/QuizResult.js
import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  questionText: String,
  selectedAnswer: String,
  correctAnswer: String,
});

const quizResultSchema = new mongoose.Schema({
  quizCode: String,
  username: String,
  answers: [answerSchema],
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;
