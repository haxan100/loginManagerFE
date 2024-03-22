import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import reportWebVitals from './reportWebVitals';
import Register from './Register'; // Import komponen Register
import Home from './Home'; // Import komponen Register
import {  Routes, Route } from 'react-router-dom';
import PasswordList from './PasswordList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Bungkus Login dengan BrowserRouter */}
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/passwords" element={<PasswordList />} />

    <Route path="/register" element={<Register />} /> {/* Tambahkan rute ini */}
  </Routes> 

    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
