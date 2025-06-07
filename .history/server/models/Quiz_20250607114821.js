// models/quiz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
});

const submissionSchema = new mongoose.Schema({
  email: String,
  score: Number,
});

const quizSchema = new mongoose.Schema({
  title: String,
  quizCode: { type: String, unique: true, required: true },
  questions: [questionSchema],
  submissions: [submissionSchema],
  timeLimit: { type: Number, required: true }, // ⏱️ time limit in minutes
});

export default mongoose.model('Quiz', quizSchema);
