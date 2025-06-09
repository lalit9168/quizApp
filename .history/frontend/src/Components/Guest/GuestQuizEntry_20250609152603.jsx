import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

function GuestQuizEntry() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (code.trim()) {
      navigate(`/guest-attempt/${code}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px - 48px)", // same as HomePage main box
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          backdropFilter: "blur(24px)",
          background: "rgba(255,255,255,0.05)",
          borderRadius: 5,
          p: 5,
          width: "100%",
          maxWidth: 480,
          border: "2px solid rgba(0,254,186,0.4)",
          boxShadow: "0 0 20px rgba(0,254,186,0.2)",
          color: "#fff",
          textAlign: "center",
          transition: "0.3s",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#00feba",
            textShadow: "0 0 10px #00feba",
          }}
        >
          Enter Guest Quiz Code
        </Typography>

        <TextField
          label="Quiz Code"
          variant="filled"
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          sx={{
            mb: 3,
            input: {
              color: "#00feba",
              fontWeight: "bold",
              textAlign: "center",
              letterSpacing: 4,
              fontSize: "1.25rem",
              textTransform: "uppercase",
            },
            label: {
              color: "#00feba",
            },
            "& .MuiFilledInput-root": {
              backgroundColor: "rgba(0,254,186,0.1)",
              borderRadius: 1,
            },
            "& .Mui-focused": {
              borderColor: "#00feba",
            },
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />

        <Button
          variant="contained"
          onClick={handleStart}
          disabled={!code.trim()}
          sx={{
            py: 1.5,
            background: "linear-gradient(to right, #00feba, #5b86e5)",
            fontWeight: "bold",
            color: "#121212",
            boxShadow: "0 0 15px #00feba",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 30px #00feba",
              background: "linear-gradient(to right, #00feba, #5b86e5)",
            },
            "&:disabled": {
              background: "rgba(0,254,186,0.3)",
              color: "#555",
              boxShadow: "none",
              cursor: "not-allowed",
            },
          }}
        >
          Attempt Quiz
        </Button>
      </Paper>
    </Box>
  );
}

export default GuestQuizEntry;
