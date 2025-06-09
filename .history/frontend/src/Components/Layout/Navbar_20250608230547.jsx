import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={{ color: "white" }}>Quiz App</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/feedback" style={styles.link}>Feedback</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#1f2937",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    margin: "0 1rem",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Navbar;
