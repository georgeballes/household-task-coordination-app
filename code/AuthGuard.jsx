import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const AuthGuard = ({ children }) => {
  const { currentUser } = useTaskContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in and not on login page, redirect to login
    if (!currentUser && location.pathname !== '/login') {
      navigate('/login');
    }
    
    // If user is logged in and on login page, redirect to home
    if (currentUser && location.pathname === '/login') {
      navigate('/');
    }
  }, [currentUser, location.pathname, navigate]);

  return children;
};

export default AuthGuard;
