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
  code: { type: String, unique: true },
  questions: [questionSchema],
  submissions: [submissionSchema], // 💥 New field to store attempts
});

export default mongoose.model('Quiz', quizSchema);
