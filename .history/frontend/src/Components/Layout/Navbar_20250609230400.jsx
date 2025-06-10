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
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";
import "@fontsource/poppins";

// Floating particles component
const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 90;

    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
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
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
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
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1300 }}
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Mouse tracking for interactive effects
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
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 212, 255, 0.3) 0%, rgba(1, 58, 58, 0.95) 50%, rgba(0, 102, 204, 0.8) 100%)`
              : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 212, 255, 0.4) 0%, rgba(1, 58, 58, 0.85) 50%, rgba(0, 153, 204, 0.9) 100%)`,
          }}
        >
          {/* Floating particles background */}
          <FloatingParticles />
          
          {/* Dynamic light overlay */}
          <Box sx={styles.lightOverlay} />
          
          {/* Geometric patterns */}
          <Box sx={styles.geometricPattern} />
          
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Logo/Title Section with advanced 3D effects */}
              <Box sx={styles.logoContainer}>
                <Box sx={styles.logoIconWrapper}>
                  <QuizIcon sx={styles.logoIcon} />
                  <Box sx={styles.logoRing} />
                  <Box sx={styles.logoRing2} />
                </Box>
                <Box sx={styles.titleContainer}>
                  <Typography variant="h4" sx={styles.title}>
                    Quiz Application
                  </Typography>
                  <Box sx={styles.titleUnderline} />
                  <SparkleIcon sx={styles.sparkleIcon} />
                </Box>
              </Box>

              {/* Navigation Links with magnetic hover effects */}
              <Box sx={styles.linkContainer}>
                <Button 
                  component={Link} 
                  to="/" 
                  sx={{...styles.linkButton, ...styles.homeButton}}
                  startIcon={<HomeIcon />}
                >
                  <span>Home</span>
                  <Box sx={styles.buttonRipple} />
                </Button>
                <Button 
                  onClick={() => navigate("/login")} 
                  sx={{...styles.linkButton, ...styles.loginButton}}
                  startIcon={<LoginIcon />}
                >
                  <span>Login</span>
                  <Box sx={styles.buttonRipple} />
                </Button>
                <Button 
                  component={Link} 
                  to="/feedback" 
                  sx={{...styles.linkButton, ...styles.feedbackButton}}
                  startIcon={<FeedbackIcon />}
                >
                  <span>Feedback</span>
                  <Box sx={styles.buttonRipple} />
                </Button>
                <Button 
                  component={Link} 
                  to="/contact" 
                  sx={{...styles.linkButton, ...styles.contactButton}}
                  startIcon={<ContactIcon />}
                >
                  <span>Contact</span>
                  <Box sx={styles.buttonRipple} />
                </Button>
              </Box>
            </Toolbar>
          </Container>

          {/* Multi-layered animated borders */}
          <Box sx={styles.animatedBorder} />
          <Box sx={styles.animatedBorder2} />
          <Box sx={styles.pulsingDots} />
        </AppBar>
      </Slide>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '90px' }} />

      {/* Enhanced Scroll to Top Button */}
      <ScrollTop />

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  appbar: {
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    boxShadow: "0 12px 40px rgba(0, 212, 255, 0.3), 0 0 80px rgba(0, 153, 204, 0.1)",
    height: "90px",
    justifyContent: "center",
    zIndex: 1100,
    border: "1px solid rgba(255, 255, 255, 0.15)",
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-200%',
      width: '200%',
      height: '100%',
      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
      animation: 'megaShimmer 4s infinite',
      transform: 'skew(-20deg)',
    },
    '@keyframes megaShimmer': {
      '0%': { left: '-200%' },
      '100%': { left: '200%' },
    },
  },

  lightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 212, 255, 0.1) 0%, transparent 50%, rgba(0, 255, 150, 0.1) 100%)',
    animation: 'lightSweep 6s ease-in-out infinite',
    zIndex: 2,
    '@keyframes lightSweep': {
      '0%, 100%': { opacity: 0.3 },
      '50%': { opacity: 0.7 },
    },
  },

  geometricPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 150, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 0, 150, 0.05) 0%, transparent 50%)
    `,
    zIndex: 2,
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: 2,
    position: 'relative',
    zIndex: 10,
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    position: 'relative',
  },

  logoIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #ff6b35 100%)',
    boxShadow: '0 8px 25px rgba(0, 212, 255, 0.5), inset 0 2px 10px rgba(255,255,255,0.3)',
    position: 'relative',
    animation: 'logoFloat 3s ease-in-out infinite',
    transform: 'perspective(1000px) rotateX(15deg)',
    '@keyframes logoFloat': {
      '0%, 100%': { transform: 'perspective(1000px) rotateX(15deg) translateY(0px) rotateZ(0deg)' },
      '50%': { transform: 'perspective(1000px) rotateX(15deg) translateY(-5px) rotateZ(180deg)' },
    },
  },

  logoRing: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    border: '2px solid rgba(0, 212, 255, 0.3)',
    borderRadius: '50%',
    animation: 'ringRotate 4s linear infinite',
    '@keyframes ringRotate': {
      '0%': { transform: 'rotate(0deg) scale(1)' },
      '50%': { transform: 'rotate(180deg) scale(1.1)' },
      '100%': { transform: 'rotate(360deg) scale(1)' },
    },
  },

  logoRing2: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    border: '1px solid rgba(255, 107, 53, 0.2)',
    borderRadius: '50%',
    animation: 'ringRotate2 6s linear infinite reverse',
    '@keyframes ringRotate2': {
      '0%': { transform: 'rotate(0deg) scale(1)' },
      '100%': { transform: 'rotate(360deg) scale(1.05)' },
    },
  },

  logoIcon: {
    fontSize: '32px',
    color: '#ffffff',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
    animation: 'iconPulse 2s ease-in-out infinite',
    '@keyframes iconPulse': {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.2)' },
    },
  },

  titleContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 800,
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "2px",
    background: 'linear-gradient(45deg, #ffffff 0%, #00d4ff 25%, #ff6b35 50%, #00ff96 75%, #ffffff 100%)',
    backgroundSize: '300% 300%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'titleRainbow 3s ease-in-out infinite, titleGlow 2s ease-in-out infinite alternate',
    textShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
    transform: 'perspective(500px) rotateX(10deg)',
    '@keyframes titleRainbow': {
      '0%, 100%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
    },
    '@keyframes titleGlow': {
      '0%': { filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))' },
      '100%': { filter: 'drop-shadow(0 0 30px rgba(255, 107, 53, 0.8))' },
    },
  },

  titleUnderline: {
    width: '0%',
    height: '3px',
    background: 'linear-gradient(90deg, #00d4ff, #ff6b35)',
    animation: 'underlineExpand 2s ease-out 0.5s forwards',
    borderRadius: '2px',
    '@keyframes underlineExpand': {
      '0%': { width: '0%' },
      '100%': { width: '100%' },
    },
  },

  sparkleIcon: {
    position: 'absolute',
    top: -10,
    right: -15,
    fontSize: '20px',
    color: '#00d4ff',
    animation: 'sparkle 1.5s ease-in-out infinite',
    '@keyframes sparkle': {
      '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: 0 },
      '50%': { transform: 'scale(1) rotate(180deg)', opacity: 1 },
    },
  },

  linkContainer: {
    display: "flex",
    gap: 1.5,
    alignItems: 'center',
  },

  linkButton: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.95rem",
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "1px",
    padding: "0.8rem 1.5rem",
    textTransform: "none",
    borderRadius: "30px",
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: 'perspective(1000px) rotateX(5deg)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
    "&:hover": {
      transform: "perspective(1000px) translateY(-8px) rotateX(-5deg) scale(1.05)",
      boxShadow: "0 20px 40px rgba(0, 212, 255, 0.4), 0 0 50px rgba(0, 212, 255, 0.2)",
      border: '1px solid rgba(0, 212, 255, 0.6)',
      '&::before': {
        left: '100%',
      },
    },
    "&:active": {
      transform: "perspective(1000px) translateY(-4px) rotateX(-2deg) scale(1.02)",
    },
    '& .MuiButton-startIcon': {
      marginRight: '10px',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
    },
    '&:hover .MuiButton-startIcon': {
      transform: 'rotateY(360deg) scale(1.2)',
    },
    '& span': {
      position: 'relative',
      zIndex: 2,
    },
  },

  buttonRipple: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.4s ease',
    pointerEvents: 'none',
  },

  homeButton: {
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(0, 255, 150, 0.3), rgba(0, 212, 255, 0.2))',
    },
  },

  loginButton: {
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 0, 150, 0.2))',
    },
  },

  feedbackButton: {
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 107, 53, 0.2))',
    },
  },

  contactButton: {
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(0, 212, 255, 0.2))',
    },
  },

  animatedBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #00d4ff 0%, #ff6b35 25%, #00ff96 50%, #ff0096 75%, #00d4ff 100%)',
    backgroundSize: '400% 100%',
    animation: 'borderFlow 3s linear infinite',
    zIndex: 5,
    '@keyframes borderFlow': {
      '0%': { backgroundPosition: '0% 0%' },
      '100%': { backgroundPosition: '400% 0%' },
    },
  },

  animatedBorder2: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
    backgroundSize: '200% 100%',
    animation: 'borderFlow2 2s linear infinite reverse',
    zIndex: 4,
    '@keyframes borderFlow2': {
      '0%': { backgroundPosition: '0% 0%' },
      '100%': { backgroundPosition: '200% 0%' },
    },
  },

  pulsingDots: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '2px',
    background: `
      radial-gradient(circle, #00d4ff 1px, transparent 1px),
      radial-gradient(circle, #ff6b35 1px, transparent 1px),
      radial-gradient(circle, #00ff96 1px, transparent 1px)
    `,
    backgroundSize: '100px 2px, 150px 2px, 200px 2px',
    backgroundPosition: '0 0, 50px 0, 100px 0',
    animation: 'dotPulse 4s ease-in-out infinite',
    opacity: 0.6,
    '@keyframes dotPulse': {
      '0%, 100%': { 
        backgroundSize: '100px 2px, 150px 2px, 200px 2px',
        opacity: 0.3 
      },
      '50%': { 
        backgroundSize: '150px 4px, 200px 4px, 250px 4px',
        opacity: 0.8 
      },
    },
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #00d4ff 0%, #ff6b35 50%, #00ff96 100%)',
    color: '#ffffff',
    boxShadow: '0 8px 25px rgba(0, 212, 255, 0.5), 0 0 50px rgba(0, 212, 255, 0.3)',
    animation: 'scrollButtonFloat 3s ease-in-out infinite',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      background: 'linear-gradient(135deg, #ff6b35 0%, #00d4ff 50%, #00ff96 100%)',
      transform: 'scale(1.15) rotateY(180deg)',
      boxShadow: '0 15px 35px rgba(255, 107, 53, 0.5), 0 0 70px rgba(255, 107, 53, 0.4)',
    },
    '@keyframes scrollButtonFloat': {
      '0%, 100%': { transform: 'translateY(0px) rotateZ(0deg)' },
      '50%': { transform: 'translateY(-10px) rotateZ(180deg)' },
    },
  },
};

export default Navbar;