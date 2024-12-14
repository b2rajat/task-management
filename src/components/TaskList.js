import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import './TaskList.css'; 

const TaskList = () => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask, updateTaskTitle } = useContext(TaskContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Track which task is being edited
  const [editedTitle, setEditedTitle] = useState('');
  const navigate = useNavigate(); 

  // Redirect to login page if no user is logged in
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/'); // Redirect to login page if no user is found
    }
  }, [navigate]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() === '') {
      setError('Task title cannot be empty!');
      return;
    }

    addTask(newTaskTitle);
    setNewTaskTitle('');
    setError('');
  };

  const handleToggleTaskCompletion = (index) => {
    toggleTaskCompletion(index);
  };

  const handleDeleteTask = (index) => {
    deleteTask(index);
  };

  const handleEditTask = (index, title) => {
    setEditingIndex(index); // Set the index of the task being edited
    setEditedTitle(title); // Set the current task title in the edit field
  };

  const handleUpdateTaskTitle = (e) => {
    e.preventDefault();
    if (editedTitle.trim() === '') {
      setError('Task title cannot be empty!');
      return;
    }

    updateTaskTitle(editingIndex, editedTitle); 
    setEditingIndex(null); 
    setEditedTitle(''); 
    setError('');
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>

      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task"
        />
        <button type="submit">Add Task</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? 'completed' : ''}
            >
              {editingIndex === index ? (
                <form onSubmit={handleUpdateTaskTitle}>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingIndex(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  {task.title}
                  <div>
                    <button onClick={() => handleToggleTaskCompletion(index)}>
                      {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                    </button>
                    <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    <button onClick={() => handleEditTask(index, task.title)}>Edit</button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
