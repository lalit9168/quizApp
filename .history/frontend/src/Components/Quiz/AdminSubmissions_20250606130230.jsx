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

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function TestViewer() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuizCode, setSelectedQuizCode] = useState("");
  const [submissions, setSubmissions] = useState([]);

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

  const downloadExcel = () => {
    if (!submissions.length) return alert("No submissions to export.");

    const worksheetData = [
      ["User Email", "Score"],
      ...submissions.map((sub) => [sub.email, sub.score]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });

    saveAs(blob, `quiz_${selectedQuizCode}_submissions.xlsx`);
  };

  if (loading) return <CircularProgress />;

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
                      <TableCell>User Email</TableCell>
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
              </TableContainer>

              <Button variant="contained" color="success" onClick={downloadExcel}>
                Download Excel
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default TestViewer;
