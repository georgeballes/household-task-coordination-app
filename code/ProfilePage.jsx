import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'

const ProfilePage = () => {
  const { currentUser, logout, members } = useTaskContext()
  const navigate = useNavigate()
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  
  const settingsOptions = [
    { icon: '👥', label: 'Household Members', screen: 'HouseholdMembers' },
    { icon: '🔄', label: 'Task Preferences', screen: 'TaskPreferences' },
    { icon: '🎨', label: 'Appearance', screen: 'Appearance' },
    { icon: '❓', label: 'Help & Support', screen: 'Support' }
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-primary rounded-lg pt-8 pb-16 px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-white mx-auto flex items-center justify-center mb-4">
          <span className="text-4xl font-bold text-primary">
            {currentUser.name.charAt(0)}
          </span>
        </div>
        <h1 className="text-xl font-bold text-white">{currentUser.name}</h1>
      </div>
      
      {/* Stats Section */}
      <div className="flex -mt-12 px-4 space-x-4">
        <div className="flex-1 bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-dark">{currentUser.stats.totalTasks}</p>
          <p className="text-sm text-medium">Tasks</p>
        </div>
        
        <div className="flex-1 bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-dark">{currentUser.stats.completedTasks}</p>
          <p className="text-sm text-medium">Completed</p>
        </div>
        
        <div className="flex-1 bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-dark">{currentUser.stats.pendingTasks}</p>
          <p className="text-sm text-medium">Pending</p>
        </div>
      </div>
      
      {/* Household Section */}
      <div>
        <h2 className="text-lg font-bold text-dark mb-4">Your Household</h2>
        <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
          <p className="font-bold text-dark">{currentUser.household}</p>
          <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
            Manage
          </button>
        </div>
      </div>
      
      {/* Settings Section */}
      <div>
        <h2 className="text-lg font-bold text-dark mb-4">Settings</h2>
        
        {/* Notification Toggle */}
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl mr-3">🔔</span>
              <span className="text-dark">Notifications</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        
        {/* Other Settings */}
        <div className="bg-white rounded-lg shadow">
          {settingsOptions.map((option, index) => (
            <div 
              key={index} 
              className={`p-4 flex items-center justify-between ${
                index < settingsOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{option.icon}</span>
                <span className="text-dark">{option.label}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
        </div>
      </div>
      
      {/* Logout Button */}
      <button 
        className="w-full border-2 border-danger text-danger py-3 rounded-full font-medium"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  )
}

export default ProfilePage
