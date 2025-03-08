// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Local storage'dan kullanıcı bilgisini kontrol et
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  // Mock login fonksiyonu
  const login = (email, password) => {
    // Basit bir doğrulama - gerçek senaryoda API isteği yapılır
    if (email === 'admin@example.com' && password === 'password') {
      const userData = { 
        id: 1, 
        name: 'Admin User', 
        email, 
        role: 'admin' 
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    } else if (email === 'user@example.com' && password === 'password') {
      const userData = { 
        id: 2, 
        name: 'Regular User', 
        email, 
        role: 'user' 
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
