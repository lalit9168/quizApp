import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
});

const selectedAnswerSchema = new mongoose.Schema({
  questionText: String,
  selectedOption: String,
  correctAnswer: String,
});

const submissionSchema = new mongoose.Schema({
  email: String,
  score: Number,
  date: String,
  time: String,
  name: String,
  address: String,
  education: String,
  selectedAnswers: [selectedAnswerSchema],  // ➕ Added
});

const quizSchema = new mongoose.Schema({
  title: String,
  quizCode: { type: String, unique: true, required: true },
  questions: [questionSchema],
  duration: Number, // ➕ Add: Duration in minutes
  startTime: Date,  // ➕ Add: When quiz starts
  endTime: Date,    // ➕ Add: When quiz ends
  submissions: [submissionSchema],
});


export default mongoose.model('Quiz', quizSchema);
