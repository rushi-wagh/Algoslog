import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

import Footer from '../Components/Footer'

const Layout = () => {
  return (
    <div className="flex w-full flex-col min-h-screen"> 
      {/* Navbar always at top */}
      <Navbar />  

      {/* Main content grows to take available space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always sticks at bottom */}
      <Footer /> 
    </div>
  )
}



export default Layout
