// src/components/Layout/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from "@mui/material";
import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#0f172a" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
            Quiz App
          </Typography>
          <Box>
            <Button component={Link} to="/" sx={navButtonStyle}>
              Home
            </Button>
            <Button onClick={() => setLoginOpen(true)} sx={navButtonStyle}>
              Login
            </Button>
            <Button onClick={() => setRegisterOpen(true)} sx={navButtonStyle}>
              Register
            </Button>
            <Button component={Link} to="/feedback" sx={navButtonStyle}>
              Feedback
            </Button>
            <Button component={Link} to="/contact" sx={navButtonStyle}>
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Modals */}
      <LoginModal open={loginOpen} handleClose={() => setLoginOpen(false)} />
      <RegisterModal open={registerOpen} handleClose={() => setRegisterOpen(false)} />
    </>
  );
};

const navButtonStyle = {
  color: "white",
  fontWeight: "bold",
  mx: 1,
  textTransform: "none"
};

export default Navbar;
