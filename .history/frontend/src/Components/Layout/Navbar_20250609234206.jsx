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
  Divider,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  Feedback as FeedbackIcon,
  ContactMail as ContactIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import "@fontsource/poppins";
import "@fontsource/inter";

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
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
      >
        <Fab size="medium" aria-label="scroll back to top" sx={styles.scrollTop}>
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

  // Handle scroll effect for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
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
              ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)' 
              : '0 4px 16px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
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
                  <Typography variant="h5" sx={styles.title}>
                    Quiz Application
                  </Typography>
                  <Typography variant="caption" sx={styles.subtitle}>
                    professional learning platform
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Links */}
              <Box sx={styles.linkContainer}>
                <Button 
                  component={Link} 
                  to="/" 
                  sx={styles.linkButton}
                  startIcon={<HomeIcon sx={styles.buttonIcon} />}
                >
                  home
                </Button>
                <Button 
                  onClick={() => navigate("/login")} 
                  sx={styles.linkButton}
                  startIcon={<LoginIcon sx={styles.buttonIcon} />}
                >
                  login
                </Button>
                <Button 
                  component={Link} 
                  to="/feedback" 
                  sx={styles.linkButton}
                  startIcon={<FeedbackIcon sx={styles.buttonIcon} />}
                >
                  feedback
                </Button>
                <Button 
                  component={Link} 
                  to="/contact" 
                  sx={styles.linkButton}
                  startIcon={<ContactIcon sx={styles.buttonIcon} />}
                >
                  contact us
                </Button>
              </Box>
            </Toolbar>
          </Container>
          
          {/* Animated bottom accent line */}
          <Box sx={styles.accentLine} />
        </AppBar>
      </Slide>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '85px' }} />

      {/* Scroll to Top Button */}
      <ScrollTop />

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  appbar: {
    backgroundColor: '#ffffff',
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    height: "85px",
    justifyContent: "center",
    zIndex: 1100,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
      zIndex: -1,
    },
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: { xs: 2, sm: 3, md: 4 },
    minHeight: '85px !important',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2.5,
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
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3), 0 2px 8px rgba(102, 126, 234, 0.2)',
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
      transition: 'left 0.6s ease',
    },
    '&:hover': {
      transform: 'translateY(-3px) scale(1.05)',
      boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(102, 126, 234, 0.3)',
      '&::before': {
        left: '100%',
      },
    },
  },

  logoIcon: {
    fontSize: '26px',
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
    fontFamily: "Inter, Poppins, sans-serif",
    color: '#1a202c',
    letterSpacing: "-0.025em",
    lineHeight: 1.2,
    fontSize: '1.75rem',
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subtitle: {
    fontFamily: "Inter, sans-serif",
    color: '#718096',
    fontWeight: 500,
    fontSize: '0.8rem',
    letterSpacing: "0.025em",
    marginTop: '-1px',
  },

  linkContainer: {
    display: "flex",
    gap: 0.5,
    alignItems: 'center',
  },

  linkButton: {
    color: "#1a202c",
    fontWeight: 700,
    fontSize: "0.95rem",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.02em",
    padding: "12px 20px",
    textTransform: "none",
    borderRadius: "12px",
    minWidth: 'auto',
    position: 'relative',
    overflow: 'hidden',
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
      transition: 'left 0.4s ease',
      zIndex: -1,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: '0%',
      height: '3px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      transition: 'all 0.3s ease',
      transform: 'translateX(-50%)',
      borderRadius: '2px',
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      color: "#1a202c",
      transform: "translateY(-2px)",
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(102, 126, 234, 0.2)',
      '&::before': {
        left: '100%',
      },
      '&::after': {
        width: '80%',
      },
      '& .MuiSvgIcon-root': {
        transform: 'translateX(2px) scale(1.1)',
        color: '#667eea',
      },
    },
    "&:active": {
      transform: "translateY(-1px)",
    },
  },

  buttonIcon: {
    fontSize: '19px',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    marginRight: '4px',
    color: '#4a5568',
  },

  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
    backgroundSize: '200% 100%',
    animation: 'gradient-shift 4s ease-in-out infinite',
    opacity: 0.9,
    '@keyframes gradient-shift': {
      '0%, 100%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
    },
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3), 0 2px 8px rgba(102, 126, 234, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
      transform: 'scale(1.15) translateY(-2px)',
      boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4), 0 4px 12px rgba(102, 126, 234, 0.3)',
    },
  },
};

export default Navbar;