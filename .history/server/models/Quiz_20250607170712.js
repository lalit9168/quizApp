import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
});

const submissionSchema = new mongoose.Schema({
  email: String,
  score: Number,
  date: String,   // 👈 Added
  time: String,   // 👈 Added
  
});

const quizSchema = new mongoose.Schema({
  title: String,
  quizCode: { type: String, unique: true, required: true },
  questions: [questionSchema],
  submissions: [submissionSchema],
});

export default mongoose.model('Quiz', quizSchema);
