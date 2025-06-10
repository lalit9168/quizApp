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
  Fade,
  Container,
  AppBar,
  Toolbar,
  Avatar,
  Chip,
  IconButton,
  Collapse,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import QuizIcon from "@mui/icons-material/Quiz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import ScoreIcon from "@mui/icons-material/Score";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [singleQuizView, setSingleQuizView] = useState(null);
  const [attemptedData, setAttemptedData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [loadingAction, setLoadingAction] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuizzes();
    attemptedQuiz();

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
      if (decoded.email) setUserEmail(decoded.email);
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

  const attemptedQuiz = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/quizzes/attempted-quiz");
      setAttemptedData(res.data);
    } catch (error) {
      console.error("Error fetching attempted quizzes:", error);
    }
  };

  const fetchAllSubmissions = async () => {
    setLoadingAction("submissions");
    try {
      const res = await axios.get("http://localhost:5001/api/quizzes/submissions/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissionsData(res.data);
      setSingleQuizView(null);
      setShowSubmissions(true);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoadingAction("");
    }
  };

  const fetchSubmissionsForQuiz = async (quizCode) => {
    setLoadingAction(`view-${quizCode}`);
    try {
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSingleQuizView({ quizCode, submissions: res.data });
      setShowSubmissions(false);
      setExpandedQuiz(quizCode);
    } catch (err) {
      console.error("Failed to fetch quiz submissions", err);
    } finally {
      setLoadingAction("");
    }
  };

  const handleDelete = async (quizCode) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    setLoadingAction(`delete-${quizCode}`);
    try {
      await axios.delete(`http://localhost:5001/api/quizzes/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q.quizCode !== quizCode));
    } catch (err) {
      console.error("Failed to delete quiz", err);
    } finally {
      setLoadingAction("");
    }
  };

  const downloadExcelForQuiz = async (quizCode, quizTitle) => {
    setLoadingAction(`download-${quizCode}`);
    try {
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const flatData = res.data.map((sub) => ({
        "Quiz Title": quizTitle,
        "Quiz Code": quizCode,
        "User Email": sub.email,
        Score: sub.score,
      }));

      if (flatData.length === 0) {
        alert("No submissions to export.");
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(flatData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, `${quizTitle}_${quizCode}_submissions.xlsx`);
    } catch (err) {
      console.error("Error downloading Excel", err);
    } finally {
      setLoadingAction("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isAttempted = (quizCode) => {
    const quiz = attemptedData.find((q) => q.quizCode === quizCode);
    return quiz?.attemptedUsers.includes(userEmail);
  };

  const toggleQuizExpansion = (quizCode) => {
    setExpandedQuiz(expandedQuiz === quizCode ? null : quizCode);
    if (singleQuizView?.quizCode === quizCode) {
      setSingleQuizView(null);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          color: "#1e293b",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: "#3b82f6",
                width: 40,
                height: 40,
              }}
            >
              <DashboardIcon />
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
                color: "#1e293b",
                cursor: "pointer",
                "&:hover": { color: "#3b82f6" },
                transition: "color 0.2s ease",
              }}
              onClick={() => navigate("/home")}
            >
              Quiz Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                Logged in as
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#1e293b",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {isAdmin ? "Admin" : "User"}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                color: "#64748b",
                borderColor: "#e2e8f0",
                fontWeight: "500",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#fee2e2",
                  borderColor: "#fca5a5",
                  color: "#dc2626",
                },
                transition: "all 0.2s ease",
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Fade in timeout={600}>
          <Box>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "800",
                  color: "#1e293b",
                  mb: 2,
                  letterSpacing: "-0.025em",
                }}
              >
                {isAdmin ? "Quiz Management" : "Available Quizzes"}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748b",
                  fontWeight: "400",
                  mb: 3,
                }}
              >
                {isAdmin
                  ? "Manage quizzes, view submissions, and download reports"
                  : "Browse and participate in available quizzes"}
              </Typography>

              {isAdmin && (
                <Button
                  variant="contained"
                  onClick={fetchAllSubmissions}
                  startIcon={
                    loadingAction === "submissions" ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <AssignmentIcon />
                    )
                  }
                  disabled={loadingAction === "submissions"}
                  sx={{
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    fontWeight: "600",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                    "&:hover": {
                      backgroundColor: "#2563eb",
                      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {loadingAction === "submissions" ? "Loading..." : "View All Submissions"}
                </Button>
              )}
            </Box>

            {/* All Submissions View */}
            {showSubmissions && submissionsData.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#f8fafc",
                      borderBottom: "1px solid #e2e8f0",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "700",
                        color: "#1e293b",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <AssignmentIcon sx={{ color: "#3b82f6" }} />
                      All Quiz Submissions
                    </Typography>
                  </Box>

                  <Box sx={{ p: 3 }}>
                    {submissionsData.map((quiz, index) => (
                      <Box key={quiz.quizCode} sx={{ mb: index < submissionsData.length - 1 ? 3 : 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#3b82f6",
                            fontWeight: "600",
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <QuizIcon />
                          {quiz.title} ({quiz.quizCode})
                        </Typography>

                        <TableContainer
                          component={Paper}
                          elevation={0}
                          sx={{
                            border: "1px solid #e2e8f0",
                            borderRadius: 2,
                          }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                                <TableCell sx={{ fontWeight: "600", color: "#374151" }}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <PersonIcon fontSize="small" />
                                    Email
                                  </Box>
                                </TableCell>
                                <TableCell sx={{ fontWeight: "600", color: "#374151" }}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <ScoreIcon fontSize="small" />
                                    Score
                                  </Box>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {quiz.submissions.map((sub, i) => (
                                <TableRow
                                  key={i}
                                  sx={{
                                    "&:hover": { backgroundColor: "#f8fafc" },
                                    transition: "background-color 0.2s ease",
                                  }}
                                >
                                  <TableCell sx={{ color: "#64748b" }}>{sub.email}</TableCell>
                                  <TableCell>
                                    <Chip
                                      label={sub.score}
                                      size="small"
                                      sx={{
                                        backgroundColor: "#dcfce7",
                                        color: "#166534",
                                        fontWeight: "600",
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        {index < submissionsData.length - 1 && <Divider sx={{ mt: 3 }} />}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Box>
            )}

            {/* Loading State */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <Box sx={{ textAlign: "center" }}>
                  <CircularProgress size={48} sx={{ color: "#3b82f6", mb: 2 }} />
                  <Typography variant="body1" sx={{ color: "#64748b" }}>
                    Loading quizzes...
                  </Typography>
                </Box>
              </Box>
            ) : quizzes.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                  p: 6,
                  textAlign: "center",
                }}
              >
                <QuizIcon sx={{ fontSize: 64, color: "#d1d5db", mb: 2 }} />
                <Typography variant="h6" sx={{ color: "#6b7280", mb: 1 }}>
                  No Quizzes Available
                </Typography>
                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                  {isAdmin ? "Create your first quiz to get started" : "Check back later for new quizzes"}
                </Typography>
              </Paper>
            ) : (
              /* Quizzes Grid */
              <Grid container spacing={3}>
                {quizzes.map((quiz) => {
                  const attempted = isAttempted(quiz.quizCode);
                  const isExpanded = expandedQuiz === quiz.quizCode;

                  return (
                    <Grid item xs={12} sm={6} lg={4} key={quiz._id}>
                      <Card
                        elevation={0}
                        sx={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 3,
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                            borderColor: "#3b82f6",
                          },
                        }}
                      >
                        {/* Card Header */}
                        <Box
                          sx={{
                            backgroundColor: attempted ? "#dcfce7" : "#f0f9ff",
                            borderBottom: "1px solid #e2e8f0",
                            p: 3,
                            position: "relative",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: attempted ? "#16a34a" : "#3b82f6",
                                width: 32,
                                height: 32,
                              }}
                            >
                              {attempted ? <CheckCircleIcon /> : <QuizIcon />}
                            </Avatar>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "700",
                                color: "#1e293b",
                                flexGrow: 1,
                              }}
                            >
                              {quiz.title || "Untitled Quiz"}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            <Chip
                              label={`Code: ${quiz.quizCode}`}
                              size="small"
                              sx={{
                                backgroundColor: "#fff",
                                color: "#64748b",
                                fontWeight: "500",
                                fontSize: "0.75rem",
                              }}
                            />
                            <Chip
                              label={`${quiz.questions?.length || 0} Questions`}
                              size="small"
                              sx={{
                                backgroundColor: "#fff",
                                color: "#64748b",
                                fontWeight: "500",
                                fontSize: "0.75rem",
                              }}
                            />
                          </Box>

                          {attempted && (
                            <Alert
                              severity="success"
                              sx={{
                                py: 0,
                                "& .MuiAlert-message": { fontSize: "0.875rem" },
                              }}
                            >
                              Quiz completed
                            </Alert>
                          )}
                        </Box>

                        <CardContent sx={{ p: 0 }}>
                          {/* User Actions */}
                          {!isAdmin && (
                            <Box sx={{ p: 3 }}>
                              <Button
                                fullWidth
                                variant="contained"
                                startIcon={attempted ? <ScoreIcon /> : <PlayArrowIcon />}
                                onClick={() => navigate(`/attempt/${quiz.quizCode}`)}
                                sx={{
                                  backgroundColor: attempted ? "#16a34a" : "#3b82f6",
                                  color: "#ffffff",
                                  fontWeight: "600",
                                  py: 1.5,
                                  borderRadius: 2,
                                  "&:hover": {
                                    backgroundColor: attempted ? "#15803d" : "#2563eb",
                                  },
                                  transition: "all 0.2s ease",
                                }}
                              >
                                {attempted ? "View Score" : "Start Quiz"}
                              </Button>
                            </Box>
                          )}

                          {/* Admin Actions */}
                          {isAdmin && (
                            <Box>
                              <Box sx={{ p: 3, pb: 2 }}>
                                <Grid container spacing={1}>
                                  <Grid item xs={4}>
                                    <Button
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                      startIcon={
                                        loadingAction === `delete-${quiz.quizCode}` ? (
                                          <CircularProgress size={16} />
                                        ) : (
                                          <DeleteIcon />
                                        )
                                      }
                                      disabled={loadingAction === `delete-${quiz.quizCode}`}
                                      onClick={() => handleDelete(quiz.quizCode)}
                                      sx={{
                                        color: "#dc2626",
                                        borderColor: "#fca5a5",
                                        "&:hover": {
                                          backgroundColor: "#fee2e2",
                                          borderColor: "#f87171",
                                        },
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Button
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                      startIcon={
                                        loadingAction === `view-${quiz.quizCode}` ? (
                                          <CircularProgress size={16} />
                                        ) : (
                                          <VisibilityIcon />
                                        )
                                      }
                                      disabled={loadingAction === `view-${quiz.quizCode}`}
                                      onClick={() => fetchSubmissionsForQuiz(quiz.quizCode)}
                                      sx={{
                                        color: "#3b82f6",
                                        borderColor: "#93c5fd",
                                        "&:hover": {
                                          backgroundColor: "#eff6ff",
                                          borderColor: "#60a5fa",
                                        },
                                      }}
                                    >
                                      View
                                    </Button>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <Button
                                      fullWidth
                                      variant="outlined"
                                      size="small"
                                      startIcon={
                                        loadingAction === `download-${quiz.quizCode}` ? (
                                          <CircularProgress size={16} />
                                        ) : (
                                          <DownloadIcon />
                                        )
                                      }
                                      disabled={loadingAction === `download-${quiz.quizCode}`}
                                      onClick={() => downloadExcelForQuiz(quiz.quizCode, quiz.title)}
                                      sx={{
                                        color: "#16a34a",
                                        borderColor: "#86efac",
                                        "&:hover": {
                                          backgroundColor: "#f0fdf4",
                                          borderColor: "#4ade80",
                                        },
                                      }}
                                    >
                                      Excel
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Box>

                              {/* Expandable Submissions Section */}
                              <Box
                                sx={{
                                  borderTop: "1px solid #e2e8f0",
                                  backgroundColor: "#f8fafc",
                                }}
                              >
                                <Button
                                  fullWidth
                                  onClick={() => toggleQuizExpansion(quiz.quizCode)}
                                  sx={{
                                    color: "#64748b",
                                    textTransform: "none",
                                    py: 1.5,
                                    justifyContent: "space-between",
                                    "&:hover": { backgroundColor: "#f1f5f9" },
                                  }}
                                  endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                >
                                  <Typography variant="body2" sx={{ fontWeight: "500" }}>
                                    Submissions
                                  </Typography>
                                </Button>

                                <Collapse in={isExpanded && singleQuizView?.quizCode === quiz.quizCode}>
                                  <Box sx={{ p: 2, pt: 0 }}>
                                    {singleQuizView?.submissions.length === 0 ? (
                                      <Typography
                                        variant="body2"
                                        sx={{ color: "#9ca3af", textAlign: "center", py: 2 }}
                                      >
                                        No submissions yet
                                      </Typography>
                                    ) : (
                                      <TableContainer
                                        component={Paper}
                                        elevation={0}
                                        sx={{
                                          border: "1px solid #e2e8f0",
                                          borderRadius: 1,
                                          maxHeight: 200,
                                          overflow: "auto",
                                        }}
                                      >
                                        <Table size="small">
                                          <TableHead>
                                            <TableRow sx={{ backgroundColor: "#ffffff" }}>
                                              <TableCell sx={{ fontWeight: "600", fontSize: "0.75rem" }}>
                                                Email
                                              </TableCell>
                                              <TableCell sx={{ fontWeight: "600", fontSize: "0.75rem" }}>
                                                Score
                                              </TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {singleQuizView?.submissions.map((sub, i) => (
                                              <TableRow
                                                key={i}
                                                sx={{
                                                  "&:hover": { backgroundColor: "#f8fafc" },
                                                }}
                                              >
                                                <TableCell sx={{ fontSize: "0.75rem", color: "#64748b" }}>
                                                  {sub.email}
                                                </TableCell>
                                                <TableCell>
                                                  <Chip
                                                    label={sub.score}
                                                    size="small"
                                                    sx={{
                                                      backgroundColor: "#dcfce7",
                                                      color: "#166534",
                                                      fontWeight: "600",
                                                      fontSize: "0.675rem",
                                                      height: 20,
                                                    }}
                                                  />
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    )}
                                  </Box>
                                </Collapse>
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default QuizDash;