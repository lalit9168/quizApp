import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Divider,
  Stack,
  Avatar,
  Badge,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import QuizIcon from "@mui/icons-material/Quiz";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Simple API Layer
const API = {
  getQuizzes: () => fetch("http://localhost:5001/api/quizzes/all").then((r) => r.json()),
  getAllSubmissions: (token) =>
    fetch("http://localhost:5001/api/quizzes/submissions/all", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
  getQuizSubmissions: (quizCode, token) =>
    fetch(`http://localhost:5001/api/quizzes/submissions/${quizCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
  deleteQuiz: (quizCode, token) =>
    fetch(`http://localhost:5001/api/quizzes/${quizCode}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
};
// ---------------------------------------------------------------------

const QuizCard = ({
  quiz,
  isAdmin,
  onDelete,
  onViewSubmissions,
  onExcel,
  onAttempt,
}) => {
  const theme = useTheme();
  return (
    <Card
      elevation={6}
      sx={{
        borderRadius: 4,
        p: 2,
        bgcolor: "#fff",
        minHeight: 250,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow:
          "0 3px 16px 0 rgb(76 136 255 / 8%), 0 1.5px 6px 0 rgb(34 40 91 / 4%)",
        ":hover": {
          boxShadow: "0 8px 32px 0 rgb(76 136 255 / 21%)",
          transform: "translateY(-2px)",
        },
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
    >
      <Stack spacing={1} direction="row" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          <QuizIcon />
        </Avatar>
        <Typography variant="h6" fontWeight={700}>
          {quiz.title}
        </Typography>
        <Chip
          label={quiz.quizCode}
          size="small"
          color="info"
          sx={{ ml: "auto", fontWeight: "bold" }}
        />
      </Stack>
      <Typography variant="body2" mt={1} color="text.secondary">
        {quiz.questions?.length ?? 0} Questions
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="flex-end" gap={1}>
        {!isAdmin && (
          <Button variant="contained" onClick={() => onAttempt(quiz)}>
            Attempt
          </Button>
        )}
        {isAdmin && (
          <>
            <Tooltip title="Delete this quiz">
              <IconButton color="error" onClick={() => onDelete(quiz)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View submissions">
              <IconButton color="primary" onClick={() => onViewSubmissions(quiz)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download as Excel">
              <IconButton color="success" onClick={() => onExcel(quiz)}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
    </Card>
  );
};

const SubmissionsDialog = ({ open, onClose, quiz, all, token }) => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    if (all) {
      API.getAllSubmissions(token)
        .then((data) => setSubs(data))
        .finally(() => setLoading(false));
    } else {
      API.getQuizSubmissions(quiz.quizCode, token)
        .then((data) => setSubs(data))
        .finally(() => setLoading(false));
    }
  }, [open, quiz, all, token]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowBackIcon
            fontSize="small"
            sx={{ mr: 1, cursor: "pointer" }}
            onClick={onClose}
          />
          {all ? "All Quiz Submissions" : `Submissions for ${quiz.title}`}
        </Stack>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Skeleton variant="rectangular" height={200} />
        ) : Array.isArray(subs) && subs.length === 0 ? (
          <Box py={4} textAlign="center">
            <AnalyticsIcon fontSize="large" color="disabled" />
            <Typography variant="body1" mt={2}>
              No submissions found.
            </Typography>
          </Box>
        ) : all ? (
          subs.map((q) => (
            <Box key={q.quizCode} my={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {q.title} ({q.quizCode})
              </Typography>
              <Table size="small" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {q.submissions.map((s, i) => (
                    <TableRow key={i}>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>{s.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          ))
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subs.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
};

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subsDialog, setSubsDialog] = useState({ open: false, quiz: null, all: false });

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = localStorage.getItem("token");

  const fetchQuizzes = useCallback(() => {
    setLoading(true);
    API.getQuizzes()
      .then(setQuizzes)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchQuizzes();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.role === "admin");
      } catch (e) {}
    }
  }, [fetchQuizzes, token]);

  const handleDelete = (quiz) => {
    if (!window.confirm("Delete this quiz permanently?")) return;
    API.deleteQuiz(quiz.quizCode, token).then(() => {
      setQuizzes((list) => list.filter((q) => q.quizCode !== quiz.quizCode));
      toast.success("Quiz deleted");
    });
  };

  const handleDownloadExcel = async (quiz) => {
    toast.info("Preparing download...");
    const res = await API.getQuizSubmissions(quiz.quizCode, token);
    if (!res || res.length === 0) {
      toast.error("No submissions to export.");
      return;
    }
    const flatData = res.map((sub) => ({
      "Quiz Title": quiz.title,
      "Quiz Code": quiz.quizCode,
      "User Email": sub.email,
      "Score": sub.score,
    }));

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, `${quiz.title}_${quiz.quizCode}_submissions.xlsx`);
    toast.success("Download started");
  };

  return (
    <Box sx={{ px: isMobile ? 1 : 6, py: 4, minHeight: "100vh", bgcolor: "#f7faff" }}>
      <ToastContainer position="bottom-right" autoClose={1800} hideProgressBar />
      <Box
        sx={{
          textAlign: "center",
          mb: 5,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main} 98%)`,
          color: "#fff",
          py: 5,
          borderRadius: 3,
          boxShadow: "0 6px 16px rgba(22,60,134,0.2)",
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          fontWeight="900"
          letterSpacing={2}
          sx={{ textShadow: "0 0 10px rgba(0,0,0,0.15)" }}
          gutterBottom
        >
          Quizify Dashboard
        </Typography>
        <Typography variant={isMobile ? "body1" : "h6"} fontWeight={500}>
          All your quizzes, submissions, and analytics—beautifully in one place.
        </Typography>
      </Box>

      {isAdmin && (
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size={isMobile ? "medium" : "large"}
            startIcon={<AnalyticsIcon />}
            sx={{
              fontWeight: 700,
              px: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(242,44,111,0.18)",
            }}
            onClick={() =>
              setSubsDialog({ open: true, quiz: null, all: true })
            }
          >
            View All Submissions
          </Button>
        </Box>
      )}

      {/* Quizzes */}
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton
                variant="rectangular"
                height={170}
                sx={{ borderRadius: 4, mb: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      ) : quizzes.length === 0 ? (
        <Box textAlign="center" mt={7}>
          <img alt="no quizzes" width={120} src="https://assets7.lottiefiles.com/packages/lf20_wnqlfojb.json" onError={e=>e.target.style.display='none'}/>
          <Typography variant="h5" fontWeight={600} mb={2}>No Quizzes Yet!</Typography>
          {!isAdmin && (
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/create")}
            >
              Create My First Quiz
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={4}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz._id || quiz.quizCode}>
              <QuizCard
                quiz={quiz}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onExcel={handleDownloadExcel}
                onViewSubmissions={(q) =>
                  setSubsDialog({ open: true, quiz: q, all: false })
                }
                onAttempt={(q) => navigate(`/attempt/${q.quizCode}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Submissions Drawer/Dialog */}
      <SubmissionsDialog
        open={subsDialog.open}
        onClose={() => setSubsDialog({ open: false, quiz: null, all: false })}
        quiz={subsDialog.quiz}
        all={subsDialog.all}
        token={token}
      />
    </Box>
  );
}

export default QuizDash;