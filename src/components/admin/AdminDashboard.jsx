import {useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";    
import totalEmp from '../../assets/images/total-employees.png';
import pendingRequest from '../../assets/images/pending-requests.png';
import onboardingTasks from '../../assets/images/onboarding-tasks.png';
import { getAllEmployees } from "../../api/employeeDetails";
import { getPendingLeaveRequests, getApprovedLeaveRequests, getRejectedLeaveRequests } from "../../api/leaveRequests";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [totalPendingleaveRequests, setTotalPendingLeaveRequests] = useState(null);
     const [totalApprovedleaveRequests, setTotalApprovedLeaveRequests] = useState(null);
      const [totalRejectedleaveRequests, setTotalRejectedLeaveRequests] = useState(null);
    const [totalEmloyees, setTotalEmployees] = useState(null);
    
    useEffect(() => {
        fetchTotalEmployees();
        fetchTotalPendingLeaveRequests();
        fetchTotalApprovedLeaveRequests();
        fetchTotalRejectedLeaveRequests();
    }, []);

    async function fetchTotalEmployees() {
        try {
            const requests = await getAllEmployees();
            setTotalEmployees(requests.length);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    }

    async function fetchTotalPendingLeaveRequests() {
        try {
            const requests = await getPendingLeaveRequests();
            setTotalPendingLeaveRequests(requests.length);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    }

    async function fetchTotalApprovedLeaveRequests() {
        try {
            const requests = await getApprovedLeaveRequests();
            setTotalApprovedLeaveRequests(requests.length);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    }

    async function fetchTotalRejectedLeaveRequests() {
        try {
            const requests = await getRejectedLeaveRequests();
            setTotalRejectedLeaveRequests(requests.length);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    }

    function addNewEmployee() {
         navigate('/admin/employees/add-employee');
    }

    function viewLeaveRequests() {
        navigate('/admin/leave-requests');
    }
    return (
         <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <div className="flex justify-between mt-6 mb-4">
                <h1 className="text-2xl  ml-10 mt-4 font-bold mb-4"> HR Dashboard</h1>
                <button onClick={addNewEmployee} className="bg-[#315a94] mr-10 text-white px-3 mt-5 h-10 rounded mr-2 hover:bg-[#1f406d]">+ Add Employee</button>
            </div>
            <div className="flex">
                <div className="mx-8 mb-8 p-4 bg-white w-1/3 rounded-lg shadow-md">
                    <div className="flex justify-around">
                        <img src={totalEmp} alt="Total Employees" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Total Employees</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4">{totalEmloyees}</h1>
                        </div>
                    </div>
                </div>
                <div className="mx-8 mb-8 p-4 bg-white w-1/3 rounded-lg shadow-md">
                    <div className="flex justify-around">
                        <img src={pendingRequest} alt="Pending requests" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Pending Leave Requests</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4">{totalPendingleaveRequests}</h1>
                        </div>
                    </div>
                </div>
                <div className="mx-8 mb-8 p-4 bg-white w-1/3 rounded-lg shadow-md">
                    <div className="flex justify-around">
                        <img src={onboardingTasks} alt="Pending onoarding" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Pending Onboarding Tasks</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4">4</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md">
                 <div className="flex justify-between mb-4 border-b border-gray-300">
                    <h2 className="text-lg font-semibold mt-2 mb-4">Leave Request Status</h2>
                    <button onClick={viewLeaveRequests} className="bg-[#315a94] mr-2 text-white px-3 h-10 rounded hover:bg-[#1f406d]">View Leave Requests</button>
                </div>
                <div className="flex">
                     <div className="mx-8 mb-8 bg-blue-100 w-1/3 rounded-lg shadow-md">
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4 border-b border-blue-300">Pending Requests</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4">{totalPendingleaveRequests}</h1>
                        </div>
                     </div>
                     <div className="mx-8 mb-8 bg-green-100 w-1/3 rounded-lg shadow-md">
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4 border-b border-green-300">Approved Requests</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4">{totalApprovedleaveRequests}</h1>
                        </div>
                     </div>
                     <div className="mx-8 mb-8 bg-red-100 w-1/3 rounded-lg shadow-md">
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4 border-b border-red-300">Rejected Requests</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4">{totalRejectedleaveRequests}</h1>
                        </div>
                     </div>
                </div>
            </div>

        </main>
    );
};