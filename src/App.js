import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext'; // Import context provider
import LoginForm from './components/LoginForm';
import TaskList from './components/TaskList';
import SignUp from './components/SignUp';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
