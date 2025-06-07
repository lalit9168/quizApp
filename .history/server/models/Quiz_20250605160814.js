import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String
});

const quizSchema = new mongoose.Schema({
  quizCode: { type: String, unique: true },
  title: String,
  createdBy: String,
  questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
