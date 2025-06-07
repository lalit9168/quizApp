// models/GuestQuiz.js
import mongoose from 'mongoose';

const guestQuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  quizCode: { type: String, required: true, unique: true },
  createdBy: { type: String, required: true }, // Admin's username or ID
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  attempts: [
    {
      name: String,
      score: Number,
      attemptedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model('GuestQuiz', guestQuizSchema);
