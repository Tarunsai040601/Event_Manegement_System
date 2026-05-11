import React from 'react'
import OrganizerNavBar from '../Components/DashBoards/OrganizerDashBoard/OrganizerNavBar/OrganizerNavBar'
import { Outlet } from 'react-router-dom'

const OrganizerLayouts = () => {
  return (
    <div>
      <OrganizerNavBar/>
      <Outlet/>
    </div>
  )
}

export default OrganizerLayouts
