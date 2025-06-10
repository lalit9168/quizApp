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
              ? '0 4px 20px rgba(0, 0, 0, 0.08)' 
              : '0 2px 10px rgba(0, 0, 0, 0.04)',
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
                  startIcon={<HomeIcon sx={styles.buttonIcon} />}
                >
                  Home
                </Button>
                <Button 
                  onClick={() => navigate("/login")} 
                  sx={{...styles.linkButton, ...styles.loginButton}}
                  startIcon={<LoginIcon sx={styles.buttonIcon} />}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/feedback" 
                  sx={styles.linkButton}
                  startIcon={<FeedbackIcon sx={styles.buttonIcon} />}
                >
                  Feedback
                </Button>
                <Button 
                  component={Link} 
                  to="/contact" 
                  sx={styles.linkButton}
                  startIcon={<ContactIcon sx={styles.buttonIcon} />}
                >
                  Contact
                </Button>
              </Box>
            </Toolbar>
          </Container>
          
          {/* Bottom accent line */}
          <Box sx={styles.accentLine} />
        </AppBar>
      </Slide>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '80px' }} />

      {/* Scroll to Top Button */}
      <ScrollTop />

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  appbar: {
    backgroundColor: '#ffffff',
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    height: "80px",
    justifyContent: "center",
    zIndex: 1100,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: { xs: 2, sm: 3, md: 4 },
    minHeight: '80px !important',
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
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.25)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(25, 118, 210, 0.35)',
    },
  },

  logoIcon: {
    fontSize: '24px',
    color: '#ffffff',
  },

  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 700,
    fontFamily: "Inter, Poppins, sans-serif",
    color: '#1a1a1a',
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },

  subtitle: {
    fontFamily: "Inter, sans-serif",
    color: '#64748b',
    fontWeight: 500,
    fontSize: '0.75rem',
    letterSpacing: "0.02em",
    marginTop: '-2px',
  },

  linkContainer: {
    display: "flex",
    gap: 1,
    alignItems: 'center',
  },

  linkButton: {
    color: "#475569",
    fontWeight: 500,
    fontSize: "0.95rem",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.01em",
    padding: "8px 16px",
    textTransform: "none",
    borderRadius: "8px",
    minWidth: 'auto',
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: '0%',
      height: '2px',
      backgroundColor: '#1976d2',
      transition: 'all 0.3s ease',
      transform: 'translateX(-50%)',
    },
    "&:hover": {
      backgroundColor: "#f8fafc",
      color: "#1976d2",
      transform: "translateY(-1px)",
      '&::after': {
        width: '70%',
      },
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },

  loginButton: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    fontWeight: 600,
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
    '&::after': {
      display: 'none',
    },
    "&:hover": {
      backgroundColor: "#1565c0",
      color: '#ffffff',
      transform: "translateY(-2px)",
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
    },
  },

  buttonIcon: {
    fontSize: '18px',
    transition: 'transform 0.2s ease',
  },

  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%)',
    opacity: 0.8,
  },

  scrollTop: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
    boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
    '&:hover': {
      backgroundColor: '#1565c0',
      transform: 'scale(1.1)',
      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
    },
  },
};

export default Navbar;