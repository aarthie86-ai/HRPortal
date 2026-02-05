import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getEmployeeDetailsById } from "../../api/employeeDetails";
import { getPendingLeaveRequestsById } from "../../api/leaveRequests";
import { getPayrollById } from "../../api/payrollDetails";
import profile from '../../assets/images/profile.png';
import personImg from '../../assets/images/person-icon.png';
import emailImg from '../../assets/images/email-icon.png';
import phoneImg from '../../assets/images/phone-icon.png';
import locationImg from '../../assets/images/location-icon.png';
import dollarImg from '../../assets/images/dollar.png';
import pendingRequestsImg from '../../assets/images/pending-requests.png';
import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pendingleaveRequests, setPendingLeaveRequests] = useState([]);
    const [payrollData, setPayrollData] = useState([]);
    const navigate = useNavigate();

    const employeeId = user ? user.employeeId : null;

    useEffect(() => {
        // Fetch and set profile data here if needed 
        fetchProfileData();
        fetchPendingLeaveRequestsById();
        fetchPayrollDetailsById();
    }, []);

    const fetchProfileData = async () => {
        if (employeeId) {
            try {
                const profileData = await getEmployeeDetailsById(employeeId);
                console.log(profileData);
                setUserDetails(profileData[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setIsLoading(false);
            }
        }
    };

    // Fetch and set profile data here if needed
    const fetchPendingLeaveRequestsById = async () => {
        if (employeeId) {
            try {
                const requests = await getPendingLeaveRequestsById(employeeId);
                setPendingLeaveRequests(requests);

            } catch (error) {
                console.error("Error getting leave requests:", error);
            }
        }
    };

    
    // Fetch and set profile data here if needed
    const fetchPayrollDetailsById = async () => {
        if (employeeId) {
            try {
                const requests = await getPayrollById(employeeId);
                setPayrollData(requests[0]);

            } catch (error) {
                console.error("Error getting payroll:", error);
            }
        }
    };

    function goToLeaveRequestsPage() {
        navigate('/employee/leave-history')
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userDetails) {
        return <div>No data found.</div>;
    }

    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <div className="flex justify-between mt-6 mb-4">
                <h1 className="text-2xl  ml-10 mt-4 font-bold mb-4"> Employee Dashboard</h1>
                <button onClick={goToLeaveRequestsPage} className="bg-[#315a94] mr-10 text-white px-3 mt-5 h-10 rounded mr-2 hover:bg-[#1f406d]">View Leave Requests</button>
            </div>
            <div className="flex">
                <div className="mx-8 mb-8 p-4 bg-white w-full rounded-lg shadow-md">
                    <div className="flex justify-start">
                        <img src={profile} alt="profile image" className="h-32 w-32 border-rounded"></img>
                        <div className="ml-10 mr-10 mt-8">
                            <p className="font-bold text-2xl">{user ? `${user.firstName} ${user.lastName}` : "N/A"}</p>
                            <div className="flex">
                                <img src={personImg} alt="profile image" className="h-6 w-6 border-rounded"></img>
                                <p className="text-sm ml-2">{userDetails.designation}</p>
                            </div>
                        </div>
                        <div className="ml-10 mr-10 mt-10">
                            <div className="flex">
                                <img src={locationImg} alt="profile image" className="h-7 w-7 border-rounded"></img>
                                <p className="font-semibold text-md">Department</p>
                            </div>
                            <p className="text-sm ml-7">{userDetails.department}</p>
                        </div>
                        <div className="ml-10 mr-10 mt-10">
                            <div className="flex">
                                <img src={emailImg} alt="profile image" className="h-5 w-5 border-rounded"></img>
                                <p className="font-semibold text-md ml-2">Email</p>
                            </div>
                            <p className="text-sm ml-7">{userDetails.contactDetails.personalEmail}</p>
                        </div>
                        <div className="ml-10 mr-10 mt-10">
                            <div className="flex">
                                <img src={phoneImg} alt="profile image" className="h-5 w-5 border-rounded"></img>
                                <p className="font-semibold text-md ml-2">Phone</p>
                            </div>
                            <p className="text-sm ml-7">{userDetails.contactDetails.mobileNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="mx-8 mb-8 p-4 bg-white w-1/2 rounded-lg shadow-md">
                    <div className="flex justify-around">
                        <img src={pendingRequestsImg} alt="Pending requests" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Pending Leave Requests</h2>
                            <h1 className="text-2xl text-center font-semibold mb-4">{pendingleaveRequests.length}</h1>
                        </div>
                    </div>
                </div>
                <div className="mx-8 mb-8 p-4 bg-white w-1/2 rounded-lg shadow-md">
                    <div className="flex justify-around">
                        <img src={dollarImg} alt="Pending requests" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Payroll Amount this month</h2>
                            <h1 className="text-2xl text-center font-semibold mb-4">{payrollData.grossSalary}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};