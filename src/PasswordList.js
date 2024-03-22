import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordList.css';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingPasswordId, setEditingPasswordId] = useState(null);
  const [newPasswordData, setNewPasswordData] = useState({
    site: '',
    username: '',
    password: '',
    passwordConfirm: '',
    description: ''
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:3000/api/passwords', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPasswords(data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah anda akan menghapus ini?')) {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`http://localhost:3000/api/passwords/delete`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ passwordId: id })
        });

        if (response.ok) {
          alert('Password deleted successfully');
          setPasswords(passwords.filter(password => password.id !== id));
        } else {
          alert('Failed to delete password');
        }
      } catch (error) {
        console.error('Error deleting password:', error);
      }
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    const url = editMode ? 'http://localhost:3000/api/passwords/edit' : 'http://localhost:3000/api/passwords/add';
    const method = editMode ? 'PUT' : 'POST';

    const data = editMode ? {
      passwordId: editingPasswordId,
      newSite: newPasswordData.site,
      newUsername: newPasswordData.username,
      newPassword: newPasswordData.password,
      newDescription: newPasswordData.description
    } : {
      site: newPasswordData.site,
      username: newPasswordData.username,
      password: newPasswordData.password,
      passwordConfirm: newPasswordData.password,
      usernameConfirm: newPasswordData.username,
      description: newPasswordData.description
    };

    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (editMode) {
          // Setelah sukses edit, ambil ulang data password
          fetchData();
        } else {
          const addedPassword = await response.json();
          setPasswords([...passwords, addedPassword]);
        }
        setShowAddForm(false);
        setNewPasswordData({ site: '', username: '', password: '', passwordConfirm: '', description: '' });
        setEditMode(false);
        setEditingPasswordId(null);
      } else {
        alert('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPasswordData({ ...newPasswordData, [name]: value });
  };

  const handleEdit = (password) => {
    setNewPasswordData({
      site: password.site,
      username: password.username,
      password: password.password,
      passwordConfirm: password.password, // Anda mungkin perlu menyesuaikan ini
      description: password.description
    });
    setEditingPasswordId(password.id);
    setEditMode(true);
    setShowAddForm(true);
  };

  const handleAddPassword = () => {
    setShowAddForm(true);
  };
  const handleShowDetail = async (passwordId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:3000/api/passwords/detail`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passwordId }),
      });
  
      if (response.ok) {
        const passwordDetail = await response.json();
        setSelectedPassword(passwordDetail);
        setShowDetailModal(true);
      } else {
        alert('Failed to fetch password details');
      }
    } catch (error) {
      console.error('Error fetching password details:', error);
    }
  };
  const handleLogout = () => {
    if (window.confirm('Apakah kamu ingin logout?')) {
      localStorage.removeItem('userToken');
      window.location.href = '/';
    }
  };

  return (
    <div className="password-list-container">
      <header className="password-list-header">
        <div className="profile-info">
          <img src="profile-icon.png" alt="Profile"  className="profile-icon" />
          <span className="username">Username</span>
        </div>
        <button onClick={() => handleLogout()} className="logout-button">Logout</button>
      </header>
      <main className="password-list-main">
        <h2>Daftar Password</h2>
        <ul className="password-list">
            {passwords.map((password) => (
                <li key={password.id} className="password-item">
                <div className="password-info">
                    <p className="password-site">{password.site}</p>
                    <p className="password-username">{password.username}</p>
                </div>
                <div className="password-actions">
                    <button onClick={() => handleShowDetail(password.id)} className="btn btn-detail">
                    <i className="fas fa-eye"></i>
                    </button>
                    <button onClick={() => handleEdit(password)} className="btn btn-edit">
                    <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(password.id)} className="btn btn-delete">
                    <i className="fas fa-trash"></i>
                    </button>
                </div>
                </li>
            ))}
            </ul>
        {showAddForm && (
          <div className="add-password-form">
            <form onSubmit={handleSubmitPassword}>
              <input type="text" name="site" placeholder="Site" value={newPasswordData.site} onChange={handleInputChange} />
              <input type="text" name="username" placeholder="Username" value={newPasswordData.username} onChange={handleInputChange} />
              <input type="password" name="password" placeholder="Password" value={newPasswordData.password} onChange={handleInputChange} />
              <input type="password" name="passwordConfirm" placeholder="Confirm Password" value={newPasswordData.passwordConfirm} onChange={handleInputChange} />
              <input type="text" name="description" placeholder="Description" value={newPasswordData.description} onChange={handleInputChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {showDetailModal && (
            <div className="modal">
                <div className="modal-content">
                <span className="close" onClick={() => setShowDetailModal(false)}>&times;</span>
                <h3>Detail Password</h3>
                {selectedPassword && (
                    <div>
                    <p>Site: {selectedPassword.site}</p>
                    <p>Username: {selectedPassword.username}</p>
                    <p>Password: {selectedPassword.password}</p>
                    <p>Description: {selectedPassword.description}</p>
                    </div>
                )}
                </div>
            </div>
            )}

      </main>
      <footer className="password-list-footer">
        <button className="footer-button" onClick={() => navigate('/')}>Home</button>
        <button className="footer-button" onClick={handleAddPassword}>Tambah Password</button>
      </footer>
      {showAddForm && (
        <div className="overlay" onClick={() => setShowAddForm(false)}></div>
      )}
    </div>
  );
};

export default PasswordList;
