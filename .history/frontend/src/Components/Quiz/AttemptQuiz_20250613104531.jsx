import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Divider,
  Grid,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Quiz as QuizIcon,
} from "@mui/icons-material";
import api from "../api";

function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

  // Edit Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserData();
    fetchQuizHistory();
  }, [token, navigate]);

  const fetchUserData = async () => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const response = await api.get(`/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const userData = response.data || {
        name: decodedToken.name || "User",
        email: decodedToken.email,
        phone: "",
        bio: "",
      };
      
      setUser(userData);
      setProfileForm(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Fallback to token data
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const fallbackUser = {
        name: decodedToken.name || "User",
        email: decodedToken.email,
        phone: "",
        bio: "",
      };
      setUser(fallbackUser);
      setProfileForm(fallbackUser);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizHistory = async () => {
    try {
      const response = await api.get(`/api/users/quiz-history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizHistory(response.data || []);
    } catch (error) {
      console.error("Error fetching quiz history:", error);
      setQuizHistory([]);
    }
  };

  const handleEditProfile = async () => {
    setFormErrors({});
    setSubmitting(true);

    // Validation
    const errors = {};
    if (!profileForm.name.trim()) errors.name = "Name is required";
    if (!profileForm.email.trim()) errors.email = "Email is required";
    if (profileForm.email && !/\S+@\S+\.\S+/.test(profileForm.email)) {
      errors.email = "Email is invalid";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitting(false);
      return;
    }

    try {
      const response = await api.put(`/api/users/profile`, profileForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data);
      setEditProfileOpen(false);
      showSnackbar("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showSnackbar("Failed to update profile. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async () => {
    setFormErrors({});
    setSubmitting(true);

    // Validation
    const errors = {};
    if (!passwordForm.currentPassword) errors.currentPassword = "Current password is required";
    if (!passwordForm.newPassword) errors.newPassword = "New password is required";
    if (passwordForm.newPassword.length < 6) errors.newPassword = "Password must be at least 6 characters";
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitting(false);
      return;
    }

    try {
      await api.put(`/api/users/change-password`, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setChangePasswordOpen(false);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showSnackbar("Password changed successfully!", "success");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response?.status === 400) {
        showSnackbar("Current password is incorrect.", "error");
      } else {
        showSnackbar("Failed to change password. Please try again.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const showSnackbar = (message, type) => {
    setSnackbar({ open: true, message, type });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <DashboardIcon /> User Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* User Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mx: "auto", 
                  mb: 2,
                  bgcolor: "primary.main",
                  fontSize: "2rem"
                }}
              >
                {user?.name ? getInitials(user.name) : <PersonIcon />}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user?.name || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                <EmailIcon fontSize="small" />
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Phone:
              </Typography>
              <Typography variant="body1">
                {user?.phone || "Not provided"}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Bio:
              </Typography>
              <Typography variant="body1">
                {user?.bio || "No bio available"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setEditProfileOpen(true)}
                fullWidth
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                startIcon={<LockIcon />}
                onClick={() => setChangePasswordOpen(true)}
                fullWidth
              >
                Change Password
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={handleLogout}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Dashboard Content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <QuizIcon /> Quiz History
            </Typography>
            
            {quizHistory.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {quizHistory.map((quiz, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {quiz.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Score: {quiz.score} / {quiz.totalQuestions}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Attempted: {new Date(quiz.attemptedAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <QuizIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No quiz history available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start taking quizzes to see your history here!
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onClose={() => setEditProfileOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Profile
          <IconButton
            onClick={() => setEditProfileOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
            />
            <TextField
              label="Phone"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              fullWidth
            />
            <TextField
              label="Bio"
              multiline
              rows={3}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              error={!!formErrors.bio}
              helperText={formErrors.bio}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProfileOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditProfile}
            variant="contained"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={20} /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Change Password
          <IconButton
            onClick={() => setChangePasswordOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Current Password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              error={!!formErrors.currentPassword}
              helperText={formErrors.currentPassword}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              error={!!formErrors.newPassword}
              helperText={formErrors.newPassword}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordOpen(false)}>Cancel</Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={20} /> : "Change Password"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserDashboard;