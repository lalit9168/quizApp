import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Slide,
} from "@mui/material";
import "@fontsource/poppins"; // Install this using npm install @fontsource/poppins

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" sx={styles.appbar}>
          <Toolbar sx={styles.toolbar}>
            <Typography variant="h4" sx={styles.title}>
              🚀 Quiz Master
            </Typography>

            <Box sx={styles.linkContainer}>
              <Button component={Link} to="/" sx={styles.linkButton}>
                Home
              </Button>
              <Button onClick={() => setShowModal(true)} sx={styles.linkButton}>
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
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
    height: "90px",
    justifyContent: "center",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    color: "#ffffff",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
  },
  linkContainer: {
    display: "flex",
    gap: 3,
  },
  linkButton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
    fontFamily: "Poppins, sans-serif",
    letterSpacing: "0.5px",
    padding: "0.6rem 1.2rem",
    textTransform: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
  },
};

export default Navbar;
