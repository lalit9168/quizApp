import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", education: "", message: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, education, message } = formData;
    const mailtoLink = `mailto:lalitchaudhari003@gmail.com?subject=${encodeURIComponent(`Quiz App Contact from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nEducation: ${education}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink.replaceAll("\n", "");
  };

  const bubbles = [
    { size: 120, top: "10%", left: "15%", delay: 0 },
    { size: 90, top: "80%", left: "75%", delay: 1.5 },
    { size: 70, top: "40%", left: "85%", delay: 3 },
  ];

  return (
    <Box sx={styles.root}>
      {/* Glass background bubbles */}
      {bubbles.map((b, i) => (
        <motion.div key={i} style={bubbleStyle(b.size, b.top, b.left)}
          animate={{ y: [0, -25, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 10 }}>
        <Paper elevation={3} sx={styles.card}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="#00feba">
            Contact Us
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Have questions, suggestions, or need help? Fill out the form below — we'll get back to you shortly!
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            {["name", "email", "education", "message"].map((field, idx) => (
              <TextField
                key={field}
                label={field === "message" ? "Tell us why you’re reaching out" : field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                type={field === "email" ? "email" : "text"}
                multiline={field === "message"}
                rows={field === "message" ? 4 : 1}
                required={field !== "education"}
                fullWidth={true}
                value={formData[field]}
                onChange={handleChange}
                sx={styles.input}
              />
            ))}
            <Button type="submit" variant="contained" size="large" fullWidth sx={styles.button}>
              📧 Send Message
            </Button>
          </Box>

          <Stack direction="row" spacing={3} justifyContent="center" mt={4}>
            <IconButton href="tel:+919168018581" sx={styles.iconBtn} title="Call us">
              <PhoneIcon fontSize="large" />
            </IconButton>
            <IconButton href="mailto:lalitchaudhari003@gmail.com" sx={styles.iconBtn} title="Email us">
              <EmailIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

const bubbleStyle = (size, top, left) => ({
  position: "absolute",
  width: size,
  height: size,
  background: "rgba(0, 255, 186, 0.3)",
  borderRadius: "50%",
  filter: "blur(20px)",
  top,
  left,
  zIndex: 2,
});

const styles = {
  root: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #013a3a, #5b86e5)",
    overflow: "hidden",
    px: 2, py: 10,
  },
  card: {
    position: "relative",
    zIndex: 3,
    p: 4,
    borderRadius: 3,
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  input: {
    mb: 2,
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "4px",
    "& .MuiInputBase-input": { color: "#121212" },
  },
  button: {
    mt: 1,
    background: "linear-gradient(to right, #00feba, #5b86e5)",
    fontWeight: "bold",
    textTransform: "uppercase",
    py: 1.5,
    color: "#121212",
    "&:hover": {
      background: "linear-gradient(to right, #5b86e5, #00feba)",
      transform: "scale(1.03)",
    },
  },
  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.4)",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.6)" },
  },
};

export default Contact;
