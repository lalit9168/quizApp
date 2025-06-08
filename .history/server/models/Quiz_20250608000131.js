import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
});

const submissionSchema = new mongoose.Schema({
  email: String,
  name: String,
  education: String,
  address: String,
  score: Number,
  date: String,
  time: String,
});


const quizSchema = new mongoose.Schema({
  title: String,
  quizCode: { type: String, unique: true, required: true },
  questions: [questionSchema],
  submissions: [submissionSchema],
});

export default mongoose.model('Quiz', quizSchema);
