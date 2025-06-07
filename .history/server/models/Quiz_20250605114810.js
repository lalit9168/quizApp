const mongoose = require('mongoose');

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

module.exports = mongoose.model('Quiz', quizSchema);
