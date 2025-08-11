import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const AdminRoute = () => {
  const {authUser,ischeckingAuth} = useAuthStore()

  if(ischeckingAuth){
    return(<h1>Loading...</h1>)
  }
  if(!authUser ||authUser.role !== "ADMIN"){
    return <Navigate to="/" replace />
  }
  return  <Outlet/>
    
}

export default AdminRoute
