import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/quiz-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api', authRoutes);

app.listen(5001, () => console.log('Server running on port 5000'));
