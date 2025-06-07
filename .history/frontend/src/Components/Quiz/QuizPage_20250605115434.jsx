import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '.';

function QuizPage() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);
  const [quizCode, setQuizCode] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post('/quizzes/create', { title, questions });
      setQuizCode(res.data.quizCode);
    } catch (err) {
      alert('Failed to create quiz.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Create Quiz</Typography>
      <TextField
        label="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {questions.map((q, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          <TextField
            label={`Question ${i + 1}`}
            value={q.questionText}
            onChange={(e) => handleChange(i, 'questionText', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          {q.options.map((opt, j) => (
            <TextField
              key={j}
              label={`Option ${j + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, j, e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
          ))}
          <TextField
            label="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleChange(i, 'correctAnswer', e.target.value)}
            fullWidth
          />
        </Paper>
      ))}

      <IconButton onClick={addQuestion} color="primary">
        <AddIcon /> Add Question
      </IconButton>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit Quiz
      </Button>

      {quizCode && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Quiz Created! Share this code: <strong>{quizCode}</strong>
        </Typography>
      )}
    </Box>
  );
}

export default QuizPage;
