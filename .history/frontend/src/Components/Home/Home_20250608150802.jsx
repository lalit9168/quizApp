import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; // fixed import syntax
import { AppBar, Toolbar, Typography, Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect if not logged in
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

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Quizz App
          </Typography>

          <Box>
            <Typography
              variant="body1"
              sx={{ mr: 2, display: "inline", color: "secondary.light" }}
            >
              Role: <strong>{role || "Guest"}</strong>
            </Typography>
            <Button color="inherit" onClick={handleLogout} aria-label="Logout">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4, maxWidth: 600, mx: "auto", textAlign: "center" }}>
        <Typography variant="h4" mb={2}>
          Home Page
        </Typography>
        <Typography variant="body1" mb={4}>
          Welcome {role === "admin" ? "Admin" : "User"}!
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          {role === "admin" && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/quiz")}
                aria-label="Create Quiz"
              >
                Create Quiz
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/create-guest")}
                aria-label="Create Guest Quiz"
              >
                Create Guest Quiz
              </Button>
            </>
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/quizdash")}
            aria-label="Available Quiz"
          >
            Available Quiz
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;
