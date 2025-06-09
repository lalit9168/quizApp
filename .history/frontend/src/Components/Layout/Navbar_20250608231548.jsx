import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Components/Auth/LoginModal"; // adjust path if needed

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav style={styles.nav}>
        <h2 style={{ color: "white" }}>Quiz App</h2>
        <div>
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
  },
  button: {
    margin: "0 1rem",
    background: "none",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Navbar;
