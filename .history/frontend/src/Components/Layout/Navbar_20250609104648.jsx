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

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar position="static" sx={styles.appbar}>
          <Toolbar sx={styles.toolbar}>
            <Typography variant="h5" sx={styles.title}>
              Quiz App
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
    background: "linear-gradient(to right, #00c9ff, #92fe9d)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Roboto, sans-serif",
  },
  linkContainer: {
    display: "flex",
    gap: 2,
  },
  linkButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    textTransform: "none",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)",
      transform: "scale(1.05)",
    },
  },
};

export default Navbar;
