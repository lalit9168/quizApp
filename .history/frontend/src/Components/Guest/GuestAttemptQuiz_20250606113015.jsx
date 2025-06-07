import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Card, CardContent, RadioGroup, Radio, FormControlLabel,
} from '@mui/material';

function GuestAttemptQuiz() {
  const { quizCode } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/guest-quizzes/code/${quizCode}`);
        setQuiz(res.data);
      } catch {
        alert('Quiz not found');
      }
    };
    fetchQuiz();
  }, [quizCode]);

  const handleAnswer = (e) => {
    setAnswers({ ...answers, [current]: e.target.value });
  };

  const handleNext = async () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      let points = 0;
      quiz.questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) points++;
      });
      setScore(points);

      // Submit score
      try {
        await axios.post(`http://localhost:5001/api/guest-quizzes/attempt/${quizCode}`, {
          name,
          score: points,
        });
      } catch (err) {
        alert(err.response?.data?.message || "Error submitting score");
      }
    }
  };

  if (!quiz) return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  if (score !== null) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Thanks for attempting, {name}!</Typography>
        <Typography variant="h6">Score: {score} / {quiz.questions.length}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {!name ? (
        <>
          <Typography variant="h5">Enter your name to start:</Typography>
          <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ mt: 2 }} />
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => name && setCurrent(0)}>
            Start Quiz
          </Button>
        </>
      ) : (
        <>
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Q{current + 1}: {quiz.questions[current].questionText}
              </Typography>
              <RadioGroup value={answers[current] || ''} onChange={handleAnswer} sx={{ mt: 2 }}>
                {quiz.questions[current].options.map((opt, idx) => (
                  <FormControlLabel key={idx} value={opt} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleNext}
                disabled={!answers[current]}
              >
                {current === quiz.questions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}

export default GuestAttemptQuiz;
