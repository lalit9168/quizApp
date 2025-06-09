import React from "react";
import Navbar from "../Layout/Navbar";

const Hero = () => {
  return (
    <>
      <Navbar />
      <div style={styles.hero}>
        <h1>Welcome to Quiz App</h1>
        <p>Challenge your mind with exciting quizzes!</p>
        <img
          src="https://source.unsplash.com/800x300/?quiz,education"
          alt="quiz"
          style={styles.image}
        />
      </div>
    </>
  );
};

const styles = {
  hero: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "#f3f4f6",
    minHeight: "90vh"
  },
  image: {
    width: "80%",
    marginTop: "2rem",
    borderRadius: "10px"
  }
};

export default Hero;
