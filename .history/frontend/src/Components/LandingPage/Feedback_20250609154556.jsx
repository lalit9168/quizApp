import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../Layout/Navbar";
import { Box, Container, Paper, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";

const Feedback = () => {
  const form = useRef();
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm("service_b20b3tk", "template_9ce9qog", form.current, "KDOP8W9aCiO1Omj2E")
      .then(() => { setOpen(true); form.current.reset(); })
      .catch(() => setErrorOpen(true));
  };

  const bubbles = [
    { size: 100, top: "10%", left: "80%", delay: 0 },
    { size: 60, top: "70%", left: "20%", delay: 1.5 },
  ];

  return (
    <>
      <Navbar />
      <Box sx={styles.root}>
        {/* Background Animations */}
        {bubbles.map((b,i) => (
          <motion.div key={i} style={bubbleBase(b.size, b.top, b.left)}
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: b.delay }} />
        ))}

        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
          <Paper elevation={3} sx={styles.formPaper}>
            <Typography variant="h4" fontWeight="bold" mb={2} color="#00feba">
              We value your Feedback 💬
            </Typography>
            <Typography color="text.secondary" mb={4}>
              Share your thoughts with us. Your input helps improve our app!
            </Typography>

            <form ref={form} onSubmit={sendEmail}>
              <TextField label="Your Email" name="user_email" fullWidth required type="email" sx={styles.input} />
              <TextField label="Your Feedback" name="message" fullWidth required multiline rows={4} sx={styles.input} />
              <Button type="submit" fullWidth variant="contained" sx={styles.button}>
                📩 Submit Feedback
              </Button>
            </form>
          </Paper>
        </Container>

        {/* Snackbars */}
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
            Feedback sent successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
          <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>
            Failed to send feedback. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

const bubbleBase = (size, top, left) => ({
  position: "absolute",
  width: size, height: size,
  background: "rgba(0,255,186,0.3)",
  borderRadius: "50%",
  top, left,
  zIndex: 1,
  filter: "blur(8px)",
});

const styles = {
  root: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(135deg, #013a3a, #0099cc 90%)",
  },
  formPaper: {
    backdropFilter: "blur(10px)",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 3, p: 4,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  input: {
    mb: 3,
    background: "rgba(255,255,255,0.5)",
    borderRadius: 1,
  },
  button: {
    background: "linear-gradient(to right, #00feba, #5b86e5)",
    fontWeight: "bold",
    textTransform: "uppercase",
    py: 1.4,
    ":hover": {
      background: "linear-gradient(to right, #5b86e5, #00feba)",
      transform: "scale(1.03)",
    },
  },
};

export default Feedback;
