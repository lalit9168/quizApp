import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />

      <Box
        sx={{
          position: "relative",
          minHeight: "90vh",
          px: 2,
          py: 10,
          textAlign: "center",
          background: "linear-gradient(to right,rgb(4, 88, 49), #00f2fe)",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Decorative bubbles */}
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
          <motion.div
            className="bubble"
            style={bubbleStyle("#00feba", 80, "20%", "10%")}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="bubble"
            style={bubbleStyle("#5b86e5", 60, "50%", "80%")}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="bubble"
            style={bubbleStyle("#4facfe", 100, "auto", "40%", "10%")}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </Box>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h2" fontWeight={700}>
            Welcome to Quiz App
          </Typography>
          <Typography variant="subtitle1" mt={2}>
            Challenge your mind with exciting quizzes!
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              background: "linear-gradient(to right, #00feba, #5b86e5)",
              boxShadow: 3,
              color: "#fff",
              ":hover": {
                background: "linear-gradient(to right, #5b86e5,rgb(180, 196, 37))",
              },
            }}
            onClick={() => setShowModal(true)}
          >
            Get Started
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
