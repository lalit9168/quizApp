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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  ListItemIcon,
  Alert,
  Snackbar,
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
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [selectedQuizScore, setSelectedQuizScore] = useState(null);
  
  // Profile related states
  const [userName, setUserName] = useState("");
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuizzes();
    attemptedQuiz();
    fetchUserProfile();

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
      if (decoded.email) setUserEmail(decoded.email);
      if (decoded.name) setUserName(decoded.name);
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

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData({
        name: res.data.name || "",
        email: res.data.email || "",
      });
      setUserName(res.data.name || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await api.put("api/user/profile", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(profileData.name);
      setEditProfileOpen(false);
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "New passwords don't match",
        severity: "error",
      });
      return;
    }

    try {
      await api.put("api/user/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChangePasswordOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSnackbar({
        open: true,
        message: "Password changed successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to change password",
        severity: "error",
      });
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

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const openEditProfile = () => {
    setEditProfileOpen(true);
    handleProfileMenuClose();
  };

  const openChangePassword = () => {
    setChangePasswordOpen(true);
    handleProfileMenuClose();
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
            {/* User Profile Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={handleProfileMenuOpen}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: "rgba(255,255,255,0.2)",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Box sx={{ textAlign: "left", display: { xs: "none", sm: "block" } }}>
                  <Typography variant="body2" sx={{ fontWeight: "600", lineHeight: 1 }}>
                    {userName || "User"}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8, lineHeight: 1 }}>
                    {userEmail}
                  </Typography>
                </Box>
                <ExpandMoreIcon sx={{ fontSize: 20 }} />
              </Button>

              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 200,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <MenuItem onClick={openEditProfile}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={openChangePassword}>
                  <ListItemIcon>
                    <LockIcon fontSize="small" />
                  </ListItemIcon>
                  Change Password
                </MenuItem>
              </Menu>
            </Box>

            <Button
              variant="outlined"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
                fontWeight: "600",
                px: 3,
                py: 1,
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.5)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Logout
            </Button>
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
                        </TableRow>
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

      {/* Edit Profile Dialog */}
      <Dialog
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EditIcon />
          Edit Profile
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Full Name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              fullWidth
              variant="outlined"
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setEditProfileOpen(false)}
            sx={{ color: "#64748b", fontWeight: "600" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProfile}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              fontWeight: "600",
              px: 3,
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "#fff",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LockIcon />
          Change Password
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPasswor