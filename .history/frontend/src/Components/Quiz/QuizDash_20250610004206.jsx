import React, { useEffect, useState } from "react";
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
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quiz as QuizIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  ExitToApp as LogoutIcon,
  Assignment as SubmissionIcon,
  TrendingUp as StatsIcon,
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  Person as PersonIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([
    {
      _id: "1",
      title: "JavaScript Fundamentals",
      quizCode: "JS001",
      questions: new Array(10).fill({}),
      createdAt: "2024-06-01",
      difficulty: "Beginner"
    },
    {
      _id: "2",
      title: "React Advanced Concepts",
      quizCode: "REACT002",
      questions: new Array(15).fill({}),
      createdAt: "2024-06-05",
      difficulty: "Advanced"
    },
    {
      _id: "3",
      title: "CSS Grid & Flexbox",
      quizCode: "CSS003",
      questions: new Array(8).fill({}),
      createdAt: "2024-06-08",
      difficulty: "Intermediate"
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true); // Demo: set to true
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [singleQuizView, setSingleQuizView] = useState(null);
  const [attemptedData, setAttemptedData] = useState([]);
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [showStats, setShowStats] = useState(false);

  // Demo data
  const demoSubmissions = [
    {
      quizCode: "JS001",
      title: "JavaScript Fundamentals",
      submissions: [
        { email: "student1@example.com", score: 85 },
        { email: "student2@example.com", score: 92 },
        { email: "student3@example.com", score: 78 }
      ]
    },
    {
      quizCode: "REACT002",
      title: "React Advanced Concepts",
      submissions: [
        { email: "student1@example.com", score: 88 },
        { email: "student4@example.com", score: 95 }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setAttemptedData([
        { quizCode: "JS001", attemptedUsers: ["user@example.com"] }
      ]);
    }, 1500);
  }, []);

  const fetchAllSubmissions = () => {
    setSubmissionsData(demoSubmissions);
    setSingleQuizView(null);
    setShowSubmissions(true);
    setShowStats(true);
  };

  const fetchSubmissionsForQuiz = (quizCode) => {
    const quiz = demoSubmissions.find(q => q.quizCode === quizCode);
    if (quiz) {
      setSingleQuizView({ quizCode, submissions: quiz.submissions });
      setShowSubmissions(false);
    }
  };

  const handleDelete = (quizCode) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    setQuizzes(prev => prev.filter(q => q.quizCode !== quizCode));
  };

  const downloadExcelForQuiz = (quizCode, quizTitle) => {
    alert(`Downloading Excel for ${quizTitle} (${quizCode})`);
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  const isAttempted = (quizCode) => {
    const quiz = attemptedData.find(q => q.quizCode === quizCode);
    return quiz?.attemptedUsers.includes(userEmail);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return '#4caf50';
      case 'intermediate': return '#ff9800';
      case 'advanced': return '#f44336';
      default: return '#2196f3';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {[
          { color: "rgba(76, 175, 80, 0.1)", size: 100, top: "10%", left: "5%", delay: 0 },
          { color: "rgba(33, 150, 243, 0.08)", size: 120, top: "70%", right: "10%", delay: 1 },
          { color: "rgba(156, 39, 176, 0.06)", size: 80, bottom: "20%", left: "80%", delay: 2 },
        ].map((shape, i) => (
          <motion.div
            key={i}
            style={{
              width: shape.size,
              height: shape.size,
              background: `radial-gradient(circle, ${shape.color}, transparent)`,
              borderRadius: "50%",
              position: "absolute",
              ...shape
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              p: 3,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  width: 56,
                  height: 56
                }}
              >
                <QuizIcon sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Quiz Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage and track your quizzes
                </Typography>
              </Box>
            </Box>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                  color: "white",
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(255, 107, 107, 0.4)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(255, 107, 107, 0.6)",
                  }
                }}
              >
                Logout
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Admin Controls */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box mb={4} textAlign="center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  onClick={fetchAllSubmissions}
                  startIcon={<SubmissionIcon />}
                  sx={{
                    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    px: 4,
                    py: 2,
                    borderRadius: 4,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    boxShadow: "0 8px 25px rgba(79, 172, 254, 0.4)",
                    "&:hover": {
                      boxShadow: "0 12px 35px rgba(79, 172, 254, 0.6)",
                    }
                  }}
                >
                  View All Submissions
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        )}

        {/* Stats Cards */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              variants={statsVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Grid container spacing={3} mb={4}>
                {[
                  { label: "Total Quizzes", value: quizzes.length, icon: <QuizIcon />, color: "#667eea" },
                  { label: "Total Submissions", value: "156", icon: <PersonIcon />, color: "#f093fb" },
                  { label: "Average Score", value: "87%", icon: <TrophyIcon />, color: "#4facfe" },
                  { label: "Active Users", value: "42", icon: <StarIcon />, color: "#ff6b6b" }
                ].map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(20px)",
                          border: `2px solid ${stat.color}20`,
                          borderRadius: 3,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: `0 10px 30px ${stat.color}30`
                          }
                        }}
                      >
                        <CardContent sx={{ textAlign: "center", py: 3 }}>
                          <Box
                            sx={{
                              display: "inline-flex",
                              p: 2,
                              borderRadius: 2,
                              background: `${stat.color}15`,
                              color: stat.color,
                              mb: 2
                            }}
                          >
                            {stat.icon}
                          </Box>
                          <Typography variant="h4" fontWeight="bold" color={stat.color}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submissions View */}
        <AnimatePresence>
          {showSubmissions && submissionsData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box mb={4}>
                <Typography variant="h5" fontWeight="bold" mb={3} color="#333">
                  All Quiz Submissions
                </Typography>
                {submissionsData.map((quiz, index) => (
                  <motion.div
                    key={quiz.quizCode}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        mb: 3,
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(20px)",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" fontWeight="bold" color="#667eea" gutterBottom>
                          {quiz.title} ({quiz.quizCode})
                        </Typography>
                        <TableContainer sx={{ borderRadius: 2, overflow: "hidden" }}>
                          <Table>
                            <TableHead>
                              <TableRow sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Score</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {quiz.submissions.map((sub, i) => (
                                <TableRow
                                  key={i}
                                  sx={{
                                    "&:nth-of-type(odd)": { backgroundColor: "#f8f9fa" },
                                    "&:hover": { backgroundColor: "#e3f2fd" }
                                  }}
                                >
                                  <TableCell>{sub.email}</TableCell>
                                  <TableCell>
                                    <Chip
                                      label={`${sub.score}%`}
                                      color={sub.score >= 80 ? "success" : sub.score >= 60 ? "warning" : "error"}
                                      variant="outlined"
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Single Quiz View */}
        <AnimatePresence>
          {singleQuizView && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <Alert
                severity="info"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  "& .MuiAlert-message": { fontSize: "1.1rem" }
                }}
              >
                Viewing submissions for quiz: <strong>{singleQuizView.quizCode}</strong>
              </Alert>
              
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  borderRadius: 3,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
                }}
              >
                <CardContent>
                  {singleQuizView.submissions.length === 0 ? (
                    <Box textAlign="center" py={4}>
                      <QuizIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No submissions yet for this quiz
                      </Typography>
                    </Box>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Score</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {singleQuizView.submissions.map((sub, i) => (
                            <motion.tr
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              component={TableRow}
                              sx={{
                                "&:nth-of-type(odd)": { backgroundColor: "#f8f9fa" },
                                "&:hover": { backgroundColor: "#e3f2fd" }
                              }}
                            >
                              <TableCell>{sub.email}</TableCell>
                              <TableCell>
                                <Chip
                                  label={`${sub.score}%`}
                                  color={sub.score >= 80 ? "success" : sub.score >= 60 ? "warning" : "error"}
                                  variant="outlined"
                                />
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Cards */}
        {loading ? (
          <Box textAlign="center" py={8}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <QuizIcon sx={{ fontSize: 64, color: "#667eea" }} />
            </motion.div>
            <Typography variant="h6" color="text.secondary" mt={2}>
              Loading quizzes...
            </Typography>
          </Box>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography variant="h5" fontWeight="bold" mb={3} color="#333">
              Available Quizzes
            </Typography>
            <Grid container spacing={3}>
              {quizzes.map((quiz, index) => (
                <Grid item xs={12} sm={6} md={4} key={quiz._id}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    layout
                  >
                    <Card
                      sx={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(20px)",
                        border: "2px solid transparent",
                        borderRadius: 4,
                        overflow: "hidden",
                        position: "relative",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          borderColor: "#667eea30",
                          boxShadow: "0 15px 40px rgba(102, 126, 234, 0.2)"
                        }
                      }}
                    >
                      <Box
                        sx={{
                          background: `linear-gradient(135deg, ${getDifficultyColor(quiz.difficulty)}20, transparent)`,
                          p: 3,
                          position: "relative"
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Avatar
                            sx={{
                              background: `linear-gradient(135deg, ${getDifficultyColor(quiz.difficulty)}, ${getDifficultyColor(quiz.difficulty)}dd)`,
                              width: 48,
                              height: 48
                            }}
                          >
                            <QuizIcon />
                          </Avatar>
                          <Chip
                            label={quiz.difficulty}
                            size="small"
                            sx={{
                              background: getDifficultyColor(quiz.difficulty),
                              color: "white",
                              fontWeight: "bold"
                            }}
                          />
                        </Box>

                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "#333" }}>
                          {quiz.title || "Untitled Quiz"}
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={1} mb={3}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                              Code:
                            </Typography>
                            <Chip label={quiz.quizCode} size="small" variant="outlined" />
                          </Box>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" color="text.secondary">
                              Questions:
                            </Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {quiz.questions?.length || 0}
                            </Typography>
                          </Box>
                        </Box>

                        {!isAdmin && (
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              fullWidth
                              variant={isAttempted(quiz.quizCode) ? "outlined" : "contained"}
                              startIcon={isAttempted(quiz.quizCode) ? <CheckIcon /> : <PlayIcon />}
                              sx={{
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 600,
                                textTransform: "none",
                                fontSize: "1rem",
                                background: isAttempted(quiz.quizCode) 
                                  ? "transparent" 
                                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: isAttempted(quiz.quizCode) ? "#667eea" : "white",
                                borderColor: "#667eea",
                                "&:hover": {
                                  background: isAttempted(quiz.quizCode) 
                                    ? "#667eea10" 
                                    : "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)"
                                }
                              }}
                              onClick={() => alert(`${isAttempted(quiz.quizCode) ? 'Viewing score for' : 'Attempting'} ${quiz.quizCode}`)}
                            >
                              {isAttempted(quiz.quizCode) ? "View Score" : "Attempt Quiz"}
                            </Button>
                          </motion.div>
                        )}

                        {isAdmin && (
                          <Box display="flex" gap={1} mt={2}>
                            <Tooltip title="Delete Quiz">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <IconButton
                                  onClick={() => handleDelete(quiz.quizCode)}
                                  sx={{
                                    background: "#ff6b6b20",
                                    color: "#ff6b6b",
                                    "&:hover": { background: "#ff6b6b30" }
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </motion.div>
                            </Tooltip>
                            <Tooltip title="View Submissions">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <IconButton
                                  onClick={() => fetchSubmissionsForQuiz(quiz.quizCode)}
                                  sx={{
                                    background: "#4facfe20",
                                    color: "#4facfe",
                                    "&:hover": { background: "#4facfe30" }
                                  }}
                                >
                                  <ViewIcon />
                                </IconButton>
                              </motion.div>
                            </Tooltip>
                            <Tooltip title="Download Excel">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <IconButton
                                  onClick={() => downloadExcelForQuiz(quiz.quizCode, quiz.title)}
                                  sx={{
                                    background: "#4caf5020",
                                    color: "#4caf50",
                                    "&:hover": { background: "#4caf5030" }
                                  }}
                                >
                                  <DownloadIcon />
                                </IconButton>
                              </motion.div>
                            </Tooltip>
                          </Box>
                        )}
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

export default QuizDash;