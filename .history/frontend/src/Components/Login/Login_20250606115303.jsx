import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'admin' : 'user') : value,
    }));
  };

  const handleSubmit = async () => {
    const url = isRegister ? 'http://localhost:5001/api/register' : 'http://localhost:5001/api/login';

    try {
      const res = await axios.post(url, formData);
      if (!isRegister) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        navigate('/home');
      } else {
        alert('Registered successfully! Please log in.');
        setIsRegister(false);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient bg-primary bg-opacity-75">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '1rem' }}>
        <div className="text-center mb-4">
          <div className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center"
               style={{ width: '60px', height: '60px' }}>
            <i className="bi bi-question-circle fs-3"></i>
          </div>
          <h3 className="mt-3">{isRegister ? 'Create an Account' : 'Welcome to Quizz!'}</h3>
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        {isRegister && (
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="adminCheck"
              name="role"
              checked={formData.role === 'admin'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="adminCheck">
              Register as Admin
            </label>
          </div>
        )}
        <button className="btn btn-primary w-100 mb-3" onClick={handleSubmit}>
          {isRegister ? 'Register' : 'Log In'}
        </button>
        <div className="text-center">
          {isRegister ? (
            <small>
              Already have an account?{' '}
              <button className="btn btn-link p-0" onClick={() => setIsRegister(false)}>
                Log in
              </button>
            </small>
          ) : (
            <small>
              Don’t have an account?{' '}
              <button className="btn btn-link p-0" onClick={() => setIsRegister(true)}>
                Register
              </button>
            </small>
          )}
        </div>
      </div>
      <div className="text-center mt-3">
  <button
    className="btn btn-outline-light"
    onClick={() => navigate('/enter-quiz')}
  >
    Have a Code? Enter Quiz
  </button>
</div>

    </div>
  );
}

export default LoginPage;
