import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, Card, CardContent, Grid, Skeleton, Button, Stack,
  Chip, Divider, Tooltip, useTheme, useMediaQuery, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import QuizIcon from "@mui/icons-material/Quiz";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScoreIcon from "@mui/icons-material/Score";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userSubmissions, setUserSubmissions] = useState({});
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [singleQuizView, setSingleQuizView] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const fetchUserSubmissions = async () => {
    try {
      const submissions = {};
      for (const quiz of quizzes) {
        const res = await axios.get(
          `http://localhost:5001/api/quizzes/submissions/${quiz.quizCode}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userAttempt = res.data.find((s) => s.email === userEmail);
        if (userAttempt) {
          submissions[quiz.quizCode] = userAttempt;
        }
      }
      setUserSubmissions(submissions);
    } catch (err) {
      console.error("Error fetching user submissions", err);
    }
  };

  const downloadScorecard = (quizCode, quizTitle) => {
    const submission = userSubmissions[quizCode];
    if (!submission) return;

    const data = [{
      "Quiz Title": quizTitle,
      "Quiz Code": quizCode,
      "User Email": submission.email,
      "Score": submission.score,
    }];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scorecard");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, `${quizTitle}_${quizCode}_scorecard.xlsx`);
  };

  useEffect(() => {
    fetchQuizzes();
    if (token) {
      const decoded = jwtDecode(token);
      setUserEmail(decoded.email);
      if (decoded.role === "admin") setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin && userEmail && quizzes.length > 0) {
      fetchUserSubmissions();
    }
  }, [quizzes, userEmail]);

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

  const fetchAllSubmissions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/quizzes/submissions/all",
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSingleQuizView({ quizCode, submissions: res.data });
      setShowSubmissions(false);
    } catch (err) {
      console.error("Failed to fetch quiz submissions", err);
    }
  };

  return (
    <Box sx={{ px: isMobile ? 2 : 6, py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          color: "#fff",
          py: 5,
          borderRadius: 3,
          boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
        }}
      >
        <Typography variant={isMobile ? "h4" : "h2"} fontWeight="900">
          Quiz Dashboard
        </Typography>
        <Typography variant={isMobile ? "body1" : "h6"} fontWeight="500">
          Manage, Attempt & Analyze Quizzes with ease
        </Typography>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 3 }} />
              <Skeleton sx={{ mt: 1, width: "60%" }} />
              <Skeleton sx={{ width: "40%" }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {quizzes.map((quiz) => {
            const userAttempt = userSubmissions[quiz.quizCode];
            return (
              <Grid item xs={12} sm={6} md={4} key={quiz._id}>
                <Card
                  elevation={8}
                  sx={{
                    borderRadius: 4,
                    transition: "transform 0.3s ease",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #e0e7ff 0%, #f7f9fc 100%)",
                    "&:hover": { transform: "translateY(-8px)" },
                    p: 2,
                  }}
                >
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <QuizIcon color="primary" fontSize="large" />
                      <Typography variant="h6" fontWeight="700" noWrap>
                        {quiz.title}
                      </Typography>
                    </Stack>
                    <Chip label={`Code: ${quiz.quizCode}`} color="primary" size="small" />
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      Questions: {quiz.questions?.length || 0}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {!isAdmin && (
                      <>
                        <Button
                          variant="contained"
                          disabled={!!userAttempt}
                          onClick={() => navigate(`/attempt/${quiz.quizCode}`)}
                        >
                          {userAttempt ? "Attempted" : "Attempt"}
                        </Button>
                        {userAttempt && (
                          <Tooltip title="Download Scorecard">
                            <Button
                              variant="outlined"
                              startIcon={<ScoreIcon />}
                              onClick={() => downloadScorecard(quiz.quizCode, quiz.title)}
                            >
                              Scorecard
                            </Button>
                          </Tooltip>
                        )}
                      </>
                    )}

                    {isAdmin && (
                      <>
                        <Tooltip title="Delete Quiz">
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(quiz.quizCode)}
                          >
                            Delete
                          </Button>
                        </Tooltip>
                        <Tooltip title="View Results">
                          <Button
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            onClick={() => fetchSubmissionsForQuiz(quiz.quizCode)}
                          >
                            View
                          </Button>
                        </Tooltip>
                        <Tooltip title="Download Excel">
                          <Button
                            variant="outlined"
                            color="success"
                            startIcon={<DownloadIcon />}
                            onClick={() =>
                              downloadScorecard(quiz.quizCode, quiz.title)
                            }
                          >
                            Excel
                          </Button>
                        </Tooltip>
                      </>
                    )}
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default QuizDash;
