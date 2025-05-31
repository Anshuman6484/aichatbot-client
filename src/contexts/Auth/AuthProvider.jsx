import { useState } from 'react'
import { AuthContext } from './AuthContext'
import { toast } from 'sonner'

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') !== null
  )

  const handleLogOut = () => {
    const id = toast.loading('Logging out...')
    setTimeout(() => {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      toast.success('Log out successfull!', { id })
    }, 2000)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  )
}
