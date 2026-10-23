import React, { useEffect } from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/admin/common/Navbar'
import Footer from '../components/admin/common/Footer'
import authService from '../services/authService'

const AdminLayout = () => {

  const nav = useNavigate();

  useEffect(()=>{
    const userType = authService.getUserType();

    if(!authService.isLoggedIn() || userType !== "1"){
      toast.error("Unauthorized - Admins Only");
      nav("/login");
    }
  },[]);

  return (
    <>
    <Navbar/>

    <Outlet />

    <Footer />
    </>
  )
}

export default AdminLayout