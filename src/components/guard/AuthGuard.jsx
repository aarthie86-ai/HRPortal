import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthGuard({ allowedRoles, children }) {
    const { role, isLoggedIn } = useAuth();
    console.log("AuthGuard - isLoggedIn:", isLoggedIn, "role:", role, "allowedRoles:", allowedRoles);
    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        console.log("User is not logged in, redirecting to login.");
        return <Navigate to="/" replace />;
    }
    // If the user is logged in, check for role authorization
     if (!allowedRoles.includes(role)) {
        console.log("User does not have the required role, redirecting to unauthorized.");
        return <Navigate to="/unauthorized" replace />;
    }

    // If the user is logged in, render the child routes/components
    return children;
}