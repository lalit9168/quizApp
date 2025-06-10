import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TimerIcon from "@mui/icons-material/Timer";

import { 
  Quiz as QuizIcon, 
  EmojiEvents as TrophyIcon, 
  Speed as SpeedIcon,
  Group as GroupIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,

} from "@mui/material/icons";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [activeChart, setActiveChart] = useState(0);

  const stats = [
    { number: "50K+", label: "Active Users", icon: <GroupIcon /> },
    { number: "10K+", label: "Quizzes Created", icon: <QuizIcon /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUpIcon /> },
    { number: "4.9", label: "User Rating", icon: <StarIcon /> }
  ];

  const features = [
    {
      icon: <QuizIcon sx={{ fontSize: 40, color: '#6366f1' }} />,
      title: "Smart Quiz Engine",
      description: "AI-powered questions that adapt to your learning pace with instant feedback"
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: "Global Leaderboards",
      description: "Compete with learners worldwide and earn achievements for your progress"
    },
    {
      icon: <AssessmentIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      title: "Detailed Analytics",
      description: "Track your performance with comprehensive reports and progress insights"
    },
    {
      icon: <TimerIcon sx={{ fontSize: 40, color: '#ef4444' }} />,
      title: "Timed Challenges",
      description: "Test your speed with time-based quizzes and improve your quick thinking"
    }
  ];

  // Quiz performance data for pie chart
  const performanceData = [
    { name: 'Excellent (90-100%)', value: 35, color: '#10b981' },
    { name: 'Good (80-89%)', value: 40, color: '#6366f1' },
    { name: 'Average (70-79%)', value: 20, color: '#f59e0b' },
    { name: 'Needs Improvement', value: 5, color: '#ef4444' }
  ];

  // Subject popularity data
  const subjectData = [
    { name: 'Science', value: 85, color: '#8b5cf6' },
    { name: 'Math', value: 78, color: '#06b6d4' },
    { name: 'History', value: 65, color: '#f59e0b' },
    { name: 'Language', value: 72, color: '#10b981' },
    { name: 'Tech', value: 90, color: '#6366f1' }
  ];

  const chartData = [performanceData, subjectData];
  const chartTitles = ['User Performance Distribution', 'Popular Quiz Categories'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const chartInterval = setInterval(() => {
      setActiveChart((prev) => (prev + 1) % chartData.length);
    }, 5000);
    return () => clearInterval(chartInterval);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #cbd5e1 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          pt: 8, // Account for white navbar
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
          {/* Floating geometric shapes with quiz theme colors */}
          {[
            { color: "rgba(99, 102, 241, 0.08)", size: 120, top: "15%", left: "10%", delay: 0 },
            { color: "rgba(16, 185, 129, 0.06)", size: 80, top: "60%", left: "85%", delay: 1.5 },
            { color: "rgba(245, 158, 11, 0.08)", size: 100, bottom: "20%", left: "75%", delay: 3 },
            { color: "rgba(139, 92, 246, 0.07)", size: 60, top: "25%", right: "15%", delay: 2 },
            { color: "rgba(239, 68, 68, 0.05)", size: 140, bottom: "15%", left: "5%", delay: 0.5 }
          ].map((shape, i) => (
            <motion.div
              key={i}
              style={{
                width: shape.size,
                height: shape.size,
                background: `radial-gradient(circle, ${shape.color}, transparent)`,
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
            { Icon: QuizIcon, top: "20%", right: "20%", delay: 1, color: "#6366f1" },
            { Icon: TrophyIcon, bottom: "30%", right: "10%", delay: 2, color: "#f59e0b" },
            { Icon: StarIcon, top: "40%", left: "15%", delay: 3, color: "#10b981" },
            { Icon: SchoolIcon, top: "70%", left: "8%", delay: 1.5, color: "#8b5cf6" },
            { Icon: AssessmentIcon, top: "35%", right: "5%", delay: 2.5, color: "#ef4444" }
          ].map(({ Icon, color, ...props }, i) => (
            <motion.div
              key={`icon-${i}`}
              style={{
                position: "absolute",
                color: `${color}20`,
                fontSize: "60px",
                ...props
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2],
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
                      fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.2rem" },
                      background: "linear-gradient(135deg, #1e293b 0%, #475569 50%, #64748b 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      mb: 2,
                    }}
                  >
                    Master Every Subject with
                    <Box component="span" sx={{ 
                      display: "block", 
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                      QuizMaster Pro
                    </Box>
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      color: "#64748b",
                      mb: 4,
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                      lineHeight: 1.6,
                      maxWidth: "520px"
                    }}
                  >
                    Elevate your learning with intelligent quizzes, real-time analytics, and competitive challenges.
                    <Box component="span" sx={{ color: "#6366f1", fontWeight: 600 }}>
                      {" "}Learn smarter, compete better, achieve more!
                    </Box>
                  </Typography>

                  {/* Quiz Categories Tags */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                    {['Science', 'Mathematics', 'History', 'Technology', 'Language Arts'].map((category, index) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <Box
                          sx={{
                            px: 3,
                            py: 1,
                            borderRadius: 20,
                            background: `linear-gradient(135deg, ${
                              ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]
                            }15, ${
                              ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]
                            }25)`,
                            border: `1px solid ${
                              ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]
                            }30`,
                            color: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index],
                            fontWeight: 600,
                            fontSize: "0.85rem"
                          }}
                        >
                          {category}
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
                          px: 4,
                          py: 2,
                          fontWeight: 700,
                          borderRadius: 3,
                          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)",
                          color: "#ffffff",
                          fontSize: "1.1rem",
                          textTransform: "none",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                            boxShadow: "0 12px 40px rgba(99, 102, 241, 0.4)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        🚀 Start Learning Journey
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
                          borderRadius: 3,
                          borderColor: "#6366f1",
                          color: "#6366f1",
                          fontSize: "1.1rem",
                          textTransform: "none",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            backgroundColor: "#6366f1",
                            color: "#ffffff",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 32px rgba(99, 102, 241, 0.2)"
                          },
                        }}
                      >
                        🎯 Try Demo Quiz
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
                        <Box sx={{ 
                          color: "#6366f1", 
                          fontSize: 32,
                          p: 1.5,
                          borderRadius: 2,
                          background: "rgba(99, 102, 241, 0.1)"
                        }}>
                          {stats[currentStat].icon}
                        </Box>
                        <Box>
                          <Typography variant="h4" sx={{ color: "#1e293b", fontWeight: 700 }}>
                            {stats[currentStat].number}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#64748b" }}>
                            {stats[currentStat].label}
                          </Typography>
                        </Box>
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Content - Features and Charts */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Interactive Chart Section */}
                <Box sx={{ mb: 4 }}>
                  <Card
                    sx={{
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      borderRadius: 4,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeChart}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              textAlign: "center", 
                              mb: 3, 
                              color: "#1e293b",
                              fontWeight: 700
                            }}
                          >
                            📊 {chartTitles[activeChart]}
                          </Typography>
                          <Box sx={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              {activeChart === 0 ? (
                                <PieChart>
                                  <Pie
                                    data={chartData[activeChart]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    animationBegin={0}
                                    animationDuration={1000}
                                  >
                                    {chartData[activeChart].map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Pie>
                                  <Tooltip 
                                    formatter={(value) => [`${value}%`, 'Users']}
                                    contentStyle={{
                                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                      border: '1px solid rgba(99, 102, 241, 0.2)',
                                      borderRadius: '8px'
                                    }}
                                  />
                                </PieChart>
                              ) : (
                                <BarChart data={chartData[activeChart]}>
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                  <YAxis axisLine={false} tickLine={false} />
                                  <Tooltip 
                                    contentStyle={{
                                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                      border: '1px solid rgba(99, 102, 241, 0.2)',
                                      borderRadius: '8px'
                                    }}
                                  />
                                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {chartData[activeChart].map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                  </Bar>
                                </BarChart>
                              )}
                            </ResponsiveContainer>
                          </Box>
                        </motion.div>
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </Box>

                {/* Features Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card
                        sx={{
                          background: "rgba(255, 255, 255, 0.8)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(99, 102, 241, 0.1)",
                          borderRadius: 3,
                          height: "100%",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid rgba(99, 102, 241, 0.3)",
                            boxShadow: "0 12px 40px rgba(99, 102, 241, 0.15)"
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3, textAlign: "center" }}>
                          <Box sx={{ 
                            mb: 2, 
                            display: "flex", 
                            justifyContent: "center",
                            p: 1.5,
                            borderRadius: 2,
                            background: `${feature.icon.props.sx.color}15`
                          }}>
                            {feature.icon}
                          </Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: "#1e293b", 
                              fontWeight: 700, 
                              mb: 1,
                              fontSize: "1rem"
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "#64748b", 
                              lineHeight: 1.5,
                              fontSize: "0.85rem"
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>

                {/* Achievement Showcase */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Box
                    sx={{
                      mt: 4,
                      p: 4,
                      borderRadius: 4,
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                      textAlign: "center"
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                      <TrophyIcon sx={{ fontSize: 40, color: "#f59e0b" }} />
                      <StarIcon sx={{ fontSize: 40, color: "#6366f1" }} />
                      <SchoolIcon sx={{ fontSize: 40, color: "#10b981" }} />
                    </Box>
                    <Typography variant="h6" sx={{ color: "#1e293b", mb: 1, fontWeight: 700 }}>
                      🎉 Join the Learning Revolution
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", maxWidth: "300px", mx: "auto" }}>
                      Experience gamified learning with achievements, badges, and certificates that showcase your expertise
                    </Typography>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
            background: "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)",
            clipPath: "ellipse(100% 100% at 50% 100%)",
          }}
        />
      </Box>
    </>
  );
};

export default Hero;