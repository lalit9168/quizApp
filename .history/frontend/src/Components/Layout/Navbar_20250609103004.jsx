import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav style={styles.nav}>
        <h2 style={styles.brand}>Quiz App</h2>
        <div style={styles.menu}>
          <Link to="/" style={styles.link}>Home</Link>
          <button onClick={() => setShowModal(true)} style={styles.button}>
            Login / Register
          </button>
          <Link to="/feedback" style={styles.link}>Feedback</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>
      </nav>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />

      {/* Inline styles for hover animations */}
      <style>{`
        nav a:hover, nav button:hover {
          color: #00feba;
          transform: translateY(-2px);
        }

        nav a, nav button {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
};

const styles = {
  nav: {
    backgroundColor: "#1f2937",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  brand: {
    color: "white",
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  menu: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    margin: "0 1rem",
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem",
  },
  button: {
    margin: "0 1rem",
    background: "none",
    border: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Navbar;
