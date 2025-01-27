import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import './App.css'; 

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 className="todo-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>To-Do List</h1>
      <div className="todo-input-group" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter your to-do item"
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={addTask} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Add
        </button>
      </div>
      <div className="todo-list-card" style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        {tasks.length > 0 ? (
          <ul className="todo-list" style={{ listStyleType: 'none', padding: '0' }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`todo-item ${task.completed ? 'completed' : ''}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #e5e7eb' }}
              >
                <label className="todo-label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span className="todo-text" style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#9ca3af' : '#374151' }}>
                    {task.text}
                  </span>
                </label>
                <button
                  onClick={() => removeTask(task.id)}
                  style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="todo-empty" style={{ textAlign: 'center', color: '#9ca3af' }}>No tasks added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;