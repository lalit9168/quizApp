import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, IconButton, Paper, Divider,
  Accordion, AccordionSummary, AccordionDetails, Tooltip,
  Fade
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
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right,rgb(162, 195, 210),rgb(172, 207, 219),rgb(235, 241, 244))',
        py: 5,
        px: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={12}
          sx={{
            backdropFilter: 'blur(24px)',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 5,
            p: 4,
            maxWidth: 900,
            width: '100%',
            border: '2px solid rgba(0,254,186,0.4)',
            boxShadow: '0 0 20px rgba(0,254,186,0.2)',
            color: '#fff',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: '#00feba',
              textShadow: '0 0 10px #00feba',
              textAlign: 'center'
            }}
          >
            Create Guest Quiz
          </Typography>

          <TextField
            fullWidth
            label="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              mb: 4,
              input: { color: "#fff" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00feba" },
                "&:hover fieldset": { borderColor: "#00feba" },
              },
            }}
          />

          {questions.map((q, i) => (
            <Paper
              key={i}
              elevation={3}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(0,254,186,0.2)',
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: '#5bfcdb', mb: 2 }}
              >
                Question {i + 1}
              </Typography>
              <TextField
                fullWidth
                label="Question"
                value={q.questionText}
                onChange={(e) => handleChange(i, 'questionText', e.target.value)}
                sx={{ mb: 2 }}
                InputLabelProps={{ style: { color: '#bbb' } }}
                InputProps={{ style: { color: '#fff' } }}
              />
              {q.options.map((opt, j) => (
                <TextField
                  key={j}
                  fullWidth
                  label={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  sx={{ mb: 1 }}
                  InputLabelProps={{ style: { color: '#aaa' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              ))}
              <TextField
                fullWidth
                label="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => handleChange(i, 'correctAnswer', e.target.value)}
                sx={{ mt: 2 }}
                InputLabelProps={{ style: { color: '#aaa' } }}
                InputProps={{ style: { color: '#fff' } }}
              />
            </Paper>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addQuestion}
            sx={{
              mb: 3,
              borderColor: "#00feba",
              color: "#00feba",
              "&:hover": {
                backgroundColor: "#00feba22",
                transform: "scale(1.05)",
              },
            }}
          >
            Add Question
          </Button>

          <br />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              py: 1.5,
              px: 4,
              background: "linear-gradient(to right, #00feba, #5b86e5)",
              color: "#121212",
              fontWeight: "bold",
              boxShadow: "0 0 15px #00feba",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 0 25px #00feba",
              },
            }}
          >
            Submit Quiz
          </Button>

          <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.2)' }} />

          <Typography variant="h5" sx={{ mb: 2, color: '#00feba' }}>
            Existing Guest Quizzes
          </Typography>

          {quizzes.map((quiz) => (
            <Accordion
              key={quiz.quizCode}
              expanded={expandedQuizCode === quiz.quizCode}
              onChange={() => toggleAccordion(quiz.quizCode)}
              sx={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,254,186,0.2)",
                mb: 2,
                color: '#fff',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#00feba' }} />}>
                <Typography flexGrow={1}>
                  {quiz.title} (Code: {quiz.quizCode})
                </Typography>
                <Tooltip title="Delete Quiz">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(quiz.quizCode);
                    }}
                  >
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
        </Paper>
      </Fade>
    </Box>
  );
}

export default CreateGuestQuiz;
