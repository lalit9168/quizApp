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
  Chip,
  Divider,
  Tooltip,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import QuizIcon from "@mui/icons-material/Quiz";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
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

  useEffect(() => {
    fetchQuizzes();
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
    }
  }, []);

  return (
    <Box sx={{ px: isMobile ? 2 : 6, py: 4, background: "black" }}>
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
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          fontWeight="900"
          letterSpacing={2}
          gutterBottom
          sx={{ textShadow: "0 0 10px rgba(255,255,255,0.4)" }}
        >
          Quiz Dashboard
        </Typography>
        <Typography
          variant={isMobile ? "body1" : "h6"}
          fontWeight="500"
          sx={{ opacity: 0.9, letterSpacing: 1.2 }}
        >
          Manage, Attempt & Analyze Quizzes with ease
        </Typography>
      </Box>

      {isAdmin && (
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size={isMobile ? "medium" : "large"}
            onClick={fetchAllSubmissions}
            sx={{
              fontWeight: 700,
              px: 4,
              boxShadow:
                "0 3px 6px rgba(255, 105, 180, 0.5), 0 6px 12px rgba(255, 20, 147, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow:
                  "0 6px 12px rgba(255, 105, 180, 0.7), 0 10px 20px rgba(255, 20, 147, 0.5)",
                transform: "scale(1.05)",
              },
            }}
          >
            View All Submissions
          </Button>
        </Box>
      )}

      {/* All Submissions Table */}
      {showSubmissions && (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            All Quiz Submissions
          </Typography>
          {submissionsData.length === 0 ? (
            <Typography>No submissions yet.</Typography>
          ) : (
            submissionsData.map((quiz) => (
              <Box key={quiz.quizCode} sx={{ mb: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {quiz.title} ({quiz.quizCode})
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper} elevation={8} sx={{ boxShadow: 4 }}>
                  <Table size="small" sx={{ minWidth: 320 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {quiz.submissions.map((sub, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: theme.palette.action.hover,
                            },
                            "&:hover": {
                              backgroundColor: theme.palette.action.selected,
                              cursor: "pointer",
                            },
                          }}
                        >
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

      {/* Single Quiz Submissions */}
      {singleQuizView && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Submissions for{" "}
            <Box
              component="span"
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            >
              {singleQuizView.quizCode}
            </Box>
          </Typography>
          {singleQuizView.submissions.length === 0 ? (
            <Typography>No submissions yet.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={8} sx={{ boxShadow: 4 }}>
              <Table size="small" sx={{ minWidth: 320 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {singleQuizView.submissions.map((sub, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: theme.palette.action.hover,
                        },
                        "&:hover": {
                          backgroundColor: theme.palette.action.selected,
                          cursor: "pointer",
                        },
                      }}
                    >
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

      {/* Loading State */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton
                variant="rectangular"
                height={140}
                sx={{ borderRadius: 3, boxShadow: 3 }}
              />
              <Skeleton sx={{ mt: 1, width: "60%" }} />
              <Skeleton sx={{ width: "40%" }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={4}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id}>
              <Card
                elevation={8}
                sx={{
                  borderRadius: 4,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  background: `linear-gradient(135deg, #e0e7ff 0%, #f7f9fc 100%)`,
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                      "0 12px 20px rgba(66, 133, 244, 0.35), 0 10px 40px rgba(66, 133, 244, 0.25)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <QuizIcon color="primary" fontSize="large" />
                    <Typography variant="h6" fontWeight="700" noWrap>
                      {quiz.title || "Untitled Quiz"}
                    </Typography>
                  </Stack>

                  <Chip
                    label={`Code: ${quiz.quizCode}`}
                    color="primary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Questions: {quiz.questions?.length || 0}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={2}
                  justifyContent="flex-end"
                  flexWrap="wrap"
                >
                  {!isAdmin && (
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{
                        fontWeight: 600,
                        px: 3,
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        boxShadow:
                          "0 3px 5px 2px rgba(33, 203, 243, .3)",
                        transition: "transform 0.25s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          background:
                            "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
                        },
                      }}
                      onClick={() => navigate(`/attempt/${quiz.quizCode}`)}
                    >
                      Attempt
                    </Button>
                  )}
                  {isAdmin && (
                    <>
                      <Tooltip title="Delete Quiz">
                        <Button
                          variant="outlined"
                          color="error"
                          size="medium"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(quiz.quizCode)}
                          sx={{
                            fontWeight: 600,
                            px: 2,
                            borderWidth: 2,
                            "&:hover": {
                              borderWidth: 3,
                              boxShadow:
                                "0 0 10px rgba(244, 67, 54, 0.7)",
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </Tooltip>
                      <Tooltip title="View Quiz Results">
                        <Button
                          variant="outlined"
                          size="medium"
                          startIcon={<VisibilityIcon />}
                          onClick={() => fetchSubmissionsForQuiz(quiz.quizCode)}
                          sx={{
                            fontWeight: 600,
                            px: 2,
                            borderWidth: 2,
                            "&:hover": {
                              borderWidth: 3,
                              boxShadow:
                                "0 0 10px rgba(33, 150, 243, 0.7)",
                            },
                          }}
                        >
                          View
                        </Button>
                      </Tooltip>
                      <Tooltip title="Download Excel">
                        <Button
                          variant="outlined"
                          color="success"
                          size="medium"
                          startIcon={<DownloadIcon />}
                          onClick={() =>
                            downloadExcelForQuiz(quiz.quizCode, quiz.title)
                          }
                          sx={{
                            fontWeight: 600,
                            px: 2,
                            borderWidth: 2,
                            "&:hover": {
                              borderWidth: 3,
                              boxShadow:
                                "0 0 12px rgba(76, 175, 80, 0.7)",
                            },
                          }}
                        >
                          Excel
                        </Button>
                      </Tooltip>
                    </>
                  )}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default QuizDash;
