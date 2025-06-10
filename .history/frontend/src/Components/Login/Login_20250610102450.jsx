import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  Fade,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stars as StarsIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "admin" : "user") : value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const url = isRegister
      ? "http://localhost:5001/api/register"
      : "http://localhost:5001/api/login";

    try {
      const res = await axios.post(url, formData);
      if (!isRegister) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        navigate("/home");
      } else {
        alert("Registered successfully! Please log in.");
        setIsRegister(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Enhanced Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(5, 150, 105, 0.05) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Academic Icons */}
      {[
        { Icon: SchoolIcon, top: "15%", left: "10%", delay: 0 },
        { Icon: QuizIcon, top: "20%", right: "15%", delay: 1 },
        { Icon: StarsIcon, bottom: "20%", left: "12%", delay: 2 },
        { Icon: AdminIcon, bottom: "25%", right: "20%", delay: 1.5 }
      ].map(({ Icon, ...props }, i) => (
        <motion.div
          key={`bg-icon-${i}`}
          style={{
            position: "absolute",
            color: "rgba(79, 70, 229, 0.1)",
            fontSize: "40px",
            ...props
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: props.delay,
          }}
        >
          <Icon sx={{ fontSize: 40 }} />
        </motion.div>
      ))}

      {/* Geometric shapes */}
      {[
        { size: 80, top: "10%", left: "5%", delay: 0 },
        { size: 60, top: "70%", right: "8%", delay: 1.5 },
        { size: 100, bottom: "10%", left: "8%", delay: 2.5 }
      ].map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          style={{
            width: shape.size,
            height: shape.size,
            position: "absolute",
            background: "rgba(79, 70, 229, 0.05)",
            clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
            ...shape
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: shape.delay,
          }}
        />
      ))}

      <Fade in timeout={800}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={24}
            sx={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 5,
              maxWidth: 450,
              width: "90%",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 25px 80px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Header Section with Gradient */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                p: 4,
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
              }}
            >
              {/* Header background pattern */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
                  `,
                  zIndex: 0
                }}
              />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                style={{ position: "relative", zIndex: 1 }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 3,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    mb: 2,
                    boxShadow: "0 8px 32px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <StarsIcon sx={{ fontSize: 48, color: "#ffffff" }} />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ position: "relative", zIndex: 1 }}
              >
                <Typography variant="h4" sx={{ color: "#ffffff", fontWeight: 800, mb: 1 }}>
                  {isRegister ? "Join QuizMaster" : "Welcome Back"}
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)", fontSize: 16 }}>
                  {isRegister 
                    ? "Create your account and start your learning journey" 
                    : "Sign in to continue your learning adventure"
                  }
                </Typography>
              </motion.div>
            </Box>

            {/* Form Section */}
            <Box sx={{ p: 5 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isRegister ? "register" : "login"}
                  initial={{ opacity: 0, x: isRegister ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRegister ? -50 : 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#4f46e5" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            "& fieldset": {
                              borderColor: "#4f46e5",
                            },
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#ffffff",
                            "& fieldset": {
                              borderColor: "#4f46e5",
                            },
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#4f46e5",
                        },
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: "#4f46e5" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        mb: 3,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          backgroundColor: "#f8fafc",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#f1f5f9",
                            "& fieldset": {
                              borderColor: "#4f46e5",
                            },
                          },
                          "&.Mui-focused": {
                            backgroundColor: "#ffffff",
                            "& fieldset": {
                              borderColor: "#4f46e5",
                            },
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#4f46e5",
                        },
                      }}
                    />
                  </motion.div>

                  {isRegister && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.role === "admin"}
                            onChange={handleChange}
                            name="role"
                            sx={{ 
                              color: "#4f46e5",
                              "&.Mui-checked": {
                                color: "#4f46e5",
                              },
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AdminIcon sx={{ color: "#7c3aed", fontSize: 20 }} />
                            <Typography sx={{ color: "#475569", fontWeight: 500 }}>
                              Register as Administrator
                            </Typography>
                          </Box>
                        }
                        sx={{ mb: 3, ml: 0 }}
                      />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      sx={{
                        py: 2.5,
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "0 8px 32px rgba(79, 70, 229, 0.3)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
                          boxShadow: "0 12px 40px rgba(79, 70, 229, 0.4)",
                          transform: "translateY(-2px)",
                        },
                        "&:disabled": {
                          background: "#94a3b8",
                          color: "#ffffff",
                        },
                        mb: 3,
                      }}
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <StarsIcon />
                        </motion.div>
                      ) : (
                        isRegister ? "Create Account" : "Sign In"
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Typography align="center" variant="body2" sx={{ color: "#64748b", mb: 3 }}>
                      {isRegister ? (
                        <>
                          Already have an account?{" "}
                          <Button
                            onClick={() => setIsRegister(false)}
                            sx={{ 
                              color: "#4f46e5", 
                              textTransform: "none",
                              fontWeight: 600,
                              "&:hover": {
                                backgroundColor: "rgba(79, 70, 229, 0.1)",
                              }
                            }}
                          >
                            Sign In Here
                          </Button>
                        </>
                      ) : (
                        <>
                          Don't have an account?{" "}
                          <Button
                            onClick={() => setIsRegister(true)}
                            sx={{ 
                              color: "#7c3aed", 
                              textTransform: "none",
                              fontWeight: 600,
                              "&:hover": {
                                backgroundColor: "rgba(124, 58, 237, 0.1)",
                              }
                            }}
                          >
                            Create Account
                          </Button>
                        </>
                      )}
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/guest-quiz-entry")}
                      startIcon={<QuizIcon />}
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        borderColor: "#e2e8f0",
                        color: "#475569",
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        backgroundColor: "#f8fafc",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          borderColor: "#4f46e5",
                          backgroundColor: "rgba(79, 70, 229, 0.05)",
                          color: "#4f46e5",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 32px rgba(79, 70, 229, 0.15)"
                        },
                      }}
                    >
                      Have a Quiz Code? Enter as Guest
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </Box>
          </Paper>
        </motion.div>
      </Fade>
    </Box>
  );
}

export default LoginPage;