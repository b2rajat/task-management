import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext'; 
import './Header.css'; 

const Header = () => {
  const { user, logout } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <header className="header">
      <h1>Task Management App</h1>
      {user ? (
        <div className="user-info">
          <p className="welcome-text">Welcome, {user.username}</p>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <div className="login-message">
          <p>Please log in to manage tasks</p>
        </div>
      )}
    </header>
  );
};

export default Header;
