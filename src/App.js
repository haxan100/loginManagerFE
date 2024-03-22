import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Home from './Home'; // Pastikan Anda sudah membuat komponen ini
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Tambahkan rute lain sesuai kebutuhan */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
