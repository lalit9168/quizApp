import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quiz as QuizIcon, 
  EmojiEvents as TrophyIcon, 
  Speed as SpeedIcon,
  Group as GroupIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  SchoolOutlined as EducationIcon,
  Timer as TimerIcon,
  Analytics as AnalyticsIcon
} from "@mui/icons-material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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
      description: "Engaging multiple-choice questions with real-time feedback and instant scoring"
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#f093fb' }} />,
      title: "Global Leaderboards",
      description: "Compete with players worldwide and track your ranking progress"
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#764ba2' }} />,
      title: "Instant Analytics",
      description: "Get detailed performance insights and improvement suggestions"
    },
    {
      icon: <EducationIcon sx={{ fontSize: 40, color: '#4facfe' }} />,
      title: "Adaptive Learning",
      description: "AI-powered difficulty adjustment based on your performance"
    }
  ];

  // Pie chart data for quiz categories
  const pieChartData = [
    { name: 'Science', value: 30, color: '#667eea' },
    { name: 'History', value: 25, color: '#f093fb' },
    { name: 'Technology', value: 20, color: '#764ba2' },
    { name: 'Sports', value: 15, color: '#4facfe' },
    { name: 'Arts', value: 10, color: '#f5576c' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          overflow: "hidden",
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
        </Box>

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 8 }}>
          {/* Main Hero Section */}
          <Grid container spacing={6} alignItems="center" sx={{ minHeight: "70vh", mb: 8 }}>
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
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
                    mb: 3,
                    textAlign: { xs: "center", lg: "left" }
                  }}
                >
                  Master Your Knowledge with
                  <Box component="span" sx={{ display: "block", color: "#f093fb" }}>
                    QuizMaster Pro
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
                    textAlign: { xs: "center", lg: "left" }
                  }}
                >
                  Transform your learning experience with AI-powered quizzes, real-time competition, and comprehensive analytics.
                  <Box component="span" sx={{ color: "#f093fb", fontWeight: 600, display: "block", mt: 1 }}>
                    Join 50,000+ learners worldwide!
                  </Box>
                </Typography>

                <Box sx={{ display: "flex", gap: 3, mb: 6, flexWrap: "wrap", justifyContent: { xs: "center", lg: "flex-start" } }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4, py: 2, fontWeight: 700, borderRadius: 4,
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        boxShadow: "0 8px 32px rgba(240, 147, 251, 0.4)",
                        color: "#ffffff", fontSize: "1.1rem", textTransform: "none",
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

                  <motion.div whileHover={{ scale: 1.05 }} whileTrap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 4, py: 2, fontWeight: 600, borderRadius: 4,
                        borderColor: "rgba(255, 255, 255, 0.3)", color: "#ffffff",
                        fontSize: "1.1rem", textTransform: "none",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "#ffffff", transform: "translateY(-2px)",
                          boxShadow: "0 8px 32px rgba(255, 255, 255, 0.2)"
                        },
                      }}
                    >
                      Try as Guest
                    </Button>
                  </motion.div>
                </Box>

                {/* Dynamic Stats */}
                <Box sx={{ display: "flex", justifyContent: { xs: "center", lg: "flex-start" }, mb: 4 }}>
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
              </motion.div>
            </Grid>

            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 4,
                    p: 4,
                    textAlign: "center"
                  }}
                >
                  <Typography variant="h5" sx={{ color: "#ffffff", mb: 3, fontWeight: 700 }}>
                    Quiz Categories Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '8px', 
                          color: 'white' 
                        }} 
                      />
                      <Legend 
                        wrapperStyle={{ color: 'white' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </motion.div>
            </Grid>
          </Grid>

          {/* Image and Content Section */}
          <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 300, md: 400 },
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                  }}
                >
                  {/* Placeholder for actual image */}
                  <Box sx={{ textAlign: "center", color: "white" }}>
                    <QuizIcon sx={{ fontSize: 100, mb: 2, opacity: 0.9 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      Interactive Learning
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      Advanced Quiz Platform
                    </Typography>
                  </Box>
                  
                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <TrophyIcon sx={{ color: "white", fontSize: 30 }} />
                  </Box>
                  
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      left: 20,
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <StarIcon sx={{ color: "white", fontSize: 25 }} />
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 4,
                    p: 4,
                    height: "100%"
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: "#ffffff", 
                      fontWeight: 700, 
                      mb: 3,
                      textAlign: "center"
                    }}
                  >
                    Why Choose QuizMaster?
                  </Typography>
                  
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {[
                      {
                        icon: <AnalyticsIcon sx={{ color: "#4facfe" }} />,
                        title: "Advanced Analytics",
                        description: "Track your progress with detailed performance metrics and insights"
                      },
                      {
                        icon: <TimerIcon sx={{ color: "#f093fb" }} />,
                        title: "Timed Challenges",
                        description: "Test your knowledge under pressure with customizable time limits"
                      },
                      {
                        icon: <GroupIcon sx={{ color: "#667eea" }} />,
                        title: "Community Features",
                        description: "Join study groups, create team challenges, and learn together"
                      }
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box 
                          sx={{ 
                            p: 1.5, 
                            borderRadius: 2, 
                            background: "rgba(255,255,255,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: 50
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 600, mb: 0.5 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Features Grid */}
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(20px)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: 4,
                      height: "100%",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.15)",
                        border: "2px solid rgba(240, 147, 251, 0.5)",
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(240, 147, 251, 0.2)"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: "center" }}>
                      <Box sx={{ mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: "#ffffff", 
                          fontWeight: 700, 
                          mb: 2
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: "rgba(255, 255, 255, 0.8)", 
                          lineHeight: 1.6 
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
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
    </>
  );
};

export default Hero;