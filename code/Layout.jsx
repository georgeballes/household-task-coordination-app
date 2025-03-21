import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import ResponsiveContainer from './ResponsiveContainer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <main className="py-6">
        <ResponsiveContainer>
          <Outlet />
        </ResponsiveContainer>
      </main>
    </div>
  )
}

export default Layout
