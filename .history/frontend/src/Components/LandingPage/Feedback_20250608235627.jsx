import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../Layout/Navbar";

const Feedback = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b20b3tk",       // your service ID
        "template_9ce9qog",      // your template ID
        form.current,
        "KDOP8W9aCiO1Omj2E"      // your public key
      )
      .then(
        () => {
          alert("Feedback sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error("Email send error:", error);
          alert("Failed to send feedback.");
        }
      );
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Feedback</h2>
        <form ref={form} onSubmit={sendEmail}>
          {/* Hidden recipient email */}
          <input type="hidden" name="email" value="lalitchaudhari003@gmail.com" />

          <textarea
            name="message"
            placeholder="Your feedback..."
            rows={5}
            style={{ width: "100%", padding: "1rem", marginBottom: "1rem" }}
            required
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
