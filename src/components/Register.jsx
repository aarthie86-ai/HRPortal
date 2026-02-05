import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addNewUser } from '../api/users';

export default function Register() {
    const [formData, setFormData] = useState({

        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        role:'employee',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const validateField = (fieldName, value) => {
        let newErrors = { ...errors };

        switch (fieldName) {
            case "firstName":
                if (!value || value.trim().length === 0) {
                    newErrors.firstName = "First Name is required";
                } else if (!/^[a-zA-Z'-]+$/.test(value)) {
                    newErrors.firstName = "First Name can only contain letters, hyphens, and apostrophes";
                } else if (value.trim().length < 2) {
                    newErrors.firstName = "First Name must be at least 2 characters";
                } else {
                    delete newErrors.firstName;
                }
                break;

            case "lastName":
                if (!value || value.trim().length === 0) {
                    newErrors.lastName = "Last Name is required";
                } else if (!/^[a-zA-Z'-]+$/.test(value)) {
                    newErrors.lastName = "Last Name can only contain letters, hyphens, and apostrophes";
                } else if (value.trim().length < 2) {
                    newErrors.lastName = "Last Name must be at least 2 characters";
                } else {
                    delete newErrors.lastName;
                }
                break;

            case "email":
                if (!value || value.trim().length === 0) {
                    newErrors.email = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = "Please enter a valid email address";
                } else {
                    delete newErrors.email;
                }
                break;

            case "employeeId":
                if (!value || value.trim().length === 0) {
                    newErrors.employeeId = "Employee ID is required";
                } else if (!/^[A-Z0-9-]+$/.test(value)) {
                    newErrors.employeeId = "Employee ID must contain only uppercase letters, numbers, and hyphens";
                } else {
                    delete newErrors.employeeId;
                }
                break;

            case "password":
                if (!value || value.length === 0) {
                    newErrors.password = "Password is required";
                } else if (value.length < 8) {
                    newErrors.password = "Password must be at least 8 characters";
                } else if (!/(?=.*[a-z])/.test(value)) {
                    newErrors.password = "Password must contain at least one lowercase letter";
                } else if (!/(?=.*[A-Z])/.test(value)) {
                    newErrors.password = "Password must contain at least one uppercase letter";
                } else if (!/(?=.*\d)/.test(value)) {
                    newErrors.password = "Password must contain at least one number";
                } else {
                    delete newErrors.password;
                }
                break;

            case "confirmPassword":
                if (!value || value.length === 0) {
                    newErrors.confirmPassword = "Confirm Password is required";
                } else if (value !== formData.password) {
                    newErrors.confirmPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmPassword;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        validateField(name, value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Validate all fields
        const fieldsToValidate = ["firstName", "lastName", "email", "employeeId", "password", "confirmPassword"];
        let hasErrors = false;

        fieldsToValidate.forEach(field => {
            validateField(field, formData[field]);
            if (errors[field]) hasErrors = true;
        });

        if (!hasErrors && Object.keys(errors).length === 0) {
            console.log("Form submitted successfully", formData);
            try {
                // API call to post user data
                await addNewUser(formData);
                setShowSuccessModal(true);
            }
            catch(error) {
                 console.error("Error adding User:", error);
            }
        }
    };
    return (
        <>
            <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-[#eaebf3]">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                     <img src={logo} alt="HR Portal Logo" className="mx-auto w-1/2 h-auto" />
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                    First Name *
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    placeholder="First Name"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                    Last Name *
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                    placeholder="Last Name"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                placeholder="Email"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                         <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
                                Employee ID *
                            </label>
                            <input
                                id="employeeId"
                                name="employeeId"
                                type="text"
                                required
                                value={formData.employeeId}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.employeeId ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                placeholder="Employee ID"
                            />
                            {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password *
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            <p className="text-gray-500 text-xs mt-1">Min 8 chars, 1 uppercase, 1 lowercase, 1 number</p>
                        </div>
                         <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                Confirm Password *
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
                                placeholder="Confirm Password"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className={`w-full py-2 px-4 rounded-lg transition duration-300 text-white font-bold ${
                                Object.keys(errors).length > 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#315a94] hover:bg-[#1f406d]'
                            }`}
                        >
                            Register
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link to="/" className="text-sm text-blue-600 hover:underline">
                            Already have an account? Login
                        </Link>    
                    </div>
                </div>  
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 overflow-hidden">
                        <h2 className="text-xl bg-[#315a94] text-white text-center font-bold py-4 px-6">Registration Successful</h2>
                        <div className="p-6">
                            <p className="text-center text-gray-600 mb-6">
                                Your registration was successful! You can now log in with your credentials.
                            </p>
                            <button
                                onClick={() => navigate("/")}
                                className="w-full bg-[#315a94] hover:bg-[#1f406d] text-white font-bold py-2 px-4 rounded transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}