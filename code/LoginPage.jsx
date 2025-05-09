import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useTaskContext()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    
    // In a real app, we would validate credentials
    // For the prototype, we'll just navigate to the main app
    const success = login(email, password)
    
    if (success) {
      navigate('/')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-4xl font-bold">HT</span>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-dark">HomeTask</h1>
          <p className="mt-2 text-sm text-medium">Sign in to manage your household tasks</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign in
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-medium">
              Don't have an account? <a href="#" className="font-medium text-primary hover:text-primary-dark">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
