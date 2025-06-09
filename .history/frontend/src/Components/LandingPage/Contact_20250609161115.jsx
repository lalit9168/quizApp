import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, education, message } = formData;
    const mailtoLink = `mailto:lalitchaudhari003@gmail.com?subject=${encodeURIComponent(
      `Quiz App Contact from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nEducation: ${education}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink.replaceAll("\n", "");
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper elevation={10} sx={styles.card}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#212121", textAlign: "center" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              mb={3}
              sx={{ textAlign: "center" }}
            >
              Got a question or feedback? We’d love to hear from you.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              {[
                { label: "Name", name: "name" },
                { label: "Email", name: "email", type: "email" },
                { label: "Education", name: "education" },
                {
                  label: "Tell us why you’re reaching out",
                  name: "message",
                  multiline: true,
                  rows: 4,
                },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <TextField
                    label={field.label}
                    name={field.name}
                    fullWidth
                    required={field.name !== "education"}
                    value={formData[field.name]}
                    onChange={handleChange}
                    multiline={field.multiline}
                    rows={field.rows}
                    type={field.type || "text"}
                    variant="outlined"
                    sx={styles.input}
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button type="submit" fullWidth variant="contained" sx={styles.button}>
                  📩 Send Message
                </Button>
              </motion.div>
            </Box>

            <Stack direction="row" spacing={3} justifyContent="center" mt={4}>
              <IconButton href="tel:+919168018581" sx={styles.iconBtn}>
                <PhoneIcon fontSize="large" />
              </IconButton>
              <IconButton href="mailto:lalitchaudhari003@gmail.com" sx={styles.iconBtn}>
                <EmailIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

const styles = {
  root: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    py: 10,
    px: 2,
  },
  card: {
    p: 5,
    borderRadius: 4,
    bgcolor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  input: {
    mb: 3,
    fontSize: "1.2rem",
    "& .MuiInputLabel-root": {
      fontSize: "1.1rem",
    },
    "& .MuiInputBase-input": {
      fontSize: "1.1rem",
      py: 1.5,
    },
  },
  button: {
    mt: 2,
    py: 1.5,
    fontSize: "1rem",
    background: "linear-gradient(to right, #00c6ff, #0072ff)",
    fontWeight: "bold",
    "&:hover": {
      background: "linear-gradient(to right, #0072ff, #00c6ff)",
    },
  },
  iconBtn: {
    backgroundColor: "#eeeeee",
    "&:hover": { bgcolor: "#cccccc" },
  },
};

export default Contact;
