import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LogoutButton = ({children}) => {
  const {logout} = useAuthStore()
  const logoutClick = async () => {
  await logout()
  console.log("User logged out");
  }
  return (
    <button className='rounded-full px-5 py-2 text-white cursor-pointer  transition-colors' onClick={logoutClick}>
      {children}
    </button>
  )
}

export default LogoutButton
