import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CustomerNavBar.css'

const CustomerNavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <div className="navbar">
      <h1>Customer Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  )
}

export default CustomerNavBar
