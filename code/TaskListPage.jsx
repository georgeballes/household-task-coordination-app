import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'

const TaskListPage = () => {
  const { 
    tasks, 
    getCurrentUserTasks, 
    getSharedTasks,
    toggleTaskCompletion 
  } = useTaskContext()
  
  const [activeTab, setActiveTab] = useState('All')
  const [filteredTasks, setFilteredTasks] = useState([])

  useEffect(() => {
    // Update filtered tasks when tab changes
    if (activeTab === 'All') {
      setFilteredTasks(tasks);
    } else if (activeTab === 'Mine') {
      setFilteredTasks(getCurrentUserTasks());
    } else if (activeTab === 'Shared') {
      setFilteredTasks(getSharedTasks());
    }
  }, [activeTab, tasks, getCurrentUserTasks, getSharedTasks]);

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white rounded-t-lg shadow flex">
        {['All', 'Mine', 'Shared'].map(tab => (
          <button
            key={tab}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === tab 
                ? 'bg-primary text-white' 
                : 'text-dark hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`bg-white rounded-lg shadow flex p-4 ${
                task.completed ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex-1">
                <Link to={`/tasks/${task.id}`} className="block">
                  <h3 className={`font-bold ${
                    task.completed 
                      ? 'text-medium line-through' 
                      : 'text-dark'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-medium text-sm">
                    {task.assignedTo} • {task.day} {task.time}
                  </p>
                </Link>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center ${
                    task.completed ? 'bg-green-500 border-green-500' : ''
                  }`}
                >
                  {task.completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-medium">No tasks found</p>
          </div>
        )}
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-6 right-6">
        <Link 
          to="/add-task"
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default TaskListPage
