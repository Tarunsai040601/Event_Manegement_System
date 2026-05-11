import React from 'react'
import AdminNavBar from '../Components/DashBoards/AdminDashBoard/AdminNavBar/AdminNavBar'
import {Outlet} from 'react-router-dom'
const AdminLayouts = () => {
  return (
    <div>
      <AdminNavBar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayouts
