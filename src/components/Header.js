import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext'; // Import the context
import './Header.css';  // Import the new CSS file

const Header = () => {
  const { user, logout } = useContext(TaskContext); // Destructure user and logout from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout to clear user session
    navigate('/'); // Redirect to login page after logout
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
