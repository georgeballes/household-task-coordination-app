import React, { useEffect } from 'react'
import { createContext, useState, useContext } from 'react'

// Create the Task Context
const TaskContext = createContext()

// Custom hook to use the Task Context
export const useTaskContext = () => useContext(TaskContext)

// Task Provider Component
export const TaskProvider = ({ children }) => {
  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      household: 'Johnson Residence',
      avatar: 'A',
      stats: {
        totalTasks: 12,
        completedTasks: 8,
        pendingTasks: 4
      }
    }
  })

  // Household members state
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem('members')
    return savedMembers ? JSON.parse(savedMembers) : [
      { id: 1, name: 'You (Alex)', avatar: 'A' },
      { id: 2, name: 'Sam', avatar: 'S' },
      { id: 3, name: 'Taylor', avatar: 'T' }
    ]
  })

  // Tasks state
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : [
      {
        id: 1,
        title: 'Prepare Dinner',
        assignedTo: 'You',
        day: 'Today',
        time: '6:00 PM',
        repeats: 'Weekdays',
        location: 'Kitchen',
        notes: 'Make pasta with garlic bread. Recipe is in the cookbook.',
        completed: false,
        color: '#4A80F0'
      },
      {
        id: 2,
        title: 'Laundry',
        assignedTo: 'You',
        day: 'Today',
        time: '3:00 PM',
        repeats: 'Weekly',
        location: 'Laundry Room',
        notes: 'Don\'t forget to separate colors and whites.',
        completed: false,
        color: '#F5A623'
      },
      {
        id: 3,
        title: 'Clean Kitchen',
        assignedTo: 'Sam',
        day: 'Tomorrow',
        time: '10:00 AM',
        repeats: 'Weekly',
        location: 'Kitchen',
        notes: 'Deep clean the oven and microwave.',
        completed: false,
        color: '#4CAF50'
      },
      {
        id: 4,
        title: 'Grocery Shopping',
        assignedTo: 'Taylor',
        day: 'Wed',
        time: '5:00 PM',
        repeats: 'Weekly',
        location: 'Supermarket',
        notes: 'Get items from the shared shopping list.',
        completed: false,
        color: '#F44336'
      }
    ]
  })

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    localStorage.setItem('members', JSON.stringify(members))
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [currentUser, members, tasks])

  // Authentication functions
  const login = (email, password) => {
    // In a real app, we would validate credentials against a backend
    // For the prototype, we'll just check if email is not empty
    if (!email) return false
    
    // Update current user (in a real app, this would come from the backend)
    setCurrentUser({
      id: 1,
      name: 'Alex Johnson',
      email: email,
      household: 'Johnson Residence',
      avatar: 'A',
      stats: {
        totalTasks: 12,
        completedTasks: 8,
        pendingTasks: 4
      }
    })
    
    return true
  }

  const logout = () => {
    // In a real app, we would clear auth tokens, etc.
    // For the prototype, we'll just reset the current user
    setCurrentUser(null)
  }

  // Task management functions
  const addTask = (task) => {
    const newTask = {
      id: tasks.length + 1,
      ...task,
      completed: false,
      color: getRandomColor()
    }
    
    setTasks([...tasks, newTask])
    return newTask.id
  }

  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
    
    // Update user stats
    const task = tasks.find(t => t.id === parseInt(taskId))
    if (task && task.assignedTo === 'You') {
      const newStats = { ...currentUser.stats }
      if (!task.completed) {
        newStats.completedTasks += 1
        newStats.pendingTasks -= 1
      } else {
        newStats.completedTasks -= 1
        newStats.pendingTasks += 1
      }
      setCurrentUser({ ...currentUser, stats: newStats })
    }
  }

  const reassignTask = (taskId, newAssignee) => {
    setTasks(tasks.map(task => 
      task.id === parseInt(taskId) ? { ...task, assignedTo: newAssignee } : task
    ))
  }

  // Member management functions
  const addMember = (name) => {
    const avatar = name.charAt(0)
    const newMember = {
      id: members.length + 1,
      name,
      avatar
    }
    
    setMembers([...members, newMember])
    return newMember.id
  }

  // Helper functions
  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === parseInt(taskId))
  }

  const getCurrentUserTasks = () => {
    return tasks.filter(task => task.assignedTo === 'You')
  }

  const getSharedTasks = () => {
    return tasks.filter(task => task.assignedTo !== 'You')
  }

  const getTasksByDate = (dateString) => {
    // In a real app, we would convert the date string to a proper format
    // For the prototype, we'll just return tasks for today
    return tasks.filter(task => task.day === 'Today')
  }

  const getRandomColor = () => {
    const colors = ['#4A80F0', '#F5A623', '#4CAF50', '#F44336']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Context value
  const contextValue = {
    currentUser,
    members,
    tasks,
    login,
    logout,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    reassignTask,
    addMember,
    getTaskById,
    getCurrentUserTasks,
    getSharedTasks,
    getTasksByDate
  }

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  )
}
