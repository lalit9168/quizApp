import React, { useState, useEffect, useRef } from "react";
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
  Container,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  Feedback as FeedbackIcon,
  ContactMail as ContactIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  BusinessCenter as BusinessIcon,
} from "@mui/icons-material";
import "@fontsource/poppins";

// Subtle floating particles for professional elegance
const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 90;

    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

// Professional scroll to top component
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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

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

  // Subtle mouse tracking for professional elegance
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar 
          position="fixed" 
          onMouseMove={handleMouseMove}
          sx={{
            ...styles.appbar,
            background: isScrolled 
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.05) 0%, rgba(15, 23, 42, 0.98) 40%, rgba(30, 41, 59, 0.95) 100%)`
              : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.08) 0%, rgba(15, 23, 42, 0.92) 40%, rgba(30, 41, 59, 0.88) 100%)`,
          }}
        >
          {/* Subtle floating particles */}
          <FloatingParticles />
          
          {/* Professional light overlay */}
          <Box sx={styles.lightOverlay} />
          
          {/* Geometric accent patterns */}
          <Box sx={styles.geometricPattern} />
          
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Professional Logo Section */}
              <Box sx={styles.logoContainer}>
                <Box sx={styles.logoIconWrapper}>
                  <QuizIcon sx={styles.logoIcon} />
                  <Box sx={styles.logoAccent} />
                </Box>
                <Box sx={styles.titleContainer}>
                  <Typography variant="h4" sx={styles.title}>
                    Quiz Application
                  </Typography>
                  <Box sx={styles.titleUnderline} />
                  <BusinessIcon sx={styles.businessIcon} />
                </Box>
              </Box>

              {/* Professional Navigation Links */}
              <Box sx={styles.linkContainer}>
                <Button 
                  component={Link} 
                  to="/" 
                  sx={{...styles.linkButton, ...styles.homeButton}}
                  startIcon={<HomeIcon />}
                >
                  <span>Home</span>
                  <Box sx={styles.buttonAccent} />
                </Button>
                <Button 
                  onClick={() => navigate("/login")} 
                  sx={{...styles.linkButton, ...styles.loginButton}}
                  startIcon={<LoginIcon />}
                >
                  <span>Login</span>
                  <Box sx={styles.buttonAccent} />
                </Button>
                <Button 
                  component={Link} 
                  to="/feedback" 
                  sx={{...styles.linkButton, ...styles.feedbackButton}}
                  startIcon={<FeedbackIcon />}
                >
                  <span>Feedback</span>
                  <Box sx={styles.buttonAccent} />
                </Button>
                <Button 
                  component={Link} 
                  to="/contact" 
                  sx={{...styles.linkButton, ...styles.contactButton}}
                  startIcon={<ContactIcon />}
                >
                  <span>Contact</span>
                  <Box sx={styles.buttonAccent} />
                </Button>
              </Box>
            </Toolbar>
          </Container>

          {/* Professional accent border */}
          <Box sx={styles.accentBorder} />
          <Box sx={styles.subtleBorder} />
        </AppBar>
      </Slide>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '90px' }} />

      {/* Professional Scroll to Top Button */}
      <ScrollTop />

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  appbar: {
    backdropFilter: "blur(20px) saturate(120%)",
    WebkitBackdropFilter: "blur(20px) saturate(120%)",
    boxShadow: "0 8px 32px rgba(15, 23, 42, 0.4), 0 2px 16px rgba(99, 102, 241, 0.1)",
    height: "90px",
    justifyContent: "center",
    zIndex: 1100,
    border: "1px solid rgba(148, 163, 184, 0.1)",
    borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%)',
      animation: 'professionalShimmer 6s infinite',
      transform: 'skew(-15deg)',
    },
    '@keyframes professionalShimmer': {
      '0%': { left: '-100%' },
      '100%': { left: '100%' },
    },
  },

  lightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, transparent 50%, rgba(168, 85, 247, 0.02) 100%)',
    animation: 'subtleLightSweep 8s ease-in-out infinite',
    zIndex: 2,
    '@keyframes subtleLightSweep': {
      '0%, 100%': { opacity: 0.5 },
      '50%': { opacity: 0.8 },
    },
  },

  geometricPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.02) 0%, transparent 40%),
      radial-gradient(circle at 75% 25%, rgba(59, 130, 246, 0.02) 0%, transparent 40%)
    `,
    zIndex: 2,
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: 3,
    position: 'relative',
    zIndex: 10,
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2.5,
    position: 'relative',
  },

  logoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
    position: 'relative',
    animation: 'professionalFloat 4s ease-in-out infinite',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '@keyframes professionalFloat': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-3px)' },
    },
  },

  logoAccent: {
    position: 'absolute',
    width: '68px',
    height: '68px',
    border: '2px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '20px',
    animation: 'accentPulse 3s ease-in-out infinite',
    '@keyframes accentPulse': {
      '0%, 100%': { 
        transform: 'scale(1)', 
        opacity: 0.3 
      },
      '50%': { 
        transform: 'scale(1.05)', 
        opacity: 0.6 
      },
    },
  },

  logoIcon: {
    fontSize: '28px',
    color: '#ffffff',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  },

  titleContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "1px",
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 8px rgba(99, 102, 241, 0.2)',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      opacity: 0,
      animation: 'titleGlow 4s ease-in-out infinite',
    },
    '@keyframes titleGlow': {
      '0%, 90%, 100%': { opacity: 0 },
      '45%, 55%': { opacity: 0.3 },
    },
  },

  titleUnderline: {
    width: '0%',
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    animation: 'underlineGrow 2s ease-out 0.5s forwards',
    borderRadius: '1px',
    marginTop: '4px',
    '@keyframes underlineGrow': {
      '0%': { width: '0%' },
      '100%': { width: '100%' },
    },
  },

  businessIcon: {
    position: 'absolute',
    top: -8,
    right: -12,
    fontSize: '16px',
    color: '#6366f1',
    opacity: 0.7,
    animation: 'businessIconFloat 3s ease-in-out infinite',
    '@keyframes businessIconFloat': {
      '0%, 100%': { transform: 'translateY(0px)', opacity: 0.7 },
      '50%': { transform: 'translateY(-2px)', opacity: 1 },
    },
  },

  linkContainer: {
    display: "flex",
    gap: 1,
    alignItems: 'center',
  },

  linkButton: {
    color: "#e2e8f0",
    fontWeight: 600,
    fontSize: "0.9rem",
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "0.5px",
    padding: "0.75rem 1.25rem",
    textTransform: "none",
    borderRadius: "12px",
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(148, 163, 184, 0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
      transition: 'left 0.5s ease',
    },
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(99, 102, 241, 0.2)",
      border: '1px solid rgba(99, 102, 241, 0.3)',
      color: '#ffffff',
      '&::before': {
        left: '100%',
      },
    },
    "&:active": {
      transform: "translateY(0px)",
    },
    '& .MuiButton-startIcon': {
      marginRight: '8px',
      transition: 'transform 0.3s ease',
    },
    '&:hover .MuiButton-startIcon': {
      transform: 'scale(1.1)',
    },
    '& span': {
      position: 'relative',
      zIndex: 2,
    },
  },

  buttonAccent: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
    borderRadius: '1px',
  },

  homeButton: {
    '&:hover': {
      background: 'rgba(99, 102, 241, 0.1)',
      '& .MuiBox-root': {
        width: '80%',
      },
    },
  },

  loginButton: {
    '&:hover': {
      background: 'rgba(168, 85, 247, 0.1)',
      '& .MuiBox-root': {
        width: '80%',
        background: 'linear-gradient(90deg, #8b5cf6, #6366f1)',
      },
    },
  },

  feedbackButton: {
    '&:hover': {
      background: 'rgba(59, 130, 246, 0.1)',
      '& .MuiBox-root': {
        width: '80%',
        background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
      },
    },
  },

  contactButton: {
    '&:hover': {
      background: 'rgba(139, 92, 246, 0.1)',
      '& .MuiBox-root': {
        width: '80%',
        background: 'linear-gradient(90deg, #8b5cf6, #a855f7)',
      },
    },
  },

  accentBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%)',
    backgroundSize: '200% 100%',
    animation: 'borderFlow 8s linear infinite',
    zIndex: 5,
    opacity: 0.6,
    '@keyframes borderFlow': {
      '0%': { backgroundPosition: '0% 0%' },
      '100%': { backgroundPosition: '200% 0%' },
    },
  },

  subtleBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.3) 50%, transparent 100%)',
    zIndex: 4,
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#ffffff',
    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      transform: 'scale(1.1) translateY(-2px)',
      boxShadow: '0 12px 32px rgba(139, 92, 246, 0.4)',
    },
  },
};

export default Navbar;