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

        // Normal attempt logic
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
      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          color: "#00feba",
          fontWeight: "bold",
          fontSize: 24,
          textShadow: "0 0 10px #00feba",
        }}
      >
        Loading quiz...
      </Box>
    );

  if (alreadyAttempted)
    return (
      <Box
        sx={{
          minHeight: "80vh",
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            bgcolor:
              "linear-gradient(135deg, #013a3a, #0099cc 90%)",
            background:
              "linear-gradient(135deg, #013a3a, #0099cc 90%)",
            color: "#fff",
            textAlign: "center",
            borderRadius: 3,
            p: 5,
            boxShadow: "0 0 30px #00feba",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#00feba",
              textShadow: "0 0 12px #00feba",
              mb: 3,
            }}
          >
            You have already attempted this quiz.
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Your Score: {score} / {quiz.questions.length}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              mt: 3,
              px: 5,
              py: 1.8,
              fontWeight: "bold",
              borderRadius: 3,
              color: "#00feba",
              borderColor: "#00feba",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 255, 186, 0.15)",
                borderColor: "#00feba",
                boxShadow: "0 0 15px #00feba",
              },
            }}
            onClick={downloadPDF}
          >
            Download Score Card
          </Button>
        </Box>
      </Box>
    );

  const question = quiz.questions[current];

  return (
    <Box
      sx={{
        minHeight: "80vh",
        bgcolor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 3,
        gap: 4,
      }}
    >
      {/* Main Quiz Card */}
      <Box
        sx={{
          maxWidth: 700,
          width: "100%",
          bgcolor: "linear-gradient(135deg, #013a3a, #0099cc 90%)",
          color: "#fff",
          borderRadius: 3,
          boxShadow: "0 0 30px #00feba",
          p: 5,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "#00feba",
            textShadow: "0 0 15px #00feba",
            letterSpacing: "0.05em",
          }}
        >
          {quiz.title}
        </Typography>

        {score === null && timeLeft !== null && (
          <Typography
            variant="h6"
            sx={{
              color: timeLeft < 60000 ? "red" : "#00feba",
              mb: 3,
              fontWeight: "bold",
              textShadow: timeLeft < 60000 ? "none" : "0 0 10px #00feba",
            }}
          >
            Time Left: {formatTime(timeLeft)}
          </Typography>
        )}

        {score === null ? (
          <Card
            sx={{
              bgcolor: "rgba(0, 255, 186, 0.15)",
              boxShadow: "0 0 20px #00feba",
              borderRadius: 3,
              border: "1px solid #00feba",
            }}
            elevation={0}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#00feba", fontWeight: 600 }}
              >
                Q{current + 1}: {question.questionText}
              </Typography>
              <RadioGroup
                value={answers[current] || ""}
                onChange={handleOptionChange}
                sx={{
                  mt: 2,
                  "& .MuiFormControlLabel-root": {
                    color: "#00feba",
                    fontWeight: 600,
                    textShadow: "0 0 8px #00feba",
                  },
                  "& .Mui-checked": {
                    color: "#00feba !important",
                  },
                }}
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
                sx={{
                  mt: 3,
                  px: 5,
                  py: 1.8,
                  fontWeight: "bold",
                  borderRadius: 3,
                  background:
                    "linear-gradient(to right, #00feba, #5b86e5)",
                  boxShadow: "0 0 20px #00feba",
                  color: "#121212",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(to right, #5b86e5, #00feba)",
                    boxShadow: "0 0 40px #00feba",
                    transform: "scale(1.07)",
                  },
                  "&:disabled": {
                    background: "rgba(0, 255, 186, 0.4)",
                    boxShadow: "none",
                    color: "#555",
                    cursor: "not-allowed",
                    transform: "none",
                  },
                }}
                disabled={!answers[current]}
              >
                {current === quiz.questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="h5" sx={{ color: "#00feba", fontWeight: 700 }}>
              Your Score: {score} / {quiz.questions.length}
            </Typography>
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                px: 5,
                py: 1.8,
                fontWeight: "bold",
                borderRadius: 3,
                color: "#00feba",
                borderColor: "#00feba",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 186, 0.15)",
                  borderColor: "#00feba",
                  boxShadow: "0 0 15px #00feba",
                },
              }}
              onClick={downloadPDF}
            >
              Download Score Card
            </Button>
          </Box>
        )}
      </Box>

      {/* Right-side Question Navigation */}
      <Box
        sx={{
          width: 180,
          bgcolor: "linear-gradient(135deg, #013a3a, #0099cc 90%)",
          borderRadius: 3,
          boxShadow: "0 0 30px #00feba",
          p: 2,
          alignSelf: "flex-start",
          position: "sticky",
          top: 80,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#00feba",
            fontWeight: 700,
            textAlign: "center",
            textShadow: "0 0 15px #00feba",
          }}
          gutterBottom
        >
          Questions
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
          {quiz.questions.map((_, idx) => (
            <Button
              key={idx}
              variant={current === idx ? "contained" : answers[idx] ? "outlined" : "text"}
              color={current === idx ? "secondary" : "primary"}
              size="small"
              onClick={() => setCurrent(idx)}
              sx={{
                width: 35,
                height: 35,
                minWidth: "unset",
                fontWeight: "bold",
                color:
                  current === idx
                    ? "#121212"
                    : answers[idx]
                    ? "#00feba"
                    : "#0099cc",
                backgroundColor:
                  current === idx
                    ? "linear-gradient(to right, #00feba, #5b86e5)"
                    : "transparent",
                boxShadow:
                  current === idx
                    ? "0 0 15px #00feba"
                    : answers[idx]
                    ? "0 0 8px #00feba"
                    : "none",
                borderRadius: "50%",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: current === idx ? undefined : "rgba(0, 255, 186, 0.15)",
                  boxShadow: current === idx ? undefined : "0 0 10px #00feba",
                },
              }}
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
