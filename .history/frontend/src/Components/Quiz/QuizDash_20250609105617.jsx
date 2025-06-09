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
  <Box sx={{ px: isMobile ? 2 : 6, py: 4, bgcolor: "#11191A", minHeight: "100vh" }}>
    {/* Hero Section */}
    <Box
      sx={{
        textAlign: "center",
        mb: 6,
        background: "linear-gradient(120deg, #213c28 60%, #19db72 100%)",
        color: "#fff",
        py: 5,
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(25, 219, 114, 0.35)",
        fontFamily: "'Montserrat', sans-serif",
        border: "2px solid #25b365",
        backdropFilter: "blur(3px)",
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h2"}
        fontWeight="900"
        letterSpacing={2}
        gutterBottom
        sx={{ textShadow: "0 0 18px #0e4a1f77" }}
      >
        Quiz Dashboard
      </Typography>
      <Typography
        variant={isMobile ? "body1" : "h6"}
        fontWeight="500"
        sx={{ opacity: 0.92, letterSpacing: 1.8 }}
      >
        Manage, Attempt &amp; Analyze Quizzes with ease
      </Typography>
    </Box>

    {isAdmin && (
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          onClick={fetchAllSubmissions}
          sx={{
            background: "linear-gradient(90deg,#18692d 10%,#19db72 90%)",
            color: "#FFF",
            fontWeight: 700,
            px: 4,
            borderRadius: 2,
            boxShadow: "0 6px 18px #00e79347",
            transition: "all 0.3s cubic-bezier(.49,1.99,0,.72)",
            "&:hover": {
              background: "linear-gradient(90deg,#19db72 10%,#18692d 90%)",
              boxShadow: "0 10px 24px rgba(25, 219, 114, 0.45)",
              transform: "translateY(-2px) scale(1.03)",
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
        <Typography variant="h5" gutterBottom sx={{ mb: 2, color: "#6dffb7" }}>
          All Quiz Submissions
        </Typography>
        {submissionsData.length === 0 ? (
          <Typography color="gray">No submissions yet.</Typography>
        ) : (
          submissionsData.map((quiz) => (
            <Box key={quiz.quizCode} sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#93ffc1" }}>
                {quiz.title} <span style={{color:"#19db72"}}>({quiz.quizCode})</span>
              </Typography>
              <Divider sx={{ mb: 2, bgcolor: "#133424" }} />
              <TableContainer
                component={Paper}
                elevation={8}
                sx={{
                  background: "rgba(23,41,34,0.93)",
                  borderRadius: 3,
                  boxShadow: "0 0 12px #19db7266",
                }}
              >
                <Table size="small" sx={{ minWidth: 320, color: "#fff" }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#182e21" }}>
                      <TableCell sx={{ fontWeight: "bold", color: "#7bffa2" }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#7bffa2" }}>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quiz.submissions.map((sub, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          backgroundColor: idx % 2 ? "#13221a" : "transparent",
                          "&:hover": {
                            backgroundColor: "#17331E",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell sx={{ color: "#cafad5" }}>{sub.email}</TableCell>
                        <TableCell sx={{ color: "#f9ffea" }}>{sub.score}</TableCell>
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
        <Typography variant="h5" gutterBottom sx={{ mb: 2, color:'#99ffd3' }}>
          Submissions for{" "}
          <Box component="span" sx={{ fontWeight: "bold", color: "#19db72" }}>
            {singleQuizView.quizCode}
          </Box>
        </Typography>
        {singleQuizView.submissions.length === 0 ? (
          <Typography color="gray">No submissions yet.</Typography>
        ) : (
          <TableContainer component={Paper} elevation={8} sx={{ background: "rgba(23,41,34,0.93)", boxShadow: "0 0 15px #0cf18422"}}>
            <Table size="small" sx={{ minWidth: 320 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#182e21" }}>
                  <TableCell sx={{ fontWeight: "bold", color:'#83ffb7' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color:'#83ffb7' }}>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {singleQuizView.submissions.map((sub, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      backgroundColor: idx % 2 ? "#13221a" : "transparent",
                      "&:hover": {
                        backgroundColor: "#17331E",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#cafad5" }}>{sub.email}</TableCell>
                    <TableCell sx={{ color: "#f9ffea" }}>{sub.score}</TableCell>
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
            <Skeleton variant="rectangular" height={140}
              sx={{ borderRadius: 3, boxShadow: 3, bgcolor: "#223e2d" }}
            />
            <Skeleton sx={{ mt: 1, width: "60%", bgcolor:"#223e2d" }} />
            <Skeleton sx={{ width: "40%", bgcolor:"#223e2d" }} />
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
                background: "linear-gradient(135deg, #203e29 0%, #19db72 110%)",
                color: "#fff",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.03)",
                  boxShadow: "0 12px 20px #25b36555, 0 10px 40px #19db7248",
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
                  <QuizIcon sx={{ color: "#0DE374" }} fontSize="large" />
                  <Typography variant="h6" fontWeight="700" noWrap sx={{ color: "#dbffe6" }}>
                    {quiz.title || "Untitled Quiz"}
                  </Typography>
                </Stack>

                <Chip
                  label={`Code: ${quiz.quizCode}`}
                  sx={{
                    mb: 1,
                    bgcolor: "#0DE374",
                    color: "#133824",
                    fontWeight: 700
                  }}
                  size="small"
                />
                <Typography variant="body2" sx={{ color: "#b0ffd4" }} mb={2}>
                  Questions: {quiz.questions?.length || 0}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2, bgcolor: "#237b48" }} />
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
                      background: "linear-gradient(90deg, #237b48 20%,#19db72 100%)",
                      color:"#fff",
                      boxShadow: "0 3px 8px #0DE37477",
                      "&:hover": {
                        background: "linear-gradient(90deg,#19db72 10%,#237b48 90%)",
                        boxShadow: "0 6px 24px #17ee9d55",
                        transform: "scale(1.06)"
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
                          borderColor: "#df3434",
                          color: "#ff7979",
                          bgcolor: "#223e2d",
                          "&:hover": {
                            boxShadow:"0 0 12px #df3434", 
                            borderColor: "#ff5050", 
                            color: "#fff",
                            bgcolor: "#2d3021"
                          }
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
                          borderColor: "#22ee96",
                          bgcolor: "#162920",
                          color: "#22ee96",
                          "&:hover": {
                            borderColor: "#19db72",
                            color: "#fff",
                            bgcolor: "#21d193",
                            boxShadow:"0 0 10px #19db72",
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
                          borderColor: "#0DE374",
                          color: "#0DE374",
                          bgcolor: "#1b3124",
                          "&:hover": {
                            borderColor: "#1ff597",
                            color: "#1ff597",
                            bgcolor: "#193724",
                            boxShadow:"0 0 15px #1ff597b7"
                          }
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
