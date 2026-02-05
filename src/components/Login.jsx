import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/authorization';  
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateUsername(username) || !validatePassword(password)) {
            return;
        }
        try {
            const user = await loginUser({ email: username, password });
            login(user[0]);
            if (user[0].role === 'admin') {
                navigate("/admin");
            }
            else {
                navigate("/employee");
            }           
        } catch (error) {
            const errorElement = document.getElementById('login-error');
            errorElement.textContent = error.message;
            errorElement.classList.remove('hidden');
        }
        
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
       
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const validateUsername = (username) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorElement = document.getElementById('login-error');
        if (!emailRegex.test(username.trim())) {
            errorElement.textContent = 'Please enter a valid email address.';
            errorElement.classList.remove('hidden');
            return false;
        } else {
            errorElement.classList.add('hidden');
            return true;
        }
    }

    const validatePassword = (password) => {
        const errorElement = document.getElementById('login-error');
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number
        if (!passwordRegex.test(password.trim())) {
            errorElement.textContent = 'Password must be at least 8 characters long and include at least one letter and one number.';
            errorElement.classList.remove('hidden');
            return false;
        } else {
            errorElement.classList.add('hidden');
            return true;
        }
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-[#eaebf3]">

            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

            <img src={logo} alt="HR Portal Logo" className="mx-auto w-1/2 h-auto" />
            <p id="login-error" className="hidden text-sm text-red-700  mb-6 text-center"></p>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mt-8 mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            onChange={handleUsernameChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Username" required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password" required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#315a94] text-white py-2 px-4 rounded-lg hover:bg-[#1f406d] transition duration-300"
                    >
                        Login
                    </button>
                     <div className="mt-4 text-center">
                        <Link
                            to="/register"
                            className="text-blue-600 text-sm hover:underline mt-4"
                        >
                            New user? Register →
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}