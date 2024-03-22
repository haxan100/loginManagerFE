import React, { useState, useEffect } from 'react';
import './Login.css'; // Pastikan Anda membuat file CSS dengan nama ini
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleGoToRegister = () => {
    navigate('/register');
  };
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/home');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login successful!');
        localStorage.setItem('userToken', data.token); // simpan token di local storage
        navigate('/home');
      } else {
        // Handle errors seperti user tidak ditemukan atau password salah
        console.error('Login failed');
        alert('Login failed: ' + response.message);

      }
    } catch (error) {
      alert('Login failed: ' + error);

      console.error('There was an error logging in', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          <p>Log in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <button onClick={handleGoToRegister} className="register-button">Go to Register</button>

      </div>

    </div>
  );
};

export default Login;
