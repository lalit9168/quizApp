import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Quiz as QuizIcon, 
  EmojiEvents as TrophyIcon, 
  Speed as SpeedIcon,
  Group as GroupIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  PlayArrow as PlayIcon,
  School as SchoolIcon,
  Analytics as AnalyticsIcon
} from "@mui/icons-material";

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "50K+", label: "Active Users", icon: <GroupIcon /> },
    { number: "10K+", label: "Quizzes Created", icon: <QuizIcon /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUpIcon /> },
    { number: "4.9", label: "User Rating", icon: <StarIcon /> }
  ];

  const features = [
    {
      icon: <QuizIcon />,
      title: "Interactive Quizzes",
      description: "Engaging multiple-choice questions with real-time feedback and detailed explanations"
    },
    {
      icon: <AnalyticsIcon />,
      title: "Performance Analytics",
      description: "Track your progress with comprehensive reports and improvement suggestions"
    },
    {
      icon: <TrophyIcon />,
      title: "Achievements",
      description: "Unlock badges and compete on leaderboards as you master different subjects"
    }
  ];

  const subjects = ["Mathematics", "Science", "History", "Literature", "Geography"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric shapes */}
        {[
          { size: 120, top: "10%", left: "5%" },
          { size: 80, top: "70%", right: "10%" },
          { size: 100, bottom: "20%", left: "80%" },
          { size: 60, top: "30%", right: "20%" }
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/5 backdrop-blur-sm"
            style={{
              width: shape.size,
              height: shape.size,
              ...shape
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Floating icons */}
        {[
          { Icon: SchoolIcon, top: "15%", right: "15%" },
          { Icon: QuizIcon, bottom: "25%", left: "10%" },
          { Icon: TrophyIcon, top: "45%", right: "25%" }
        ].map(({ Icon, ...props }, i) => (
          <motion.div
            key={`icon-${i}`}
            className="absolute text-white/5"
            style={{ fontSize: "4rem", ...props }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, -5, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          >
            <Icon sx={{ fontSize: "inherit" }} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-6">
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Master Your Knowledge
                </span>
                <br />
                <span className="text-blue-400 font-extrabold">QuizMaster</span>
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-300 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Enhance your learning with 
                <span className="text-blue-400 font-semibold"> interactive quizzes</span>, 
                track your progress, and achieve academic excellence through our comprehensive platform.
              </motion.p>

              {/* Subject tags inline */}
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {subjects.map((subject, index) => (
                  <motion.span
                    key={subject}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-blue-200 border border-white/20"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {subject}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 justify-center"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlayIcon />
                Start Learning Journey
              </motion.button>

              <motion.button
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-3 justify-center"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <QuizIcon />
                Try as Guest
              </motion.button>
            </motion.div>

            {/* Dynamic Stats */}
            <motion.div 
              className="flex items-center gap-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-blue-400 text-3xl">
                    {stats[currentStat].icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {stats[currentStat].number}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stats[currentStat].label}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Stat indicators */}
              <div className="flex gap-2">
                {stats.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStat ? 'bg-blue-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Features Grid */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="group"
                >
                  <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400 group-hover:bg-blue-500/30 transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quiz Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-8 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl border border-blue-400/30 text-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <QuizIcon className="text-6xl text-blue-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Test Your Knowledge?
              </h3>
              <p className="text-gray-300 mb-6 max-w-sm mx-auto">
                Join thousands of students improving their academic performance through structured learning
              </p>
              <div className="flex justify-center gap-4">
                <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium">
                  Instant Feedback
                </span>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium">
                  Progress Tracking
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
    </div>
  );
};

export default Hero;