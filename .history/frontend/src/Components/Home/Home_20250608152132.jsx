import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { AppBar, Toolbar, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect if not logged in
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    } catch (err) {
      console.error('Invalid token');
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleCreateQuiz = () => {
    navigate('/quiz');
  };

  const handleGuestQuiz = () => {
    navigate('/create-guest');
  };

  const handleJoinQuiz = () => {
    navigate('/quizdash');
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#121212',
          boxShadow: '0 2px 4px rgba(0,0,0,0.7)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#BB86FC',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            Quizz App
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body1"
              sx={{ mr: 3, color: '#E0E0E0', fontWeight: '500' }}
            >
              Role: <strong>{role}</strong>
            </Typography>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: '#BB86FC',
                borderColor: '#BB86FC',
                '&:hover': {
                  backgroundColor: '#3700B3',
                  borderColor: '#BB86FC',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)', // full height minus app bar
          backgroundColor: '#121212',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            maxWidth: 450,
            width: '100%',
            p: 4,
            borderRadius: 2,
            backgroundColor: '#1E1E1E',
            color: '#E0E0E0',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 2, color: '#BB86FC', fontWeight: 'bold' }}
          >
            Home Page
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Welcome {role === 'admin' ? 'Admin' : 'User'}!
          </Typography>

          {role === 'admin' && (
            <>
              <Button
                variant="contained"
                onClick={handleCreateQuiz}
                sx={{
                  backgroundColor: '#BB86FC',
                  color: '#121212',
                  mb: 2,
                  width: '100%',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#9a6fff',
                  },
                }}
              >
                Create Quiz
              </Button>

              <Button
                variant="contained"
                onClick={handleGuestQuiz}
                sx={{
                  backgroundColor: '#03DAC6',
                  color: '#121212',
                  mb: 3,
                  width: '100%',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#00bfa5',
                  },
                }}
              >
                Create Guest Quiz
              </Button>
            </>
          )}

          <Button
            variant="outlined"
            onClick={handleJoinQuiz}
            sx={{
              borderColor: '#BB86FC',
              color: '#BB86FC',
              width: '100%',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#3700B3',
                borderColor: '#BB86FC',
              },
            }}
          >
            Available Quiz
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default HomePage;
