import React, { useRef } from "react";
import emailjs from "emailjs-com";
import Navbar from "../Layout/Navbar";

const Feedback = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b20b3tk",      // ✅ Your service ID
        "template_9ce9qog",     // ✅ Your template ID
        form.current,
        "KDOP8W9aCiO1Omj2E"     // ✅ Your public key
      )
      .then(
        (result) => {
          alert("✅ Feedback sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("❌ Failed to send feedback. Please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1rem", color: "#1f2937" }}>Feedback</h2>
        <form ref={form} onSubmit={sendEmail}>
          {/* This hidden input is required to ensure your email receives the message */}
          <input type="hidden" name="to_email" value="lalitchaudhari003@gmail.com" />
          
          <textarea
            name="message"
            placeholder="Your feedback..."
            rows={5}
            required
            style={{
              width: "100%",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "1rem",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
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
