import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Grid,
  Paper,
} from '@mui/material';

function AttemptQuiz() {
  const { code } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/quizzes/code/${code}`);
        const quizData = res.data;

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userEmail = decodedToken.email;

        const hasAttempted = quizData.submissions?.some(
          (s) => s.email === userEmail
        );

        if (hasAttempted) {
          setAlreadyAttempted(true);
        }

        setQuiz(quizData);
      } catch (err) {
        console.error("Quiz not found", err);
      }
    };

    fetchQuiz();
  }, [code, token]);

  const handleOptionChange = (e) => {
    setAnswers({ ...answers, [current]: e.target.value });
  };

  const handleNext = async () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      let points = 0;
      quiz.questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) {
          points++;
        }
      });

      setScore(points);

      try {
        await axios.post(`http://localhost:5001/api/quizzes/submit/${code}`, {
          token,
          score: points,
        });
      } catch (err) {
        console.error("Score submission failed", err);
      }
    }
  };

  const goToQuestion = (index) => {
    setCurrent(index);
  };

  if (!quiz) return <Typography sx={{ p: 3 }}>Loading quiz...</Typography>;

  if (alreadyAttempted)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="error">
          You have already attempted this quiz.
        </Typography>
      </Box>
    );

  const question = quiz.questions[current];

  return (
    <Box sx={{ display: 'flex', p: 4 }}>
      {/* Question Navigation Panel */}
      <Paper
        elevation={3}
        sx={{
          width: 100,
          mr: 3,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          borderRadius: 2,
        }}
      >
        <Typography fontWeight="bold" fontSize="1rem">Questions</Typography>
        {quiz.questions.map((_, idx) => (
          <Button
            key={idx}
            variant={idx === current ? 'contained' : 'outlined'}
            color={answers[idx] ? 'success' : 'warning'}
            onClick={() => goToQuestion(idx)}
            sx={{ minWidth: 40, height: 40 }}
          >
            {idx + 1}
          </Button>
        ))}
      </Paper>

      {/* Main Question Area */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>{quiz.title}</Typography>

        {score === null ? (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Q{current + 1}: {question.questionText}
              </Typography>
              <RadioGroup
                value={answers[current] || ''}
                onChange={handleOptionChange}
                sx={{ mt: 2 }}
              >
                {question.options.map((opt, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 2 }}
                disabled={!answers[current]}
              >
                {current === quiz.questions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">
              Your Score: {score} / {quiz.questions.length}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AttemptQuiz;
