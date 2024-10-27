"use client"
import { useState, useEffect } from 'react';

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]); // Array of strings
  const [task, setTask] = useState<string>(''); // Single string

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const deleteTask = (index: number) => { // Type index as number
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">To-Do List</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border p-2 rounded flex-grow"
          placeholder="Enter a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
          >
            {task}
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
