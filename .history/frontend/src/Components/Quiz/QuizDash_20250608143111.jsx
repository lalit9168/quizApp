import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [singleQuizView, setSingleQuizView] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/quizzes/all");
      setQuizzes(res.data);
    } catch (error) {
      console.error("Error fetching quizzes", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSubmissions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/quizzes/submissions/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmissionsData(res.data);
      setSingleQuizView(null);
      setShowSubmissions(true);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    }
  };

  const fetchSubmissionsForQuiz = async (quizCode) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSingleQuizView({ quizCode, submissions: res.data });
      setShowSubmissions(false);
    } catch (err) {
      console.error("Failed to fetch quiz submissions", err);
    }
  };

  const handleDelete = async (quizCode) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await axios.delete(`http://localhost:5001/api/quizzes/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q.quizCode !== quizCode));
    } catch (err) {
      console.error("Failed to delete quiz", err);
    }
  };

  const downloadExcelForQuiz = async (quizCode, quizTitle) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const flatData = res.data.map((sub) => ({
        "Quiz Title": quizTitle,
        "Quiz Code": quizCode,
        "User Email": sub.email,
        Score: sub.score,
      }));

      if (flatData.length === 0) {
        alert("No submissions to export for this quiz.");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(flatData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });

      saveAs(blob, `${quizTitle}_${quizCode}_submissions.xlsx`);
    } catch (err) {
      console.error("Error downloading Excel for quiz", err);
    }
  };

  const handleStartQuiz = async (quizCode) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(`http://localhost:5001/api/quizzes/start/${quizCode}`, {
      token,
    });

    // Navigate only after recording the start
    navigate(`/attempt/${quizCode}`);
  } catch (err) {
    console.error("Error starting quiz", err);
    alert("Could not start quiz.");
  }
};

  

  useEffect(() => {
    fetchQuizzes();
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
    }
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Quizzes
      </Typography>

      {isAdmin && (
        <Button
          variant="contained"
          onClick={fetchAllSubmissions}
          sx={{ mb: 2 }}
        >
          View All Submissions
        </Button>
      )}

      {showSubmissions && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Quiz Submissions
          </Typography>
          {submissionsData.length === 0 ? (
            <Typography>No submissions yet.</Typography>
          ) : (
            submissionsData.map((quiz) => (
              <Box key={quiz.quizCode} sx={{ mb: 4 }}>
                <Typography variant="h6">
                  {quiz.title} ({quiz.quizCode})
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {quiz.submissions.map((sub, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{sub.email}</TableCell>
                          <TableCell>{sub.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
          )}
        </Box>
      )}

      {singleQuizView && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Submissions for {singleQuizView.quizCode}
          </Typography>
          {singleQuizView.submissions.length === 0 ? (
            <Typography>No submissions yet.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {singleQuizView.submissions.map((sub, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>{sub.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} md={6} lg={4} key={quiz._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {quiz.title || "Untitled Quiz"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Code: <strong>{quiz.quizCode}</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Questions: {quiz.questions?.length || 0}
                  </Typography>

                  <Stack direction="row" spacing={1} mt={2}>
                    {!isAdmin && (
                      <Button
  variant="contained"
  size="small"
  onClick={() => handleStartQuiz(quiz.quizCode)}
>
  Attempt Quiz
</Button>

                    )}
                    {isAdmin && (
                      <>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(quiz.quizCode)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => fetchSubmissionsForQuiz(quiz.quizCode)}
                        >
                          View Results
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          onClick={() =>
                            downloadExcelForQuiz(quiz.quizCode, quiz.title)
                          }
                        >
                          Download Excel
                        </Button>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default QuizDash;
