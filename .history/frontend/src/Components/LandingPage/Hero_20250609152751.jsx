import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />

      <Box
        sx={{
          position: "relative",
          minHeight: "90vh",
          px: 3,
          py: 10,
          textAlign: "center",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          color: "#fff",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Decorative bubbles */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={bubbleStyle("#00feba", 80, "20%", "10%")}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            style={bubbleStyle("#5b86e5", 60, "50%", "80%")}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            style={bubbleStyle("#00feba", 100, "auto", "40%", "10%")}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </Box>

        <Box
  sx={{
    position: "relative",
    zIndex: 1,
    maxWidth: 600,
    mx: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3, // uniform spacing between buttons
  }}
>
  <Typography
    variant="h2"
    sx={{
      fontWeight: "bold",
      color: "#00feba",
      textShadow: "0 0 10px #00feba",
    }}
  >
    Welcome to Quiz App
  </Typography>

  <Typography
    variant="subtitle1"
    sx={{ color: "#bbb", mb: 4 }}
  >
    Challenge your mind with exciting quizzes!
  </Typography>

  <Button
    variant="contained"
    size="large"
    onClick={() => setShowModal(true)}
    sx={{
      width: "100%", // full width
      px: 5,
      py: 1.5,
      fontWeight: "bold",
      borderRadius: 3,
      background: "linear-gradient(to right, #00feba, #5b86e5)",
      boxShadow: "0 0 15px #00feba",
      color: "#121212",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 0 25px #00feba",
        background: "linear-gradient(to right, #5b86e5, #00feba)",
        color: "#121212",
      },
    }}
  >
    Get Started
  </Button>

  <Button
    variant="contained"
    size="large"
    onClick={() => navigate("/guest-quiz-entry")}
    sx={{
      width: "100%", // full width
      px: 5,
      py: 1.5,
      fontWeight: "bold",
      borderRadius: 3,
      background: "linear-gradient(to right, #00feba, #5b86e5)",
      boxShadow: "0 0 15px #00feba",
      color: "#121212",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0 0 25px #00feba",
        background: "linear-gradient(to right, #5b86e5, #00feba)",
        color: "#121212",
      },
    }}
  >
    Guest Quiz
  </Button>
</Box>

      </Box>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const bubbleStyle = (color, size, top = "auto", left = "auto", bottom = "auto") => ({
  width: size,
  height: size,
  backgroundColor: color,
  borderRadius: "50%",
  opacity: 0.3,
  position: "absolute",
  top,
  left,
  bottom,
});

export default Hero;
