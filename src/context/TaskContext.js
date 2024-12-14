import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    // Retrieve current user from localStorage
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      setUser(savedUser);
      // Fetch tasks if a user is logged in
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${savedUser.username}`)) || [];
      setTasks(savedTasks);  // Default to empty array if no tasks are found
    }
  }, []); 

  const addTask = (taskTitle) => {
    const newTask = { title: taskTitle, completed: false };
    const updatedTasks = [...tasks, newTask]; // Add new task to the list

    setTasks(updatedTasks); // Update state with new task
    if (user) {
      // Persist updated tasks to localStorage
      localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    }
  };

  const toggleTaskCompletion = (taskIndex) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, completed: !task.completed }; 
      }
      return task;
    });

    setTasks(updatedTasks); // Update state with new task list
    if (user) {
      // Persist updated tasks to localStorage
      localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = (taskIndex) => {
    const updatedTasks = tasks.filter((task, index) => index !== taskIndex); // Remove task by index

    setTasks(updatedTasks); // Update state with remaining tasks
    if (user) {
      // Persist updated tasks to localStorage
      localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    }
  };

  const updateTaskTitle = (taskIndex, newTitle) => {
    const updatedTasks = tasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...task, title: newTitle }; // Update the task title
      }
      return task;
    });

    setTasks(updatedTasks); // Update state with new task list
    if (user) {
      // Persist updated tasks to localStorage
      localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setTasks([]); // Clear tasks on logout
  };

  return (
    <TaskContext.Provider value={{ user, tasks, addTask, toggleTaskCompletion, deleteTask, updateTaskTitle, setTasks, setUser, logout }}>
      {children}
    </TaskContext.Provider>
  );
};
