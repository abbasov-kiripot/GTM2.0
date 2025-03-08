// src/layouts/UserLayout.jsx
import { Outlet } from 'react-router-dom'

import { useState } from 'react'

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-container">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default UserLayout