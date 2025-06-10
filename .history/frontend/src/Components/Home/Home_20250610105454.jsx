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
      setRole(userRole); // still useful if other components depend on it

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
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#00feba",
              textShadow: "0 0 10px #00feba",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Quizz App
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" sx={{ color: "#ffffffdd" }}>
              Role: <strong>{role}</strong>
            </Typography>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: "#00feba",
                borderColor: "#00feba",
                "&:hover": {
                  backgroundColor: "#00feba",
                  color: "#121212",
                  fontWeight: "bold",
                },
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
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Fade in timeout={700}>
          <Paper
            elevation={12}
            sx={{
              backdropFilter: "blur(24px)",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 5,
              p: 5,
              width: "100%",
              maxWidth: 600,
              border: "2px solid rgba(0,254,186,0.4)",
              boxShadow: "0 0 20px rgba(0,254,186,0.2)",
              color: "#fff",
              textAlign: "center",
              transition: "0.3s",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "#00feba",
                textShadow: "0 0 10px #00feba",
              }}
            >
              Admin Dashboardd
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#bbb", mb: 3 }}>
              Welcome back, {role === "admin" ? "Admin" : "User"}!
            </Typography>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 3 }} />

            <Grid container spacing={3}>
              {role === "admin" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleCreateQuiz}
                      sx={{
                        py: 2,
                        borderColor: "#00feba",
                        color: "#00feba",
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        "&:hover": {
                          backgroundColor: "#00feba22",
                          transform: "scale(1.05)",
                        },
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
                        py: 2,
                        borderColor: "#5b86e5",
                        color: "#5b86e5",
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        "&:hover": {
                          backgroundColor: "#5b86e522",
                          transform: "scale(1.05)",
                        },
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
                    py: 2,
                    background: "linear-gradient(to right, #00feba, #5b86e5)",
                    fontWeight: "bold",
                    color: "#121212",
                    boxShadow: "0 0 15px #00feba",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 0 25px #00feba",
                    },
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
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          color: "#00feba",
          fontWeight: "bold",
          textShadow: "0 0 5px #00feba",
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
