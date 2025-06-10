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
          minHeight: "calc(100vh - 80px)", // Account for navbar height
          marginTop: "80px", // Add margin to account for fixed navbar
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingY: { xs: 4, md: 6 }
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
            { color: "rgba(245, 87, 108, 0.08)", size: 80, top: "60%", right: "15%", delay: 1.5 },
            { color: "rgba(102, 126, 234, 0.12)", size: 100, bottom: "20%", left: "75%", delay: 3 },
            { color: "rgba(118, 75, 162, 0.1)", size: 60, top: "25%", right: "25%", delay: 2 },
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
          <Grid container spacing={4} alignItems="center" sx={{ minHeight: "70vh" }}>
            
            {/* Left Side - Quiz Illustration/Image */}
            <Grid item xs={12} lg={6} sx={{ order: { xs: 2, lg: 1 } }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Main Quiz Interface Mockup */}
                <Box
                  sx={{
                    position: "relative",
                    maxWidth: 500,
                    mx: "auto",
                    mb: 4
                  }}
                >
                  {/* Quiz Card Mockup */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <Card
                      sx={{
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(20px)",
                        borderRadius: 4,
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        overflow: "visible",
                        position: "relative"
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        {/* Quiz Header */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
                          <Box sx={{ 
                            width: 50, 
                            height: 50, 
                            borderRadius: "50%", 
                            background: "linear-gradient(135deg, #667eea, #764ba2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <QuizIcon sx={{ color: "white", fontSize: 24 }} />
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: "#333" }}>
                              JavaScript Fundamentals
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#666" }}>
                              Question 3 of 10
                            </Typography>
                          </Box>
                        </Box>

                        {/* Progress Bar */}
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ 
                            width: "100%", 
                            height: 8, 
                            borderRadius: 4, 
                            backgroundColor: "#f0f0f0",
                            overflow: "hidden"
                          }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "30%" }}
                              transition={{ duration: 1, delay: 0.8 }}
                              style={{
                                height: "100%",
                                background: "linear-gradient(90deg, #667eea, #764ba2)",
                                borderRadius: 4
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Question */}
                        <Typography variant="h6" sx={{ mb: 3, color: "#333", fontWeight: 600 }}>
                          Which method is used to add an element to the end of an array?
                        </Typography>

                        {/* Answer Options */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {["push()", "pop()", "shift()", "unshift()"].map((option, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                  borderRadius: 3,
                                  border: index === 0 ? "2px solid #667eea" : "2px solid #e0e0e0",
                                  backgroundColor: index === 0 ? "rgba(102, 126, 234, 0.1)" : "#f9f9f9",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    borderColor: "#667eea",
                                    backgroundColor: "rgba(102, 126, 234, 0.05)"
                                  }
                                }}
                              >
                                <Typography sx={{ 
                                  color: index === 0 ? "#667eea" : "#333",
                                  fontWeight: index === 0 ? 600 : 400
                                }}>
                                  {String.fromCharCode(65 + index)}. {option}
                                </Typography>
                              </Box>
                            </motion.div>
                          ))}
                        </Box>

                        {/* Timer */}
                        <Box sx={{ 
                          position: "absolute", 
                          top: -15, 
                          right: 20,
                          background: "linear-gradient(135deg, #f093fb, #f5576c)",
                          color: "white",
                          px: 3,
                          py: 1,
                          borderRadius: 20,
                          fontWeight: 700,
                          boxShadow: "0 4px 15px rgba(240, 147, 251, 0.4)"
                        }}>
                          00:45
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Floating Achievement Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    style={{
                      position: "absolute",
                      top: -20,
                      left: -20,
                      zIndex: 10
                    }}
                  >
                    <Box sx={{
                      background: "linear-gradient(135deg, #f093fb, #f5576c)",
                      color: "white",
                      p: 2,
                      borderRadius: "50%",
                      boxShadow: "0 8px 25px rgba(240, 147, 251, 0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <TrophyIcon sx={{ fontSize: 32 }} />
                    </Box>
                  </motion.div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    style={{
                      position: "absolute",
                      bottom: -20,
                      right: -20,
                      zIndex: 10
                    }}
                  >
                    <Box sx={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(10px)",
                      p: 2,
                      borderRadius: 3,
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      minWidth: 120,
                      textAlign: "center"
                    }}>
                      <Typography variant="h6" sx={{ color: "#667eea", fontWeight: 700 }}>
                        95%
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#666" }}>
                        Accuracy
                      </Typography>
                    </Box>
                  </motion.div>
                </Box>

                {/* Feature Icons */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: 4, 
                  mt: 4,
                  flexWrap: "wrap"
                }}>
                  {features.slice(0, 3).map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2 + index * 0.2 }}
                    >
                      <Box sx={{ 
                        textAlign: "center",
                        maxWidth: 100
                      }}>
                        <Box sx={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: "50%", 
                          background: "rgba(255, 255, 255, 0.2)",
                          backdropFilter: "blur(10px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 1,
                          border: "1px solid rgba(255, 255, 255, 0.3)"
                        }}>
                          {React.cloneElement(feature.icon, { sx: { fontSize: 28, color: "#ffffff" } })}
                        </Box>
                        <Typography variant="caption" sx={{ 
                          color: "rgba(255, 255, 255, 0.9)", 
                          fontWeight: 600,
                          display: "block"
                        }}>
                          {feature.title}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
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
                <Box sx={{ pl: { lg: 4 }, textAlign: { xs: "center", lg: "left" } }}>
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
                      maxWidth: { lg: "500px" }
                    }}
                  >
                    Challenge yourself with interactive quizzes, compete with friends, and track your progress in real-time. 
                    <Box component="span" sx={{ color: "#f093fb", fontWeight: 600 }}>
                      {" "}Learn, compete, excel!
                    </Box>
                  </Typography>

                  {/* Action Buttons */}
                  <Box sx={{ 
                    display: "flex", 
                    gap: 3, 
                    mb: 6, 
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", lg: "flex-start" }
                  }}>
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
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 4,
                    justifyContent: { xs: "center", lg: "flex-start" }
                  }}>
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

                  {/* Feature List */}
                  <Box sx={{ mt: 6, display: { xs: "none", lg: "block" } }}>
                    <Typography variant="h6" sx={{ 
                      color: "rgba(255, 255, 255, 0.9)", 
                      mb: 3, 
                      fontWeight: 600 
                    }}>
                      Why Choose QuizMaster?
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      {[
                        "Real-time feedback and scoring",
                        "Comprehensive performance analytics",
                        "Global leaderboards & competitions",
                        "Personalized learning paths"
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #f093fb, #f5576c)"
                            }} />
                            <Typography sx={{ 
                              color: "rgba(255, 255, 255, 0.8)",
                              fontSize: "1.1rem"
                            }}>
                              {item}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
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

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Hero;