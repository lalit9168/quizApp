import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  Fade,
  Grid,
  Container,
  Divider,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

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

  const cardData = [
    {
      title: "Create Quiz",
      description: "Design and create custom quizzes with multiple question types",
      icon: <QuizIcon sx={{ fontSize: 40 }} />,
      action: handleCreateQuiz,
      color: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.1)",
      adminOnly: true,
    },
    {
      title: "Guest Quiz",
      description: "Create quizzes for guests to participate without registration",
      icon: <GroupAddIcon sx={{ fontSize: 40 }} />,
      action: handleGuestQuiz,
      color: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.1)",
      adminOnly: true,
    },
    {
      title: "Available Quizzes",
      description: "Browse and participate in available quizzes",
      icon: <ListAltIcon sx={{ fontSize: 40 }} />,
      action: handleJoinQuiz,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      adminOnly: false,
    },
  ];

  const filteredCards = role === "admin" 
    ? cardData 
    : cardData.filter(card => !card.adminOnly);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          color: "#1e293b",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: "#3b82f6",
                width: 40,
                height: 40,
              }}
            >
              <DashboardIcon />
            </Avatar>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "700",
                color: "#1e293b",
                cursor: "pointer",
                "&:hover": { color: "#3b82f6" },
                transition: "color 0.2s ease",
              }}
              onClick={() => navigate("/")}
            >
              Quiz Dashboard
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                Logged in as
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "#1e293b", 
                  fontWeight: "600",
                  textTransform: "capitalize" 
                }}
              >
                {role}
              </Typography>
            </Box>
            
            <Button
              variant="outlined"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                color: "#64748b",
                borderColor: "#e2e8f0",
                fontWeight: "500",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#fee2e2",
                  borderColor: "#fca5a5",
                  color: "#dc2626",
                },
                transition: "all 0.2s ease",
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Fade in timeout={600}>
          <Box>
            {/* Header Section */}
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "800",
                  color: "#1e293b",
                  mb: 2,
                  letterSpacing: "-0.025em",
                }}
              >
                Welcome to Your Dashboard
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  fontWeight: "400",
                  maxWidth: 600,
                  mx: "auto",
                }}
              >
                {role === "admin" 
                  ? "Manage quizzes, create content, and oversee quiz activities"
                  : "Browse and participate in available quizzes"
                }
              </Typography>
            </Box>

            {/* Cards Grid */}
            <Grid container spacing={4} justifyContent="center">
              {filteredCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Fade in timeout={800 + index * 200}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                          borderColor: card.color,
                        },
                      }}
                      onClick={card.action}
                    >
                      {/* Card Header with Icon */}
                      <Box
                        sx={{
                          backgroundColor: card.bgColor,
                          py: 4,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            color: card.color,
                            zIndex: 1,
                            position: "relative",
                          }}
                        >
                          {card.icon}
                        </Box>
                        
                        {/* Decorative background pattern */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: -20,
                            right: -20,
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            backgroundColor: card.color,
                            opacity: 0.1,
                          }}
                        />
                      </Box>

                      {/* Card Content */}
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "700",
                            color: "#1e293b",
                            mb: 2,
                            textAlign: "center",
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            lineHeight: 1.6,
                            textAlign: "center",
                          }}
                        >
                          {card.description}
                        </Typography>
                      </CardContent>

                      {/* Card Actions */}
                      <CardActions sx={{ p: 3, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={(e) => {
                            e.stopPropagation();
                            card.action();
                          }}
                          sx={{
                            backgroundColor: card.color,
                            color: "#ffffff",
                            fontWeight: "600",
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: "none",
                            "&:hover": {
                              backgroundColor: card.color,
                              opacity: 0.9,
                              boxShadow: `0 8px 20px ${card.color}40`,
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          Get Started
                        </Button>
                      </CardActions>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {/* Stats Section */}
            <Box sx={{ mt: 8, textAlign: "center" }}>
              <Paper
                elevation={0}
                sx={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                  p: 4,
                  maxWidth: 800,
                  mx: "auto",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                    color: "#1e293b",
                    mb: 3,
                  }}
                >
                  Quick Stats
                </Typography>
                
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "800",
                          color: "#3b82f6",
                          mb: 1,
                        }}
                      >
                        {role === "admin" ? "∞" : "5+"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b" }}
                      >
                        {role === "admin" ? "Quiz Creation" : "Quizzes Available"}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "800",
                          color: "#10b981",
                          mb: 1,
                        }}
                      >
                        24/7
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b" }}
                      >
                        Platform Access
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: "800",
                          color: "#8b5cf6",
                          mb: 1,
                        }}
                      >
                        100%
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#64748b" }}
                      >
                        Uptime Guarantee
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          py: 3,
          mt: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            © {new Date().getFullYear()} Quiz Dashboard. Built with precision and care.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;