// src/Components/Quiz/TestViewer.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function TestViewer() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuizCode, setSelectedQuizCode] = useState("");
  const [submissions, setSubmissions] = useState([]);

  // Fetch all quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/quizzes/all");
        setQuizzes(res.data);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Fetch submissions for a specific quiz
  const handleViewSubmissions = async (quizCode) => {
    setSelectedQuizCode(quizCode);
    try {
      const res = await axios.get(`http://localhost:5001/api/quizzes/code/${quizCode}`);
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
      setSubmissions([]);
    }
  };

  // Generate PDF report
  const downloadPDF = () => {
    if (!submissions.length) return alert("No submissions to export.");

    const doc = new jsPDF();
    const date = new Date().toISOString().split("T")[0];

    doc.text(`Submissions Report - Quiz: ${selectedQuizCode}`, 14, 20);
    doc.text(`Date: ${date}`, 14, 28);

    const tableColumn = ["User Email", "Score"];
    const tableRows = submissions.map((sub) => [sub.email, sub.score]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: "grid",
      styles: { fontSize: 11 },
    });

    doc.save(`quiz_${selectedQuizCode}_submissions_${date}.pdf`);
  };

  // Generate Excel report
  const downloadExcel = () => {
    if (!submissions.length) return alert("No submissions to export.");

    const date = new Date().toISOString().split("T")[0];

    const worksheetData = [
      ["User Email", "Score"],
      ...submissions.map((sub) => [sub.email, sub.score]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, `quiz_${selectedQuizCode}_submissions_${date}.xlsx`);
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Test Viewer
      </Typography>

      <Typography variant="h6" gutterBottom>
        Select a quiz to view submissions:
      </Typography>

      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", mb: 4 }}>
        {quizzes.map((quiz) => (
          <Button
            key={quiz.quizCode}
            variant={quiz.quizCode === selectedQuizCode ? "contained" : "outlined"}
            onClick={() => handleViewSubmissions(quiz.quizCode)}
          >
            {quiz.title || quiz.quizCode}
          </Button>
        ))}
      </Stack>

      {selectedQuizCode && (
        <>
          <Typography variant="h6" gutterBottom>
            Submissions for Quiz Code: {selectedQuizCode}
          </Typography>

          {submissions.length === 0 ? (
            <Typography>No submissions yet.</Typography>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ maxWidth: 600, mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>User Email</strong></TableCell>
                      <TableCell><strong>Score</strong></TableCell>
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
              </TableContainer>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" onClick={downloadPDF}>
                  Download PDF
                </Button>
                <Button variant="contained" color="success" onClick={downloadExcel}>
                  Download Excel
                </Button>
              </Stack>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default TestViewer;
