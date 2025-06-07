import React, { useState } from 'react';
import {
  Box, Button, Card, CardContent, TextField, Typography, Avatar, Link, FormControlLabel, Checkbox
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'admin' : 'user') : value,
    }));
  };

  const handleSubmit = async () => {
    const url = isRegister ? 'http://localhost:5001/api/register' : 'http://localhost:5000/api/login';

    try {
      const res = await axios.post(url, formData);
      if (!isRegister) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        navigate('/home');
      } else {
        alert('Registered successfully! Please log in.');
        setIsRegister(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
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
          {isRegister && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  name="role"
                />
              }
              label="Register as Admin"
            />
          )}
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
                <Link component="button" onClick={() => setIsRegister(false)}>
                  Log in
                </Link>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <Link component="button" onClick={() => setIsRegister(true)}>
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
