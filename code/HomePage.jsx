import React from 'react'
import { Link } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'

const HomePage = () => {
  const { 
    tasks, 
    members, 
    currentUser, 
    toggleTaskCompletion 
  } = useTaskContext()
  
  // Filter today's tasks
  const todaysTasks = tasks.filter(task => task.day === 'Today' && !task.completed)
  
  // Get upcoming days for calendar preview
  const upcomingDays = [
    { day: 'M', date: 20, hasTask: true, isToday: true },
    { day: 'T', date: 21, hasTask: false, isToday: false },
    { day: 'W', date: 22, hasTask: true, isToday: false },
    { day: 'T', date: 23, hasTask: false, isToday: false },
    { day: 'F', date: 24, hasTask: true, isToday: false },
    { day: 'S', date: 25, hasTask: false, isToday: false },
    { day: 'S', date: 26, hasTask: false, isToday: false },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-dark mb-1">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-medium">
          You have {todaysTasks.length} tasks today
        </p>
      </div>

      {/* Today's Tasks Section */}
      <div>
        <h2 className="text-lg font-bold text-dark mb-4">Today's Tasks</h2>
        
        {todaysTasks.length > 0 ? (
          <div className="space-y-3">
            {todaysTasks.map(task => (
              <div 
                key={task.id} 
                className="bg-white rounded-lg shadow flex overflow-hidden"
              >
                <div 
                  className="w-2" 
                  style={{ backgroundColor: task.color }}
                ></div>
                <div className="flex-1 p-4">
                  <Link to={`/tasks/${task.id}`} className="block">
                    <h3 className="font-bold text-dark">{task.title}</h3>
                    <p className="text-medium text-sm">
                      {task.assignedTo} • {task.time}
                    </p>
                  </Link>
                </div>
                <div className="flex items-center pr-4">
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
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-medium mb-4">No tasks for today</p>
            <Link 
              to="/add-task"
              className="inline-block bg-primary text-white px-4 py-2 rounded-full font-medium"
            >
              Add Task
            </Link>
          </div>
        )}
      </div>

      {/* Household Members Section */}
      <div>
        <h2 className="text-lg font-bold text-dark mb-4">Household Members</h2>
        <div className="flex flex-wrap gap-4">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mb-2">
                {member.avatar}
              </div>
              <span className="text-dark text-sm">
                {member.name.includes('You') ? 'You' : member.name}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 rounded-full border-2 border-primary border-dashed flex items-center justify-center text-primary mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <span className="text-dark text-sm">Add</span>
          </div>
        </div>
      </div>

      {/* Upcoming Section */}
      <div>
        <h2 className="text-lg font-bold text-dark mb-4">Upcoming</h2>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            {upcomingDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-medium text-sm mb-2">{day.day}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  day.isToday ? 'bg-primary text-white' : 'text-dark'
                }`}>
                  {day.date}
                </div>
                {day.hasTask && (
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Add Button */}
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

export default HomePage
