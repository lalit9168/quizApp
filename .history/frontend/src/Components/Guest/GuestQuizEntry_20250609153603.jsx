import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

function GuestQuizEntry() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (code.trim()) {
      navigate(`/guest-attempt/${code}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        bgcolor: '#fff',          // White background for the whole page
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
         background:
            'linear-gradient(135deg, #013a3a, #0099cc 90%)', // fallback for background
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          bgcolor: 'linear-gradient(135deg, #013a3a, #0099cc 90%)',
          background:
            'linear-gradient(135deg, #013a3a, #0099cc 90%)', // fallback for background
          color: '#fff',
          textAlign: 'center',
          borderRadius: 3,
          p: 5,
          boxShadow: '0 0 30px #00feba',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#00feba',
            textShadow: '0 0 12px #00feba',
            letterSpacing: '0.05em',
            mb: 3,
          }}
        >
          Enter Guest Quiz Code
        </Typography>
        <TextField
          label="Quiz Code"
          variant="filled"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          sx={{
            mb: 4,
            width: '100%',
            input: {
              color: '#00feba',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            },
            '& .MuiInputLabel-root': {
              color: '#00feba',
              fontWeight: 600,
            },
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(0, 255, 186, 0.15)',
            },
            '& .MuiFilledInput-root:hover': {
              backgroundColor: 'rgba(0, 255, 186, 0.25)',
            },
            '& .MuiFilledInput-root.Mui-focused': {
              backgroundColor: 'rgba(0, 255, 186, 0.35)',
            },
          }}
          inputProps={{ maxLength: 10, style: { textTransform: 'uppercase' } }}
        />
        <Button
          variant="contained"
          onClick={handleStart}
          disabled={!code.trim()}
          sx={{
            px: 5,
            py: 1.8,
            fontWeight: 'bold',
            borderRadius: 3,
            background: 'linear-gradient(to right, #00feba, #5b86e5)',
            boxShadow: '0 0 20px #00feba',
            color: '#121212',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(to right, #5b86e5, #00feba)',
              boxShadow: '0 0 40px #00feba',
              transform: 'scale(1.07)',
            },
            '&:disabled': {
              background: 'rgba(0, 255, 186, 0.4)',
              boxShadow: 'none',
              color: '#555',
              cursor: 'not-allowed',
              transform: 'none',
            },
          }}
        >
          Attempt Quiz
        </Button>
      </Box>
    </Box>
  );
}

export default GuestQuizEntry;
