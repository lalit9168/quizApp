import React from "react";
import { Box, Typography, Container, Link as MuiLink } from "@mui/material";
import "@fontsource/poppins";

const Footer = () => {
  return (
    <Box sx={styles.footer}>
      <Container sx={styles.container}>
        <Typography variant="h6" sx={styles.logo}>
          Quiz Master
        </Typography>

        <Box sx={styles.links}>
          <MuiLink href="/" underline="none" sx={styles.link}>
            Home
          </MuiLink>
          <MuiLink href="/feedback" underline="none" sx={styles.link}>
            Feedback
          </MuiLink>
          <MuiLink href="/contact" underline="none" sx={styles.link}>
            Contact
          </MuiLink>
        </Box>

        <Typography variant="body2" sx={styles.copy}>
          © {new Date().getFullYear()} Quiz Master. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(135deg, #2c5364, #203a43, #0f2027)",
    color: "#ffffff",
    padding: "2rem 0",
    boxShadow: "0 -4px 10px rgba(0,0,0,0.3)",
    fontFamily: "Poppins, sans-serif",
    marginTop: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    fontWeight: 700,
    fontSize: "1.5rem",
    mb: 1,
  },
  links: {
    display: "flex",
    gap: 3,
    mb: 1.5,
  },
  link: {
    color: "#ffffff",
    fontWeight: 500,
    fontSize: "1rem",
    "&:hover": {
      textDecoration: "underline",
      color: "#00e676",
    },
  },
  copy: {
    fontSize: "0.9rem",
    opacity: 0.8,
  },
};

export default Footer;
