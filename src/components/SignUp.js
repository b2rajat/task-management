import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { TaskContext } from '../context/TaskContext'; // Import TaskContext
import './SignUp.css';

const SignUp = () => {
  const { setUser, setTasks } = useContext(TaskContext); // Get setUser and setTasks from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if there are any users in localStorage on mount (No need to store this value)
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const userExists = storedUsers.some((user) => user.username === username);
    
    if (userExists) {
      setError('Username is already taken. Please choose a different username.');
    } else if (username.trim() === '' || password.trim() === '') {
      setError('Both fields are required.');
    } else {
      // Add new user to the existing users list
      const newUser = { username, password };
      storedUsers.push(newUser);

      // Save the updated users list to localStorage
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // Automatically log in the new user
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      // Set the user and tasks to context
      setUser(newUser);
      setTasks([]); // You can set an empty task list or fetch tasks if needed

      // Redirect to tasks page
      navigate('/tasks');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </form>

        {/* Link to login page */}
        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
