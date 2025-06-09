import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await axios.get("http://localhost:5001/api/quizzes/all");
        setQuizzes(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
    }
  }, [token]);

  const handleDelete = async (quizCode) => {
    if (!window.confirm("Delete this quiz?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/quizzes/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q.quizCode !== quizCode));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Typography>Loading quizzes...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" mb={3}>
        Quiz Dashboard
      </Typography>

      {quizzes.length === 0 && <Typography>No quizzes available.</Typography>}

      {quizzes.map((quiz) => (
        <Box
          key={quiz._id}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">{quiz.title || "Untitled Quiz"}</Typography>
          <Typography>Code: {quiz.quizCode}</Typography>
          <Typography>Questions: {quiz.questions?.length || 0}</Typography>

          {!isAdmin && (
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => navigate(`/attempt/${quiz.quizCode}`)}
            >
              Attempt
            </Button>
          )}

          {isAdmin && (
            <>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ mt: 1, mr: 1 }}
                onClick={() => handleDelete(quiz.quizCode)}
              >
                Delete
              </Button>
              {/* Add more admin buttons here if needed */}
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default QuizDash;
