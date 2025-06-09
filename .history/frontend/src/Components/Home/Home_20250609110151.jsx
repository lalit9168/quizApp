import React, { useEffect, useState } from "react";
import { jwtDecode from "jwt-decode";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  Fade,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      setRole(decoded.role);
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
          minHeight: "calc(100vh - 64px - 48px)", // full viewport minus navbar height and footer height
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Fade in timeout={700}>
          <Paper
            elevation={8}
            sx={{
              backdropFilter: "blur(16px)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4,
              p: 5,
              width: "100%",
              maxWidth: 450,
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 2,
                color: "#00feba",
                fontWeight: "bold",
                textShadow: "0 0 10px #00feba",
              }}
            >
              Home Page
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "#ddd",
              }}
            >
              Welcome {role === "admin" ? "Admin" : "User"}!
            </Typography>

            {role === "admin" && (
              <>
                <Button
                  variant="contained"
                  onClick={handleCreateQuiz}
                  sx={{
                    background: "linear-gradient(to right, #00feba, #5b86e5)",
                    color: "#121212",
                    fontWeight: "bold",
                    mb: 2,
                    width: "100%",
                    boxShadow: "0 0 15px #00feba",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 0 25px #00feba",
                    },
                  }}
                >
                  Create Quiz
                </Button>
                <Button
                  variant="contained"
                  onClick={handleGuestQuiz}
                  sx={{
                    background: "linear-gradient(to right, #5b86e5, #00feba)",
                    color: "#121212",
                    fontWeight: "bold",
                    mb: 3,
                    width: "100%",
                    boxShadow: "0 0 15px #5b86e5",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 0 25px #5b86e5",
                    },
                  }}
                >
                  Create Guest Quiz
                </Button>
              </>
            )}

            <Button
              variant="outlined"
              onClick={handleJoinQuiz}
              sx={{
                borderColor: "#5b86e5",
                color: "#5b86e5",
                width: "100%",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#5b86e522",
                  borderColor: "#00feba",
                  color: "#00feba",
                },
              }}
            >
              Available Quiz
            </Button>
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
