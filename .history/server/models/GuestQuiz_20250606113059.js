import mongoose from 'mongoose';

const guestQuizSchema = new mongoose.Schema({
  title: String,
  quizCode: { type: String, unique: true },
  createdBy: String, // admin username/email
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    }
  ],
  guestAttempts: [
    {
      name: String,
      score: Number,
    }
  ]
});

export default mongoose.model('GuestQuiz', guestQuizSchema);
