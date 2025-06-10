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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

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

  const navItems = [
    { name: "Home", path: "/", action: () => navigate("/") },
    { name: "Login", path: "/login", action: () => navigate("/login") },
    { name: "Feedback", path: "/feedback", action: () => navigate("/feedback") },
    { name: "Contact Us", path: "/contact", action: () => navigate("/contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar
          position="fixed"
          sx={{
            ...styles.appbar,
            backgroundColor: isScrolled ? "#ffffff" : "rgba(255,255,255,0.95)",
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

              {/* Desktop Nav */}
              <Box sx={{ ...styles.linkContainer, display: { xs: "none", md: "flex" } }}>
                {navItems.map((item, index) => (
                  <Button
                    key={item.name}
                    onClick={item.action}
                    onMouseEnter={() => setHoveredButton(item.name)}
                    onMouseLeave={() => setHoveredButton(null)}
                    sx={{ ...styles.linkButton, animationDelay: `${index * 0.1}s` }}
                  >
                    <Typography sx={styles.buttonText}>{item.name}</Typography>
                    <Box
                      sx={{
                        ...styles.hoverUnderline,
                        width: hoveredButton === item.name ? "100%" : "0%",
                      }}
                    />
                  </Button>
                ))}
              </Box>

              {/* Mobile Menu Icon */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setMobileOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
          <Box sx={styles.gradientLine} />
        </AppBar>
      </Slide>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileOpen(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.name} onClick={item.action}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ height: "85px" }} />
      <ScrollTop />
      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  appbar: {
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    height: "85px",
    justifyContent: "center",
    zIndex: 1100,
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    transition: "all 0.4s ease",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "85px !important",
    px: { xs: 2, sm: 3, md: 4 },
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  logoIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    boxShadow: "0 6px 16px rgba(102, 126, 234, 0.35)",
  },
  logoIcon: {
    fontSize: "24px",
    color: "#fff",
  },
  logoGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    filter: "blur(8px)",
    opacity: 0,
    zIndex: -1,
  },
  brandContainer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
    fontFamily: "Montserrat",
    color: "#1a202c",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "0.75rem",
    color: "#64748b",
    fontFamily: "Inter",
  },
  linkContainer: {
    gap: 2,
    alignItems: "center",
    display: "flex",
  },
  linkButton: {
    position: "relative",
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "none",
    fontFamily: "Inter",
    px: 2,
    py: 1,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(102,126,234,0.08)",
      color: "#4c51bf",
    },
  },
  buttonText: {
    fontWeight: 700,
    fontFamily: "Poppins",
  },
  hoverUnderline: {
    position: "absolute",
    bottom: 4,
    left: "50%",
    height: "2px",
    width: "0%",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "2px",
    transform: "translateX(-50%)",
    transition: "width 0.3s ease",
  },
  gradientLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background:
      "linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)",
    backgroundSize: "300% 100%",
    animation: "gradientShift 4s ease-in-out infinite",
    "@keyframes gradientShift": {
      "0%, 100%": {
        backgroundPosition: "0 0",
      },
      "50%": {
        backgroundPosition: "100% 0",
      },
    },
  },
  scrollTop: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
};

export default Navbar;
