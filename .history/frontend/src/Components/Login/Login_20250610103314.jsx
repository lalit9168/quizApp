import React, { useState } from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarsIcon from "@mui/icons-material/Stars";

function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isRegister, setIsRegister] = useState(false);
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
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 100%)",
      }}
    >
      {/* Enhanced Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Geometric Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {/* Professional hexagonal patterns */}
        {[
          { size: 80, top: "10%", left: "10%", opacity: 0.04 },
          { size: 60, top: "15%", right: "15%", opacity: 0.05 },
          { size: 100, bottom: "20%", left: "8%", opacity: 0.03 },
          { size: 70, bottom: "10%", right: "12%", opacity: 0.06 },
          { size: 90, top: "60%", left: "85%", opacity: 0.04 },
          { size: 50, top: "40%", left: "5%", opacity: 0.05 },
        ].map((hex, i) => (
          <Box
            key={`hex-${i}`}
            sx={{
              width: hex.size,
              height: hex.size,
              position: "absolute",
              ...hex,
              background: `linear-gradient(135deg, rgba(59, 130, 246, ${hex.opacity}), rgba(139, 92, 246, ${hex.opacity * 0.7}))`,
              clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)",
              animation: `rotate-${i} ${12 + i * 2}s linear infinite`,
              "@keyframes rotate-0": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-1": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-2": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-3": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-4": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
              "@keyframes rotate-5": {
                "0%": { transform: "rotate(0deg) scale(1)" },
                "50%": { transform: "rotate(180deg) scale(1.1)" },
                "100%": { transform: "rotate(360deg) scale(1)" },
              },
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.03,
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </Box>

      <Fade in timeout={600}>
        <Paper
          elevation={8}
          sx={{
            backdropFilter: "blur(16px)",
            background: "rgba(255, 255, 255, 0.98)",
            border: "1px solid rgba(59, 130, 246, 0.1)",
            padding: 5,
            borderRadius: 4,
            maxWidth: 400,
            width: "90%",
            color: "#334155",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box textAlign="center" mb={3}>
            <IconButton
              sx={{
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                color: "#fff",
                width: 60,
                height: 60,
                borderRadius: "50%",
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.25)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 15px 40px rgba(59, 130, 246, 0.35)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <StarsIcon fontSize="large" />
            </IconButton>
            <Typography 
              variant="h5" 
              mt={2} 
              fontWeight="bold"
              sx={{ 
                color: "#334155",
                background: "linear-gradient(135deg, #334155 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {isRegister ? "Create an Account" : "Welcome to QuizMaster!"}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            variant="filled"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(59, 130, 246, 0.04)",
                borderRadius: 2,
                border: "1px solid rgba(59, 130, 246, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(59, 130, 246, 0.06)",
                  borderColor: "rgba(59, 130, 246, 0.2)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(59, 130, 246, 0.06)",
                  borderColor: "#3b82f6",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#64748b",
                "&.Mui-focused": {
                  color: "#3b82f6",
                },
              },
              "& .MuiFilledInput-input": {
                color: "#334155",
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="filled"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              mb: 2,
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(59, 130, 246, 0.04)",
                borderRadius: 2,
                border: "1px solid rgba(59, 130, 246, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(59, 130, 246, 0.06)",
                  borderColor: "rgba(59, 130, 246, 0.2)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(59, 130, 246, 0.06)",
                  borderColor: "#3b82f6",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#64748b",
                "&.Mui-focused": {
                  color: "#3b82f6",
                },
              },
              "& .MuiFilledInput-input": {
                color: "#334155",
              },
            }}
          />

          {isRegister && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  name="role"
                  sx={{ 
                    color: "#3b82f6",
                    "&.Mui-checked": {
                      color: "#3b82f6",
                    },
                  }}
                />
              }
              label="Register as Admin"
              sx={{ color: "#334155", mb: 2 }}
            />
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#fff",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: 2,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.25)",
              mb: 2,
              fontSize: "1.1rem",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                transform: "translateY(-2px)",
                boxShadow: "0 15px 40px rgba(59, 130, 246, 0.35)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isRegister ? "Register" : "Log In"}
          </Button>

          <Typography align="center" variant="body2" sx={{ color: "#64748b" }}>
            {isRegister ? (
              <>
                Already have an account?{" "}
                <Button
                  onClick={() => setIsRegister(false)}
                  sx={{ 
                    color: "#3b82f6", 
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.05)",
                    },
                  }}
                >
                  Log In
                </Button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Button
                  onClick={() => setIsRegister(true)}
                  sx={{ 
                    color: "#8b5cf6", 
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(139, 92, 246, 0.05)",
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Typography>

          <Box mt={3} textAlign="center">
            <Button
              onClick={() => navigate("/guest-quiz-entry")}
              sx={{
                border: "2px solid #3b82f6",
                color: "#3b82f6",
                textTransform: "none",
                fontWeight: 600,
                py: 1,
                px: 3,
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#2563eb",
                  color: "#2563eb",
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              🚀 Have a Code? Enter Quiz
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}

export default LoginPage;