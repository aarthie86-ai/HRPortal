
import dashboardIcon from '../../assets/images/dashboard-icon.png';
import employeesIcon from '../../assets/images/employees-icon.png';
import leaveRequestIcon from '../../assets/images/leave-requests-icon.png';
import onboardingIcon from '../../assets/images/onboarding-icon.png';
import logoutIcon from '../../assets/images/logout-icon.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
    const { logout } = useAuth();
     const linkClass = ({ isActive }) => // definte styles when link is active or not
        isActive
            ? "text-white text-lg font-bold" // Active: White, bold
             : "text-white-400 hover:text-gray-400 text-md "; // Inactive: Gray, hover effect
    
    return (
        <aside className="w-64 mt-8 pl-4 bg-[#315a94] font-semibold text-md text-white h-[calc(100vh-6rem)]">
            <nav>
                <ul className="pt-6">
                    <li className="mb-6"><NavLink to="/admin/dashboard" end className={linkClass}>
                        <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5 inline mr-2 -mt-1" />Dashboard</NavLink>
                    </li>
                    <li className="mb-6"><NavLink to="/admin/employees" className={linkClass}>
                        <img src={employeesIcon} alt="Employees" className="w-5 h-5 inline mr-2 -mt-1" />Employees</NavLink>
                    </li>
                    <li className="mb-6"><NavLink to="/admin/leave-requests" className={linkClass}>
                        <img src={leaveRequestIcon} alt="Leave Requests" className="w-5 h-5 inline mr-2 -mt-1" />Leave Requests</NavLink>
                    </li>
                    <li className="mb-6"><NavLink to="/admin/add-payroll" className={linkClass}>
                        <img src={leaveRequestIcon} alt="Payroll" className="w-5 h-5 inline mr-2 -mt-1" />Add Payroll</NavLink>
                    </li>
                    
                    <li className="mb-6"><NavLink to="/admin/admin-onboarding" className={linkClass}>
                         <img src={onboardingIcon} alt="Onboarding" className="w-5 h-5 inline mr-2 -mt-1" />Onboarding</NavLink>
                    </li>
                    <li className="mb-6"><NavLink onClick={() => logout()} className={linkClass}>
                        <img src={logoutIcon} alt="Logout" className="w-5 h-5 inline mr-2" />Logout</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}