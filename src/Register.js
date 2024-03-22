import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Pastikan Anda membuat file CSS ini

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk navigasi kembali ke halaman login
  const handleGoToLogin = () => {
    navigate('/');
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    // Membuat objek data untuk dikirim ke API
    const userData = {
      username,
      password,
      confirmPassword
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Registrasi berhasil
        alert('Registration successful!');

        console.log('Registration successful:', data);
        navigate('/'); // Arahkan ke halaman login setelah registrasi berhasil
      } else {
        // Tampilkan pesan error dari API
        console.error('Registration failed:', data.message);
        alert('Error: ' + data.message);

      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error: ' + error);

    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Get started with your free account</p>
        </div>
        <form onSubmit={handleRegister} className="register-form">
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
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">Create Account</button>
          <button onClick={handleGoToLogin} className="login-button">Back to Login</button> {/* Tombol Login */}

        </form>
      </div>
    </div>
  );
};

export default Register;
