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
import jwtDecode from "jwt-decode";
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

  useEffect(() => {
    fetchQuizzes();
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
    }
  }, []);

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

  // Custom styles for neumorphic cards and buttons
  const cardStyle = {
    borderRadius: 16,
    boxShadow:
      "6px 6px 16px #d1d9e6, -6px -6px 16px #ffffff",
    backgroundColor: theme.palette.background.paper,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 3,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow:
        "12px 12px 24px #b0b8c6, -12px -12px 24px #ffffff",
    },
  };

  const buttonStyle = {
    borderRadius: 30,
    fontWeight: 700,
    px: 4,
    py: 1.2,
    textTransform: "none",
    boxShadow: "none",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: `0 8px 15px ${theme.palette.primary.main}70`,
      transform: "scale(1.05)",
    },
  };

  return (
    <Box sx={{ px: isMobile ? 3 : 8, py: 5, fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: "center",
          mb: 6,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "#fff",
          py: isMobile ? 6 : 8,
          borderRadius: 4,
          boxShadow: "0 10px 30px rgb(0 0 0 / 0.15)",
          position: "relative",
          overflow: "hidden",
          fontWeight: 900,
          letterSpacing: 3,
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h1"}
          sx={{
            textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
            fontWeight: "900",
            mb: 1,
          }}
        >
          Quiz Dashboard
        </Typography>
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{ opacity: 0.85, fontWeight: 500, letterSpacing: 2 }}
        >
          Manage, Attempt & Analyze Quizzes Effortlessly
        </Typography>
      </Box>

      {/* Admin Button */}
      {isAdmin && (
        <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size={isMobile ? "medium" : "large"}
            onClick={fetchAllSubmissions}
            sx={{
              ...buttonStyle,
              background:
                "linear-gradient(135deg, #ff4081, #f50057)",
              color: "#fff",
            }}
          >
            View All Submissions
          </Button>
        </Box>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <Grid container spacing={4}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton
                variant="rounded"
                height={180}
                sx={{
                  borderRadius: 4,
                  boxShadow: "6px 6px 16px #d1d9e6, -6px -6px 16px #fff",
                }}
              />
              <Skeleton sx={{ mt: 2, width: "65%", borderRadius: 3 }} />
              <Skeleton sx={{ width: "40%", borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {/* Submissions Overview (Admin) */}
          {showSubmissions && (
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ mb: 3, fontWeight: 700 }}
              >
                All Quiz Submissions
              </Typography>
              {submissionsData.length === 0 ? (
                <Typography>No submissions yet.</Typography>
              ) : (
                submissionsData.map((quiz) => (
                  <Box key={quiz.quizCode} sx={{ mb: 6 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
                    >
                      {quiz.title} <Chip label={quiz.quizCode} color="secondary" size="small" />
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <TableContainer
                      component={Paper}
                      elevation={3}
                      sx={{ borderRadius: 3 }}
                    >
                      <Table size="small" sx={{ minWidth: 320 }}>
                        <TableHead>
                          <TableRow
                            sx={{
                              backgroundColor: theme.palette.grey[100],
                            }}
                          >
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Score
                            </TableCell>
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
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ mb: 3, fontWeight: 700 }}
              >
                Submissions for{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main, fontWeight: 800 }}
                >
                  {singleQuizView.quizCode}
                </Box>
              </Typography>
              {singleQuizView.submissions.length === 0 ? (
                <Typography>No submissions yet.</Typography>
              ) : (
                <TableContainer
                  component={Paper}
                  elevation={3}
                  sx={{ borderRadius: 3 }}
                >
                  <Table size="small" sx={{ minWidth: 320 }}>
                    <TableHead>
                      <TableRow
                        sx={{ backgroundColor: theme.palette.grey[100] }}
                      >
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

          {/* Quiz Cards Grid */}
          <Grid container spacing={5}>
            {quizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz._id}>
                <Card sx={cardStyle} elevation={0}>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                      <QuizIcon
                        color="primary"
                        fontSize="large"
                        sx={{ filter: "drop-shadow(0 0 2px rgba(33, 150, 243, 0.6))" }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight="800"
                        noWrap
                        sx={{ color: theme.palette.primary.dark }}
                      >
                        {quiz.title || "Untitled Quiz"}
                      </Typography>
                    </Stack>

                    <Chip
                      label={`Code: ${quiz.quizCode}`}
                      color="primary"
                      size="small"
                      sx={{
                        fontWeight: "600",
                        mb: 1,
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        boxShadow: `0 4px 6px ${theme.palette.primary.main}55`,
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, fontWeight: 500 }}
                    >
                      {`Questions: ${quiz.questions?.length || 0}`}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

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
                          ...buttonStyle,
                          background:
                            "linear-gradient(135deg, #42a5f5, #478ed1)",
                          color: "#fff",
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
                              ...buttonStyle,
                              borderColor: theme.palette.error.main,
                              color: theme.palette.error.dark,
                              "&:hover": {
                                borderColor: theme.palette.error.dark,
                                boxShadow: "0 0 15px rgba(244, 67, 54, 0.6)",
                                transform: "scale(1.1)",
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
                              ...buttonStyle,
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.dark,
                              "&:hover": {
                                borderColor: theme.palette.primary.dark,
                                boxShadow: "0 0 15px rgba(33, 150, 243, 0.6)",
                                transform: "scale(1.1)",
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
                              ...buttonStyle,
                              borderColor: theme.palette.success.main,
                              color: theme.palette.success.dark,
                              "&:hover": {
                                borderColor: theme.palette.success.dark,
                                boxShadow: "0 0 15px rgba(76, 175, 80, 0.6)",
                                transform: "scale(1.1)",
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
        </>
      )}
    </Box>
  );
}

export default QuizDash;
