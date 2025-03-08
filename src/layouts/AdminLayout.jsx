
// src/layouts/AdminLayout.jsx
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/admin/Header'
import Footer from '../components/admin/Footer'
import Sidebar from '../components/admin/Sidebar'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const AdminLayout = () => {
  const { darkMode } = useTheme()
  const { isAuthenticated, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Admin olmayan kullanıcıları yönlendir
  if (!isAuthenticated || (user && user.role !== 'admin')) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className={`app admin ${darkMode ? 'dark-mode' : ''}`}>
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-container">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout