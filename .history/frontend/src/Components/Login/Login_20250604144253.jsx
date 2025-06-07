import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Avatar,
  Link,
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (isRegister) {
      // 🔧 Add registration logic here
      console.log("Registering:", formData);
      // navigate('/home');
    } else {
      // 🔐 Add login logic here
      console.log("Logging in:", formData);
      navigate('/home');
    }
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
            {isRegister ? 'Create an Account' : 'Welcome to Quizz!'}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
            {isRegister
              ? 'Sign up to begin your quiz journey 🎓'
              : 'Log in to start your quiz journey 🧠'}
          </Typography>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            {isRegister ? 'Register' : 'Log In'}
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {isRegister ? (
              <>
                Already have an account?{' '}
                <Link
                  component="button"
                  onClick={() => setIsRegister(false)}
                  underline="hover"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <Link
                  component="button"
                  onClick={() => setIsRegister(true)}
                  underline="hover"
                >
                  Register
                </Link>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
