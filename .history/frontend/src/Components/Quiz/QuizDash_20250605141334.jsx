import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import axios from 'axios';

function QuizDash() {
  const [code, setCode] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchMyQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/users/my-quizzes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizzes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddQuiz = async () => {
    if (!code.trim()) return;

    try {
      const res = await axios.post(
        'http://localhost:5001/api/users/add-quiz',
        { code: code.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Quiz added successfully!');
      setError('');
      setCode('');
      fetchMyQuizzes();
    } catch (err) {
      setMessage('');
      setError(err.response?.data?.message || 'Failed to add quiz');
    }
  };

  useEffect(() => {
    fetchMyQuizzes();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Your Quiz Dashboard
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add a New Quiz by Code
        </Typography>
        <TextField
          label="Quiz Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddQuiz}>
          Add Quiz
        </Button>

        {message && (
          <Typography sx={{ mt: 2 }} color="success.main">
            {message}
          </Typography>
        )}
        {error && (
          <Typography sx={{ mt: 2 }} color="error">
            {error}
          </Typography>
        )}
      </Paper>

      <Typography variant="h6" gutterBottom>
        Quizzes Assigned to You
      </Typography>
      <List>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <React.Fragment key={quiz._id}>
              <ListItem>
                <ListItemText
                  primary={quiz.title || 'Untitled Quiz'}
                  secondary={`Code: ${quiz.code}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography>No quizzes assigned yet.</Typography>
        )}
      </List>
    </Box>
  );
}

export default QuizDash;
