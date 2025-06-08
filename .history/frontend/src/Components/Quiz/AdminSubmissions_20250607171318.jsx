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
  Grid,
  Fab,
  Tooltip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AssessmentIcon from '@mui/icons-material/Assessment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/quizzes/submissions/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(res.data);
      } catch (err) {
        console.error('Failed to fetch submissions', err);
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
          'Quiz Title': quiz.title,
          'Quiz Code': quiz.quizCode,
          'User Email': sub.email,
          'Score': sub.score,
          'Date': sub.date || '',
          'Time': sub.time || '',
        });
      });
    });

    if (flatData.length === 0) {
      alert('No submissions to export.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    saveAs(blob, 'quiz_submissions.xlsx');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Quiz Submissions
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title="Download as Excel">
            <Fab color="success" onClick={downloadExcel}>
              <DownloadIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress size={60} color="primary" />
        </Box>
      ) : submissions.length === 0 ? (
        <Typography variant="h6" mt={4}>No submissions found.</Typography>
      ) : (
        <Box sx={{ mt: 4 }}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quiz Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quiz Code</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Score</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Time</TableCell>
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
                      <TableCell>{sub.date}</TableCell>
                      <TableCell>{sub.time}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default AdminSubmissions;
