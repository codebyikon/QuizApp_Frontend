import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    roles?: ('student' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        // Redirect to appropriate dashboard if role doesn't match
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'student') return <Navigate to="/student" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
