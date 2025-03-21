import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'

const Navbar = () => {
  const location = useLocation()
  const { currentUser } = useTaskContext()
  
  // Don't show navbar on login page
  if (location.pathname === '/login') {
    return null
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">HT</span>
              </div>
              <span className="ml-2 text-xl font-bold text-dark">HomeTask</span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/calendar">Calendar</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </div>
          
          {/* User Menu */}
          <div className="flex items-center">
            <Link to="/profile" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">
                  {currentUser?.name.charAt(0) || 'A'}
                </span>
              </div>
              <span className="ml-2 text-dark hidden md:block">
                {currentUser?.name.split(' ')[0] || 'User'}
              </span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-between py-2">
            <MobileNavLink to="/" icon="home">Home</MobileNavLink>
            <MobileNavLink to="/tasks" icon="list">Tasks</MobileNavLink>
            <MobileNavLink to="/calendar" icon="calendar">Calendar</MobileNavLink>
            <MobileNavLink to="/profile" icon="user">Profile</MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Helper component for navigation links
const NavLink = ({ to, children, exact }) => {
  const location = useLocation()
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to)
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'text-primary'
          : 'text-gray-600 hover:text-primary'
      }`}
    >
      {children}
    </Link>
  )
}

// Helper component for mobile navigation links
const MobileNavLink = ({ to, icon, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link
      to={to}
      className={`flex flex-col items-center px-3 py-2 ${
        isActive ? 'text-primary' : 'text-gray-600'
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        {icon === 'home' && (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        )}
        {icon === 'list' && (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
          />
        )}
        {icon === 'calendar' && (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        )}
        {icon === 'user' && (
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        )}
      </svg>
      <span className="text-xs mt-1">{children}</span>
    </Link>
  )
}

export default Navbar
