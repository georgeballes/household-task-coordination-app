import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'

const AddTaskPage = () => {
  const { members, addTask } = useTaskContext()
  const navigate = useNavigate()
  
  const [taskName, setTaskName] = useState('')
  const [assignedTo, setAssignedTo] = useState('You (Alex)')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [repeat, setRepeat] = useState('Never')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  
  const [showAssignOptions, setShowAssignOptions] = useState(false)
  const [showRepeatOptions, setShowRepeatOptions] = useState(false)
  
  const repeatOptions = [
    'Never', 
    'Daily', 
    'Weekdays', 
    'Weekends', 
    'Weekly', 
    'Monthly'
  ]

  const handleSave = (e) => {
    e.preventDefault()
    
    if (!taskName) {
      alert('Please enter a task name')
      return
    }
    
    // Format the assigned name (remove "You (" and ")" if present)
    const formattedAssignee = assignedTo.includes('You (') ? 'You' : assignedTo
    
    // Create new task object
    const newTask = {
      title: taskName,
      assignedTo: formattedAssignee,
      day: date || 'Today',
      time: time || '12:00 PM',
      repeats: repeat,
      location: location,
      notes: notes,
    }
    
    // Add task to context
    const taskId = addTask(newTask)
    
    alert('Task added successfully!')
    
    // Navigate back to task list
    navigate('/tasks')
  }
  
  const selectMember = (memberName) => {
    setAssignedTo(memberName)
    setShowAssignOptions(false)
  }
  
  const selectRepeatOption = (option) => {
    setRepeat(option)
    setShowRepeatOptions(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dark">Add New Task</h1>
      
      <form onSubmit={handleSave} className="space-y-6">
        {/* Task Name */}
        <div>
          <label htmlFor="taskName" className="block text-sm font-medium text-dark mb-1">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            className="input"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        
        {/* Assigned To */}
        <div>
          <label htmlFor="assignedTo" className="block text-sm font-medium text-dark mb-1">
            Assigned To
          </label>
          <div className="relative">
            <button
              type="button"
              className="input text-left flex justify-between items-center"
              onClick={() => setShowAssignOptions(!showAssignOptions)}
            >
              <span>{assignedTo}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showAssignOptions && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                <div className="py-1">
                  {members.map(member => (
                    <button
                      key={member.id}
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => selectMember(member.name)}
                    >
                      <span>{member.name}</span>
                      {assignedTo === member.name && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-dark mb-1">
            Date
          </label>
          <div className="relative">
            <input
              type="text"
              id="date"
              className="input pr-10"
              placeholder="Select date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-dark mb-1">
            Time
          </label>
          <div className="relative">
            <input
              type="text"
              id="time"
              className="input pr-10"
              placeholder="Select time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Repeat */}
        <div>
          <label htmlFor="repeat" className="block text-sm font-medium text-dark mb-1">
            Repeat
          </label>
          <div className="relative">
            <button
              type="button"
              className="input text-left flex justify-between items-center"
              onClick={() => setShowRepeatOptions(!showRepeatOptions)}
            >
              <span>{repeat}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showRepeatOptions && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                <div className="py-1">
                  {repeatOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex justify-between items-center"
                      onClick={() => selectRepeatOption(option)}
                    >
                      <span>{option}</span>
                      {repeat === option && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-dark mb-1">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              className="input pr-10"
              placeholder="Select location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-dark mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            className="input"
            placeholder="Add notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        
        {/* Save Button */}
        <button 
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-full font-medium"
        >
          Save Task
        </button>
      </form>
    </div>
  )
}

export default AddTaskPage
