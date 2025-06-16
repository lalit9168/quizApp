import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // make sure this file exists
import quizRoutes from './routes/quizRoutes.js';
import guestQuizzes from './routes/guestQuizzes.js'



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect('mongodb+srv://lalitchaudhari003:4fAUKI8tIegedOWC@cluster0.3mz88qq.mongodb.net/quiz?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Hey you are not allowed to be here!!');
});

app.use('/api', authRoutes);

app.use('/api/quizzes', quizRoutes);

app.use('/api/guest-quizzes', guestQuizzes);


// Server Startup
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
