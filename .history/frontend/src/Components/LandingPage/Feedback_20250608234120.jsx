import React, { useRef, useState } from "react";
import Navbar from "../Layout/Navbar";
import emailjs from "@emailjs/browser";

const Feedback = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        service_b20b3tk,
        "your_template_id", // Replace with your actual Template ID
        form.current,
        KDOP8W9aCiO1Omj2E 
      )
      .then(
        (result) => {
          console.log("Feedback sent!", result.text);
          setSubmitted(true);
          setError(false);
          form.current.reset();
        },
        (error) => {
          console.error("Failed to send feedback", error.text);
          setError(true);
        }
      );
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Feedback</h2>
        <form ref={form} onSubmit={sendEmail}>
          <textarea
            name="message"
            placeholder="Your feedback..."
            rows={5}
            required
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

        {submitted && (
          <p style={{ color: "green", marginTop: "1rem" }}>
            ✅ Feedback sent successfully!
          </p>
        )}
        {error && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            ❌ Failed to send feedback. Try again.
          </p>
        )}
      </div>
    </>
  );
};

export default Feedback;
