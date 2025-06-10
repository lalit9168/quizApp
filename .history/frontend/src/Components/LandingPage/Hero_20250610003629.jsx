import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quiz as QuizIcon, 
  EmojiEvents as TrophyIcon, 
  Speed as SpeedIcon,
  Group as GroupIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  PlayArrow as PlayIcon,
  CheckCircle as CheckIcon
} from "@mui/icons-material";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "50K+", label: "Active Users", icon: <GroupIcon /> },
    { number: "10K+", label: "Quizzes Created", icon: <QuizIcon /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUpIcon /> },
    { number: "4.9", label: "User Rating", icon: <StarIcon /> }
  ];

  const features = [
    {
      icon: <QuizIcon sx={{ fontSize: 24, color: '#667eea' }} />,
      title: "Interactive Quizzes",
      description: "Engaging multiple-choice questions with real-time feedback"
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 24, color: '#f093fb' }} />,
      title: "Leaderboards",
      description: "Compete with friends and climb the global rankings"
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 24, color: '#764ba2' }} />,
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
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 0 }
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
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center" sx={{ minHeight: { md: "80vh" } }}>
          
          {/* Left Side - Quiz Interface Image/Mockup */}
          <Grid item xs={12} lg={6} sx={{ order: { xs: 2, lg: 1 } }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: "relative",
                  maxWidth: "500px",
                  mx: "auto"
                }}
              >
                {/* Main Quiz Interface Mockup */}
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: 4,
                    p: 4,
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(20px)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    position: "relative",
                    zIndex: 2
                  }}
                >
                  {/* Quiz Header */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <QuizIcon sx={{ color: "#667eea", fontSize: 28 }} />
                      <Typography variant="h6" sx={{ color: "#333", fontWeight: 700 }}>
                        QuizMaster
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      px: 2, 
                      py: 0.5, 
                      borderRadius: 2, 
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "white",
                      fontSize: "0.9rem",
                      fontWeight: 600
                    }}>
                      Question 3/10
                    </Box>
                  </Box>

                  {/* Progress Bar */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ 
                      width: "100%", 
                      height: 8, 
                      borderRadius: 4, 
                      background: "#f0f0f0",
                      overflow: "hidden"
                    }}>
                      <motion.div
                        style={{
                          height: "100%",
                          background: "linear-gradient(135deg, #667eea, #764ba2)",
                          borderRadius: 4,
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: "30%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </Box>
                  </Box>

                  {/* Question */}
                  <Typography variant="h6" sx={{ color: "#333", mb: 3, fontWeight: 600 }}>
                    What is the capital of France?
                  </Typography>

                  {/* Answer Options */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[
                      { text: "London", correct: false },
                      { text: "Berlin", correct: false },
                      { text: "Paris", correct: true },
                      { text: "Madrid", correct: false }
                    ].map((option, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            border: "2px solid #e0e0e0",
                            background: option.correct ? "rgba(102, 126, 234, 0.1)" : "#f9f9f9",
                            borderColor: option.correct ? "#667eea" : "#e0e0e0",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            "&:hover": {
                              borderColor: "#667eea",
                              background: "rgba(102, 126, 234, 0.05)"
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              border: `2px solid ${option.correct ? "#667eea" : "#ccc"}`,
                              background: option.correct ? "#667eea" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            {option.correct && <CheckIcon sx={{ fontSize: 16, color: "white" }} />}
                          </Box>
                          <Typography sx={{ color: "#333", fontWeight: 500 }}>
                            {option.text}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>

                  {/* Timer */}
                  <Box sx={{ 
                    mt: 3, 
                    display: "flex", 
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1
                  }}>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      Time remaining:
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#f093fb", fontWeight: 700 }}>
                      00:45
                    </Typography>
                  </Box>
                </Box>

                {/* Floating Stats Cards */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-40px",
                    zIndex: 3
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Box
                    sx={{
                      background: "rgba(240, 147, 251, 0.9)",
                      color: "white",
                      p: 2,
                      borderRadius: 3,
                      boxShadow: "0 10px 30px rgba(240, 147, 251, 0.4)",
                      backdropFilter: "blur(10px)",
                      minWidth: 120,
                      textAlign: "center"
                    }}
                  >
                    <TrophyIcon sx={{ fontSize: 24, mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Score: 85%
                    </Typography>
                  </Box>
                </motion.div>

                <motion.div
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    left: "-30px",
                    zIndex: 3
                  }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Box
                    sx={{
                      background: "rgba(102, 126, 234, 0.9)",
                      color: "white",
                      p: 2,
                      borderRadius: 3,
                      boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
                      backdropFilter: "blur(10px)",
                      minWidth: 100,
                      textAlign: "center"
                    }}
                  >
                    <SpeedIcon sx={{ fontSize: 24, mb: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Streak: 5
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Content Information */}
          <Grid item xs={12} lg={6} sx={{ order: { xs: 1, lg: 2 } }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ pl: { lg: 4 } }}>
                {/* Main Heading */}
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

                {/* Subtitle */}
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

                {/* Feature List */}
                <Box sx={{ mb: 4 }}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                          p: 2,
                          borderRadius: 3,
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.15)",
                            transform: "translateX(5px)"
                          }
                        }}
                      >
                        <Box sx={{ 
                          p: 1, 
                          borderRadius: 2, 
                          background: "rgba(255, 255, 255, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              color: "#ffffff", 
                              fontWeight: 600, 
                              mb: 0.5
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "rgba(255, 255, 255, 0.8)",
                              fontSize: "0.9rem"
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayIcon />}
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
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
  );
};

export default Hero;