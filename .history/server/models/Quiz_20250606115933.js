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
  duration: { type: Number, required: true } // ⏱️ Duration in minutes
});

export default mongoose.model('Quiz', quizSchema);
