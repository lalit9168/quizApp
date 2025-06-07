import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from '@mui/material';

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchQuizzes();
  }, []);

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
                    Code: <strong>{quiz.code}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Questions: {quiz.questions?.length || 0}
                  </Typography>
                </CardContent>
                <Button
  variant="contained"
  size="small"
  sx={{ mt: 2 }}
  onClick={() => navigate(`/attempt/${quiz.code}`)}
>
  Attempt Quiz
</Button>

              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default QuizDash;
