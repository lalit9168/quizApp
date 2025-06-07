import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

function GuestQuizEntry() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    console.log
    if (code.trim()) {
      navigate(`/guest-attempt/${code}`);
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Enter Guest Quiz Code</Typography>
      <TextField
        label="Quiz Code"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        sx={{ mb: 2 }}
      />
      <br />
      <Button variant="contained" onClick={handleStart}>
        Attempt Quiz
      </Button>
    </Box>
  );
}

export default GuestQuizEntry;
