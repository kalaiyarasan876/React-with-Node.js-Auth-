import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './app/pages/Login'
import Register from './app/pages/Register'
import Dashboard from './app/components/Dashboard';
import PrivateRoute from './app/components/PrivateRoute'
import Profile from './app/components/profile'










function App() {
  // useEffect(() => {
  //   document.body.style.backgroundColor = '#ba8fff';
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App

