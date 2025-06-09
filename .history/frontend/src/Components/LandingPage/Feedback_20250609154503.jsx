import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../Layout/Navbar";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const Feedback = () => {
  const form = useRef();
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b20b3tk",
        "template_9ce9qog",
        form.current,
        "KDOP8W9aCiO1Omj2E"
      )
      .then(
        () => {
          setOpen(true);
          form.current.reset();
        },
        (error) => {
          console.error("Email send error:", error.text);
          setErrorOpen(true);
        }
      );
  };

  return (
    <>
      <Navbar />
      <Box sx={styles.root}>
        <Box sx={styles.overlay} />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
          <Paper elevation={6} sx={styles.paper}>
            <Typography variant="h4" fontWeight="bold" mb={2} color="#00feba">
              We value your Feedback 💬
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Share your thoughts with us. Your input helps improve our app!
            </Typography>

            <form ref={form} onSubmit={sendEmail}>
              <TextField
                label="Your Email"
                name="user_email"
                fullWidth
                required
                type="email"
                sx={styles.input}
              />
              <TextField
                label="Your Feedback"
                name="message"
                fullWidth
                required
                multiline
                rows={4}
                sx={styles.input}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={styles.button}
              >
                📩 Submit Feedback
              </Button>
            </form>
          </Paper>
        </Container>

        {/* Success Snackbar */}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
            Feedback sent successfully!
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={errorOpen}
          autoHideDuration={4000}
          onClose={() => setErrorOpen(false)}
        >
          <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>
            Failed to send feedback. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

const styles = {
  root: {
    position: "relative",
    background: "linear-gradient(135deg, #013a3a, #0099cc 90%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    py: 10,
    px: 2,
    overflow: "hidden",
  },
  overlay: {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "radial-gradient(circle at 30% 30%, rgba(0,255,186,0.1), transparent 60%)",
    zIndex: 1,
  },
  paper: {
    p: 4,
    borderRadius: 3,
    bgcolor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 0 30px rgba(0,255,186,0.3)",
    backdropFilter: "blur(6px)",
  },
  input: {
    mb: 3,
  },
  button: {
    background: "linear-gradient(to right, #00feba, #5b86e5)",
    fontWeight: "bold",
    py: 1.2,
    color: "#121212",
    textTransform: "uppercase",
    ":hover": {
      background: "linear-gradient(to right, #5b86e5, #00feba)",
      transform: "scale(1.03)",
    },
  },
};

export default Feedback;
