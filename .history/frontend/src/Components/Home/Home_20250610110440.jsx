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
      {/* Professional Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
          boxShadow: "0 4px 20px rgba(30, 41, 59, 0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              sx={{
                background: "linear-gradient(45deg, #4f46e5, #7c3aed)",
                color: "#fff",
                width: 40,
                height: 40,
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 25px rgba(79, 70, 229, 0.4)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <DashboardIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
                "&:hover": {
                  color: "#e2e8f0",
                },
                transition: "color 0.3s ease",
              }}
              onClick={() => navigate("/")}
            >
              QuizMaster Pro
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                background: "rgba(255, 255, 255, 0.1)",
                px: 2,
                py: 0.5,
                borderRadius: 3,
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                Role:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "#4f46e5",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {role}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: "#fff",
                borderColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "#fff",
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

      {/* Main Content with Professional Background */}
      <Box
        sx={{
          minHeight: "calc(100vh - 64px - 64px)",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 100%)",
        }}
      >
        {/* Professional Background Pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `
              radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)
            `,
          }}
        />

        {/* Subtle Geometric Elements */}
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
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.02,
              backgroundImage: `
                linear-gradient(rgba(79, 70, 229, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(79, 70, 229, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </Box>

        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 128px)",
            py: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Fade in timeout={800}>
            <Paper
              elevation={12}
              sx={{
                background: "#ffffff",
                borderRadius: 4,
                p: 5,
                width: "100%",
                maxWidth: 700,
                border: "1px solid rgba(79, 70, 229, 0.1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #4f46e5, #7c3aed, #0ea5e9)",
                },
              }}
            >
              <Box textAlign="center" mb={4}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    boxShadow: "0 10px 30px rgba(79, 70, 229, 0.3)",
                    mb: 3,
                    animation: "pulse 2s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  <DashboardIcon sx={{ fontSize: 40, color: "#fff" }} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: "#1e293b",
                    background: "linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Admin Dashboard
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: "#64748b",
                    fontWeight: 500,
                  }}
                >
                  Welcome back, {role === "admin" ? "Administrator" : "User"}!
                </Typography>
              </Box>

              <Divider 
                sx={{ 
                  borderColor: "rgba(79, 70, 229, 0.1)", 
                  mb: 4,
                  "&::before, &::after": {
                    borderColor: "rgba(79, 70, 229, 0.1)",
                  },
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
                          borderColor: "#4f46e5",
                          color: "#4f46e5",
                          fontWeight: "bold",
                          borderRadius: 3,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          textTransform: "none",
                          fontSize: "1rem",
                          border: "2px solid #4f46e5",
                          "&:hover": {
                            backgroundColor: "rgba(79, 70, 229, 0.05)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.2)",
                            borderColor: "#4338ca",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <QuizIcon sx={{ fontSize: 32 }} />
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
                          borderColor: "#7c3aed",
                          color: "#7c3aed",
                          fontWeight: "bold",
                          borderRadius: 3,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          textTransform: "none",
                          fontSize: "1rem",
                          border: "2px solid #7c3aed",
                          "&:hover": {
                            backgroundColor: "rgba(124, 58, 237, 0.05)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 10px 25px rgba(124, 58, 237, 0.2)",
                            borderColor: "#6d28d9",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <GroupAddIcon sx={{ fontSize: 32 }} />
                        Guest Quiz Setup
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
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      fontWeight: "bold",
                      color: "#fff",
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      textTransform: "none",
                      boxShadow: "0 10px 30px rgba(79, 70, 229, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 15px 40px rgba(79, 70, 229, 0.4)",
                        background: "linear-gradient(135deg, #4338ca, #6d28d9)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ListAltIcon sx={{ fontSize: 28 }} />
                    View Available Quizzes
                  </Button>
                </Grid>
              </Grid>

              <Box mt={4} pt={3} borderTop="1px solid rgba(79, 70, 229, 0.1)">
                <Typography 
                  variant="body2" 
                  align="center" 
                  sx={{ 
                    color: "#64748b",
                    fontStyle: "italic",
                  }}
                >
                  Manage your quizzes efficiently with our professional dashboard
                </Typography>
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>

      {/* Professional Footer */}
      <Box
        component="footer"
        sx={{
          height: 64,
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTop: "1px solid rgba(79, 70, 229, 0.2)",
          color: "#cbd5e1",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
          © {new Date().getFullYear()} QuizMaster Pro. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default HomePage;