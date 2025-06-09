import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function AttemptQuiz() {
  const { code } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const token = localStorage.getItem("token");
  const timerRef = useRef(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/quizzes/code/${code}`
        );
        const quizData = res.data;
        setQuiz(quizData);

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userEmail = decodedToken.email;

        const userSubmission = quizData.submissions?.find(
          (s) => s.email === userEmail
        );

        if (userSubmission) {
          setAlreadyAttempted(true);
          setScore(userSubmission.score);
          const mappedAnswers = {};
          userSubmission.selectedAnswers.forEach((a, idx) => {
            mappedAnswers[idx] = a.selectedOption;
          });
          setAnswers(mappedAnswers);
          return;
        }

        const duration = quizData.duration; // minutes
        const startKey = `quizStartTime_${code}`;
        let startTime = localStorage.getItem(startKey);

        if (!startTime) {
          startTime = new Date().toISOString();
          localStorage.setItem(startKey, startTime);
        }

        const endTime = new Date(
          new Date(startTime).getTime() + duration * 60000
        );

        const interval = setInterval(() => {
          const now = new Date();
          const diff = endTime - now;

          if (diff <= 0) {
            clearInterval(interval);
            setTimeLeft(0);
            if (!submittedRef.current) {
              submittedRef.current = true;
              handleAutoSubmit();
            }
          } else {
            setTimeLeft(diff);
          }
        }, 1000);

        timerRef.current = interval;
      } catch (err) {
        console.error("Quiz not found", err);
      }
    };

    fetchQuiz();
    return () => clearInterval(timerRef.current);
  }, [code, token]);

  const handleOptionChange = (e) => {
    setAnswers({ ...answers, [current]: e.target.value });
  };

  const calculateScore = () => {
    let points = 0;
    const selectedAnswers = [];

    quiz.questions.forEach((q, idx) => {
      const selected = answers[idx];
      if (selected === q.correctAnswer) {
        points++;
      }
      selectedAnswers.push({
        questionText: q.questionText,
        selectedOption: selected,
        correctAnswer: q.correctAnswer,
      });
    });

    return { points, selectedAnswers };
  };

  const submitQuiz = async () => {
    const { points, selectedAnswers } = calculateScore();
    setScore(points);

    try {
      await axios.post(`http://localhost:5001/api/quizzes/submit/${code}`, {
        token,
        score: points,
        selectedAnswers,
      });
    } catch (err) {
      console.error("Score submission failed", err);
    }

    clearInterval(timerRef.current);
    localStorage.removeItem(`quizStartTime_${code}`);
    setTimeLeft(null);
  };

  const handleAutoSubmit = () => {
    if (!submittedRef.current) {
      submittedRef.current = true;

      const { points, selectedAnswers } = calculateScore();
      setScore(points);

      axios
        .post(`http://localhost:5001/api/quizzes/submit/${code}`, {
          token,
          score: points,
          selectedAnswers,
        })
        .then(() => {
          clearInterval(timerRef.current);
          localStorage.removeItem(`quizStartTime_${code}`);
          setTimeLeft(null);
        })
        .catch((err) => {
          console.error("Auto-submit failed", err);
        });
    }
  };

  const handleNext = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      if (!submittedRef.current) {
        submittedRef.current = true;
        submitQuiz();
      }
    }
  };

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const downloadPDF = () => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const name = decodedToken.name || "User";
    const email = decodedToken.email;

    const doc = new jsPDF();
    doc.text(`Score Card`, 105, 20, null, null, "center");
    doc.text(`Name: ${name}`, 15, 30);
    doc.text(`Email: ${email}`, 15, 38);
    doc.text(`Quiz: ${quiz.title}`, 15, 46);
    doc.text(`Score: ${score} / ${quiz.questions.length}`, 15, 54);

    const tableData = quiz.questions.map((q, idx) => {
      const selected = answers[idx] || "Not answered";
      const correct = q.correctAnswer;
      const isCorrect = selected === correct ? "Correct" : "Wrong";
      return [idx + 1, q.questionText, selected, correct, isCorrect];
    });

    autoTable(doc, {
      startY: 60,
      head: [["#", "Question", "Your Answer", "Correct Answer", "Status"]],
      body: tableData,
    });

    doc.save(`scorecard_${quiz.title}_${name}.pdf`);
  };

  if (!quiz)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Loading quiz...</Typography>
      </Box>
    );

  if (alreadyAttempted)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="success.main" gutterBottom>
          You have already attempted this quiz.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Your Score: {score} / {quiz.questions.length}
        </Typography>
        <Button variant="outlined" sx={{ mt: 3 }} onClick={downloadPDF}>
          Download Score Card
        </Button>
      </Box>
    );

  const question = quiz.questions[current];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {quiz.title}
      </Typography>

      {score === null && timeLeft !== null && (
        <Typography
          variant="h6"
          sx={{ color: timeLeft < 60000 ? "error.main" : "success.main", mb: 3 }}
        >
          Time Left: {formatTime(timeLeft)}
        </Typography>
      )}

      {score === null ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Question {current + 1}
          </Typography>
          <Typography sx={{ mb: 2 }}>{question.questionText}</Typography>

          <RadioGroup value={answers[current] || ""} onChange={handleOptionChange}>
            {question.options.map((opt, idx) => (
              <FormControlLabel key={idx} value={opt} control={<Radio />} label={opt} />
            ))}
          </RadioGroup>

          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!answers[current]}
            sx={{ mt: 3 }}
          >
            {current === quiz.questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </Paper>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your Score: {score} / {quiz.questions.length}
          </Typography>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={downloadPDF}>
            Download Score Card
          </Button>
        </Box>
      )}

      {/* Question Navigator */}
      <Box
        sx={{
          mt: 5,
          bgcolor: "#f9f9f9",
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {quiz.questions.map((_, idx) => (
          <Button
            key={idx}
            variant={answers[idx] ? "contained" : "outlined"}
            color={
              current === idx
                ? "secondary"
                : answers[idx]
                ? "success"
                : "primary"
            }
            size="small"
            onClick={() => setCurrent(idx)}
          >
            {idx + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default AttemptQuiz;
