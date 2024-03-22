import React from 'react';
import './Home.css';

const Home = () => {
    const handleLogout = () => {
        if (window.confirm('Apakah kamu ingin logout?')) {
          localStorage.removeItem('userToken');
          window.location.href = '/';
        }
      };
    const handleList = () => {
          window.location.href = '/passwords';
      };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="profile-info">
          <img src="profile-icon.png" alt="Profile" className="profile-icon" />
          <span className="username">Username</span>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <main className="home-main">
      <div className="welcome-section">
            <img src="https://example.com/icon.png" alt="Icon" className="welcome-icon" />
            <h2>Selamat datang di Password Manager</h2>
        </div>
        {/* Konten utama di sini */}
      </main>
      <footer className="home-footer">
        <button onClick={handleList} className="footer-button">List Passwords</button>
        <button className="footer-button">Add Password</button>
      </footer>
    </div>
  );
};

export default Home;
