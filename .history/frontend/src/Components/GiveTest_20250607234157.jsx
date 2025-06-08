// File: GiveTest.jsx

import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Stack,
} from '@mui/material';

function GiveTest() {
  const [quizCode, setQuizCode] = useState('');
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [address, setAddress] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleFetchQuiz = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/quizzes/code/${quizCode}`);
      setQuiz(res.data);
    } catch (err) {
      alert('Invalid quiz code or quiz not found.');
    }
  };

  const handleAnswerChange = (questionIndex, option) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    setScore(score);
    setSubmitted(true);

    const submissionData = {
      token: localStorage.getItem("token"),
      score,
      name,
      education,
      address,
    };

    try {
      await axios.post(`http://localhost:5001/api/quizzes/submit/${quizCode}`, submissionData);
      alert('Quiz submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error submitting quiz.');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Take a Quiz</Typography>

      {!quiz && (
        <Stack spacing={2} mb={3}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Education" value={education} onChange={(e) => setEducation(e.target.value)} fullWidth />
          <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
          <TextField label="Quiz Code" value={quizCode} onChange={(e) => setQuizCode(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleFetchQuiz}>Start Quiz</Button>
        </Stack>
      )}

      {quiz && !submitted && (
        <Box>
          {quiz.questions.map((q, index) => (
            <Paper sx={{ p: 2, mb: 2 }} key={index}>
              <Typography><strong>Q{index + 1}:</strong> {q.questionText}</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={answers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  {q.options.map((option, i) => (
                    <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          ))}
          <Button variant="contained" color="success" onClick={handleSubmit}>Submit Quiz</Button>
        </Box>
      )}

      {submitted && (
        <Box mt={4}>
          <Typography variant="h5">You scored: {score} / {quiz.questions.length}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default GiveTest;
