import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  Fade,
  Grid,
  Container,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";

function HomePage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userRole = decoded.role;
      setRole(userRole);

      if (userRole === "user") {
        navigate("/quizdash");
      }
    } catch (err) {
      console.error("Invalid token");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleCreateQuiz = () => navigate("/quiz");
  const handleGuestQuiz = () => navigate("/create-guest");
  const handleJoinQuiz = () => navigate("/quizdash");

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
          boxShadow: "0 4px 20px rgba(30, 41, 59, 0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#60a5fa",
              },
            }}
            onClick={() => navigate("/")}
          >
            Quizz App
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" sx={{ color: "#e2e8f0" }}>
              Role: <strong style={{ color: "#60a5fa" }}>{role}</strong>
            </Typography>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: "#ffffff",
                borderColor: "#60a5fa",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#60a5fa",
                  color: "#1e293b",
                  borderColor: "#60a5fa",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          minHeight: "calc(100vh - 64px - 48px)",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(circle at 25% 25%, rgba(96, 165, 250, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(30, 41, 59, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Subtle geometric elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {[
            { size: 60, top: "15%", left: "10%", opacity: 0.05 },
            { size: 80, top: "20%", right: "15%", opacity: 0.04 },
            { size: 70, bottom: "25%", left: "8%", opacity: 0.06 },
            { size: 50, bottom: "15%", right: "12%", opacity: 0.05 },
          ].map((shape, i) => (
            <Box
              key={`shape-${i}`}
              sx={{
                width: shape.size,
                height: shape.size,
                position: "absolute",
                ...shape,
                background: `linear-gradient(135deg, rgba(96, 165, 250, ${shape.opacity}), rgba(30, 41, 59, ${shape.opacity * 0.7}))`,
                borderRadius: "50%",
                animation: `float-${i} ${8 + i * 2}s ease-in-out infinite`,
                "@keyframes float-0": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-20px) rotate(180deg)" },
                },
                "@keyframes float-1": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-15px) rotate(-180deg)" },
                },
                "@keyframes float-2": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-25px) rotate(180deg)" },
                },
                "@keyframes float-3": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-18px) rotate(-180deg)" },
                },
              }}
            />
          ))}
        </Box>

        <Fade in timeout={700}>
          <Paper
            elevation={12}
            sx={{
              backdropFilter: "blur(16px)",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: 4,
              p: 5,
              width: "100%",
              maxWidth: 600,
              border: "1px solid rgba(96, 165, 250, 0.2)",
              boxShadow: "0 25px 50px -12px rgba(30, 41, 59, 0.25)",
              color: "#1e293b",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 35px 60px -12px rgba(30, 41, 59, 0.3)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: "bold",
                background: "linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#64748b", mb: 3 }}>
              Welcome back, {role === "admin" ? "Admin" : "User"}!
            </Typography>

            <Divider sx={{ borderColor: "rgba(100, 116, 139, 0.2)", mb: 3 }} />

            <Grid container spacing={3}>
              {role === "admin" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleCreateQuiz}
                      sx={{
                        py: 2.5,
                        borderColor: "#3b82f6",
                        color: "#3b82f6",
                        fontWeight: "600",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        borderRadius: 3,
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.08)",
                          borderColor: "#2563eb",
                          color: "#2563eb",
                          transform: "translateY(-2px)",
                          boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <QuizIcon fontSize="large" />
                      Create Quiz
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleGuestQuiz}
                      sx={{
                        py: 2.5,
                        borderColor: "#6366f1",
                        color: "#6366f1",
                        fontWeight: "600",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        borderRadius: 3,
                        "&:hover": {
                          backgroundColor: "rgba(99, 102, 241, 0.08)",
                          borderColor: "#4f46e5",
                          color: "#4f46e5",
                          transform: "translateY(-2px)",
                          boxShadow: "0 10px 25px rgba(99, 102, 241, 0.2)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <GroupAddIcon fontSize="large" />
                      Guest Quiz
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleJoinQuiz}
                  sx={{
                    py: 2.5,
                    background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                    fontWeight: "600",
                    color: "#ffffff",
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 40px rgba(59, 130, 246, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListAltIcon sx={{ mr: 1 }} />
                  View Available Quizzes
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          height: 48,
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTop: "1px solid rgba(148, 163, 184, 0.2)",
          color: "#e2e8f0",
          fontWeight: "500",
          fontSize: 14,
          mt: "auto",
        }}
      >
        © {new Date().getFullYear()} Quizz App. All rights reserved.
      </Box>
    </>
  );
}

export default HomePage;