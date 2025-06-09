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
          background: "linear-gradient(135deg, #013a3a, #0099cc 90%)",
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
            color: "rgba(0, 255, 186, 0.8)",
            size: 80,
            top: "20%",
            left: "10%",
            delay: 0
          }, {
            color: "rgba(91, 134, 229, 0.75)",
            size: 60,
            top: "50%",
            left: "80%",
            delay: 1
          }, {
            color: "rgba(79, 172, 254, 0.85)",
            size: 100,
            bottom: "10%",
            left: "40%",
            delay: 2
          }].map(({ color, size, top, left, bottom, delay }, i) => (
            <motion.div
              key={i}
              style={bubbleStyle(color, size, top, left, bottom)}
              animate={{ y: [0, -15, 0], scale: [1, 1.07, 1], opacity: [0.7, 0.9, 0.7] }}
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
              textShadow: "0 0 12px #00feba, 0 0 20pxrgb(24, 131, 102)",
              letterSpacing: "0.05em",
              mb: 2,
            }}
          >
            Welcome Quiz App
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#c3f3f6",
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
              boxShadow: "0 0 20px #00feba",
              color: "#121212",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(to right, #5b86e5, #00feba)",
                boxShadow: "0 0 40px #00feba",
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
                backgroundColor: "rgba(0, 255, 186, 0.15)",
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
  opacity: 1,
  position: "absolute",
  top,
  left,
  bottom,
  boxShadow: `0 0 ${size / 4}px ${color}`,
});

export default Hero;
