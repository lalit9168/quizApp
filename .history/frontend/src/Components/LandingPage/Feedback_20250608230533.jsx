import React from "react";
import Navbar from "../Layout/Navbar";

const Feedback = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Feedback</h2>
        <form>
          <textarea
            placeholder="Your feedback..."
            rows={5}
            style={{ width: "100%", padding: "1rem", marginBottom: "1rem" }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </>
  );
};

export default Feedback;
