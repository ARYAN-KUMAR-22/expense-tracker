import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import { useGlobalContext } from './context/globalContext';

// Protect Route wrapper
const ProtectedRoute = ({ children }) => {
    const { user } = useGlobalContext();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes nested in DashboardLayout */}
            <Route path="/dashboard/*" element={
                <ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>
            } />
        </Routes>
    </Router>
  );
}

export default App;
