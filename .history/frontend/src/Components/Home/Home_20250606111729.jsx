import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
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
  
  const handleGuestQuiz = 

  const handleJoinQuiz = () => {
    navigate('/quizdash');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Quizz App</Typography>
          <Box>
            <Typography variant="body1" sx={{ mr: 2, display: 'inline' }}>
              Role: <strong>{role}</strong>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Home Page</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome {role === 'admin' ? 'Admin' : 'User'}!
        </Typography>

        {role === 'admin' && (
          <Button variant="contained" color="primary" onClick={handleCreateQuiz} sx={{ mr: 2 }}>
            Create Quiz
          </Button>
          <Button variant="contained" color="primary" onClick={handleGuestQuiz} sx={{ mr: 2 }}>
            Guest Quiz
          </Button>
        )}

        <Button variant="outlined" color="secondary" onClick={handleJoinQuiz}>
          Join Quiz
        </Button>
      </Box>
    </>
  );
}

export default HomePage;
