import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }] // 🆕 This line
});

export default mongoose.model('User', userSchema);
