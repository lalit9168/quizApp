import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

function QuizDash() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissionsData, setSubmissionsData] = useState([]);
  const [singleQuizView, setSingleQuizView] = useState(null);
  const [attemptedData, setAttemptedData] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuizzes();
    attemptedQuiz();

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") setIsAdmin(true);
      if (decoded.email) setUserEmail(decoded.email);
    }
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/quizzes/all");
      setQuizzes(res.data);
    } catch (error) {
      console.error("Error fetching quizzes", error);
    } finally {
      setLoading(false);
    }
  };

  const attemptedQuiz = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/quizzes/attempted-quiz");
      setAttemptedData(res.data);
    } catch (error) {
      console.error("Error fetching attempted quizzes:", error);
    }
  };

  const fetchAllSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/quizzes/submissions/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissionsData(res.data);
      setSingleQuizView(null);
      setShowSubmissions(true);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    }
  };

  const fetchSubmissionsForQuiz = async (quizCode) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSingleQuizView({ quizCode, submissions: res.data });
      setShowSubmissions(false);
    } catch (err) {
      console.error("Failed to fetch quiz submissions", err);
    }
  };

  const handleDelete = async (quizCode) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/quizzes/${quizCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes((prev) => prev.filter((q) => q.quizCode !== quizCode));
    } catch (err) {
      console.error("Failed to delete quiz", err);
    }
  };

  const downloadExcelForQuiz = async (quizCode, quizTitle) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/submissions/${quizCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const flatData = res.data.map((sub) => ({
        "Quiz Title": quizTitle,
        "Quiz Code": quizCode,
        "User Email": sub.email,
        Score: sub.score,
      }));

      if (flatData.length === 0) return alert("No submissions to export.");

      const worksheet = XLSX.utils.json_to_sheet(flatData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      saveAs(blob, `${quizTitle}_${quizCode}_submissions.xlsx`);
    } catch (err) {
      console.error("Error downloading Excel", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isAttempted = (quizCode) => {
    const quiz = attemptedData.find((q) => q.quizCode === quizCode);
    return quiz?.attemptedUsers.includes(userEmail);
  };

  // Prepare chart data
  const chartData = attemptedData
    .filter((quiz) => quiz.attemptedUsers.includes(userEmail))
    .map((quiz) => {
      const submission = quiz.submissions?.find((s) => s.email === userEmail);
      return {
        name: quiz.title,
        score: submission?.score || 0,
      };
    });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        py: 4,
        px: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Fade in timeout={1000}>
        <Box>
          {/* Your existing logic here unchanged */}
          {/* .... */}
          {/* After rendering attempted quizzes table (unchanged), add graphs: */}

          {!isAdmin && chartData.length > 0 && (
            <Box mt={6}>
              <Typography variant="h5" color="#00feba" gutterBottom>
                📊 Your Quiz Scores (Bar & Line Chart)
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#00feba" />
                  <YAxis stroke="#00feba" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#00feba" />
                </BarChart>
              </ResponsiveContainer>

              <Box mt={4} />

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#00feba" />
                  <YAxis stroke="#00feba" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#03e9f4" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
}

export default QuizDash;
