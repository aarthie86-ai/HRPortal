import dashboardIcon from '../../assets/images/dashboard-icon.png';
import profileIcon from '../../assets/images/profile-icon.png';
import applyLeaveIcon from '../../assets/images/apply-leave-icon.png';
import leaveHistoryIcon from '../../assets/images/leave-history-icon.png';
import payrollIcon from '../../assets/images/onboarding-icon.png';
import logoutIcon from '../../assets/images/logout-icon.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function EmployeeSidebar() {
    const { logout } = useAuth();
    const linkClass = ({ isActive }) => // definte styles when link is active or not
        isActive
            ? "text-white text-lg font-bold" // Active: White, bold
             : "text-white-400 hover:text-gray-400 text-md pt-10"; // Inactive: Gray, hover effect
    
    return (
       <aside className="w-64 mt-8 pl-4 bg-[#315a94] font-semibold text-md text-white h-[calc(100vh-6rem)]">
            <nav>
                <ul className="pt-6">
                    <li className="mb-6"><NavLink to="/employee/employee-dashboard" end className={linkClass}>
                        <img src={dashboardIcon} alt="Dashboard" className="w-5 h-5 inline mr-2 -mt-1" />Dashboard</NavLink>
                    </li>
                    <li className="mb-6"><NavLink to="/employee/profile" className={linkClass}>
                        <img src={profileIcon} alt="Employees" className="w-5 h-5 inline mr-2 -mt-1" />Profile</NavLink>
                    </li>
                    <li className="mb-6"><NavLink to="/employee/apply-leave" className={linkClass}>
                        <img src={applyLeaveIcon} alt="Leave Requests" className="w-5 h-5 inline mr-2 -mt-1" />Apply Leave</NavLink>
                    </li>
                    <li className="mb-6"><NavLink to="/employee/leave-history" className={linkClass}>
                        <img src={leaveHistoryIcon} alt="Leave History" className="w-5 h-5 inline mr-2 -mt-1" />Leave History</NavLink>
                    </li>
                    <li className="mb-6"><NavLink to="/employee/payroll" className={linkClass}>
                        <img src={payrollIcon} alt="Payroll" className="w-5 h-5 inline mr-2 -mt-1" />Payroll</NavLink>
                    </li>
                    <li className="mb-6"><NavLink onClick={() => logout()} className={linkClass}>
                        <img src={logoutIcon} alt="Logout" className="w-5 h-5 inline mr-2 -mt-1" />Logout</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}