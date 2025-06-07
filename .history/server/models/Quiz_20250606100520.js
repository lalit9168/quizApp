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
  quizCode: { type: String, unique: true, required: true }, // ✅ fixed here
  questions: [questionSchema],
  submissions: [submissionSchema],
});

export default mongoose.model('Quiz', quizSchema);
