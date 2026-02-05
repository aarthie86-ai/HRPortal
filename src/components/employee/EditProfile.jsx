import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getEmployeeDetailsById, updateEmployeeDetails } from "../../api/employeeDetails.js"; // Assume this API module exists

export default function EditProfile() {
    const error_msg = document.getElementById("error-message");
    const { user } = useAuth();
    const navigate = useNavigate();
    const employeeId = user ? user.employeeId : null;
    const [userProfileData, setUserProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch and set profile data here if needed
        const fetchProfileData = async () => {
            if (employeeId) {
                try {
                    const profileData = await getEmployeeDetailsById(employeeId);
                    setUserProfileData(profileData[0]);
                    setIsLoading(false);

                } catch (error) {
                    console.error("Error fetching profile data:", error);
                    setIsLoading(false);
                }
            }
        };
        fetchProfileData();
    }, []);

    const handleMaritalStatusChange = (event) => {
        // Handle marital status change
        const maritalStatusId = event.target.selectedOptions[0].id;
        if (maritalStatusId == "1") {
            userProfileData.maritalStatusId = "Single";
        } else if (maritalStatusId == "2") {
            userProfileData.maritalStatusId = "Married";
        }
        else if (maritalStatusId == "3") {
            userProfileData.maritalStatusId = "Divorced";
        }
        else if (maritalStatusId == "4") {
            userProfileData.maritalStatusId = "Widowed";
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handlePhoneNumberChange = (event) => {
        const { value } = event.target;
        setUserProfileData(prevData => ({
            ...prevData,
            contactDetails: {
                ...prevData.contactDetails, // Spread the nested object (name)
                mobileNumber: value // Update the specific field
            }
        }));
    }

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setUserProfileData(prevData => ({
            ...prevData,
            contactDetails: {
                ...prevData.contactDetails, // Spread the nested object (name)
                personalEmail: value // Update the specific field
            }
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateEmployeeDetails(employeeId, userProfileData);
            console.log('Profile has been updated:', response);
            navigate('/employee/edit-profile-confirmation');
        } catch (error) {
            console.error('Error updating profile edit request:', error);
        }

    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userProfileData) {
        return <div>No data found.</div>;
    }

    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)] flex flex-col">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> Edit Profile</h1>
            <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md w-1/2 self-center">
                <p id="error-message" className="hidden text-red-500 mb-4"></p>
                <h2 className="text-lg font-semibold ml-4 mt-1 mb-4 border-b pb-2 border-gray-400">Personal Information</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {/* Form fields for editing profile */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userProfileData.firstName} // Populate with existing data 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userProfileData.lastName} // Populate with existing data
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={handlePhoneNumberChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userProfileData.contactDetails.mobileNumber} // Populate with existing data 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            onChange={handleEmailChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userProfileData.contactDetails.personalEmail} // Populate with existing data 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Marital Status
                        </label>
                        <select
                            id="maritalStatus"
                            name="maritalStatus"
                            onChange={handleChange}
                            value={userProfileData.maritalStatus}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required

                        >
                            <option value="">Select Marital Status</option>
                            <option id="1" value="Single">Single</option>
                            <option id="2" value="Married">Married</option>
                            <option id="3" value="Divorced">Divorced</option>
                            <option id="4" value="Widowed">Widowed</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                            value={userProfileData.gender}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option id="1" value="Male">Male</option>
                            <option id="2" value="Female">Female</option>
                            <option id="3" value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Date of Birth
                        </label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={userProfileData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                            Nationality
                        </label>
                        <input
                            id="nationality"
                            name="nationality"
                            type="text"
                            value={userProfileData.nationality}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Add more fields as necessary */}
                    <button
                        type="submit"
                        className="bg-[#315a94] hover:bg-[#1f406d] text-white font-bold py-2 px-4 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </main>
    );
}