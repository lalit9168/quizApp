import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />
      <div style={styles.hero}>
        <div style={styles.decor}>
          <div className="bubble bubble1"></div>
          <div className="bubble bubble2"></div>
          <div className="bubble bubble3"></div>
        </div>

        <h1 style={styles.heading}>Welcome to Quiz App</h1>
        <p style={styles.subtext}>Challenge your mind with exciting quizzes!</p>
        <button style={styles.button} onClick={() => setShowModal(true)}>
          Get Started
        </button>
      </div>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />

      {/* Inline animated bubbles CSS */}
      <style>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
          animation: float 8s infinite ease-in-out;
        }

        .bubble1 {
          width: 80px;
          height: 80px;
          background: #00feba;
          top: 20%;
          left: 10%;
        }

        .bubble2 {
          width: 60px;
          height: 60px;
          background: #5b86e5;
          top: 50%;
          left: 80%;
        }

        .bubble3 {
          width: 100px;
          height: 100px;
          background: #4facfe;
          bottom: 10%;
          left: 40%;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  hero: {
    textAlign: "center",
    padding: "5rem 2rem",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    minHeight: "90vh",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
  },
  decor: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  heading: {
    fontSize: "3rem",
    fontWeight: 700,
    zIndex: 1,
    position: "relative",
  },
  subtext: {
    fontSize: "1.2rem",
    marginTop: "1rem",
    zIndex: 1,
    position: "relative",
  },
  button: {
    marginTop: "2rem",
    padding: "1rem 2.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "white",
    background: "linear-gradient(to right, #00feba, #5b86e5)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 1,
    position: "relative",
  },
};

export default Hero;
