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
import api from "../api";

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
        const res = await api.get(
          `/api/quizzes/code/${code}`
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
      await api.post(`/api/quizzes/submit/${code}`, {
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

      api
        .post(`/api/quizzes/submit/${code}`, {
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
  
  // Set font styles
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(41, 128, 185); // Blue color
  
  // Main title
  doc.text("QuizApplication", 105, 25, null, null, "center");
  
  // Subtitle
  doc.setFontSize(18);
  doc.setTextColor(52, 73, 94); // Dark gray
  doc.text("Score Report", 105, 35, null, null, "center");
  
  // Add a decorative line
  doc.setDrawColor(41, 128, 185);
  doc.setLineWidth(1);
  doc.line(20, 40, 190, 40);
  
  // Reset font for details
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  // Personal Information Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(52, 73, 94);
  doc.text("Personal Information", 20, 55);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${name}`, 25, 65);
  doc.text(`Email: ${email}`, 25, 72);
  
  // Quiz Information Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(52, 73, 94);
  doc.text("Quiz Information", 20, 87);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Quiz Title: ${quiz.title}`, 25, 97);
  doc.text(`Total Questions: ${quiz.questions.length}`, 25, 104);
  doc.text(`Your Score: ${score} / ${quiz.questions.length}`, 25, 111);
  
  // Calculate percentage
  const percentage = Math.round((score / quiz.questions.length) * 100);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  
  // Color code the percentage based on performance
  if (percentage >= 80) {
    doc.setTextColor(39, 174, 96); // Green
  } else if (percentage >= 60) {
    doc.setTextColor(243, 156, 18); // Orange
  } else {
    doc.setTextColor(231, 76, 60); // Red
  }
  doc.text(`Percentage: ${percentage}%`, 25, 118);
  
  // Add another decorative line
  doc.setDrawColor(189, 195, 199);
  doc.setLineWidth(0.5);
  doc.line(20, 125, 190, 125);
  
  // Detailed Results Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(52, 73, 94);
  doc.text("Detailed Results", 20, 135);
  
  // Prepare table data
  const tableData = quiz.questions.map((q, idx) => {
    const selected = answers[idx] || "Not answered";
    const correct = q.correctAnswer;
    const isCorrect = selected === correct ? "Correct" : "Incorrect";
    return [
      (idx + 1).toString(), 
      q.questionText, 
      selected, 
      correct, 
      isCorrect
    ];
  });

  // Enhanced table styling
  autoTable(doc, {
    startY: 142,
    head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 3
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { cellWidth: 70, valign: 'top' },
      2: { cellWidth: 35, halign: 'center', valign: 'middle' },
      3: { cellWidth: 35, halign: 'center', valign: 'middle' },
      4: { 
        halign: 'center', 
        cellWidth: 25,
        valign: 'middle'
      }
    },
    didParseCell: function(data) {
      // Color code the result column
      if (data.column.index === 4) {
        if (data.cell.text[0] === 'Correct') {
          data.cell.styles.textColor = [39, 174, 96]; // Green
          data.cell.styles.fontStyle = 'bold';
        } else if (data.cell.text[0] === 'Incorrect') {
          data.cell.styles.textColor = [231, 76, 60]; // Red
          data.cell.styles.fontStyle = 'bold';
        }
      }
    },
    margin: { left: 20, right: 20 },
    styles: {
      overflow: 'linebreak',
      cellWidth: 'wrap'
    }
  });
  
  // Add footer
  const finalY = doc.lastAutoTable.finalY || 200;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(127, 140, 141);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, finalY + 15);
  doc.text("QuizApplication - Powered by Your Learning Journey", 105, finalY + 22, null, null, "center");

  // Save with a clean filename
  const cleanQuizTitle = quiz.title.replace(/[^a-zA-Z0-9]/g, '_');
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`QuizApplication_Scorecard_${cleanQuizTitle}_${cleanName}.pdf`);
};

  if (!quiz) return <Typography sx={{ p: 3 }}>Loading quiz...</Typography>;

  if (alreadyAttempted)
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" color="success.main" gutterBottom>
          You have already attempted this quiz.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Your Score: {score} / {quiz.questions.length}
        </Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={downloadPDF}>
          Download Score Card
        </Button>
      </Box>
    );

  const question = quiz.questions[current];

  return (
    <Box sx={{ display: "flex", p: 4, gap: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          {quiz.title}
        </Typography>

        {score === null && timeLeft !== null && (
          <Typography
            variant="h6"
            sx={{ color: timeLeft < 60000 ? "red" : "green", mb: 2 }}
          >
            Time Left: {formatTime(timeLeft)}
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

      {/* Right-side Navigation Panel */}
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
