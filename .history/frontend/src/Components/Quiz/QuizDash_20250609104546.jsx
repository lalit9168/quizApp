// src/components/QuizDashboard/SubmissionsView.jsx
import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  useTheme,
} from "@mui/material";

export default function SubmissionsView({ submissionsData, singleQuizView }) {
  const theme = useTheme();

  if (submissionsData) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          All Quiz Submissions
        </Typography>

        {submissionsData.length === 0 ? (
          <Typography>No submissions yet.</Typography>
        ) : (
          submissionsData.map((quiz) => (
            <Box key={quiz.quizCode} sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {quiz.title} ({quiz.quizCode})
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer component={Paper} elevation={8} sx={{ boxShadow: 4 }}>
                <Table size="small" sx={{ minWidth: 320 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
                      <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quiz.submissions.map((sub, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: theme.palette.action.hover,
                          },
                          "&:hover": {
                            backgroundColor: theme.palette.action.selected,
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell>{sub.email}</TableCell>
                        <TableCell>{sub.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ))
        )}
      </Box>
    );
  }

  if (singleQuizView) {
    return (
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Submissions for{" "}
          <Box component="span" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
            {singleQuizView.quizCode}
          </Box>
        </Typography>

        {singleQuizView.submissions.length === 0 ? (
          <Typography>No submissions yet.</Typography>
        ) : (
          <TableContainer component={Paper} elevation={8} sx={{ boxShadow: 4 }}>
            <Table size="small" sx={{ minWidth: 320 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {singleQuizView.submissions.map((sub, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: theme.palette.action.hover,
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.action.selected,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>{sub.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
  }

  return null;
}
