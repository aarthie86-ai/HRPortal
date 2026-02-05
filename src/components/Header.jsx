import logo from '../assets/images/logo.png';
import { useAuth } from './context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header(){
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const hideOnPaths = ['/', '/register'];
  const hideLogout = hideOnPaths.includes(location.pathname);

  return (
    <header className="bg-white-600 h-25">
        <img src={logo} alt="HR Portal Logo" className="mt-4 ml-4 h-12 inline-block " />
        <div className="float-right mr-4 mt-4 inline-flex items-center gap-4">
            <p className="text-xl font-bold">Welcome <span>{user ? user.firstName : "Guest"}!</span></p>
            {user && !hideLogout && (
                <button onClick={handleLogout} className="bg-[#315a94] hover:bg-[#1f406d] text-white px-3 py-1 rounded ml-2">
                    Logout
                </button>
            )}
        </div>
    </header>
  );
}