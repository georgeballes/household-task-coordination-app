import React from 'react';
import { Link } from 'react-router-dom';

const AddTaskButton = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <Link 
        to="/add-task"
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors"
        aria-label="Add new task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
};

export default AddTaskButton;
