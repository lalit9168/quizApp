import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
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
  const [attemptedData, setAttemptedData] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const attemptedQuiz = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/quizzes/attempted-quiz");
      setAttemptedData(res.data);
    } catch (error) {
      console.error("Error fetching attempted quizzes:", error);
    }
  };

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
      const res = await axios.get("http://localhost:5001/api/quizzes/submissions/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissionsData(res.data);
      setSingleQuizView(null);
      setShowSubmissions(true);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    }
  };

  const fetchSubmissionsForQuiz = async (quizCode) => {
    try {
      const res = await axios.get(`http://localhost:5001/api/quizzes/submissions/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const res = await axios.get(`http://localhost:5001/api/quizzes/submissions/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    fetchQuizzes();
    attemptedQuiz();

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
      if (decoded.email) setUserEmail(decoded.email);
    }
  }, []);

  const isAttempted = (quizCode) => {
    const quiz = attemptedData.find((q) => q.quizCode === quizCode);
    return quiz?.attemptedUsers.includes(userEmail);
  };

  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Quiz Dashboard</Typography>
        <Button
          variant="outlined"
          onClick={handleLogout}
          sx={{
            color: "#d32f2f",
            borderColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#ffebee",
              borderColor: "#b71c1c",
            },
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Admin Controls */}
      {isAdmin && (
        <Box mb={2} display="flex" justifyContent="center">
          <Button variant="contained" onClick={fetchAllSubmissions}>
            View All Submissions
          </Button>
        </Box>
      )}

      {/* Submissions Table */}
      {showSubmissions &&
        (submissionsData.length === 0 ? (
          <Typography>No submissions yet.</Typography>
        ) : (
          submissionsData.map((quiz) => (
            <Box key={quiz.quizCode} mb={4}>
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
        ))}

      {/* Single Quiz Submissions */}
      {singleQuizView && (
        <Box mb={4}>
          <Typography variant="h6">Submissions for {singleQuizView.quizCode}</Typography>
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

      {/* Quiz Cards */}
      {loading ? (
        <Typography>Loading quizzes...</Typography>
      ) : (
        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{quiz.title || "Untitled Quiz"}</Typography>
                  <Typography variant="body2">Code: {quiz.quizCode}</Typography>
                  <Typography variant="body2">
                    Questions: {quiz.questions?.length || 0}
                  </Typography>

                  {/* Non-admin users: Attempt or Attempted */}
                  {!isAdmin && (
                    <Button
                      variant={isAttempted(quiz.quizCode) ? "outlined" : "contained"}
                      disabled={isAttempted(quiz.quizCode)}
                      onClick={() => navigate(`/attempt/${quiz.quizCode}`)}
                      fullWidth
                      sx={{ mt: 1 }}
                    >
                      {isAttempted(quiz.quizCode) ? "Attempted" : "Attempt"}
                    </Button>
                  )}

                  {/* Admin Controls */}
                  {isAdmin && (
                    <Box mt={1} display="flex" flexDirection="column" gap={1}>
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(quiz.quizCode)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => fetchSubmissionsForQuiz(quiz.quizCode)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          downloadExcelForQuiz(quiz.quizCode, quiz.title)
                        }
                      >
                        Download Excel
                      </Button>
                    </Box>
                  )}
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
