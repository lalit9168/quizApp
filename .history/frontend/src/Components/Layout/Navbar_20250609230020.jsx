import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Slide,
  IconButton,
  useScrollTrigger,
  Fab,
  Zoom,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  Feedback as FeedbackIcon,
  ContactMail as ContactIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import "@fontsource/poppins"; // Make sure this is installed using: npm install @fontsource/poppins

// Scroll to top component
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1300 }}
      >
        <Fab size="small" aria-label="scroll back to top" sx={styles.scrollTop}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar 
          position="fixed" 
          sx={{
            ...styles.appbar,
            backgroundColor: isScrolled 
              ? 'rgba(1, 58, 58, 0.95)' 
              : 'rgba(1, 58, 58, 0.85)',
          }}
        >
          <Toolbar sx={styles.toolbar}>
            {/* Logo/Title Section with Icon */}
           
              
              </Box>
              <Typography variant="h4" sx={styles.title}>
                Quiz Application
              </Typography>
            </Box>

            {/* Navigation Links */}
            <Box sx={styles.linkContainer}>
              <Button 
                component={Link} 
                to="/" 
                sx={styles.linkButton}
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
              <Button 
                onClick={() => navigate("/login")} 
                sx={styles.linkButton}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/feedback" 
                sx={styles.linkButton}
                startIcon={<FeedbackIcon />}
              >
                Feedback
              </Button>
              <Button 
                component={Link} 
                to="/contact" 
                sx={styles.linkButton}
                startIcon={<ContactIcon />}
              >
                Contact
              </Button>
            </Box>
          </Toolbar>

          {/* Animated Bottom Border */}
          <Box sx={styles.animatedBorder} />
        </AppBar>
      </Slide>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '90px' }} />

      {/* Scroll to Top Button */}
      <ScrollTop />

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  appbar: {
    background: "linear-gradient(135deg, #013a3a 0%, #0066cc 50%, #0099cc 100%)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0, 153, 204, 0.3)",
    height: "90px",
    justifyContent: "center",
    zIndex: 1100,
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      animation: 'shimmer 3s infinite',
    },
    '@keyframes shimmer': {
      '0%': { left: '-100%' },
      '100%': { left: '100%' },
    },
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: 4,
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  logoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.4)',
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
    },
  },

  logoIcon: {
    fontSize: '28px',
    color: '#ffffff',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
  },

  title: {
    fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    color: "#ffffff",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    letterSpacing: "1px",
    background: 'linear-gradient(45deg, #ffffff, #00d4ff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'titleGlow 3s ease-in-out infinite alternate',
    '@keyframes titleGlow': {
      '0%': { filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))' },
      '100%': { filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.8))' },
    },
  },

  linkContainer: {
    display: "flex",
    gap: 1,
    alignItems: 'center',
  },

  linkButton: {
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.95rem",
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "0.5px",
    padding: "0.7rem 1.2rem",
    textTransform: "none",
    borderRadius: "25px",
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.6s ease',
    },
    "&:hover": {
      backgroundColor: "rgba(0, 212, 255, 0.2)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)",
      border: '1px solid rgba(0, 212, 255, 0.5)',
      '&::before': {
        left: '100%',
      },
    },
    "&:active": {
      transform: "translateY(0) scale(1.02)",
    },
    '& .MuiButton-startIcon': {
      marginRight: '8px',
      transition: 'transform 0.3s ease',
    },
    '&:hover .MuiButton-startIcon': {
      transform: 'rotate(360deg)',
    },
  },

  animatedBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, #00d4ff, #0099cc, #013a3a, #0099cc, #00d4ff)',
    backgroundSize: '200% 100%',
    animation: 'borderMove 4s linear infinite',
    '@keyframes borderMove': {
      '0%': { backgroundPosition: '0% 0%' },
      '100%': { backgroundPosition: '200% 0%' },
    },
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(0, 212, 255, 0.4)',
    '&:hover': {
      background: 'linear-gradient(135deg, #0099cc, #013a3a)',
      transform: 'scale(1.1)',
    },
  },
};

export default Navbar;