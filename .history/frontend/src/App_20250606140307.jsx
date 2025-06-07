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
import AdminSubmissions from './Components/Quiz/AdminSubmissions'; // ✅ new import

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
        
        {/* ✅ New route for test viewer */}
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
        <Route path="/guest-quiz-entry" element={<GuestQuizEntry />} />
        <Route path="/guest-attempt/:quizcode" element={<GuestAttemptQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
