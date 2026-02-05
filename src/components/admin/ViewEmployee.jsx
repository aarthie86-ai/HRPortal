import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getEmployeeDetailsById } from "../../api/employeeDetails";
import { useParams } from 'react-router-dom';
import profile from '../../assets/images/profile.png';
import { useNavigate } from "react-router-dom";

export default function ViewEmployee() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    const employeeId = params.id;

    useEffect(() => {
        const fetchEmployeeData = async () => {
            if (employeeId) {
                try {
                    const profileData = await getEmployeeDetailsById(employeeId);
                    setUserDetails(profileData[0]);
                } catch (error) {
                    console.error("Error fetching profile data:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        fetchEmployeeData();
    }, [employeeId]);

    const handleEditProfile = () => {
         navigate(`/admin/employees/${employeeId}/edit-employee`, 
            { state: { employeeId: employeeId }});
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(!userDetails) {
        return <div>No data found.</div>;
    }
    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)] flex flex-col">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> My Profile</h1>
            <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md w-1/2 self-center">
                <div className="flex justify-between items-center pb-2 border-gray-400 border-b mb-4">
                <h2 className="text-lg font-semibold ml-4 mt-1">Personal Information</h2>
                <button onClick={handleEditProfile} className="bg-[#315a94] hover:bg-[#1f406d] text-white font-bold py-2 px-4 rounded">Edit Employee</button>
                </div>
                <div className="flex flex-row">
                    <img src={profile} alt="Profile" className="basis-1/4 w-35 h-35 rounded-full mx-auto mb-4" />
                    <div className="flex flex-col self-start basis-3/4">
                        <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Full Name: <span className="font-normal">{userDetails.firstName} {userDetails.lastName}</span></p>
                        <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Employee ID: <span className="font-normal">{userDetails.employeeId || "N/A"}</span></p>
                        <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Gender: <span className="font-normal">{userDetails.gender || "N/A"}</span></p>
                        <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Date of Birth: <span className="font-normal">{userDetails.dateOfBirth || "N/A"}</span></p>
                        <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Nationality: <span className="font-normal">{userDetails.nationality || "N/A"}</span></p>
                        <p className="text-md font-semibold ml-4 mb-4">Marital Status: <span className="font-normal">{userDetails.maritalStatus || "N/A"}</span></p>
                    </div>
                </div>
            </div>
            <div className="mx-8 mb-8 p-2 bg-white rounded-lg shadow-md w-1/2 self-center">
                <h2 className="text-lg font-semibold ml-4 mt-1 mb-4 border-b pb-2 border-gray-400">Contact Information</h2>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Email: <span className="font-normal">{userDetails.contactDetails?.personalEmail || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4">Phone Number: <span className="font-normal">{userDetails.contactDetails?.mobileNumber || "N/A"}</span></p>
            </div>
            <div className="mx-8 mb-8 p-2 bg-white rounded-lg shadow-md w-1/2 self-center">
                <h2 className="text-lg font-semibold ml-4 mt-1 mb-4 border-b pb-2 border-gray-400">Work Information</h2>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Department: <span className="font-normal">{userDetails.department || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Position: <span className="font-normal">{userDetails.designation || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Date of Hire: <span className="font-normal">{userDetails.joiningDate || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Manager: <span className="font-normal">{userDetails.reportingManager.name || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Manager Email: <span className="font-normal">{userDetails.reportingManager.email || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Employee Type: <span className="font-normal">{userDetails.employeeType || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4  ">Employee Status: <span className="font-normal">{userDetails.employmentStatus || "N/A"}</span></p>
            </div>

            <div className="mx-8 mb-8 p-2 bg-white rounded-lg shadow-md w-1/2 self-center">
                <h2 className="text-lg font-semibold ml-4 mt-1 mb-4 border-b pb-2 border-gray-400">Location Information</h2>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Office: <span className="font-normal">{userDetails.workLocation.office || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4 border-b border-gray-200 pb-2">Country: <span className="font-normal">{userDetails.workLocation.country || "N/A"}</span></p>
                <p className="text-md font-semibold ml-4 mb-4">Workmode: <span className="font-normal">{userDetails.workLocation.workMode || "N/A"}</span></p>
            </div>
            
        </main>
    );
}