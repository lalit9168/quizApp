import React from "react";

const Contact = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      <p style={styles.text}>
        Have questions, suggestions, or need help? Reach out to us anytime!
      </p>

      <a
        href="mailto:lalitchaudhari003@gmail.com?subject=Quiz%20App%20Inquiry&body=Hi%20Lalit,%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20Quiz%20App."
        style={styles.button}
      >
        📧 Send Email
      </a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundColor: "#f9fafb",
    minHeight: "90vh",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#1f2937",
  },
  text: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#4b5563",
  },
  button: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#3b82f6",
    borderRadius: "8px",
    textDecoration: "none",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  },
};

export default Contact;
