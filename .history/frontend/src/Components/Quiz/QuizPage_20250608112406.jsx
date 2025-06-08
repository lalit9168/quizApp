import React, { useState } from "react";
import api from "../api";

function QuizPage() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [quizCode, setQuizCode] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const res = await api.post(
        "/quizzes/create",
        { title, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizCode(res.data.quizCode);
    } catch (err) {
      alert("Failed to create quiz.");
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="bg-light p-5 rounded shadow-lg">
        <h2 className="text-primary mb-4">Create Quiz</h2>

        <div className="mb-4">
          <label className="form-label">Quiz Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {questions.map((q, i) => (
          <div className="card mb-4 shadow-sm" key={i}>
            <div className="card-body">
              <h5 className="card-title text-secondary">Question {i + 1}</h5>

              <div className="mb-3">
                <label className="form-label">Question Text</label>
                <input
                  type="text"
                  className="form-control"
                  value={q.questionText}
                  onChange={(e) =>
                    handleChange(i, "questionText", e.target.value)
                  }
                />
              </div>

              {q.options.map((opt, j) => (
                <div className="mb-2" key={j}>
                  <label className="form-label">Option {j + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={opt}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  />
                </div>
              ))}

              <div className="mb-2">
                <label className="form-label">Correct Answer</label>
                <input
                  type="text"
                  className="form-control"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleChange(i, "correctAnswer", e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
  <label className="form-label">Quiz Duration (in minutes)</label>
  <input
    type="number"
    className="form-control"
    value={duration}
    onChange={(e) => setDuration(Number(e.target.value))}
    min="1"
  />
</div>

            </div>
          </div>
        ))}

        <button className="btn btn-outline-primary mb-3" onClick={addQuestion}>
          <i className="bi bi-plus-lg me-2"></i> Add Question
        </button>

        <div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>

        {quizCode && (
          <div className="alert alert-success mt-4" role="alert">
            Quiz Created! Share this code: <strong>{quizCode}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
