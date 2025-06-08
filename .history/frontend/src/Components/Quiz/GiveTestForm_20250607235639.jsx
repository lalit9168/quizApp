import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GiveTestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    address: "",
    quizCode: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/quiz/validate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // Save user info to localStorage
        localStorage.setItem("quizUserInfo", JSON.stringify(formData));
        navigate(`/quiz-page/${formData.quizCode}`);
      } else {
        setError(data.message || "Invalid code");
      }
    } catch (err) {
      console.error("Validation error:", err);
      setError("Server error");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Give Test Using Code</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <br />
        <input
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="Education"
          required
        />
        <br />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <br />
        <input
          name="quizCode"
          value={formData.quizCode}
          onChange={handleChange}
          placeholder="Quiz Code"
          required
        />
        <br />
        <button type="submit">Start Test</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default GiveTestForm;
