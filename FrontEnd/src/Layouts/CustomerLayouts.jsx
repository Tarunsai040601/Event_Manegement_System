import React from 'react'
import CustomerNavBar from '../Components/DashBoards/CustomerBoard/CustomerNavBar/CustomerNavBar'
import { Outlet } from 'react-router-dom'

const CustomerLayouts = () => {
  return (
    <div>
      <CustomerNavBar/>
      <Outlet/>
    </div>
  )
}

export default CustomerLayouts
