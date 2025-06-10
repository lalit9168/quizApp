import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Fade, IconButton } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

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
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
      }}
    >
      {/* Enhanced Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(245, 87, 108, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 60% 10%, rgba(79, 172, 254, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Geometric Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Professional hexagonal patterns */}
        {[
          { size: 100, top: '8%', left: '15%', opacity: 0.04 },
          { size: 80, top: '20%', right: '10%', opacity: 0.05 },
          { size: 120, bottom: '15%', left: '5%', opacity: 0.03 },
          { size: 90, bottom: '25%', right: '20%', opacity: 0.04 },
          { size: 70, top: '50%', left: '90%', opacity: 0.05 },
          { size: 110, top: '35%', left: '8%', opacity: 0.03 },
        ].map((hex, i) => (
          <Box
            key={`hex-${i}`}
            sx={{
              width: hex.size,
              height: hex.size,
              position: 'absolute',
              ...hex,
              background: `linear-gradient(135deg, rgba(102, 126, 234, ${hex.opacity}), rgba(245, 87, 108, ${hex.opacity * 0.8}))`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              animation: `float-${i} ${8 + i * 1.5}s ease-in-out infinite`,
              '@keyframes float-0': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-20px) rotate(180deg)' },
              },
              '@keyframes float-1': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-15px) rotate(180deg)' },
              },
              '@keyframes float-2': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-25px) rotate(180deg)' },
              },
              '@keyframes float-3': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-18px) rotate(180deg)' },
              },
              '@keyframes float-4': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-22px) rotate(180deg)' },
              },
              '@keyframes float-5': {
                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                '50%': { transform: 'translateY(-16px) rotate(180deg)' },
              },
            }}
          />
        ))}

        {/* Subtle dot pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.03,
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </Box>

      <Fade in timeout={700}>
        <Paper
          elevation={12}
          sx={{
            backdropFilter: 'blur(20px)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(102, 126, 234, 0.15)',
            padding: 5,
            borderRadius: 4,
            maxWidth: 450,
            width: '90%',
            color: '#1e293b',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <Box textAlign="center" mb={4}>
            <IconButton
              sx={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: '#fff',
                width: 70,
                height: 70,
                borderRadius: '50%',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
                },
                transition: 'all 0.3s ease',
                mb: 2,
              }}
            >
              <QuizIcon sx={{ fontSize: 32 }} />
            </IconButton>
            <Typography 
              variant="h4" 
              fontWeight="bold"
              sx={{ 
                color: '#1e293b',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 1,
              }}
            >
              Enter Guest Quiz Code
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b',
                fontWeight: 500,
              }}
            >
              Ready to test your knowledge? Enter your quiz code below!
            </Typography>
          </Box>

          <TextField
            label="Quiz Code"
            variant="filled"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            sx={{
              mb: 4,
              width: '100%',
              '& .MuiFilledInput-root': {
                backgroundColor: 'rgba(102, 126, 234, 0.08)',
                borderRadius: 3,
                border: '2px solid rgba(102, 126, 234, 0.15)',
                fontSize: '1.2rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.12)',
                  borderColor: 'rgba(102, 126, 234, 0.25)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(102, 126, 234, 0.12)',
                  borderColor: '#667eea',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#64748b',
                fontWeight: 600,
                fontSize: '1.1rem',
                '&.Mui-focused': {
                  color: '#667eea',
                },
              },
              '& .MuiFilledInput-input': {
                color: '#1e293b',
                textAlign: 'center',
                textTransform: 'uppercase',
                padding: '20px 16px 12px',
              },
            }}
            inputProps={{ 
              maxLength: 10, 
              style: { 
                textTransform: 'uppercase',
                fontSize: '1.2rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
              } 
            }}
          />

          <Button
            variant="contained"
            onClick={handleStart}
            disabled={!code.trim()}
            sx={{
              px: 6,
              py: 2,
              fontWeight: 'bold',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff',
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8, #6b46c1)',
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
              },
              '&:disabled': {
                background: 'rgba(102, 126, 234, 0.3)',
                color: 'rgba(255, 255, 255, 0.7)',
                boxShadow: 'none',
                transform: 'none',
              },
            }}
          >
            🚀 Start Quiz Adventure
          </Button>

          <Box mt={3}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b',
                fontStyle: 'italic',
              }}
            >
              No account needed • Just enter your code and go!
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

export default GuestQuizEntry;