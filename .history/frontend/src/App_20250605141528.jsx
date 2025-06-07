import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, HomePage, QuizPage, PrivateRoute, QuizDash } from './Components/exports';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* Protect /quiz to admins only */}
        <Route
          path="/quiz"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route path="/quizdash" element={<QuizDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
