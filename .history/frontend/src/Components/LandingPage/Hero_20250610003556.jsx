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
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon
} from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Enhanced Navbar Component
const EnhancedNavbar = ({ openLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled 
          ? "rgba(255, 255, 255, 0.95)" 
          : "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${isScrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)'}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <QuizIcon sx={{ 
                fontSize: 32, 
                color: isScrolled ? "#667eea" : "#f093fb" 
              }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: isScrolled 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #ffffff 0%, #f093fb 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                QuizMaster
              </Typography>
            </Box>
          </motion.div>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, alignItems: "center" }}>
            {["Home", "Quizzes", "Leaderboard", "About"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Button
                  sx={{
                    color: isScrolled ? "#333" : "#ffffff",
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: isScrolled 
                        ? "rgba(102, 126, 234, 0.1)" 
                        : "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {item}
                </Button>
              </motion.div>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button
                onClick={openLogin}
                variant="contained"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  boxShadow: "0 4px 20px rgba(240, 147, 251, 0.4)",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
                    boxShadow: "0 6px 25px rgba(240, 147, 251, 0.6)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Button
                sx={{
                  minWidth: "auto",
                  p: 1,
                  color: isScrolled ? "#333" : "#ffffff",
                }}
              >
                <MenuIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Login Modal Component (simplified)
const LoginModal = ({ open, handleClose }) => {
  if (!open) return null;
  
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
      onClick={handleClose}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: 4,
          borderRadius: 4,
          maxWidth: 400,
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Login to QuizMaster
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

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
      icon: <QuizIcon sx={{ fontSize: 40, color: '#667eea' }} />,
      title: "Interactive Quizzes",
      description: "Engaging multiple-choice questions with real-time feedback and adaptive learning paths"
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#f093fb' }} />,
      title: "Leaderboards & Competition",
      description: "Compete with friends globally and earn achievements to showcase your knowledge"
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#764ba2' }} />,
      title: "Instant Analytics",
      description: "Get detailed performance insights with visual charts and progress tracking"
    }
  ];

  // Pie chart data for performance analytics
  const pieData = [
    { name: 'Correct', value: 75, color: '#4ade80' },
    { name: 'Incorrect', value: 15, color: '#f87171' },
    { name: 'Skipped', value: 10, color: '#fbbf24' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <EnhancedNavbar openLogin={() => setShowModal(true)} />

      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          pt: 10, // Add padding top to account for fixed navbar
        }}
      >
        {/* Enhanced Animated Background */}
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
            { color: "rgba(240, 147, 251, 0.15)", size: 150, top: "10%", left: "5%", delay: 0 },
            { color: "rgba(245, 87, 108, 0.12)", size: 100, top: "70%", left: "90%", delay: 1.5 },
            { color: "rgba(102, 126, 234, 0.18)", size: 120, bottom: "15%", left: "80%", delay: 3 },
            { color: "rgba(118, 75, 162, 0.14)", size: 80, top: "20%", right: "10%", delay: 2 },
            { color: "rgba(240, 147, 251, 0.1)", size: 200, bottom: "10%", left: "2%", delay: 0.5 }
          ].map((shape, i) => (
            <motion.div
              key={i}
              style={{
                width: shape.size,
                height: shape.size,
                background: `radial-gradient(circle, ${shape.color}, transparent 70%)`,
                borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "20%" : "30%",
                position: "absolute",
                ...shape
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              }}
            />
          ))}
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center" sx={{ minHeight: "80vh" }}>
            {/* Left Side - Image and Visual Content */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {/* Main Hero Image Box */}
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(30px)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: 6,
                      overflow: "hidden",
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      {/* Quiz Interface Mockup */}
                      <Box
                        sx={{
                          height: 300,
                          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        {/* Mockup Quiz Question */}
                        <Box sx={{ 
                          width: "90%", 
                          backgroundColor: "white", 
                          borderRadius: 3, 
                          p: 3, 
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)" 
                        }}>
                          <Typography variant="h6" sx={{ color: "#334155", mb: 2, fontWeight: 600 }}>
                            What is the capital of France?
                          </Typography>
                          {["Paris", "London", "Berlin", "Madrid"].map((option, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                p: 2,
                                mb: 1,
                                backgroundColor: idx === 0 ? "#dcfce7" : "#f1f5f9",
                                borderRadius: 2,
                                border: idx === 0 ? "2px solid #16a34a" : "1px solid #e2e8f0",
                                cursor: "pointer"
                              }}
                            >
                              <Typography sx={{ color: idx === 0 ? "#16a34a" : "#64748b" }}>
                                {String.fromCharCode(65 + idx)}. {option}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        
                        {/* Floating elements */}
                        <motion.div
                          style={{ position: "absolute", top: 20, right: 20 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <TrophyIcon sx={{ fontSize: 40, color: "#f59e0b" }} />
                        </motion.div>
                        
                        <motion.div
                          style={{ position: "absolute", bottom: 20, left: 20 }}
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <StarIcon sx={{ fontSize: 30, color: "#8b5cf6" }} />
                        </motion.div>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Performance Analytics with Pie Chart */}
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(25px)",
                      border: "2px solid rgba(255, 255, 255, 0.25)",
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: "#ffffff", 
                          mb: 2, 
                          textAlign: "center",
                          fontWeight: 700 
                        }}
                      >
                        Performance Analytics
                      </Typography>
                      <Box sx={{ height: 200, display: "flex", alignItems: "center" }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <Box sx={{ ml: 2 }}>
                          {pieData.map((item, idx) => (
                            <Box key={idx} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  backgroundColor: item.color,
                                  borderRadius: "50%",
                                  mr: 1,
                                }}
                              />
                              <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
                                {item.name}: {item.value}%
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Side - Content */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ pl: { lg: 4 } }}>
                  {/* Main Heading */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: "2.8rem", md: "4rem", lg: "4.5rem" },
                      background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 8px 32px rgba(255, 255, 255, 0.3)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      mb: 3,
                    }}
                  >
                    Master Your Knowledge with
                    <Box 
                      component="span" 
                      sx={{ 
                        display: "block", 
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      QuizMaster Pro
                    </Box>
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    variant="h5"
                    sx={{
                      color: "rgba(255, 255, 255, 0.95)",
                      mb: 4,
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                      lineHeight: 1.7,
                      maxWidth: "580px",
                      fontSize: { xs: "1.2rem", md: "1.4rem" }
                    }}
                  >
                    Transform your learning experience with our advanced quiz platform. 
                    <Box component="strong" sx={{ color: "#f093fb", fontWeight: 700 }}>
                      {" "}Challenge yourself, compete globally, and achieve excellence
                    </Box> with real-time analytics and personalized feedback.
                  </Typography>

                  {/* Key Features List */}
                  <Box sx={{ mb: 5 }}>
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 3,
                            mb: 3,
                            p: 3,
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.08)",
                            backdropFilter: "blur(15px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              background: "rgba(255, 255, 255, 0.12)",
                              transform: "translateX(10px)",
                            },
                          }}
                        >
                          <Box sx={{ 
                            p: 2, 
                            borderRadius: 2, 
                            background: "rgba(255, 255, 255, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: 64,
                            height: 64
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
                                fontSize: "1.25rem"
                              }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: "rgba(255, 255, 255, 0.85)", 
                                lineHeight: 1.6,
                                fontSize: "1rem"
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
                  <Box sx={{ display: "flex", gap: 3, mb: 6, flexWrap: "wrap" }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          px: 5,
                          py: 2.5,
                          fontWeight: 800,
                          borderRadius: 5,
                          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                          boxShadow: "0 12px 40px rgba(240, 147, 251, 0.4)",
                          color: "#ffffff",
                          fontSize: "1.2rem",
                          textTransform: "none",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
                            boxShadow: "0 16px 50px rgba(240, 147, 251, 0.6)",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        🚀 Start Your Journey
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
                          px: 5,
                          py: 2.5,
                          fontWeight: 700,
                          borderRadius: 5,
                          borderColor: "rgba(255, 255, 255, 0.4)",
                          color: "#ffffff",
                          fontSize: "1.2rem",
                          textTransform: "none",
                          backdropFilter: "blur(15px)",
                          background: "rgba(255, 255, 255, 0.05)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            borderColor: "#ffffff",
                            transform: "translateY(-3px)",
                            boxShadow: "0 12px 40px rgba(255, 255, 255, 0.2)"
                          },
                        }}
                      >
                        👤 Try as Guest
                      </Button>
                    </motion.div>
                  </Box>

                  {/* Dynamic Stats */}
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 4,
                    p: 4,
                    borderRadius: 4,
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStat}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: "flex", alignItems: "center", gap: 16 }}
                      >
                        <Box sx={{ 
                          color: "#f093fb", 
                          fontSize: 40,
                          p: 2,
                          borderRadius: 3,
                          background: "rgba(240, 147, 251, 0.1)"
                        }}>
                          {stats[currentStat].icon}
                        </Box>
                        <Box>
                          <Typography variant="h3" sx={{ 
                            color: "#ffffff", 
                            fontWeight: 800,
                            mb: 0.5
                          }}>
                            {stats[currentStat].number}
                          </Typography>
                          <Typography variant="h6" sx={{ 
                            color: "rgba(255, 255, 255, 0.8)",
                            fontWeight: 600
                          }}>
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

        {/* Enhanced Bottom Decoration */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "120px",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
            clipPath: "polygon(0 60%, 100% 40%, 100% 100%, 0 100%)",
          }}
        />
      </Box>

      <LoginModal open={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default Hero;