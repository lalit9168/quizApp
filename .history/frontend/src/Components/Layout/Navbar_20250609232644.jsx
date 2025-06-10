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
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
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
  const [hoveredButton, setHoveredButton] = useState(null);

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

  const navigationItems = [
    { name: 'Home', path: '/', action: () => navigate('/') },
    { name: 'Login', path: '/login', action: () => navigate('/login'), special: true },
    { name: 'Feedback', path: '/feedback', action: () => navigate('/feedback') },
    { name: 'Contact', path: '/contact', action: () => navigate('/contact') },
  ];

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar 
          position="fixed" 
          sx={{
            ...styles.appbar,
            transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
            boxShadow: isScrolled 
              ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)' 
              : '0 4px 20px rgba(0, 0, 0, 0.05)',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Logo/Brand Section */}
              <Box sx={styles.logoContainer}>
                <Box sx={styles.logoIconWrapper}>
                  <QuizIcon sx={styles.logoIcon} />
                  <Box sx={styles.logoGradientOverlay} />
                </Box>
                <Box sx={styles.brandContainer}>
                  <Typography variant="h4" sx={styles.title}>
                    Quiz<span style={styles.titleAccent}>Hub</span>
                  </Typography>
                  <Typography variant="body2" sx={styles.subtitle}>
                    Professional Learning Platform
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Links */}
              <Box sx={styles.linkContainer}>
                {navigationItems.map((item, index) => (
                  <Button
                    key={item.name}
                    onClick={item.action}
                    onMouseEnter={() => setHoveredButton(item.name)}
                    onMouseLeave={() => setHoveredButton(null)}
                    sx={{
                      ...styles.linkButton,
                      ...(item.special ? styles.loginButton : {}),
                      animationDelay: `${index * 0.1}s`,
                      transform: hoveredButton === item.name ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                    }}
                  >
                    <Typography sx={styles.buttonText}>
                      {item.name}
                    </Typography>
                    {!item.special && (
                      <Box 
                        sx={{
                          ...styles.buttonUnderline,
                          width: hoveredButton === item.name ? '100%' : '0%',
                        }} 
                      />
                    )}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
          
          {/* Animated background gradient */}
          <Box sx={styles.backgroundGradient} />
          
          {/* Bottom accent line */}
          <Box sx={styles.accentLine} />
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
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: { xs: 3, sm: 4, md: 5 },
    minHeight: '90px !important',
    position: 'relative',
    zIndex: 2,
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    animation: 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  logoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-4px) rotate(5deg) scale(1.1)',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5), 0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  },

  logoIcon: {
    fontSize: '28px',
    color: '#ffffff',
    zIndex: 2,
    position: 'relative',
  },

  logoGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
    borderRadius: '16px',
  },

  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 800,
    fontFamily: "Poppins, sans-serif",
    color: '#1a202c',
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    fontSize: '2rem',
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  titleAccent: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subtitle: {
    fontFamily: "Inter, sans-serif",
    color: '#64748b',
    fontWeight: 600,
    fontSize: '0.85rem',
    letterSpacing: "0.05em",
    marginTop: '2px',
    textTransform: 'uppercase',
  },

  linkContainer: {
    display: "flex",
    gap: 2,
    alignItems: 'center',
    animation: 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  linkButton: {
    color: "#2d3748",
    fontWeight: 700,
    fontSize: "1.1rem",
    fontFamily: "Roboto, sans-serif",
    letterSpacing: "0.02em",
    padding: "14px 24px",
    textTransform: "none",
    borderRadius: "12px",
    minWidth: 'auto',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: 'relative',
    overflow: 'hidden',
    animation: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
    opacity: 0,
    transform: 'translateY(20px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      transition: 'left 0.6s ease',
    },
    "&:hover": {
      backgroundColor: "rgba(102, 126, 234, 0.08)",
      color: "#667eea",
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
      '&::before': {
        left: '100%',
      },
    },
  },

  buttonText: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '0.02em',
    position: 'relative',
    zIndex: 1,
  },

  buttonUnderline: {
    position: 'absolute',
    bottom: '8px',
    left: '50%',
    height: '3px',
    backgroundColor: '#667eea',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'translateX(-50%)',
    borderRadius: '2px',
  },

  loginButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    fontWeight: 700,
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    "&:hover": {
      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
      color: '#ffffff',
      boxShadow: '0 8px 28px rgba(102, 126, 234, 0.4)',
      transform: 'translateY(-3px) scale(1.05)',
    },
  },

  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 50%, rgba(102, 126, 234, 0.02) 100%)',
    opacity: 0.5,
  },

  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
    backgroundSize: '200% 100%',
    animation: 'gradientShift 3s ease-in-out infinite',
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
      transform: 'scale(1.15) translateY(-2px)',
      boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
    },
  },

  // Keyframe animations
  '@keyframes slideInLeft': {
    '0%': {
      opacity: 0,
      transform: 'translateX(-50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },

  '@keyframes slideInRight': {
    '0%': {
      opacity: 0,
      transform: 'translateX(50px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateX(0)',
    },
  },

  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

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
};

export default Navbar;