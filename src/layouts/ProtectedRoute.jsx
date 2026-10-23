import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/users/common/Navbar'
import Footer from '../components/users/common/Footer'
import authService from '../services/authService'

const ProtectedLayout = () => {

  const nav = useNavigate();

  useEffect(() => {
    if (!authService.isLoggedIn()) {
      toast.error("Please Login to continue");
      nav("/login");
    }
  }, []);

  return (
    <>
    <Navbar/>

    <Outlet />

    <Footer />
    </>
  )
}

export default ProtectedLayout