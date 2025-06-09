import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal"; // ✅ fixed import path

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />
      <div style={styles.hero}>
        <h1>Welcome to Quiz App</h1>
        <p>Challenge your mind with exciting quizzes!</p>
        <button style={styles.button} onClick={() => setShowModal(true)}>
          Get Started
        </button>
        <img
          // src="https://source.unsplash.com/800x300/?quiz,education"
          alt="quiz"
          style={styles.image}
        />
      </div>

      {/* Login/Register Modal */}
      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

const styles = {
  hero: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "#f3f4f6",
    minHeight: "90vh",
  },
  image: {
    width: "80%",
    marginTop: "2rem",
    borderRadius: "10px",
  },
  button: {
    marginTop: "1.5rem",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    background: "linear-gradient(to right, #00feba, #5b86e5)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};

export default Hero;
