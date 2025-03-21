import React, { createContext, useState, useContext } from 'react';

// Create the context
const TaskContext = createContext();

// Initial mock data
const initialTasks = [
  { id: 1, title: 'Prepare Dinner', assignedTo: 'You', day: 'Today', time: '6:00 PM', completed: false, color: '#4A80F0', notes: 'Remember to check if we need to buy more pasta.' },
  { id: 2, title: 'Laundry', assignedTo: 'You', day: 'Today', time: '8:00 PM', completed: false, color: '#F5A623', notes: 'Don\'t forget to separate colors.' },
  { id: 3, title: 'Clean Kitchen', assignedTo: 'Sam', day: 'Tomorrow', time: '10:00 AM', completed: false, color: '#4A80F0', notes: 'Focus on countertops and sink.' },
  { id: 4, title: 'Grocery Shopping', assignedTo: 'Taylor', day: 'Wed', time: '5:00 PM', completed: false, color: '#F5A623', notes: 'Check the shared shopping list.' },
  { id: 5, title: 'Take Out Trash', assignedTo: 'You', day: 'Yesterday', time: '8:00 PM', completed: true, color: '#4A80F0', notes: 'Recycling day is Thursday.' },
];

const initialMembers = [
  { id: 1, name: 'You (Alex)', avatar: 'A' },
  { id: 2, name: 'Sam', avatar: 'S' },
  { id: 3, name: 'Taylor', avatar: 'T' },
];

// Provider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [members, setMembers] = useState(initialMembers);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    household: 'Johnson Residence',
    stats: {
      totalTasks: 24,
      completedTasks: 18,
      pendingTasks: 6
    }
  });

  // Login function
  const login = (email, password) => {
    // In a real app, we would validate credentials
    // For the prototype, we'll just set isLoggedIn to true
    setIsLoggedIn(true);
    return true;
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
  };

  // Add a new task
  const addTask = (task) => {
    const newTask = {
      id: tasks.length + 1,
      ...task,
      completed: false,
      color: Math.random() > 0.5 ? '#4A80F0' : '#F5A623', // Random color for demo
    };
    setTasks([...tasks, newTask]);
    return newTask.id;
  };

  // Update a task
  const updateTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Reassign a task
  const reassignTask = (taskId, newAssignee) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId ? { ...task, assignedTo: newAssignee } : task
      )
    );
  };

  // Add a new household member
  const addMember = (name) => {
    const newMember = {
      id: members.length + 1,
      name,
      avatar: name.charAt(0),
    };
    setMembers([...members, newMember]);
    return newMember.id;
  };

  // Get tasks for a specific date
  const getTasksByDate = (dateString) => {
    // In a real app, we would filter by actual date
    // For the prototype, we'll just return all tasks
    return tasks;
  };

  // Get tasks for the current user
  const getCurrentUserTasks = () => {
    return tasks.filter(task => task.assignedTo === 'You');
  };

  // Get shared tasks (assigned to others)
  const getSharedTasks = () => {
    return tasks.filter(task => task.assignedTo !== 'You');
  };

  // Get task by ID
  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        members,
        isLoggedIn,
        currentUser,
        login,
        logout,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        reassignTask,
        addMember,
        getTasksByDate,
        getCurrentUserTasks,
        getSharedTasks,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
