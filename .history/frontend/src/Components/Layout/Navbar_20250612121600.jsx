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
  IconButton,
  Drawer,
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

function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1300 }}
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Feedback", path: "/feedback" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar
          position="fixed"
          sx={{
            ...styles.appbar,
            boxShadow: isScrolled
              ? "0 8px 32px rgba(0, 0, 0, 0.12)"
              : "0 4px 16px rgba(0, 0, 0, 0.06)",
            backgroundColor: isScrolled ? "#ffffff" : "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={styles.toolbar}>
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

              {/* Desktop View */}
              <Box sx={{ display: { xs: "none", md: "flex" }, ...styles.linkContainer }}>
                <Button
                  onClick={() => navigate("/")}
                  onMouseEnter={() => setHoveredButton("home")}
                  onMouseLeave={() => setHoveredButton(null)}
                  sx={{ ...styles.linkButton, animationDelay: "0.1s" }}
                >
                  <Typography sx={styles.buttonText}>Home</Typography>
                  <Box
                    sx={{
                      ...styles.hoverUnderline,
                      width: hoveredButton === "home" ? "100%" : "0%",
                    }}
                  />
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  onMouseEnter={() => setHoveredButton("login")}
                  onMouseLeave={() => setHoveredButton(null)}
                  sx={{ ...styles.linkButton, animationDelay: "0.2s" }}
                >
                  <Typography sx={styles.buttonText}>Login</Typography>
                  <Box
                    sx={{
                      ...styles.hoverUnderline,
                      width: hoveredButton === "login" ? "100%" : "0%",
                    }}
                  />
                </Button>
                <Button
                  onClick={() => navigate("/feedback")}
                  onMouseEnter={() => setHoveredButton("feedback")}
                  onMouseLeave={() => setHoveredButton(null)}
                  sx={{ ...styles.linkButton, animationDelay: "0.3s" }}
                >
                  <Typography sx={styles.buttonText}>Feedback</Typography>
                  <Box
                    sx={{
                      ...styles.hoverUnderline,
                      width: hoveredButton === "feedback" ? "100%" : "0%",
                    }}
                  />
                </Button>
                <Button
                  onClick={() => navigate("/contact")}
                  onMouseEnter={() => setHoveredButton("contact")}
                  onMouseLeave={() => setHoveredButton(null)}
                  sx={{ ...styles.linkButton, animationDelay: "0.4s" }}
                >
                  <Typography sx={styles.buttonText}>Contact Us</Typography>
                  <Box
                    sx={{
                      ...styles.hoverUnderline,
                      width: hoveredButton === "contact" ? "100%" : "0%",
                    }}
                  />
                </Button>
              </Box>

              {/* Mobile View Toggle Button */}
              <IconButton
                sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
          <Box sx={styles.gradientLine} />
        </AppBar>
      </Slide>

      {/* Drawer for Mobile View */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 250,
            padding: 2,
          },
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              onClick={() => {
                navigate(link.path);
                handleDrawerToggle();
              }}
              sx={styles.linkButton}
            >
              <Typography sx={styles.buttonText}>{link.label}</Typography>
            </Button>
          ))}
        </Box>
      </Drawer>

      <Box sx={{ height: "85px" }} />

      <ScrollTop />
      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
