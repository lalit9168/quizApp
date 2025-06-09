import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  LoginPage,
  HomePage,
  QuizPage,
  PrivateRoute,
  QuizDash,
  AttemptQuiz,
  CreateGuestQuiz,
  GuestQuizEntry,
  GuestAttemptQuiz,
} from './Components/exports';
import AdminSubmissions from './Components/Quiz/AdminSubmissions';

import Hero from './Components/LandingPage/Hero';
import Contact from './Components/LandingPage/Contact';
import Feedback from './Components/LandingPage/Feedback';

import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import { Box } from '@mui/material';

// ✅ Layout wrapper for applying Navbar and Footer globally except on Hero
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const hideLayoutOnPaths = ['/']; // Add any route you want to exclude layout from
  const shouldHideLayout = hideLayoutOnPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Box sx={{ minHeight: '100vh' }}>{children}</Box>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>

          {/* ✅ Landing Page - full page without Navbar/Footer */}
          <Route path="/" element={<Hero />} />

          {/* ✅ Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />

          {/* ✅ Protected Home */}
          <Route path="/home" element={<HomePage />} />

          {/* ✅ Admin Routes */}
          <Route
            path="/quiz"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route path="/quizdash" element={<QuizDash />} />
          <Route
            path="/admin/submissions"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminSubmissions />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-guest"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <CreateGuestQuiz />
              </PrivateRoute>
            }
          />

          {/* ✅ Guest & User Quiz Attempt Routes */}
          <Route path="/attempt/:code" element={<AttemptQuiz />} />
          <Route path="/guest-quiz-entry" element={<GuestQuizEntry />} />
          <Route path="/guest-attempt/:quizCode" element={<GuestAttemptQuiz />} />

          {/* ✅ Static Info Pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />

        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
