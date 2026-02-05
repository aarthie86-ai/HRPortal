import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleGuard({ allowedRoles, children }) {
    const { role } = useAuth();

        console.log("Current role:", role);
        console.log("Allowed roles:", allowedRoles);
    // If the user is not logged in, redirect to the login page
    if (!allowedRoles.includes(role)) {
        console.log("User does not have the required role, redirecting to unauthorized.");
        return <Navigate to="/unauthorized" replace />;
    }

    // If the user is logged in, render the child routes/components
    return children;
}
