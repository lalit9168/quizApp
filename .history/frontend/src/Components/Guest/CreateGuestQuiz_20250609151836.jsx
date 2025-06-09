import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Paper, Divider,
  Accordion, AccordionSummary, AccordionDetails, Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

function CreateGuestQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);
  const [quizzes, setQuizzes] = useState([]);
  const [expandedQuizCode, setExpandedQuizCode] = useState(null);
  const [attemptsMap, setAttemptsMap] = useState({});

  const token = localStorage.getItem('token');

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/guest-quizzes/all');
      setQuizzes(res.data);
    } catch {
      alert('Failed to fetch quizzes');
    }
  };

  const fetchAttempts = async (quizCode) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/guest-quizzes/attempts/${quizCode}`);
      setAttemptsMap(prev => ({ ...prev, [quizCode]: res.data }));
    } catch {
      alert('Failed to fetch attempts');
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

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
    setQuestions([...questions, {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/guest-quizzes/create', {
        title,
        questions,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`Guest Quiz Created! Code: ${res.data.quizCode}`);
      setTitle('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
      fetchQuizzes();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating quiz');
    }
  };

  const handleDelete = async (quizCode) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/guest-quizzes/delete/${quizCode}`);
      fetchQuizzes();
    } catch {
      alert('Failed to delete quiz');
    }
  };

  const toggleAccordion = (quizCode) => {
    if (expandedQuizCode === quizCode) {
      setExpandedQuizCode(null);
    } else {
      setExpandedQuizCode(quizCode);
      fetchAttempts(quizCode);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Create Guest Quiz</Typography>
      <TextField
        fullWidth label="Quiz Title" value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 4 }}
      />

      {questions.map((q, i) => (
        <Paper key={i} elevation={3} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6">Question {i + 1}</Typography>
          <TextField
            fullWidth label="Question" value={q.questionText}
            onChange={(e) => handleChange(i, 'questionText', e.target.value)}
            sx={{ mb: 2 }}
          />
          {q.options.map((opt, j) => (
            <TextField
              key={j} fullWidth label={`Option ${j + 1}`} value={opt}
              onChange={(e) => handleOptionChange(i, j, e.target.value)}
              sx={{ mb: 1 }}
            />
          ))}
          <TextField
            fullWidth label="Correct Answer" value={q.correctAnswer}
            onChange={(e) => handleChange(i, 'correctAnswer', e.target.value)}
            sx={{ mt: 2 }}
          />
        </Paper>
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={addQuestion} sx={{ mb: 3 }}>
        Add Question
      </Button>

      <br />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Quiz
      </Button>

      {/* Existing Quizzes Section */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>Existing Guest Quizzes</Typography>
      {quizzes.map((quiz, i) => (
        <Accordion
          key={quiz.quizCode}
          expanded={expandedQuizCode === quiz.quizCode}
          onChange={() => toggleAccordion(quiz.quizCode)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography flexGrow={1}>
              {quiz.title} (Code: {quiz.quizCode})
            </Typography>
            <Tooltip title="Delete Quiz">
              <IconButton onClick={(e) => {
                e.stopPropagation();
                handleDelete(quiz.quizCode);
              }}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" gutterBottom>
              Total Questions: {quiz.questions.length}
            </Typography>

            {attemptsMap[quiz.quizCode]?.length > 0 ? (
              <Box>
                <Typography variant="subtitle2" gutterBottom>Attempts:</Typography>
                {attemptsMap[quiz.quizCode].map((a, idx) => (
                  <Typography key={idx} sx={{ ml: 2 }}>
                    {idx + 1}. {a.name} - Score: {a.score}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ ml: 2 }}>
                No attempts yet.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default CreateGuestQuiz;
