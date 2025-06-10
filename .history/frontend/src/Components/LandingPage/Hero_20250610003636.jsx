import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quiz as QuizIcon, 
  EmojiEvents as TrophyIcon, 
  Speed as SpeedIcon,
  Group as GroupIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon
} from "@mui/icons-material";
import Navbar from "../Layout/Navbar";
import LoginModal from "../Auth/LoginModal";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();

  const stats = [
    { number: "50K+", label: "Active Users", icon: <GroupIcon /> },
    { number: "10K+", label: "Quizzes Created", icon: <QuizIcon /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUpIcon /> },
    { number: "4.9", label: "User Rating", icon: <StarIcon /> }
  ];

  const features = [
    {
      icon: <QuizIcon sx={{ fontSize: 40, color: '#667eea' }} />,
      title: "Interactive Quizzes",
      description: "Engaging multiple-choice questions with real-time feedback"
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#f093fb' }} />,
      title: "Leaderboards",
      description: "Compete with friends and climb the global rankings"
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#764ba2' }} />,
      title: "Instant Results",
      description: "Get immediate scores and detailed performance analytics"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar openLogin={() => setShowModal(true)} />

      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {/* Floating geometric shapes */}
          {[
            { color: "rgba(240, 147, 251, 0.1)", size: 120, top: "15%", left: "10%", delay: 0 },
            { color: "rgba(245, 87, 108, 0.08)", size: 80, top: "60%", left: "85%", delay: 1.5 },
            { color: "rgba(102, 126, 234, 0.12)", size: 100, bottom: "20%", left: "75%", delay: 3 },
            { color: "rgba(118, 75, 162, 0.1)", size: 60, top: "25%", right: "15%", delay: 2 },
            { color: "rgba(240, 147, 251, 0.06)", size: 140, bottom: "15%", left: "5%", delay: 0.5 }
          ].map((shape, i) => (
            <motion.div
              key={i}
              style={{
                width: shape.size,
                height: shape.size,
                background: `linear-gradient(135deg, ${shape.color}, transparent)`,
                borderRadius: i % 2 === 0 ? "50%" : "20%",
                position: "absolute",
                ...shape
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              }}
            />
          ))}

          {/* Quiz-themed icons floating */}
          {[
            { Icon: QuizIcon, top: "20%", right: "20%", delay: 1 },
            { Icon: TrophyIcon, bottom: "30%", right: "10%", delay: 2 },
            { Icon: StarIcon, top: "40%", left: "15%", delay: 3 }
          ].map(({ Icon, ...props }, i) => (
            <motion.div
              key={`icon-${i}`}
              style={{
                position: "absolute",
                color: "rgba(255, 255, 255, 0.1)",
                fontSize: "60px",
                ...props
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: props.delay,
              }}
            >
              <Icon sx={{ fontSize: 60 }} />
            </motion.div>
          ))}
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center" sx={{ minHeight: "80vh" }}>
            {/* Left Content */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                      background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 4px 20px rgba(255, 255, 255, 0.3)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      mb: 2,
                    }}
                  >
                    Master Your Knowledge with
                    <Box component="span" sx={{ display: "block", color: "#f093fb" }}>
                      QuizMaster
                    </Box>
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      mb: 4,
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                      lineHeight: 1.6,
                      maxWidth: "500px"
                    }}
                  >
                    Challenge yourself with interactive quizzes, compete with friends, and track your progress in real-time. 
                    <Box component="span" sx={{ color: "#f093fb", fontWeight: 600 }}>
                      {" "}Learn, compete, excel!
                    </Box>
                  </Typography>

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", gap: 3, mb: 6, flexWrap: "wrap" }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/login")}
                        sx={{
                          px: 4,
                          py: 2,
                          fontWeight: 700,
                          borderRadius: 4,
                          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                          boxShadow: "0 8px 32px rgba(240, 147, 251, 0.4)",
                          color: "#ffffff",
                          fontSize: "1.1rem",
                          textTransform: "none",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
                            boxShadow: "0 12px 40px rgba(240, 147, 251, 0.6)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Start Quiz Journey
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/guest-quiz-entry")}
                        sx={{
                          px: 4,
                          py: 2,
                          fontWeight: 600,
                          borderRadius: 4,
                          borderColor: "rgba(255, 255, 255, 0.3)",
                          color: "#ffffff",
                          fontSize: "1.1rem",
                          textTransform: "none",
                          backdropFilter: "blur(10px)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderColor: "#ffffff",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)"
                          },
                        }}
                      >
                        Try as Guest
                      </Button>
                    </motion.div>
                  </Box>

                  {/* Dynamic Stats */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: "flex", alignItems: "center", gap: 12 }}
                      >
                        <Box sx={{ color: "#f093fb", fontSize: 32 }}>
                          {stats[currentStat].icon}
                        </Box>
                        <Box>
                          <Typography variant="h4" sx={{ color: "#ffffff", fontWeight: 700 }}>
                            {stats[currentStat].number}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            {stats[currentStat].label}
                          </Typography>
                        </Box>
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Content - Features */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <Card
                        sx={{
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(20px)",
                          border: "2px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: 4,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.15)",
                            border: "2px solid rgba(240, 147, 251, 0.5)",
                            transform: "translateY(-5px)",
                            boxShadow: "0 12px 40px rgba(240, 147, 251, 0.2)"
                          }
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                            <Box sx={{ 
                              p: 2, 
                              borderRadius: 3, 
                              background: "rgba(255, 255, 255, 0.1)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              {feature.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  color: "#ffffff", 
                                  fontWeight: 700, 
                                  mb: 1,
                                  fontSize: "1.3rem"
                                }}
                              >
                                {feature.title}
                              </Typography>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: "rgba(255, 255, 255, 0.8)", 
                                  lineHeight: 1.6 
                                }}
                              >
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>

                {/* Quiz Preview Image Placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Box
                    sx={{
                      mt: 4,
                      p: 4,
                      borderRadius: 4,
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      textAlign: "center"
                    }}
                  >
                    <QuizIcon sx={{ fontSize: 80, color: "#f093fb", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "#ffffff", mb: 1 }}>
                      Interactive Quiz Interface
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Experience our modern, user-friendly quiz platform designed for optimal learning
                    </Typography>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Bottom wave decoration */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100px",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            clipPath: "ellipse(100% 100% at 50% 100%)",
          }}
        />
      </Box>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Hero;