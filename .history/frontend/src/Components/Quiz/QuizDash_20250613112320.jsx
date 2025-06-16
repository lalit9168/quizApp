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
  Modal,
  Backdrop,
  IconButton,
  Chip,
  Divider,
  Container,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import CloseIcon from "@mui/icons-material/Close";
import TrophyIcon from "@mui/icons-material/EmojiEvents";
import QuizIcon from "@mui/icons-material/Quiz";
import ScoreIcon from "@mui/icons-material/Assessment";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import api from "../api";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [singleQuizView, setSingleQuizView] = useState(null);
  const [attemptedData, setAttemptedData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [selectedQuizScore, setSelectedQuizScore] = useState(null);
  
  // Profile related states
  const [anchorEl, setAnchorEl] = useState(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuizzes();
    attemptedQuiz();

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
      if (decoded.email) setUserEmail(decoded.email);
      if (decoded.name) {
        setUserName(decoded.name);
        setNameInput(decoded.name);
      }
    }
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await api.get("api/quizzes/all");
      setQuizzes(res.data);
    } catch (error) {
      console.error("Error fetching quizzes", error);
    } finally {
      setLoading(false);
    }
  };

  const attemptedQuiz = async () => {
    try {
      const res = await api.get("api/quizzes/attempted-quiz");
      setAttemptedData(res.data);
    } catch (error) {
      console.error("Error fetching attempted quizzes:", error);
    }
  };

  const fetchAllSubmissions = async () => {
    try {
      const res = await api.get("api/quizzes/submissions/all", {
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
      const res = await api.get(
        `api/quizzes/submissions/${quizCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
      await api.delete(`api/quizzes/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q.quizCode !== quizCode));
    } catch (err) {
      console.error("Failed to delete quiz", err);
    }
  };

  const downloadExcelForQuiz = async (quizCode, quizTitle) => {
    try {
      const res = await api.get(
        `api/quizzes/submissions/${quizCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const flatData = res.data.map((sub) => ({
        "Quiz Title": quizTitle,
        "Quiz Code": quizCode,
        "User Email": sub.email,
        Score: sub.score,
      }));

      if (flatData.length === 0) return alert("No submissions to export.");

      const worksheet = XLSX.utils.json_to_sheet(flatData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, `${quizTitle}_${quizCode}_submissions.xlsx`);
    } catch (err) {
      console.error("Error downloading Excel", err);
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

  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "#4ade80";
    if (percentage >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getPerformanceText = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 80) return "Great Job!";
    if (percentage >= 70) return "Good Work!";
    if (percentage >= 60) return "Not Bad!";
    return "Keep Trying!";
  };

  // Profile related functions
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfileOpen = () => {
    setEditProfileOpen(true);
    handleProfileMenuClose();
  };

  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
  };

  const handleChangePasswordOpen = () => {
    setChangePasswordOpen(true);
    handleProfileMenuClose();
  };

  const handleChangePasswordClose = () => {
    setChangePasswordOpen(false);
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await api.put(
        "api/users/update-profile",
        { name: nameInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserName(nameInput);
      // Update token if needed
      handleEditProfileClose();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      {/* Modern Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 48,
                height: 48,
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <DashboardIcon sx={{ color: "#fff" }} />
            </Avatar>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "800",
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                Quiz Dashboard
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem" }}
              >
                {isAdmin ? "Admin Panel" : "Student Portal"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "rgba(255,255,255,0.2)",
                }}
              >
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#fff", fontWeight: "600" }}
                >
                  {userName || "User"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem" }}
                >
                  {userEmail}
                </Typography>
              </Box>
            </Box>
            
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ color: "rgba(255,255,255,0.8)" }}
            >
              <MoreVertIcon />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleEditProfileOpen}>
                <EditIcon sx={{ mr: 1, color: "#64748b" }} />
                Edit Profile
              </MenuItem>
              <MenuItem onClick={handleChangePasswordOpen}>
                <LockResetIcon sx={{ mr: 1, color: "#64748b" }} />
                Change Password
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1, color: "#64748b" }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Fade in timeout={1000}>
          <Box>
            {/* Admin Controls */}
            {isAdmin && (
              <Box mb={4} textAlign="center">
                <Button
                  variant="contained"
                  onClick={fetchAllSubmissions}
                  startIcon={<ScoreIcon />}
                  sx={{
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    color: "#fff",
                    fontWeight: "700",
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: "1rem",
                    boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 30px rgba(102, 126, 234, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  View All Submissions
                </Button>
              </Box>
            )}

            {/* Submissions Display */}
            {showSubmissions && submissionsData.length > 0 && (
              <Box mb={4}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "700",
                    color: "#1e293b",
                    mb: 3,
                    textAlign: "center",
                  }}
                >
                  All Quiz Submissions
                </Typography>
                {submissionsData.map((quiz) => (
                  <Paper
                    key={quiz.quizCode}
                    elevation={0}
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        background: "linear-gradient(135deg, #667eea, #764ba2)",
                        color: "#fff",
                        p: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight="700">
                        {quiz.title} ({quiz.quizCode})
                      </Typography>
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                            <TableCell sx={{ fontWeight: "600", color: "#475569" }}>
                              Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: "600", color: "#475569" }}>
                              Score
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {quiz.submissions.map((sub, i) => (
                            <TableRow
                              key={i}
                              sx={{
                                "&:nth-of-type(odd)": { backgroundColor: "#f8fafc" },
                                "&:hover": { backgroundColor: "#e2e8f0" },
                              }}
                            >
                              <TableCell>{sub.email}</TableCell>
                              <TableCell>
                                <Chip
                                  label={sub.score}
                                  size="small"
                                  sx={{
                                    backgroundColor: "#10b981",
                                    color: "#fff",
                                    fontWeight: "600",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                ))}
              </Box>
            )}

            {/* Single Quiz Submissions */}
            {singleQuizView && (
              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "#fff",
                    p: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="700">
                    Submissions for {singleQuizView.quizCode}
                  </Typography>
                </Box>
                {singleQuizView.submissions.length === 0 ? (
                  <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography color="#64748b">No submissions yet.</Typography>
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f8fafc" }}>
                          <TableCell sx={{ fontWeight: "600", color: "#475569" }}>
                            Email
                          </TableCell>
                          <TableCell sx={{ fontWeight: "600", color: "#475569" }}>
                            Score
                          </TableCell>
                        </TableHead>
                      </TableHead>
                      <TableBody>
                        {singleQuizView.submissions.map((sub, i) => (
                          <TableRow
                            key={i}
                            sx={{
                              "&:nth-of-type(odd)": { backgroundColor: "#f8fafc" },
                              "&:hover": { backgroundColor: "#e2e8f0" },
                            }}
                          >
                            <TableCell>{sub.email}</TableCell>
                            <TableCell>
                              <Chip
                                label={sub.score}
                                size="small"
                                sx={{
                                  backgroundColor: "#10b981",
                                  color: "#fff",
                                  fontWeight: "600",
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            )}

            {/* Quiz Cards */}
            {loading ? (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" color="#64748b">
                  Loading quizzes...
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {quizzes.map((quiz) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={quiz._id}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        border: "1px solid #e2e8f0",
                        background: "#fff",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background: "linear-gradient(90deg, #667eea, #764ba2)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: "rgba(102, 126, 234, 0.1)",
                              color: "#667eea",
                              width: 48,
                              height: 48,
                              mr: 2,
                            }}
                          >
                            <QuizIcon />
                          </Avatar>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "700",
                                color: "#1e293b",
                                mb: 0.5,
                                lineHeight: 1.2,
                              }}
                            >
                              {quiz.title || "Untitled Quiz"}
                            </Typography>
                            <Chip
                              label={quiz.quizCode}
                              size="small"
                              sx={{
                                backgroundColor: "#f1f5f9",
                                color: "#475569",
                                fontSize: "0.75rem",
                                fontWeight: "600",
                              }}
                            />
                          </Box>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body2"
                            sx={{ color: "#64748b", display: "flex", alignItems: "center", mb: 1 }}
                          >
                            <StarIcon sx={{ fontSize: 16, mr: 1, color: "#f59e0b" }} />
                            {quiz.questions?.length || 0} Questions
                          </Typography>
                          
                          {isAttempted(quiz.quizCode) && (
                            <Chip
                              label="Completed"
                              size="small"
                              sx={{
                                backgroundColor: "#dcfce7",
                                color: "#16a34a",
                                fontWeight: "600",
                              }}
                            />
                          )}
                        </Box>

                        {!isAdmin && (
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                              if (isAttempted(quiz.quizCode)) {
                                navigate(`/attempt/${quiz.quizCode}`)
                              } else {
                                navigate(`/attempt/${quiz.quizCode}`);
                              }
                            }}
                            sx={{
                              background: isAttempted(quiz.quizCode)
                                ? "linear-gradient(45deg, #10b981, #059669)"
                                : "linear-gradient(45deg, #667eea, #764ba2)",
                              color: "#fff",
                              fontWeight: "600",
                              py: 1.5,
                              borderRadius: 2,
                              boxShadow: "none",
                              "&:hover": {
                                transform: "translateY(-1px)",
                                boxShadow: isAttempted(quiz.quizCode)
                                  ? "0 8px 20px rgba(16, 185, 129, 0.3)"
                                  : "0 8px 20px rgba(102, 126, 234, 0.3)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            {isAttempted(quiz.quizCode) ? "View Score" : "Start Quiz"}
                          </Button>
                        )}

                        {isAdmin && (
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDelete(quiz.quizCode)}
                              sx={{
                                color: "#ef4444",
                                borderColor: "#fecaca",
                                "&:hover": {
                                  backgroundColor: "#fef2f2",
                                  borderColor: "#ef4444",
                                },
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<VisibilityIcon />}
                              onClick={() => fetchSubmissionsForQuiz(quiz.quizCode)}
                              sx={{
                                color: "#3b82f6",
                                borderColor: "#bfdbfe",
                                "&:hover": {
                                  backgroundColor: "#eff6ff",
                                  borderColor: "#3b82f6",
                                },
                              }}
                            >
                              View Submissions
                            </Button>
                            <Button
                              fullWidth
                              variant="outlined"
                              startIcon={<DownloadIcon />}
                              onClick={() => downloadExcelForQuiz(quiz.quizCode, quiz.title)}
                              sx={{
                                color: "#10b981",
                                borderColor: "#bbf7d0",
                                "&:hover": {
                                  backgroundColor: "#ecfdf5",
                                  borderColor: "#10b981",
                                },
                              }}
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
        </Fade>
      </Container>

      {/* Score Popup Modal */}
      <Modal
        open={scoreModalOpen}
        onClose={() => setScoreModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(5px)" },
        }}
      >
        <Fade in={scoreModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 },
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: "#fff",
                border: "1px solid #e2e8f0",
                position: "relative",
              }}
            >
              {/* Modal Header */}
              <Box
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  p: 3,
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <IconButton
                  onClick={() => setScoreModalOpen(false)}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: "rgba(255,255,255,0.8)",
                    "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    border: "3px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <TrophyIcon sx={{ fontSize: 40, color: "#fbbf24" }} />
                </Avatar>
                
                <Typography variant="h5" fontWeight="700" gutterBottom>
                  Quiz Results
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {selectedQuizScore?.quizTitle}
                </Typography>
              </Box>

              {/* Modal Content */}
              {selectedQuizScore && (
                <Box sx={{ p: 4 }}>
                  {/* Score Display */}
                  <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: `conic-gradient(${getScoreColor(selectedQuizScore.score, selectedQuizScore.totalQuestions)} ${(selectedQuizScore.score / selectedQuizScore.totalQuestions) * 360}deg, #e2e8f0 0deg)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          width: 90,
                          height: 90,
                          borderRadius: "50%",
                          backgroundColor: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "800",
                            color: getScoreColor(selectedQuizScore.score, selectedQuizScore.totalQuestions),
                            lineHeight: 1,
                          }}
                        >
                          {selectedQuizScore.score}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.75rem" }}>
                          out of {selectedQuizScore.totalQuestions}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "700",
                        color: getScoreColor(selectedQuizScore.score, selectedQuizScore.totalQuestions),
                        mb: 1,
                      }}
                    >
                      {getPerformanceText(selectedQuizScore.score, selectedQuizScore.totalQuestions)}
                    </Typography>
                    
                    <Typography variant="body1" sx={{ color: "#64748b" }}>
                      You scored {Math.round((selectedQuizScore.score / selectedQuizScore.totalQuestions) * 100)}%
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Score Details */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: "700", color: "#10b981" }}>
                        {selectedQuizScore.score}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Correct
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: "700", color: "#ef4444" }}>
                        {selectedQuizScore.totalQuestions - selectedQuizScore.score}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Incorrect
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center", flex: 1 }}>
                      <Typography variant="h5" sx={{ fontWeight: "700", color: "#3b82f6" }}>
                        {selectedQuizScore.totalQuestions}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Total
                      </Typography>
                    </Box>
                  </Box>

                  {/* Action Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setScoreModalOpen(false)}
                    sx={{
                      background: "linear-gradient(45deg, #667eea, #764ba2)",
                      color: "#fff",
                      fontWeight: "600",
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: "none",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>
        </Fade>
      </Modal>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onClose={handleEditProfileClose}>
        <DialogTitle sx={{ fontWeight: "600", color: "#1e293b" }}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 300 }}>
            <TextField
              fullWidth
              label="Name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={userEmail}
              disabled
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditProfileClose}
            sx={{ color: "#64748b", fontWeight: "600" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleProfileUpdate}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "#fff",
              fontWeight: "600",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(102, 126, 234, 0.3)",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onClose={handleChangePasswordClose}>
        <DialogTitle sx={{ fontWeight: "600", color: "#1e293b" }}>
          Change Password
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, minWidth: 300 }}>
            <TextField
              fullWidth
              type="password"
              label="Current Password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Confirm New Password"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleChangePasswordClose}
            sx={{ color: "#64748b", fontWeight: "600" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "#fff",
              fontWeight: "600",
              "&:hover": {
                boxShadow: "0 4px 10px rgba(102, 126, 234, 0.3)",
              },
            }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default QuizDash;