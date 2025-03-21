import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TaskProvider } from '../src/context/TaskContext';
import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import TaskListScreen from '../src/screens/TaskListScreen';
import TaskDetailScreen from '../src/screens/TaskDetailScreen';
import AddTaskScreen from '../src/screens/AddTaskScreen';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
};

// Mock route for TaskDetailScreen
const mockRoute = {
  params: { taskId: 1 }
};

describe('App Functionality Tests', () => {
  // Login Screen Tests
  describe('LoginScreen', () => {
    it('should render login form correctly', () => {
      const { getByPlaceholderText, getByText } = render(
        <TaskProvider>
          <LoginScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Password')).toBeTruthy();
      expect(getByText('Log In')).toBeTruthy();
      expect(getByText('Don\'t have an account? Sign Up')).toBeTruthy();
    });
    
    it('should validate form inputs', () => {
      const { getByPlaceholderText, getByText } = render(
        <TaskProvider>
          <LoginScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      // Try to login without entering credentials
      fireEvent.press(getByText('Log In'));
      
      // In a real test, we would check for alert message
      // For now, we'll just verify navigation wasn't called
      expect(mockNavigation.reset).not.toHaveBeenCalled();
      
      // Enter credentials and try again
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password');
      fireEvent.press(getByText('Log In'));
      
      // Verify navigation was called
      expect(mockNavigation.reset).toHaveBeenCalled();
    });
  });
  
  // Home Screen Tests
  describe('HomeScreen', () => {
    it('should render welcome message and today\'s tasks', () => {
      const { getByText, getAllByText } = render(
        <TaskProvider>
          <HomeScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      expect(getByText('Welcome back, Alex!')).toBeTruthy();
      expect(getByText('Today\'s Tasks')).toBeTruthy();
      expect(getByText('Household Members')).toBeTruthy();
      expect(getByText('Upcoming')).toBeTruthy();
    });
    
    it('should navigate to task detail when task is pressed', () => {
      const { getAllByText } = render(
        <TaskProvider>
          <HomeScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      // Find and press the first task (Prepare Dinner)
      const taskElements = getAllByText('Prepare Dinner');
      if (taskElements.length > 0) {
        fireEvent.press(taskElements[0]);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Tasks', {
          screen: 'TaskDetail',
          params: { taskId: 1 },
        });
      }
    });
  });
  
  // Task List Screen Tests
  describe('TaskListScreen', () => {
    it('should render task tabs and task list', () => {
      const { getByText } = render(
        <TaskProvider>
          <TaskListScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      expect(getByText('All')).toBeTruthy();
      expect(getByText('Mine')).toBeTruthy();
      expect(getByText('Shared')).toBeTruthy();
      
      // Check for task items
      expect(getByText('Prepare Dinner')).toBeTruthy();
      expect(getByText('Laundry')).toBeTruthy();
    });
    
    it('should filter tasks when tabs are pressed', () => {
      const { getByText, queryByText } = render(
        <TaskProvider>
          <TaskListScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      // Press "Mine" tab
      fireEvent.press(getByText('Mine'));
      
      // Should show tasks assigned to "You"
      expect(getByText('Prepare Dinner')).toBeTruthy();
      expect(getByText('Laundry')).toBeTruthy();
      
      // Press "Shared" tab
      fireEvent.press(getByText('Shared'));
      
      // Should show tasks assigned to others
      expect(getByText('Clean Kitchen')).toBeTruthy();
      expect(getByText('Grocery Shopping')).toBeTruthy();
    });
  });
  
  // Task Detail Screen Tests
  describe('TaskDetailScreen', () => {
    it('should render task details correctly', () => {
      const { getByText } = render(
        <TaskProvider>
          <TaskDetailScreen route={mockRoute} navigation={mockNavigation} />
        </TaskProvider>
      );
      
      expect(getByText('Prepare Dinner')).toBeTruthy();
      expect(getByText('Notes')).toBeTruthy();
      expect(getByText('Complete')).toBeTruthy();
      expect(getByText('Reassign')).toBeTruthy();
      expect(getByText('Delete Task')).toBeTruthy();
    });
    
    it('should show reassignment options when Reassign is pressed', () => {
      const { getByText, queryByText } = render(
        <TaskProvider>
          <TaskDetailScreen route={mockRoute} navigation={mockNavigation} />
        </TaskProvider>
      );
      
      // Initially, reassign options should not be visible
      expect(queryByText('Reassign to:')).toBeNull();
      
      // Press Reassign button
      fireEvent.press(getByText('Reassign'));
      
      // Now reassign options should be visible
      expect(getByText('Reassign to:')).toBeTruthy();
      expect(getByText('You (Alex)')).toBeTruthy();
      expect(getByText('Sam')).toBeTruthy();
      expect(getByText('Taylor')).toBeTruthy();
    });
  });
  
  // Add Task Screen Tests
  describe('AddTaskScreen', () => {
    it('should render add task form correctly', () => {
      const { getByText, getByPlaceholderText } = render(
        <TaskProvider>
          <AddTaskScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      expect(getByText('Task Name')).toBeTruthy();
      expect(getByText('Assigned To')).toBeTruthy();
      expect(getByText('Date')).toBeTruthy();
      expect(getByText('Time')).toBeTruthy();
      expect(getByText('Repeat')).toBeTruthy();
      expect(getByText('Location')).toBeTruthy();
      expect(getByText('Notes')).toBeTruthy();
      expect(getByText('Save Task')).toBeTruthy();
      
      expect(getByPlaceholderText('Enter task name')).toBeTruthy();
      expect(getByText('You (Alex)')).toBeTruthy(); // Default assignee
      expect(getByText('Never')).toBeTruthy(); // Default repeat option
    });
    
    it('should validate task name before saving', () => {
      const { getByText } = render(
        <TaskProvider>
          <AddTaskScreen navigation={mockNavigation} />
        </TaskProvider>
      );
      
      // Try to save without entering task name
      fireEvent.press(getByText('Save Task'));
      
      // In a real test, we would check for alert message
      // For now, we'll just verify navigation wasn't called
      expect(mockNavigation.goBack).not.toHaveBeenCalled();
      
      // We would need to enter task name and try again in a full test
    });
  });
});
