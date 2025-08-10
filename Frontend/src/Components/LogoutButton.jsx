import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LogoutButton = ({children}) => {
  const {logout} = useAuthStore()
  const logoutClick = async () => {
  await logout()
  console.log("User logged out");
  }
  return (
    <button className='btn-primary hover:bg-primary hover:text-white text-base font-semibold' onClick={logoutClick}>
      {children}
    </button>
  )
}

export default LogoutButton
