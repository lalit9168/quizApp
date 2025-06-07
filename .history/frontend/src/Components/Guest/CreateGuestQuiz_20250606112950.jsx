import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function CreateGuestQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'questionText' || field === 'correctAnswer') {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5001/api/guest-quizzes/create', {
        title,
        questions,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert(`Guest Quiz Created! Code: ${res.data.quizCode}`);
      setTitle('');
      setQuestions([{
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }]);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating quiz');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Create Guest Quiz</Typography>
      <TextField
        fullWidth
        label="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 4 }}
      />

      {questions.map((q, i) => (
        <Paper key={i} elevation={3} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6">Question {i + 1}</Typography>
          <TextField
            fullWidth
            label="Question"
            value={q.questionText}
            onChange={(e) => handleChange(i, 'questionText', e.target.value)}
            sx={{ mb: 2 }}
          />
          {q.options.map((opt, j) => (
            <TextField
              key={j}
              fullWidth
              label={`Option ${j + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(i, j, e.target.value)}
              sx={{ mb: 1 }}
            />
          ))}
          <TextField
            fullWidth
            label="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleChange(i, 'correctAnswer', e.target.value)}
            sx={{ mt: 2 }}
          />
        </Paper>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addQuestion}
        sx={{ mb: 3 }}
      >
        Add Question
      </Button>

      <br />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </Box>
  );
}

export default CreateGuestQuiz;
