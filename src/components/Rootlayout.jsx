import React from 'react'
import { Outlet } from 'react-router'
import SideBar from './SideBar'



const Rootlayout = () => {
  return (
    <div className='grid grid-cols-3 '>
    <SideBar />
    <Outlet />
    </div>
  )
}

export default Rootlayout