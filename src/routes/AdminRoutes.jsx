
// src/routes/AdminRoutes.jsx
import { Route, Routes, Navigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

const AdminRoutes = () => {
  const { isAuthenticated, user } = useAuth()
  const isAdmin = isAuthenticated && user?.role === 'admin'

  if (!isAuthenticated) {
    return <Routes>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  }

  return (
    <Routes>
      {isAdmin ? (
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  )
}

export default AdminRoutes