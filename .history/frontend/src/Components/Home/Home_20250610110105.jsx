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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

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
      {/* Professional Background */}
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
          overflow: "hidden",
        }}
      >
        {/* Enhanced Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(240, 147, 251, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(245, 87, 108, 0.08) 0%, transparent 50%)
            `,
          }}
        />

        {/* Animated Geometric Elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {/* Professional floating shapes */}
          {[
            { size: 120, top: "5%", left: "5%", opacity: 0.06, delay: "0s" },
            { size: 80, top: "20%", right: "10%", opacity: 0.08, delay: "2s" },
            { size: 100, bottom: "15%", left: "15%", opacity: 0.05, delay: "4s" },
            { size: 60, bottom: "30%", right: "20%", opacity: 0.07, delay: "1s" },
            { size: 140, top: "50%", left: "80%", opacity: 0.04, delay: "3s" },
            { size: 90, top: "70%", left: "10%", opacity: 0.06, delay: "5s" },
          ].map((shape, i) => (
            <Box
              key={`shape-${i}`}
              sx={{
                width: shape.size,
                height: shape.size,
                position: "absolute",
                ...shape,
                background: `linear-gradient(135deg, rgba(102, 126, 234, ${shape.opacity}), rgba(118, 75, 162, ${shape.opacity * 0.8}))`,
                borderRadius: "50%",
                animation: `float-${i} ${8 + i}s ease-in-out infinite`,
                animationDelay: shape.delay,
                "@keyframes float-0": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-20px) rotate(180deg)" },
                },
                "@keyframes float-1": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-30px) rotate(-180deg)" },
                },
                "@keyframes float-2": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-25px) rotate(180deg)" },
                },
                "@keyframes float-3": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-35px) rotate(-180deg)" },
                },
                "@keyframes float-4": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-15px) rotate(180deg)" },
                },
                "@keyframes float-5": {
                  "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                  "50%": { transform: "translateY(-40px) rotate(-180deg)" },
                },
              }}
            />
          ))}

          {/* Subtle grid overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.03,
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </Box>

        {/* Navbar */}
        <AppBar
          position="static"
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                sx={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <DashboardIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
                onClick={() => navigate("/")}
              >
                QuizMaster Pro
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.85rem" }}>
                  Welcome back
                </Typography>
                <Typography variant="body1" sx={{ color: "#1e293b", fontWeight: "600" }}>
                  {role === "admin" ? "Administrator" : "User"}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  color: "#667eea",
                  borderColor: "#667eea",
                  fontWeight: "600",
                  px: 3,
                  py: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(102, 126, 234, 0.08)",
                    borderColor: "#764ba2",
                    color: "#764ba2",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.2)",
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
            minHeight: "calc(100vh - 64px - 60px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Fade in timeout={800}>
            <Paper
              elevation={0}
              sx={{
                backdropFilter: "blur(20px)",
                background: "rgba(255, 255, 255, 0.98)",
                border: "1px solid rgba(102, 126, 234, 0.15)",
                borderRadius: 6,
                p: 6,
                width: "100%",
                maxWidth: 700,
                color: "#1e293b",
                textAlign: "center",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c)",
                  borderRadius: "6px 6px 0 0",
                },
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 35px 70px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.6)",
                },
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: "800",
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "2.5rem",
                  }}
                >
                  Admin Dashboard
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: "#64748b", 
                    fontSize: "1.1rem",
                    fontWeight: "500",
                  }}
                >
                  Manage your quizzes and monitor performance
                </Typography>
              </Box>

              <Divider 
                sx={{ 
                  borderColor: "rgba(102, 126, 234, 0.15)", 
                  mb: 4,
                  "&::before, &::after": {
                    borderColor: "rgba(102, 126, 234, 0.15)",
                  }
                }} 
              />

              <Grid container spacing={3}>
                {role === "admin" && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleCreateQuiz}
                        sx={{
                          py: 3,
                          px: 4,
                          borderColor: "#667eea",
                          color: "#667eea",
                          fontWeight: "600",
                          fontSize: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          borderRadius: 4,
                          border: "2px solid #667eea",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "rgba(102, 126, 234, 0.08)",
                            transform: "translateY(-3px)",
                            boxShadow: "0 12px 30px rgba(102, 126, 234, 0.2)",
                            borderColor: "#764ba2",
                            color: "#764ba2",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <QuizIcon sx={{ fontSize: 35 }} />
                        Create New Quiz
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleGuestQuiz}
                        sx={{
                          py: 3,
                          px: 4,
                          borderColor: "#f093fb",
                          color: "#f093fb",
                          fontWeight: "600",
                          fontSize: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          borderRadius: 4,
                          border: "2px solid #f093fb",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "rgba(240, 147, 251, 0.08)",
                            transform: "translateY(-3px)",
                            boxShadow: "0 12px 30px rgba(240, 147, 251, 0.2)",
                            borderColor: "#f5576c",
                            color: "#f5576c",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <GroupAddIcon sx={{ fontSize: 35 }} />
                        Setup Guest Quiz
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
                      py: 3,
                      px: 4,
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      fontWeight: "700",
                      fontSize: "1.1rem",
                      color: "white",
                      borderRadius: 4,
                      textTransform: "none",
                      boxShadow: "0 12px 30px rgba(102, 126, 234, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      "&:hover": {
                        background: "linear-gradient(135deg, #5a67d8, #6b46c1)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 16px 40px rgba(102, 126, 234, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ListAltIcon sx={{ fontSize: 28 }} />
                    View Available Quizzes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        </Box>

        {/* Professional Footer */}
        <Box
          component="footer"
          sx={{
            height: 60,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid rgba(102, 126, 234, 0.1)",
            color: "#64748b",
            fontWeight: "500",
            fontSize: "0.9rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          © {new Date().getFullYear()} QuizMaster Pro. Crafted with excellence.
        </Box>
      </Box>
    </>
  );
}

export default HomePage;