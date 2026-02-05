import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPendingLeaveRequestsById, getOlderLeaveRequestsById } from "../../api/leaveRequests.js";
import { useNavigate } from "react-router-dom";

export default function LeaveHistory() {
    const { user } = useAuth();
    const [olderLeaveRequests, setOlderLeaveRequests] = useState([]);
    const [pendingleaveRequests, setPendingLeaveRequests] = useState([]);
    const navigate = useNavigate();

    const employeeId = user ? user.employeeId : null;

    useEffect(() => {
        fetchPendingLeaveRequestsById();
        fetchOlderLeaveRequestsById();
    }, []);

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
    const fetchOlderLeaveRequestsById = async () => {
        if (employeeId) {
            try {
                const requests = await getOlderLeaveRequestsById(employeeId);
                setOlderLeaveRequests(requests);

            } catch (error) {
                console.error("Error getting leave requests:", error);
            }
        }
    };


    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> Leave Requests</h1>
            <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md">

                <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>

                {pendingleaveRequests.length === 0 && (
                    <p className="text-center">No pending leave requests.</p>
                )}
                {pendingleaveRequests.length > 0 && (

                    <div className="rounded-sm border border-gray-300 overflow-hidden">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#f2f3f7] h-12 w-full">
                                    <th className=" px-4 py-2">Employee Name</th>
                                    <th className=" px-4 py-2">Leave Type</th>
                                    <th className=" px-4 py-2">Start Date</th>
                                    <th className=" px-4 py-2">End Date</th>
                                    <th className=" px-4 py-2">Status</th>
                                </tr>
                            </thead>

                            <tbody className="text-center w-full ">


                                {/* Sample Row */}
                                {pendingleaveRequests.map((request) => (
                                    <tr key={request.id} className="border-t border-gray-300">
                                        <td className="px-4 py-2">{request.employeeName}</td>
                                        <td className="px-4 py-2">{request.leaveTypeId}</td>
                                        <td className="px-4 py-2">{request.fromDate}</td>
                                        <td className="px-4 py-2">{request.toDate}</td>
                                        <td className="px-4 py-2 text-red-500">{request.status.toUpperCase()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <h2 className="text-lg mt-8 font-semibold mb-4">Older Requests</h2>

                {olderLeaveRequests.length === 0 && (
                    <p className="text-center">No older requests found.</p>
                )}
                {olderLeaveRequests.length > 0 && (

                    <div className="rounded-sm border border-gray-300 overflow-hidden">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#f2f3f7] h-12 w-full">
                                    <th className=" px-4 py-2">Employee Name</th>
                                    <th className=" px-4 py-2">Leave Type</th>
                                    <th className=" px-4 py-2">Start Date</th>
                                    <th className=" px-4 py-2">End Date</th>
                                    <th className=" px-4 py-2">Status</th>
                                </tr>
                            </thead>

                            <tbody className="text-center w-full ">

                                {/* Sample Row */}
                                {olderLeaveRequests.map((request) => (
                                    <tr key={request.id} className="border-t border-gray-300">
                                        <td className="px-4 py-2">{request.employeeName}</td>
                                        <td className="px-4 py-2">{request.leaveTypeId}</td>
                                        <td className="px-4 py-2">{request.fromDate}</td>
                                        <td className="px-4 py-2">{request.toDate}</td>
                                        <td className="px-4 py-2">{request.status.toUpperCase()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>

    );
}
