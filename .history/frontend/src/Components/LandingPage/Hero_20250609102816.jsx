import React, { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 2,
          bgcolor: "background.default",
          minHeight: "90vh",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to Quiz App
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Challenge your mind with exciting quizzes!
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => setShowModal(true)}
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(to right, #00feba, #5b86e5)",
              boxShadow: 4,
              borderRadius: 2,
            }}
          >
            Get Started
          </Button>

          <Box
            component="img"
            src="https://source.unsplash.com/800x300/?quiz,education"
            alt="Quiz"
            sx={{
              mt: 6,
              width: "100%",
              maxWidth: 800,
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Container>
      </Box>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Hero;
