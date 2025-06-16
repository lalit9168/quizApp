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
  
  // Define colors
  const primaryColor = [102, 126, 234]; // #667eea
  const secondaryColor = [118, 75, 162]; // #764ba2
  const successColor = [34, 197, 94]; // #22c55e
  const errorColor = [239, 68, 68]; // #ef4444
  const textDark = [26, 32, 44]; // #1a202c
  const textLight = [100, 116, 139]; // #64748b
  const bgLight = [248, 250, 252]; // #f8fafc

  // Add gradient background
  doc.setFillColor(...bgLight);
  doc.rect(0, 0, 210, 297, 'F'); // A4 size background

  // Header section with gradient effect
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Add decorative elements
  doc.setFillColor(255, 255, 255, 0.1);
  doc.circle(180, 15, 25, 'F');
  doc.circle(200, 35, 15, 'F');
  doc.circle(30, 10, 20, 'F');

  // Logo placeholder (you can replace this with actual logo)
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(15, 10, 30, 30, 5, 5, 'F');
  
  // Quiz icon representation
  doc.setFillColor(...primaryColor);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Q", 30, 32, null, null, "center");

  // Main title
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("QUIZ SCORE CARD", 105, 25, null, null, "center");
  
  // Subtitle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Professional Learning Assessment Report", 105, 35, null, null, "center");

  // Reset text color for body
  doc.setTextColor(...textDark);

  // User Information Section
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(15, 60, 180, 40, 3, 3, 'F');
  
  // Add subtle border
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, 60, 180, 40, 3, 3, 'S');

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("PARTICIPANT DETAILS", 20, 72);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textDark);
  doc.text(`Name: ${name}`, 20, 82);
  doc.text(`Email: ${email}`, 20, 90);
  doc.text(`Quiz: ${quiz.title}`, 20, 98);

  // Score section with visual indicator
  const percentage = Math.round((score / quiz.questions.length) * 100);
  let scoreColor = errorColor;
  let scoreLabel = "Needs Improvement";
  
  if (percentage >= 80) {
    scoreColor = successColor;
    scoreLabel = "Excellent";
  } else if (percentage >= 60) {
    scoreColor = [234, 179, 8]; // yellow
    scoreLabel = "Good";
  } else if (percentage >= 40) {
    scoreColor = [249, 115, 22]; // orange
    scoreLabel = "Fair";
  }

  // Score card
  doc.setFillColor(...scoreColor);
  doc.roundedRect(15, 110, 180, 35, 3, 3, 'F');

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("FINAL SCORE", 20, 125);
  
  doc.setFontSize(24);
  doc.text(`${score} / ${quiz.questions.length}`, 20, 138);
  
  doc.setFontSize(14);
  doc.text(`${percentage}% - ${scoreLabel}`, 120, 125);

  // Progress bar
  doc.setFillColor(255, 255, 255, 0.3);
  doc.roundedRect(120, 130, 70, 8, 2, 2, 'F');
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(120, 130, (70 * percentage) / 100, 8, 2, 2, 'F');

  // Questions table
  const tableData = quiz.questions.map((q, idx) => {
    const selected = answers[idx] || "Not answered";
    const correct = q.correctAnswer;
    const isCorrect = selected === correct;
    
    // Truncate long text
    const questionText = q.questionText.length > 50 
      ? q.questionText.substring(0, 50) + "..." 
      : q.questionText;
    const selectedText = selected.length > 30 
      ? selected.substring(0, 30) + "..." 
      : selected;
    const correctText = correct.length > 30 
      ? correct.substring(0, 30) + "..." 
      : correct;
    
    return [
      idx + 1,
      questionText,
      selectedText,
      correctText,
      isCorrect ? "✓" : "✗"
    ];
  });

  // Table styling
  autoTable(doc, {
    startY: 155,
    head: [["#", "Question", "Your Answer", "Correct Answer", "Result"]],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { cellWidth: 60 },
      2: { cellWidth: 45 },
      3: { cellWidth: 45 },
      4: { halign: 'center', cellWidth: 20 }
    },
    didParseCell: function (data) {
      // Color code the result column
      if (data.column.index === 4 && data.section === 'body') {
        if (data.cell.text[0] === '✓') {
          data.cell.styles.textColor = successColor;
          data.cell.styles.fontStyle = 'bold';
        } else if (data.cell.text[0] === '✗') {
          data.cell.styles.textColor = errorColor;
          data.cell.styles.fontStyle = 'bold';
        }
      }
    },
    margin: { left: 15, right: 15 },
  });

  // Footer
  const finalY = doc.lastAutoTable.finalY || 200;
  
  // Add decorative line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(2);
  doc.line(15, finalY + 15, 195, finalY + 15);

  // Footer text
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textLight);
  doc.text("Generated by QuizApplication - Professional Learning Platform", 105, finalY + 25, null, null, "center");
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Generated on: ${currentDate}`, 105, finalY + 32, null, null, "center");

  // Add certificate-like border
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.rect(10, 5, 190, 287, 'S');
  doc.setLineWidth(0.5);
  doc.rect(12, 7, 186, 283, 'S');

  // Save the PDF
  const fileName = `${name.replace(/\s+/g, '_')}_ScoreCard_${quiz.title.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
  doc.save(fileName);
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
