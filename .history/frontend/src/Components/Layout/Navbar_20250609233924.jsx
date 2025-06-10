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
  useScrollTrigger,
  Fab,
  Zoom,
  Container,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300 }}
      >
        <Fab size="large" aria-label="scroll back to top" sx={styles.scrollTop}>
          <KeyboardArrowUpIcon sx={{ fontSize: '28px' }} />
        </Fab>
      </Box>
    </Zoom>
  );
}

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredButton, setHoveredButton] = useState('');

  const navigate = useNavigate();

  // Handle scroll effect for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
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
            boxShadow: isScrolled 
              ? '0 8px 32px rgba(0, 0, 0, 0.12)' 
              : '0 4px 16px rgba(0, 0, 0, 0.06)',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Logo/Brand Section */}
              <Box sx={styles.logoContainer}>
                <Box sx={styles.logoIconWrapper}>
                  <QuizIcon sx={styles.logoIcon} />
                </Box>
                <Box sx={styles.brandContainer}>
                  <Typography variant="h4" sx={styles.title}>
                    QuizMaster Pro
                  </Typography>
                  <Typography variant="body2" sx={styles.subtitle}>
                    Professional Learning Platform
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Links */}
              <Box sx={styles.linkContainer}>
                <Button 
                  component={Link} 
                  to="/" 
                  sx={styles.linkButton}
                  onMouseEnter={() => setHoveredButton('home')}
                  onMouseLeave={() => setHoveredButton('')}
                >
                  <Typography sx={{
                    ...styles.buttonText,
                    transform: hoveredButton === 'home' ? 'translateY(-2px)' : 'translateY(0)',
                  }}>
                    HOME
                  </Typography>
                </Button>

                <Button 
                  onClick={() => navigate("/login")} 
                  sx={styles.linkButton}
                  onMouseEnter={() => setHoveredButton('login')}
                  onMouseLeave={() => setHoveredButton('')}
                >
                  <Typography sx={{
                    ...styles.buttonText,
                    transform: hoveredButton === 'login' ? 'translateY(-2px)' : 'translateY(0)',
                  }}>
                    LOGIN
                  </Typography>
                </Button>

                <Button 
                  component={Link} 
                  to="/feedback" 
                  sx={styles.linkButton}
                  onMouseEnter={() => setHoveredButton('feedback')}
                  onMouseLeave={() => setHoveredButton('')}
                >
                  <Typography sx={{
                    ...styles.buttonText,
                    transform: hoveredButton === 'feedback' ? 'translateY(-2px)' : 'translateY(0)',
                  }}>
                    FEEDBACK
                  </Typography>
                </Button>

                <Button 
                  component={Link} 
                  to="/contact" 
                  sx={styles.linkButton}
                  onMouseEnter={() => setHoveredButton('contact')}
                  onMouseLeave={() => setHoveredButton('')}
                >
                  <Typography sx={{
                    ...styles.buttonText,
                    transform: hoveredButton === 'contact' ? 'translateY(-2px)' : 'translateY(0)',
                  }}>
                    CONTACT US
                  </Typography>
                </Button>
              </Box>
            </Toolbar>
          </Container>
          
          {/* Animated bottom gradient line */}
          <Box sx={styles.gradientLine} />
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
    backgroundColor: '#ffffff',
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    height: "90px",
    justifyContent: "center",
    zIndex: 1100,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: { xs: 3, sm: 4, md: 6 },
    minHeight: '90px !important',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  logoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-4px) rotate(5deg)',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
      '&::before': {
        left: '100%',
      },
    },
  },

  logoIcon: {
    fontSize: '28px',
    color: '#ffffff',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  },

  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 800,
    fontFamily: "Inter, sans-serif",
    color: '#1a202c',
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },

  subtitle: {
    fontFamily: "Poppins, sans-serif",
    color: '#718096',
    fontWeight: 500,
    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
    letterSpacing: "0.02em",
    marginTop: '-4px',
  },

  linkContainer: {
    display: "flex",
    gap: { xs: 1, sm: 2, md: 3 },
    alignItems: 'center',
  },

  linkButton: {
    padding: { xs: "12px 16px", sm: "12px 20px", md: "14px 24px" },
    textTransform: "none",
    borderRadius: "12px",
    minWidth: 'auto',
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    position: 'relative',
    overflow: 'hidden',
    background: 'transparent',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: -1,
    },
    "&:hover": {
      backgroundColor: "transparent",
      transform: "translateY(-3px)",
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
      '&::before': {
        opacity: 1,
      },
    },
    "&:active": {
      transform: "translateY(-1px)",
    },
  },

  buttonText: {
    fontWeight: 700,
    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.05em",
    color: '#2d3748',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-4px',
      left: '50%',
      width: '0%',
      height: '3px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      transition: 'all 0.3s ease',
      transform: 'translateX(-50%)',
      borderRadius: '2px',
    },
    '&:hover::after': {
      width: '100%',
    },
  },

  gradientLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
    backgroundSize: '300% 100%',
    animation: 'gradientShift 6s ease infinite',
    '@keyframes gradientShift': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      transform: 'scale(1.15) translateY(-2px)',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
    },
  },
};

export default Navbar;