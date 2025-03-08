// src/routes/UserRoutes.jsx
import { Route, Routes } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'

const UserRoutes = () => {


  return (
    <Routes>
      <Route element={<UserLayout />}>
      </Route>
    </Routes>
  )
}

export default UserRoutes
