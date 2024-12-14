import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const { setUser, setTasks } = useContext(TaskContext); 
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      // If there's a logged-in user, redirect to tasks page
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${savedUser.username}`)) || [];
      setTasks(savedTasks); // Fetch the tasks immediately
      navigate('/tasks');
    }
  }, [navigate, setTasks]); 

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    // Fetch users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the user exists and the password matches
    const user = storedUsers.find((user) => user.username === username && user.password === password);

    if (!user) {
      setError('Invalid username or password.');
    } else {
      // Save user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Fetch tasks from localStorage after login
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${user.username}`)) || [];
      setTasks(savedTasks); // Set the tasks in context immediately

      // Set the user in context
      setUser(user);

      // Redirect to task page after login
      navigate('/tasks');
    }
  };

  const handleSignupRedirect = () => {
    // Redirect to the signup page
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}

        <div onClick={handleSignupRedirect} className="signup-button">
          Don't have an account? Sign Up
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
