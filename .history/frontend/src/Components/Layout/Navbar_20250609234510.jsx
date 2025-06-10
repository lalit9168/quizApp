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
  Home as HomeIcon,
  Login as LoginIcon,
  Feedback as FeedbackIcon,
  ContactMail as ContactIcon,
} from "@mui/icons-material";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

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
  const [hoveredButton, setHoveredButton] = useState(null);
  const [logoHovered, setLogoHovered] = useState(false);

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

  const navItems = [
    { name: 'Home', path: '/', action: () => navigate('/'), icon: HomeIcon },
    { name: 'Login', path: '/login', action: () => navigate('/login'), icon: LoginIcon },
    { name: 'Feedback', path: '/feedback', action: () => navigate('/feedback'), icon: FeedbackIcon },
    { name: 'Contact', path: '/contact', action: () => navigate('/contact'), icon: ContactIcon },
  ];

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar 
          position="fixed" 
          sx={{
            ...styles.appbar,
            boxShadow: isScrolled 
              ? '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)' 
              : '0 6px 20px rgba(0, 0, 0, 0.08)',
            backgroundColor: isScrolled ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: isScrolled ? "blur(25px)" : "blur(20px)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Logo/Brand Section */}
              <Box 
                sx={styles.logoContainer}
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
              >
                <Box sx={{
                  ...styles.logoIconWrapper,
                  transform: logoHovered ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
                }}>
                  <QuizIcon sx={{
                    ...styles.logoIcon,
                    transform: logoHovered ? 'rotate(360deg)' : 'rotate(0deg)',
                  }} />
                  <Box sx={{
                    ...styles.logoGlow,
                    opacity: logoHovered ? 0.4 : 0,
                  }} />
                </Box>
                <Box sx={styles.brandContainer}>
                  <Typography variant="h4" sx={styles.title}>
                    QuizMaster Pro
                  </Typography>
                  <Typography variant="caption" sx={styles.subtitle}>
                    Advanced Learning Platform
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Links */}
              <Box sx={styles.linkContainer}>
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Button
                      key={item.name}
                      onClick={item.action}
                      onMouseEnter={() => setHoveredButton(item.name)}
                      onMouseLeave={() => setHoveredButton(null)}
                      sx={{
                        ...styles.linkButton,
                        animationDelay: `${index * 0.1}s`,
                        transform: hoveredButton === item.name 
                          ? 'translateY(-4px) scale(1.02)' 
                          : 'translateY(0) scale(1)',
                      }}
                    >
                      <IconComponent sx={{
                        ...styles.navIcon,
                        transform: hoveredButton === item.name ? 'scale(1.1)' : 'scale(1)',
                      }} />
                      <Typography sx={styles.buttonText}>
                        {item.name}
                      </Typography>
                      <Box 
                        sx={{
                          ...styles.hoverUnderline,
                          width: hoveredButton === item.name ? '100%' : '0%',
                        }} 
                      />
                      <Box 
                        sx={{
                          ...styles.hoverBackground,
                          opacity: hoveredButton === item.name ? 1 : 0,
                        }} 
                      />
                    </Button>
                  );
                })}
              </Box>
            </Toolbar>
          </Container>
          
          {/* Animated gradient line */}
          <Box sx={styles.gradientLine} />
          
          {/* Floating particles effect */}
          <Box sx={styles.particleContainer}>
            {[...Array(6)].map((_, i) => (
              <Box 
                key={i} 
                sx={{
                  ...styles.particle,
                  left: `${15 + i * 15}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }} 
              />
            ))}
          </Box>
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
    height: "90px",
    justifyContent: "center",
    zIndex: 1100,
    border: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.95) 100%)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
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
    px: { xs: 2, sm: 3, md: 4 },
    minHeight: '90px !important',
    position: 'relative',
    zIndex: 2,
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    cursor: 'pointer',
    animation: 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    '@keyframes slideInLeft': {
      '0%': {
        transform: 'translateX(-50px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },

  logoIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '18px',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
      zIndex: 1,
    },
  },

  logoIcon: {
    fontSize: '32px',
    color: '#ffffff',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 2,
    position: 'relative',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
  },

  logoGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120%',
    height: '120%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%)',
    transition: 'opacity 0.4s ease',
    zIndex: -1,
    filter: 'blur(10px)',
  },

  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 700,
    fontFamily: "Montserrat, Inter, sans-serif",
    color: '#1a202c',
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    fontSize: '1.9rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
    transition: 'all 0.3s ease',
  },

  subtitle: {
    fontFamily: "Inter, sans-serif",
    color: '#64748b',
    fontWeight: 500,
    fontSize: '0.85rem',
    letterSpacing: "0.03em",
    marginTop: '-2px',
    opacity: 0.8,
    transition: 'opacity 0.3s ease',
  },

  linkContainer: {
    display: "flex",
    gap: 2,
    alignItems: 'center',
    animation: 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    '@keyframes slideInRight': {
      '0%': {
        transform: 'translateX(50px)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
  },

  linkButton: {
    position: 'relative',
    color: "#2d3748",
    fontWeight: 600,
    fontSize: "1rem",
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.02em",
    padding: "14px 20px",
    textTransform: "none",
    borderRadius: "14px",
    minWidth: 'auto',
    overflow: 'hidden',
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    animation: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
    opacity: 0,
    transform: 'translateY(20px)',
    border: '2px solid transparent',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
      transition: 'left 0.6s ease',
      zIndex: 0,
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      color: "#4c51bf",
      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)',
      border: '2px solid rgba(102, 126, 234, 0.3)',
      '&:before': {
        left: '100%',
      },
    },
    "&:active": {
      transform: "translateY(-2px) scale(0.98)",
    },
    '@keyframes fadeInUp': {
      'to': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },

  navIcon: {
    fontSize: '20px',
    marginRight: '8px',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
  },

  buttonText: {
    fontWeight: 600,
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    letterSpacing: '0.02em',
    textTransform: 'none',
    position: 'relative',
    zIndex: 1,
    transition: 'all 0.3s ease',
  },

  hoverUnderline: {
    position: 'absolute',
    bottom: '6px',
    left: '50%',
    height: '3px',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
    borderRadius: '2px',
    transform: 'translateX(-50%)',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
  },

  hoverBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)',
    borderRadius: '14px',
    transition: 'opacity 0.4s ease',
    zIndex: -1,
  },

  gradientLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)',
    backgroundSize: '300% 100%',
    animation: 'gradientShift 6s ease-in-out infinite',
    boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)',
    '@keyframes gradientShift': {
      '0%, 100%': {
        backgroundPosition: '0 0',
      },
      '50%': {
        backgroundPosition: '100% 0',
      },
    },
  },

  particleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0,
  },

  particle: {
    position: 'absolute',
    top: '50%',
    width: '4px',
    height: '4px',
    backgroundColor: 'rgba(102, 126, 234, 0.3)',
    borderRadius: '50%',
    animation: 'float 3s ease-in-out infinite',
    '@keyframes float': {
      '0%, 100%': {
        transform: 'translateY(0) scale(1)',
        opacity: 0.3,
      },
      '50%': {
        transform: 'translateY(-20px) scale(1.2)',
        opacity: 0.8,
      },
    },
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    color: '#ffffff',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 50%, #ec4899 100%)',
      transform: 'scale(1.15) translateY(-3px) rotate(5deg)',
      boxShadow: '0 15px 40px rgba(102, 126, 234, 0.5)',
    },
    '&:active': {
      transform: 'scale(1.05) translateY(-1px)',
    },
  },
};

export default Navbar;