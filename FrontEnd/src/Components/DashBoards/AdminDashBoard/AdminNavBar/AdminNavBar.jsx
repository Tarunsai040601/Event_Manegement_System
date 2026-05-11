import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminNavBar.css'

const AdminNavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <div className="navbar">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  )
}

export default AdminNavBar
