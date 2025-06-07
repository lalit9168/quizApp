import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

// ✅ Enable CORS with specific origin
app.use(cors({
  origin: 'http://localhost:5173', // <-- allow your React frontend
  credentials: true
}));

app.use(express.json());
app.use('/api', authRoutes);

mongoose
  .connect('mongodb://127.0.0.1:27017/quiz-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(5000, () => console.log('Server running on port 5000'));
