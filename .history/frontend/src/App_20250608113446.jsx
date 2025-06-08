import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import QuizAnalytics from './quiz/QuizAnalytics';    // <-- Add this import
import Leaderboard from './quiz/Leaderboard';        // <-- Add this import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route
          path="/quiz"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <QuizPage />
            </PrivateRoute>
          }
        />

        <Route path="/quizdash" element={<QuizDash />} />
        <Route path="/attempt/:code" element={<AttemptQuiz />} />

        {/* Admin routes */}
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

        {/* Guest quiz */}
        <Route path="/guest-quiz-entry" element={<GuestQuizEntry />} />
        <Route path="/guest-attempt/:quizCode" element={<GuestAttemptQuiz />} />

        {/* New routes for quiz analytics and leaderboard */}
        <Route
          path="/quiz/analytics/:quizCode"
          element={
            <PrivateRoute allowedRoles={['admin', 'user']}>
              <QuizAnalytics />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/leaderboard/:quizCode"
          element={
            <PrivateRoute allowedRoles={['admin', 'user']}>
              <Leaderboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
