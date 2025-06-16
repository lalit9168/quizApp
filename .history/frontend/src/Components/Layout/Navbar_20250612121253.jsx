import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
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
  Drawer,
  IconButton,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: 'Home', path: '/', action: () => navigate('/') },
    { name: 'Login', path: '/login', action: () => navigate('/login') },
    { name: 'Feedback', path: '/feedback', action: () => navigate('/feedback') },
    { name: 'Contact Us', path: '/contact', action: () => navigate('/contact') },
  ];

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
            backgroundColor: isScrolled ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
              {/* Logo/Brand Section */}
              <Box sx={styles.logoContainer}>
                <Box sx={styles.logoIconWrapper}>
                  <QuizIcon sx={styles.logoIcon} />
                  <Box sx={styles.logoGlow} />
                </Box>
                <Box sx={styles.brandContainer}>
                  <Typography variant="h4" sx={styles.title}>
                    QuizApplication
                  </Typography>
                  <Typography variant="caption" sx={styles.subtitle}>
                    Professional Learning Platform
                  </Typography>
                </Box>
              </Box>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, ...styles.linkContainer }}>
                {navItems.map((item, index) => (
                  <Button
                    key={item.name}
                    onClick={item.action}
                    onMouseEnter={() => setHoveredButton(item.name)}
                    onMouseLeave={() => setHoveredButton(null)}
                    sx={{
                      ...styles.linkButton,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <Typography sx={styles.buttonText}>
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        ...styles.hoverUnderline,
                        width: hoveredButton === item.name ? '100%' : '0%',
                      }}
                    />
                  </Button>
                ))}
              </Box>

              {/* Mobile Menu Icon */}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>

          {/* Animated gradient line */}
          <Box sx={styles.gradientLine} />
        </AppBar>
      </Slide>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '75%',
            padding: 2,
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {navItems.map((item) => (
            <Button
              key={item.name}
              onClick={() => {
                handleDrawerToggle();
                item.action();
              }}
              sx={{ ...styles.linkButton, width: '100%' }}
            >
              <Typography sx={styles.buttonText}>
                {item.name}
              </Typography>
            </Button>
          ))}
        </Box>
      </Drawer>

      {/* Spacer to prevent content overlap */}
      <Box sx={{ height: '85px' }} />

      {/* Scroll to Top Button */}
      <ScrollTop />

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  // same as your original style object
  // (copy your entire original styles object here without any change)
  // for brevity, it's omitted in this snippet
};

export default Navbar;
