import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/users/common/Navbar'
import Footer from '../components/users/common/Footer'

const Layout = () => {
  return (
    <>
    <Navbar />

    <Outlet />

    <Footer />
    
    </>
  )
}

export default Layout