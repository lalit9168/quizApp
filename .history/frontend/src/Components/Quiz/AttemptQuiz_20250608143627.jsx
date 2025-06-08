import React, { useEffect, useState } from "react";
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
  CircularProgress,
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
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const token = localStorage.getItem("token");

  // ⏱ Live countdown
  useEffect(() => {
    let interval;
    if (endTime && score === null) {
      interval = setInterval(() => {
        const diff = new Date(endTime) - new Date();
        if (diff <= 0) {
          clearInterval(interval);
          handleSubmit(); // ⏱ Auto-submit
        } else {
          setRemainingTime(diff);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [endTime, score]);

  // 🧠 Fetch quiz + Check attempt + Get endTime
  useEffect(() => {
    const fetchQuizAndStart = async () => {
      try {
        const quizRes = await axios.get(
          `http://localhost:5001/api/quizzes/code/${code}`
        );
        const quizData = quizRes.data;
        setQuiz(quizData);

        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userEmail = decodedToken.email;

        const hasAttempted = quizData.submissions?.some(
          (s) => s.email === userEmail
        );
        if (hasAttempted) {
          setAlreadyAttempted(true);
          return;
        }

        // 👇 Start the quiz officially
        const startRes = await axios.post(
          `http://localhost:5001/api/quizzes/start/${code}`,
          { token }
        );
        const { endTime } = startRes.data;
        setEndTime(endTime);
      } catch (err) {
        console.error("Error fetching quiz/start time", err);
      }
    };

    fetchQuizAndStart();
  }, [code, token]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleOptionChange = (e) => {
    setAnswers({ ...answers, [current]: e.target.value });
  };

  const handleNext = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
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

    setScore(points);

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    try {
      await axios.post(`http://localhost:5001/api/quizzes/submit/${code}`, {
        token,
        score: points,
        selectedAnswers,
      });
    } catch (err) {
      console.error("Score submission failed", err);
    }
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

  if (!quiz || (endTime === null && !alreadyAttempted))
    return (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  // if (alreadyAttempted)
  //   return (
  //     <Box sx={{ p: 4 }}>
  //       <Typography variant="h5" color="error">
  //         You have already attempted this quiz.
  //       </Typography>
  //     </Box>
  //   );

  const question = quiz.questions[current];

  return (
    <Box sx={{ display: "flex", p: 4, gap: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          {quiz.title}
        </Typography>

        {/* ⏱ Countdown Timer */}
        {remainingTime !== null && score === null && (
          <Typography variant="h6" sx={{ color: "red", mb: 2 }}>
            Time Left: {formatTime(remainingTime)}
          </Typography>
        )}

        {score === null ? (
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6">
                Q{current + 1}: {question.questionText}
              </Typography>
              <RadioGroup
                value={answers[current] || ""}
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
                {current === quiz.questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5">
              Your Score: {score} / {quiz.questions.length}
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={downloadPDF}>
              Download Score Card
            </Button>
          </Box>
        )}
      </Box>

      {/* 👉 Right-side question nav */}
      <Box
        sx={{
          width: 180,
          bgcolor: "#f1f1f1",
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          alignSelf: "flex-start",
          position: "sticky",
          top: 80,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Questions
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
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
    </Box>
  );
}

export default AttemptQuiz;
