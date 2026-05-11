import React from 'react'
import { useNavigate } from 'react-router-dom'
import './OrganizerNavBar.css'

const OrganizerNavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <div className="navbar">
      <h1>Organizer Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  )
}

export default OrganizerNavBar
