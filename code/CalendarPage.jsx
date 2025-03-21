import React, { useState, useEffect } from 'react'
import { useTaskContext } from '../context/TaskContext'

const CalendarPage = () => {
  const { tasks, getTasksByDate } = useTaskContext()
  const [selectedDate, setSelectedDate] = useState('2025-03-20')
  const [markedDates, setMarkedDates] = useState({})
  const [scheduledTasks, setScheduledTasks] = useState([])
  
  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date('2025-03-20')
    const year = today.getFullYear()
    const month = today.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty slots for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, isCurrentMonth: false })
    }
    
    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const dateString = date.toISOString().split('T')[0]
      
      days.push({
        date: i,
        dateString,
        isCurrentMonth: true,
        isToday: i === today.getDate(),
        isSelected: dateString === selectedDate,
        hasTask: tasks.some(task => {
          // In a real app, we would convert task.day to a date string
          // For the prototype, we'll use hardcoded logic
          if (task.day === 'Today' && i === today.getDate()) return true
          if (task.day === 'Tomorrow' && i === today.getDate() + 1) return true
          if (task.day === 'Yesterday' && i === today.getDate() - 1) return true
          return false
        })
      })
    }
    
    return days
  }
  
  const calendarDays = generateCalendarDays()
  
  useEffect(() => {
    // Get tasks for selected date
    setScheduledTasks(getTasksByDate(selectedDate))
  }, [selectedDate, getTasksByDate])

  const handleDayClick = (dateString) => {
    if (dateString) {
      setSelectedDate(dateString)
    }
  }

  // Format date for display (e.g., "March 20")
  const formatDisplayDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark">Calendar</h1>
      
      {/* Calendar */}
      <div className="bg-white rounded-lg shadow p-4">
        {/* Month header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">March 2025</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center text-sm text-medium py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className={`aspect-square flex flex-col items-center justify-center relative ${
                !day.isCurrentMonth ? 'text-gray-300' :
                day.isSelected ? 'bg-primary text-white rounded-full' :
                day.isToday ? 'text-primary font-bold' : 'text-dark'
              }`}
              onClick={() => day.isCurrentMonth && handleDayClick(day.dateString)}
            >
              {day.date}
              {day.hasTask && (
                <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                  day.isSelected ? 'bg-white' : 'bg-secondary'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Schedule for selected date */}
      <div>
        <h2 className="text-lg font-bold text-dark mb-4">
          {formatDisplayDate(selectedDate)} Schedule
        </h2>
        
        {scheduledTasks.length > 0 ? (
          <div className="space-y-4">
            {scheduledTasks.map(task => (
              <div key={task.id} className="flex">
                <div className="w-16 pt-4 text-medium text-sm">
                  {task.time}
                </div>
                
                <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex">
                  <div 
                    className="w-2" 
                    style={{ backgroundColor: task.color }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-bold text-dark">{task.title}</h3>
                    <p className="text-medium text-sm">{task.assignedTo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-medium mb-4">No tasks scheduled for this day</p>
            <a 
              href="/add-task"
              className="inline-block bg-primary text-white px-4 py-2 rounded-full font-medium"
            >
              Add Task
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalendarPage
