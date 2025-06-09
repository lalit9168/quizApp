import React from "react";
import Navbar from "../Layout/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2>Contact Us</h2>
        <p><strong>Name:</strong> Lalit Chaudhari</p>
        <p><strong>Email:</strong> lalit@example.com</p>
        <p><strong>Phone:</strong> +91-916801
      </div>
    </>
  );
};

export default Contact;
