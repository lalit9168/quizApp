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
  Divider,
  Fade,
  Grid,
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
      setScore(points); // Force re-render immediately

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
          minHeight: "calc(100vh - 64px - 48px)",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          color: "#00feba",
          fontWeight: "bold",
          textShadow: "0 0 10px #00feba",
          fontSize: 18,
        }}
      >
        Loading quiz...
      </Box>
    );

  if (alreadyAttempted)
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 64px - 48px)",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Fade in timeout={700}>
          <Paper
            elevation={12}
            sx={{
              backdropFilter: "blur(24px)",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 5,
              p: 5,
              width: "100%",
              maxWidth: 600,
              border: "2px solid rgba(0,254,186,0.4)",
              boxShadow: "0 0 20px rgba(0,254,186,0.2)",
              color: "#fff",
              textAlign: "center",
              transition: "0.3s",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "#00feba",
                textShadow: "0 0 10px #00feba",
              }}
            >
              Quiz Attempted
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              You have already attempted this quiz.
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Your Score: {score} / {quiz.questions.length}
            </Typography>
            <Button
              variant="outlined"
              onClick={downloadPDF}
              sx={{
                color: "#00feba",
                borderColor: "#00feba",
                "&:hover": {
                  backgroundColor: "#00feba",
                  color: "#121212",
                  fontWeight: "bold",
                },
              }}
            >
              Download Score Card
            </Button>
          </Paper>
        </Fade>
      </Box>
    );

  const question = quiz.questions[current];

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px - 48px)",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={12}
          sx={{
            backdropFilter: "blur(24px)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 5,
            p: 5,
            width: { xs: "100%", md: 600 },
            border: "2px solid rgba(0,254,186,0.4)",
            boxShadow: "0 0 20px rgba(0,254,186,0.2)",
            color: "#fff",
            transition: "0.3s",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: "bold",
              color: "#00feba",
              textShadow: "0 0 10px #00feba",
              textAlign: "center",
            }}
          >
            {quiz.title}
          </Typography>

          {score === null && timeLeft !== null && (
            <Typography
              variant="h6"
              sx={{
                color: timeLeft < 60000 ? "#ff5555" : "#00feba",
                mb: 2,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Time Left: {formatTime(timeLeft)}
            </Typography>
          )}

          {score === null ? (
            <>
              <Card
                sx={{
                  background: "rgba(0,254,186,0.1)",
                  boxShadow: "0 0 15px rgba(0,254,186,0.4)",
                  borderRadius: 3,
                  p: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: "bold", color: "#00feba" }}
                  >
                    Q{current + 1}: {question.questionText}
                  </Typography>
                  <RadioGroup
                    value={answers[current] || ""}
                    onChange={handleOptionChange}
                    sx={{ color: "#00feba" }}
                  >
                    {question.options.map((opt, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={opt}
                        control={
                          <Radio
                            sx={{
                              color: "#00feba",
                              "&.Mui-checked": {
                                color: "#00feba",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ color: "#fff" }}>{opt}</Typography>
                        }
                      />
                    ))}
                  </RadioGroup>

                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    disabled={!answers[current]}
                    sx={{
                      mt: 3,
                      width: "100%",
                      py: 1.5,
                      color: "#00feba",
                      borderColor: "#00feba",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#00feba",
                        color: "#121212",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    {current === quiz.questions.length - 1 ? "Submit" : "Next"}
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography
                variant="h5"
                sx={{ color: "#00feba", fontWeight: "bold", mb: 2 }}
              >
                Your Score: {score} / {quiz.questions.length}
              </Typography>
              <Button
                variant="outlined"
                onClick={downloadPDF}
                sx={{
                  color: "#00feba",
                  borderColor: "#00feba",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#00feba",
                    color: "#121212",
                  },
                }}
              >
                Download Score Card
              </Button>
            </Box>
          )}
        </Paper>
      </Fade>

      {/* Right-side question navigation */}
      <Box
        sx={{
          width: { xs: "100%", sm: 180 },
          bgcolor: "rgba(255,255,255,0.05)",
          p: 2,
          borderRadius: 3,
          boxShadow: "0 0 15px rgba(0,254,186,0.2)",
          color: "#00feba",
          fontWeight: "bold",
          position: { sm: "sticky" },
          top: 80,
          mt: { xs: 4, sm: 0 },
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Questions
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={1}
          justifyContent={{ xs: "center", sm: "flex-start" }}
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
              sx={{
                minWidth: 36,
                minHeight: 36,
                fontWeight: "bold",
                textShadow: current === idx ? "0 0 8px #00feba" : "none",
                boxShadow:
                  current === idx
                    ? "0 0 12px 2px rgba(0,254,186,0.7)"
                    : "none",
                transition: "0.3s",
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
