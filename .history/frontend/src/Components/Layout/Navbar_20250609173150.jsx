import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import { Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Slide,
} from "@mui/material";
import "@fontsource/poppins"; // Make sure this is installed using: npm install @fontsource/poppins

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" sx={styles.appbar}>
          <Toolbar sx={styles.toolbar}>
            <Typography variant="h4" sx={styles.title}>
               Quiz Master
            </Typography>

            <Box sx={styles.linkContainer}>
              <Button component={Link} to="/" sx={styles.linkButton}>
                Home
              </Button>
              <Button onClick={() => navigate("/login")} sx={styles.linkButton}>
                Login
              </Button>
              <Button component={Link} to="/feedback" sx={styles.linkButton}>
                Feedback
              </Button>
              <Button component={Link} to="/contact" sx={styles.linkButton}>
                Contact
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
appbar: {
  background: "linear-gradient(135deg, #013a3a, #0099cc 90%)",
  backdropFilter: "blur(10px)",          // glass blur effect
  WebkitBackdropFilter: "blur(10px)",    // Safari support
  boxShadow: "0 6px 20px rgba(0,0,0,0.3)", // soft shadow
  height: "90px",
  justifyContent: "center",
  zIndex: 1100,
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // subtle border for depth
},

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    px: 3,
  },
  title: {
    fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    color: "#ffffff",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    letterSpacing: "1px",
  },
  linkContainer: {
    display: "flex",
    gap: 2.5,
  },
  linkButton: {
    color: "#fff",
    fontWeight: 600,
    fontSize: "1.05rem",
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "0.5px",
    padding: "0.6rem 1.1rem",
    textTransform: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    },
  },
};

export default Navbar;
