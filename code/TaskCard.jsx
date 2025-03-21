import React from 'react';

const TaskCard = ({ task, onToggleComplete, onTaskClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow flex overflow-hidden ${
        task.completed ? 'bg-gray-50' : ''
      }`}
    >
      <div 
        className="w-2" 
        style={{ backgroundColor: task.color }}
      ></div>
      <div className="flex-1 p-4" onClick={() => onTaskClick(task.id)}>
        <h3 className={`font-bold ${
          task.completed 
            ? 'text-medium line-through' 
            : 'text-dark'
        }`}>
          {task.title}
        </h3>
        <p className="text-medium text-sm">
          {task.assignedTo} • {task.time}
        </p>
      </div>
      <div className="flex items-center pr-4">
        <button 
          onClick={() => onToggleComplete(task.id)}
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
  );
};

export default TaskCard;
