// src/Components/Quiz/QuizDash.jsx

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
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openTestViewer, setOpenTestViewer] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("pdf");

  const navigate = useNavigate();
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

  const openTestViewerModal = async (quiz) => {
    setSelectedQuiz(quiz);
    setOpenTestViewer(true);
    setLoadingSubs(true);
    try {
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/submissions/${quiz.quizCode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
      setSubmissions([]);
    } finally {
      setLoadingSubs(false);
    }
  };

  const closeTestViewerModal = () => {
    setOpenTestViewer(false);
    setSelectedQuiz(null);
    setSubmissions([]);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Submissions for quiz: ${selectedQuiz.title}`, 14, 20);
    const tableColumn = ["Email", "Score"];
    const tableRows = submissions.map((sub) => [sub.email, sub.score]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save(`${selectedQuiz.quizCode}_submissions.pdf`);
  };

  const downloadExcel = () => {
    const worksheetData = submissions.map((sub) => ({
      Email: sub.email,
      Score: sub.score,
    }));
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    const wbout = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([wbout], {
      type: "application/octet-stream",
    });

    saveAs(blob, `${selectedQuiz.quizCode}_submissions.xlsx`);
  };

  const handleDownload = () => {
    if (downloadFormat === "pdf") {
      downloadPDF();
    } else if (downloadFormat === "excel") {
      downloadExcel();
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Quizzes
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} md={6} lg={4} key={quiz._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{quiz.title || "Untitled Quiz"}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Code: <strong>{quiz.quizCode}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Questions: {quiz.questions?.length || 0}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/attempt/${quiz.quizCode}`)}
                    >
                      Attempt Quiz
                    </Button>
                    {isAdmin && (
                      <>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() => handleDelete(quiz.quizCode)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => openTestViewerModal(quiz)}
                        >
                          Test Viewer
                        </Button>
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Test Viewer Modal */}
      <Modal open={openTestViewer} onClose={closeTestViewerModal}>
        <Box sx={style}>
          <Typography variant="h5" mb={2}>
            Submissions for "{selectedQuiz?.title}"
          </Typography>

          {loadingSubs ? (
            <CircularProgress />
          ) : submissions.length === 0 ? (
            <Typography>No submissions found for this quiz.</Typography>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((sub, index) => (
                    <TableRow key={index}>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>{sub.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <FormControl sx={{ mt: 2, minWidth: 150 }}>
                <InputLabel id="download-format-label">Download Format</InputLabel>
                <Select
                  labelId="download-format-label"
                  value={downloadFormat}
                  label="Download Format"
                  onChange={(e) => setDownloadFormat(e.target.value)}
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="excel">Excel</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleDownload}
              >
                Download Records
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default QuizDash;
