import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  const upcomingQuizzes = [
    {
      title: "General Knowledge",
      date: "June 15, 2025",
      image: "https://source.unsplash.com/400x200/?knowledge,books",
    },
    {
      title: "Science & Tech",
      date: "June 20, 2025",
      image: "https://source.unsplash.com/400x200/?science,technology",
    },
    {
      title: "Mathematics Challenge",
      date: "June 25, 2025",
      image: "https://source.unsplash.com/400x200/?math,learning",
    },
  ];

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />
      <Box sx={styles.heroSection}>
        <Container maxWidth="lg" sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
            Welcome to Quiz App
          </Typography>
          <Typography variant="h6" color="#e0e0e0" gutterBottom>
            Challenge your mind with exciting quizzes and improve your knowledge.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setShowModal(true)}
            sx={styles.ctaButton}
          >
            🚀 Get Started
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          📚 Upcoming Quizzes
        </Typography>
        <Grid container spacing={4}>
          {upcomingQuizzes.map((quiz, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ height: "100%" }}>
                <CardMedia component="img" height="200" image={quiz.image} alt={quiz.title} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {quiz.title}
                  </Typography>
                  <Typography color="text.secondary">{quiz.date}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src="https://source.unsplash.com/600x400/?study,education"
              alt="Study"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Why Choose Quiz App?
            </Typography>
            <Typography paragraph>
              ✔ Thousands of curated quiz questions.
              <br />
              ✔ Real-time scores and results.
              <br />
              ✔ Track your performance over time.
              <br />
              ✔ Admin & Guest quiz modes.
            </Typography>
            <Button variant="outlined" onClick={() => setShowModal(true)}>
              Try a Quiz Now
            </Button>
          </Grid>
        </Grid>
      </Container>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  heroSection: {
    backgroundImage: "url('https://source.unsplash.com/1600x600/?education,quiz')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaButton: {
    mt: 4,
    background: "linear-gradient(to right, #00feba, #5b86e5)",
    color: "#000",
    fontWeight: "bold",
    boxShadow: "0 0 10px #00feba",
    ":hover": {
      background: "linear-gradient(to right, #5b86e5, #00feba)",
      transform: "scale(1.05)",
    },
  },
};

export default Hero;
