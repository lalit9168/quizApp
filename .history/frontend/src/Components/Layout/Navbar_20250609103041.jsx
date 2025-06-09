import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>Quiz App</h2>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <button onClick={() => setShowModal(true)} style={styles.button}>Login / Register</button>
          <Link to="/feedback" style={styles.link}>Feedback</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>
      </nav>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  nav: {
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    margin: "0 1rem",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem",
    transition: "opacity 0.3s",
  },
  button: {
    margin: "0 1rem",
    background: "rgba(255, 255, 255, 0.2)",
    border: "none",
    color: "#fff",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
  },
};

export default Navbar;
