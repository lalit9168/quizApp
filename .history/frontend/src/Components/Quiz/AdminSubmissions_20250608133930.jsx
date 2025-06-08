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
  IconButton,
  Tooltip,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
  }, [token]);

  const downloadExcel = () => {
    const flatData = [];

    submissions.forEach((quiz) => {
      quiz.submissions.forEach((sub) => {
        flatData.push({
          "Quiz Title": quiz.title,
          "Quiz Code": quiz.quizCode,
          "User Email": sub.email,
          "Score": sub.score,
          "Quiz Created At": quiz.createdAt
            ? new Date(quiz.createdAt).toLocaleString()
            : "N/A"
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

  const handleShareQuiz = (quiz) => {
    const message = `🎯 Hey! Check out this amazing quiz!\n\n📋 Title: ${quiz.title}\n🔑 Quiz Code: ${quiz.quizCode}\n\nJoin now and test your knowledge!`;
    const whatsappLink = `https://wa.me/9168018581?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappLink, "_blank");
  };

  const handleCopyQuizCode = (quizCode) => {
    navigator.clipboard.writeText(quizCode).then(() => {
      alert(`Quiz code "${quizCode}" copied to clipboard!`);
    }).catch(() => {
      alert("Failed to copy quiz code");
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Quiz Submissions Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : submissions.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          No submissions found.
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 3, maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    Quiz Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    Quiz Code
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    User Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    Score
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((quiz) =>
                  quiz.submissions.map((sub, idx) => (
                    <TableRow 
                      key={`${quiz.quizCode}-${idx}`} 
                      sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                    >
                      <TableCell>{quiz.title}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {quiz.quizCode}
                          </Typography>
                          <Tooltip title="Copy Quiz Code">
                            <IconButton 
                              size="small" 
                              onClick={() => handleCopyQuizCode(quiz.quizCode)}
                            >
                              📋
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 'bold', 
                            color: sub.score >= 70 ? 'green' : sub.score >= 50 ? 'orange' : 'red' 
                          }}
                        >
                          {sub.score}%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Share on WhatsApp">
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={<WhatsAppIcon />}
                              onClick={() => handleShareQuiz(quiz)}
                              sx={{
                                minWidth: 'auto',
                                px: 2,
                                backgroundColor: '#25D366',
                                '&:hover': {
                                  backgroundColor: '#128C7E'
                                }
                              }}
                            >
                              Share
                            </Button>
                          </Tooltip>
                          
                          <Tooltip title="Share via other apps">
                            <IconButton
                              size="small"
                              onClick={() => {
                                if (navigator.share) {
                                  navigator.share({
                                    title: `Quiz: ${quiz.title}`,
                                    text: `Check out this quiz! Code: ${quiz.quizCode}`,
                                    url: window.location.origin
                                  });
                                } else {
                                  handleCopyQuizCode(quiz.quizCode);
                                }
                              }}
                            >
                              <ShareIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={downloadExcel}
              sx={{ px: 3, py: 1 }}
            >
              📊 Download Excel Report
            </Button>
            
            <Typography variant="body2" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
              Total Submissions: {submissions.reduce((total, quiz) => total + quiz.submissions.length, 0)}
            </Typography>
          </Stack>
        </>
      )}
    </Box>
  );
}

export default AdminSubmissions;