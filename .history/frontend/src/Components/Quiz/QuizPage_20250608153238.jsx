import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Alert,
  Fade,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../api";

function QuizPage() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(60); // One quiz-wide duration
  const [quizCode, setQuizCode] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

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
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/quizzes/create",
        { title, questions, duration },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizCode(res.data.quizCode);
    } catch (err) {
      alert("Failed to create quiz.");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        p: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 900,
          width: "100%",
          p: 4,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(14px)",
          borderRadius: 4,
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#00feba",
            fontWeight: "bold",
            textShadow: "0 0 10px #00feba",
          }}
        >
          Create Quiz
        </Typography>

        <TextField
          fullWidth
          label="Quiz Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            mb: 4,
            input: { color: "#fff" },
            label: { color: "#bbb" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#5b86e5" },
              "&:hover fieldset": { borderColor: "#00feba" },
            },
          }}
        />

        <TextField
          fullWidth
          type="number"
          label="Quiz Duration (in minutes)"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          sx={{
            mb: 4,
            input: { color: "#fff" },
            label: { color: "#bbb" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#5b86e5" },
              "&:hover fieldset": { borderColor: "#00feba" },
            },
          }}
        />

        {questions.map((q, i) => (
          <Paper
            key={i}
            elevation={3}
            sx={{
              p: 3,
              mb: 4,
              background: "#1e1e1e",
              borderRadius: 2,
              color: "#eee",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Question {i + 1}
            </Typography>

            <TextField
              fullWidth
              label="Question Text"
              variant="outlined"
              value={q.questionText}
              onChange={(e) => handleChange(i, "questionText", e.target.value)}
              sx={{
                mb: 3,
                input: { color: "#fff" },
                label: { color: "#bbb" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#5b86e5" },
                  "&:hover fieldset": { borderColor: "#00feba" },
                },
              }}
            />

            <Grid container spacing={2}>
              {q.options.map((opt, j) => (
                <Grid item xs={12} sm={6} key={j}>
                  <TextField
                    fullWidth
                    label={`Option ${j + 1}`}
                    variant="outlined"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(i, j, e.target.value)
                    }
                    sx={{
                      input: { color: "#fff" },
                      label: { color: "#bbb" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#5b86e5" },
                        "&:hover fieldset": { borderColor: "#00feba" },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <TextField
              fullWidth
              label="Correct Answer"
              variant="outlined"
              value={q.correctAnswer}
              onChange={(e) =>
                handleChange(i, "correctAnswer", e.target.value)
              }
              sx={{
                mt: 3,
                input: { color: "#fff" },
                label: { color: "#bbb" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#5b86e5" },
                  "&:hover fieldset": { borderColor: "#00feba" },
                },
              }}
            />
          </Paper>
        ))}

        <Box textAlign="center" mb={4}>
          <IconButton
            onClick={addQuestion}
            sx={{
              color: "#00feba",
              border: "2px dashed #00feba",
              p: 2,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#00feba11",
              },
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
          <Typography mt={1} sx={{ color: "#ccc" }}>
            Add Question
          </Typography>
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: "linear-gradient(to right, #00feba, #5b86e5)",
              color: "#121212",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              boxShadow: "0 0 15px #00feba",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 25px #00feba",
              },
            }}
          >
            Submit Quiz
          </Button>
        </Box>

        {quizCode && (
          <Fade in={true}>
            <Alert severity="success" sx={{ mt: 4 }}>
              Quiz Created! Share this code: <strong>{quizCode}</strong>
            </Alert>
          </Fade>
        )}
      </Paper>
    </Box>
  );
}

export default QuizPage;
