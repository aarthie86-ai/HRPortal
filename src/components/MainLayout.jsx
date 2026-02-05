import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminSidebar from './admin/AdminSidebar';
import EmployeeSidebar from './employee/EmployeeSidebar';
import AdminDashboard from './admin/AdminDashboard';
import EmployeeDashboard from './employee/EmployeeDashboard';



export default function MainLayout() {
    const { role } = useAuth();

    const isAdmin = role === 'admin';
    const isEmployee = role === 'employee';
    return (
        <div className="flex">
            {isAdmin && <AdminSidebar />}
            {isEmployee && <EmployeeSidebar />}
            <main className="main-content">
                {/* Outlet renders the current route's component */}
                <Outlet />
            </main>
        </div>
    );
}