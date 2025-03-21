import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { TaskProvider } from './context/TaskContext'
import AuthGuard from './components/AuthGuard'
import ErrorBoundary from './components/ErrorBoundary'

// Import pages
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import TaskListPage from './pages/TaskListPage'
import TaskDetailPage from './pages/TaskDetailPage'
import AddTaskPage from './pages/AddTaskPage'
import CalendarPage from './pages/CalendarPage'
import ProfilePage from './pages/ProfilePage'
import Layout from './components/Layout'

function App() {
  return (
    <ErrorBoundary>
      <TaskProvider>
        <Router>
          <AuthGuard>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="tasks" element={<TaskListPage />} />
                <Route path="tasks/:taskId" element={<TaskDetailPage />} />
                <Route path="add-task" element={<AddTaskPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthGuard>
        </Router>
      </TaskProvider>
    </ErrorBoundary>
  )
}

export default App
