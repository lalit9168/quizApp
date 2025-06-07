import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  CircularProgress,
  Button,
  Stack,
} from '@mui/material';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/quizzes/submissions/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const downloadExcel = () => {
    const flatData = [];

    submissions.forEach((quiz) => {
      quiz.submissions.forEach((sub) => {
        flatData.push({
          "Quiz Title": quiz.title,
          "Quiz Code": quiz.quizCode,
          "User Email": sub.email,
          "Score": sub.score
        });
      });
    });

    if (flatData.length === 0) {
      alert("No submissions to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Submissions");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, "quiz_submissions.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toISOString().split("T")[0];

    const flatData = [];

    submissions.forEach((quiz) => {
      quiz.submissions.forEach((sub) => {
        flatData.push([
          quiz.title,
          quiz.quizCode,
          sub.email,
          sub.score,
        ]);
      });
    });

    if (flatData.length === 0) {
      alert("No submissions to export.");
      return;
    }

    doc.text("Quiz Submissions Report", 14, 20);
    doc.text(`Generated on: ${date}`, 14, 28);

    doc.autoTable({
      head: [["Quiz Title", "Quiz Code", "User Email", "Score"]],
      body: flatData,
      startY: 35,
      styles: { fontSize: 10 },
      theme: 'grid',
    });

    doc.save(`quiz_submissions_${date}.pdf`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Submissions
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : submissions.length === 0 ? (
        <Typography>No submissions found.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Quiz Title</TableCell>
                  <TableCell>Quiz Code</TableCell>
                  <TableCell>User Email</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((quiz) =>
                  quiz.submissions.map((sub, idx) => (
                    <TableRow key={`${quiz.quizCode}-${idx}`}>
                      <TableCell>{quiz.title}</TableCell>
                      <TableCell>{quiz.quizCode}</TableCell>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>{sub.score}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="success" onClick={downloadExcel}>
              Download Excel
            </Button>
            <Button variant="contained" color="primary" onClick={downloadPDF}>
              Download PDF
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}

export default AdminSubmissions;
