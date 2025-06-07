import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can add real login logic here
    navigate('/home');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2196f3, #21cbf3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card sx={{ width: 360, padding: 3, borderRadius: 3, boxShadow: 6 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#1976d2', mb: 2 }}>
            <QuizIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Welcome to Quizz!
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
            Log in to start your quiz journey 🧠
          </Typography>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
