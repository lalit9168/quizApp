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
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminSubmissions = () => {
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
        <Box>
          {submissions.map((quiz) => (
            <Card key={quiz.quizCode} sx={{ mb: 3, boxShadow: 2 }}>
              <CardContent>
                {/* Quiz Header with Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Code: <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{quiz.quizCode}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Questions: {quiz.questions || 1}
                    </Typography>
                  </Box>
                  
                  {/* Action Buttons */}
                  <Stack direction="row" spacing={1}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      Delete
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      View Results
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="info" 
                      size="small"
                      sx={{ textTransform: 'uppercase' }}
                    >
                      Download Excel
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<WhatsAppIcon />}
                      onClick={() => handleShareQuiz(quiz)}
                      sx={{
                        backgroundColor: '#25D366',
                        '&:hover': {
                          backgroundColor: '#128C7E'
                        },
                        textTransform: 'uppercase'
                      }}
                    >
                      Share
                    </Button>
                  </Stack>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Submissions Table */}
                {quiz.submissions && quiz.submissions.length > 0 ? (
                  <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            User Email
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            Score
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            Submitted At
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {quiz.submissions.map((sub, idx) => (
                          <TableRow key={idx} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
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
                              <Typography variant="body2" color="text.secondary">
                                {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : 'N/A'}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No submissions yet for this quiz.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Global Actions */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={downloadExcel}
              sx={{ px: 3, py: 1 }}
            >
              📊 Download All Submissions Excel
            </Button>
            
            <Typography variant="body2" color="text.secondary">
              Total Submissions: {submissions.reduce((total, quiz) => total + quiz.submissions.length, 0)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default AdminSubmissions;