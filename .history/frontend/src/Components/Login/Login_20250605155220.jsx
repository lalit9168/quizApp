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
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
      }}
    >
      <div className="card p-4 shadow-lg rounded" style={{ width: '22rem', backgroundColor: '#ffffffee' }}>
        <div className="text-center mb-4">
          <div className="rounded-circle bg-primary text-white p-3 d-inline-block">
            <i className="bi bi-person-fill" style={{ fontSize: '1.5rem' }}></i>
          </div>
          <h4 className="mt-3">{isRegister ? 'Create Account' : 'Login to Quizz'}</h4>
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {isRegister && (
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={formData.role === 'admin'}
              name="role"
              onChange={handleChange}
              id="adminCheck"
            />
            <label className="form-check-label" htmlFor="adminCheck">
              Register as Admin
            </label>
          </div>
        )}

        <button className="btn btn-primary w-100 mb-3" onClick={handleSubmit}>
          {isRegister ? 'Register' : 'Login'}
        </button>

        <div className="text-center">
          <small>
            {isRegister ? (
              <>
                Already registered?{' '}
                <button className="btn btn-link p-0" onClick={() => setIsRegister(false)}>
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button className="btn btn-link p-0" onClick={() => setIsRegister(true)}>
                  Register
                </button>
              </>
            )}
          </small>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
