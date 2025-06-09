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
          px: { xs: 3, md: 6 },
          py: { xs: 8, md: 14 },
          textAlign: "center",
          background: "linear-gradient(135deg, #042d2d, #00f2fe 70%)",
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
          {[{
            color: "#00feba",
            size: 80,
            top: "20%",
            left: "10%",
            delay: 0
          }, {
            color: "#5b86e5",
            size: 60,
            top: "50%",
            left: "80%",
            delay: 1
          }, {
            color: "#4facfe",
            size: 100,
            bottom: "10%",
            left: "40%",
            delay: 2
          }].map(({ color, size, top, left, bottom, delay }, i) => (
            <motion.div
              key={i}
              style={bubbleStyle(color, size, top, left, bottom)}
              animate={{ y: [0, -15, 0], scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{
                duration: 7 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            />
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, maxWidth: 650 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "#00feba",
              textShadow: "0 0 15px #00feba, 0 0 30px #00feba",
              letterSpacing: "0.05em",
              mb: 2,
            }}
          >
            Welcome to Quiz App
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#d1f5f7",
              mb: 5,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Challenge your mind with exciting quizzes!
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => setShowModal(true)}
            sx={{
              mr: 3,
              px: 5,
              py: 1.8,
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(to right, #00feba, #5b86e5)",
              boxShadow: "0 0 15px #00feba",
              color: "#121212",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(to right, #5b86e5, #00feba)",
                boxShadow: "0 0 30px #00feba",
                transform: "scale(1.07)",
              },
            }}
          >
            Get Started
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/guest-quiz-entry")}
            sx={{
              px: 5,
              py: 1.8,
              fontWeight: "bold",
              borderRadius: 3,
              borderColor: "#00feba",
              color: "#00feba",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 255, 186, 0.1)",
                borderColor: "#5b86e5",
                color: "#5b86e5",
                transform: "scale(1.07)",
              },
            }}
          >
            Guest Quiz
          </Button>
        </motion.div>
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
  filter: "blur(15px)",
});

export default Hero;
