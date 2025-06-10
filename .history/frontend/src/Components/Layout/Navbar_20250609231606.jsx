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
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

// Scroll to top component with enhanced animation
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger} timeout={300}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300 }}
      >
        <Fab size="medium" aria-label="scroll back to top" sx={styles.scrollTop}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}

// Animated Logo Component
const AnimatedLogo = () => (
  <Box sx={styles.logoContainer}>
    <Box sx={styles.logoWrapper}>
      <Box sx={styles.logoInner}>
        <Typography sx={styles.logoText}>Q</Typography>
      </Box>
      <Box sx={styles.logoRing} />
    </Box>
    <Box sx={styles.brandContainer}>
      <Typography variant="h5" sx={styles.title}>
        QuizMaster
      </Typography>
      <Box sx={styles.taglineContainer}>
        <Typography variant="caption" sx={styles.subtitle}>
          Learn • Practice • Excel
        </Typography>
      </Box>
    </Box>
  </Box>
);

// Navigation Menu Items
const navItems = [
  { label: 'Home', path: '/', primary: false },
  { label: 'Quizzes', path: '/quizzes', primary: false },
  { label: 'Leaderboard', path: '/leaderboard', primary: false },
  { label: 'About', path: '/about', primary: false },
  { label: 'Contact', path: '/contact', primary: false },
];

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit timeout={600}>
        <AppBar 
          position="fixed" 
          sx={{
            ...styles.appbar,
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
            boxShadow: isScrolled 
              ? '0 8px 32px rgba(0, 0, 0, 0.12)' 
              : '0 2px 16px rgba(0, 0, 0, 0.04)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(12px)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Animated Logo */}
              <AnimatedLogo />

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={styles.navContainer}>
                  <Box sx={styles.linkContainer}>
                    {navItems.map((item, index) => (
                      <Button
                        key={item.label}
                        component={Link}
                        to={item.path}
                        sx={{
                          ...styles.navButton,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={styles.actionsContainer}>
                    <IconButton sx={styles.notificationButton}>
                      <NotificationsIcon />
                      <Box sx={styles.notificationBadge} />
                    </IconButton>
                    
                    <Button
                      onClick={() => navigate("/login")}
                      sx={styles.loginButton}
                    >
                      Get Started
                    </Button>

                    <IconButton onClick={handleProfileMenuOpen} sx={styles.profileButton}>
                      <Avatar sx={styles.avatar}>U</Avatar>
                    </IconButton>
                  </Box>
                </Box>
              )}

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  onClick={handleMobileMenuOpen}
                  sx={styles.mobileMenuButton}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>

            {/* Animated bottom border */}
            <Box sx={styles.bottomBorder}>
              <Box sx={styles.animatedBorder} />
            </Box>
          </Container>
        </AppBar>
      </Slide>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        sx={styles.mobileMenu}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              navigate(item.path);
              handleMobileMenuClose();
            }}
            sx={styles.mobileMenuItem}
          >
            {item.label}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            navigate("/login");
            handleMobileMenuClose();
          }}
          sx={styles.mobileLoginItem}
        >
          Login
        </MenuItem>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        sx={styles.profileMenu}
      >
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Spacer */}
      <Box sx={{ height: '90px' }} />

      {/* Enhanced Scroll to Top */}
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
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',
    overflow: 'hidden',
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: { xs: 2, sm: 3, md: 4 },
    minHeight: '90px !important',
    position: 'relative',
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  logoWrapper: {
    position: 'relative',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoInner: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'rotate(5deg) scale(1.05)',
      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
    },
  },

  logoRing: {
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    width: '64px',
    height: '64px',
    borderRadius: '20px',
    border: '2px solid transparent',
    background: 'linear-gradient(135deg, #667eea, #764ba2) border-box',
    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'subtract',
    animation: 'pulse 2s infinite',
    opacity: 0.6,
  },

  logoText: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#ffffff',
    fontFamily: 'Poppins, sans-serif',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },

  brandContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    color: '#1a202c',
    fontSize: { xs: '1.3rem', sm: '1.5rem' },
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  taglineContainer: {
    overflow: 'hidden',
    height: '16px',
  },

  subtitle: {
    fontFamily: "Poppins, sans-serif",
    color: '#718096',
    fontWeight: 500,
    fontSize: '0.75rem',
    animation: 'slideText 8s infinite',
    whiteSpace: 'nowrap',
  },

  navContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },

  linkContainer: {
    display: "flex",
    gap: 1,
    alignItems: 'center',
  },

  navButton: {
    color: "#4a5568",
    fontWeight: 500,
    fontSize: "0.95rem",
    fontFamily: "Poppins, sans-serif",
    padding: "10px 20px",
    textTransform: "none",
    borderRadius: "12px",
    position: 'relative',
    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    animation: 'fadeInUp 0.6s ease forwards',
    opacity: 0,
    transform: 'translateY(20px)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea20, #764ba220)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    "&:hover": {
      color: "#667eea",
      transform: "translateY(-2px)",
      '&::before': {
        opacity: 1,
      },
    },
  },

  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  notificationButton: {
    position: 'relative',
    color: '#718096',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#667eea',
      transform: 'scale(1.1)',
    },
  },

  notificationBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#f56565',
    animation: 'pulse 2s infinite',
  },

  loginButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '0.9rem',
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'none',
    padding: '10px 24px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.5s',
    },
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
      '&::before': {
        left: '100%',
      },
    },
  },

  profileButton: {
    padding: 0,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  avatar: {
    width: 40,
    height: 40,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
  },

  mobileMenuButton: {
    color: '#4a5568',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#667eea',
      transform: 'scale(1.1)',
    },
  },

  mobileMenu: {
    '& .MuiPaper-root': {
      borderRadius: '16px',
      boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      minWidth: '200px',
    },
  },

  mobileMenuItem: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    padding: '12px 24px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
    },
  },

  mobileLoginItem: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    padding: '12px 24px',
    color: '#667eea',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
    },
  },

  profileMenu: {
    '& .MuiPaper-root': {
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      minWidth: '160px',
    },
  },

  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    overflow: 'hidden',
  },

  animatedBorder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
    backgroundSize: '200% 100%',
    animation: 'borderSlide 3s linear infinite',
  },

  scrollTop: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.15) rotate(5deg)',
      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
    },
  },

  // Keyframe animations
  '@keyframes fadeInUp': {
    'to': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },

  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 0.6,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 1,
      transform: 'scale(1.05)',
    },
  },

  '@keyframes slideText': {
    '0%, 30%': { transform: 'translateY(0)' },
    '33%, 63%': { transform: 'translateY(-100%)' },
    '66%, 96%': { transform: 'translateY(-200%)' },
    '100%': { transform: 'translateY(0)' },
  },

  '@keyframes borderSlide': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '200% 50%' },
  },
};

export default Navbar;