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
  Card,
  CardContent,
  CardActions,
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
          background: "#000000",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
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
                color: "#e0e0e0",
              },
            }}
            onClick={() => navigate("/")}
          >
            Quiz App
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1" sx={{ color: "#ffffff" }}>
              Role: <strong style={{ color: "#ffffff" }}>{role}</strong>
            </Typography>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                color: "#ffffff",
                borderColor: "#ffffff",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderColor: "#ffffff",
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
          minHeight: "calc(100vh - 64px)",
          background: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Container maxWidth="md">
          <Fade in timeout={700}>
            <Box sx={{ textAlign: "center" }}>
              {/* Header */}
              <Typography
                variant="h3"
                sx={{
                  mb: 1,
                  fontWeight: "bold",
                  color: "#1a1a1a",
                }}
              >
                Admin Dashboard
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: "#666666", 
                  mb: 4,
                  fontWeight: "400"
                }}
              >
                Welcome back, {role === "admin" ? "Admin" : "User"}!
              </Typography>

              {/* Cards Grid */}
              <Grid container spacing={3} justifyContent="center">
                {role === "admin" && (
                  <>
                    {/* Create Quiz Card */}
                    <Grid item xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            p: 4,
                          }}
                        >
                          <QuizIcon 
                            sx={{ 
                              fontSize: 60, 
                              color: "#3b82f6", 
                              mb: 2 
                            }} 
                          />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: "bold",
                              color: "#1a1a1a",
                              mb: 1,
                            }}
                          >
                            Create Quiz
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666666",
                              textAlign: "center",
                            }}
                          >
                            Build new quizzes with custom questions and settings
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={handleCreateQuiz}
                            sx={{
                              backgroundColor: "#3b82f6",
                              fontWeight: "600",
                              py: 1.5,
                              borderRadius: 2,
                              "&:hover": {
                                backgroundColor: "#2563eb",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            Create Quiz
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>

                    {/* Guest Quiz Card */}
                    <Grid item xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                          borderRadius: 3,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            p: 4,
                          }}
                        >
                          <GroupAddIcon 
                            sx={{ 
                              fontSize: 60, 
                              color: "#6366f1", 
                              mb: 2 
                            }} 
                          />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: "bold",
                              color: "#1a1a1a",
                              mb: 1,
                            }}
                          >
                            Guest Quiz
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666666",
                              textAlign: "center",
                            }}
                          >
                            Create quizzes for guest users with access codes
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={handleGuestQuiz}
                            sx={{
                              backgroundColor: "#6366f1",
                              fontWeight: "600",
                              py: 1.5,
                              borderRadius: 2,
                              "&:hover": {
                                backgroundColor: "#4f46e5",
                              },
                              transition: "all 0.3s ease",
                            }}
                          >
                            Create Guest Quiz
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </>
                )}

                {/* Available Quiz Card */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 4,
                      }}
                    >
                      <ListAltIcon 
                        sx={{ 
                          fontSize: 60, 
                          color: "#059669", 
                          mb: 2 
                        }} 
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: "bold",
                          color: "#1a1a1a",
                          mb: 1,
                        }}
                      >
                        Available Quizzes
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666666",
                          textAlign: "center",
                        }}
                      >
                        View and take all available quizzes
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleJoinQuiz}
                        sx={{
                          backgroundColor: "#059669",
                          fontWeight: "600",
                          py: 1.5,
                          borderRadius: 2,
                          "&:hover": {
                            backgroundColor: "#047857",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        View Quizzes
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;