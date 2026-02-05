import { getPendingLeaveRequests,getApprovedLeaveRequests, getRejectedLeaveRequests, updateLeveRequestStatus } from "../../api/leaveRequests";
import { useEffect, useState } from "react";

export default function LeaveRequests() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [approvedLeaveRequests, setApprovedLeaveRequests] = useState([]);
    const [rejectedLeaveRequests, setRejectedLeaveRequests] = useState([]);

    useEffect(() => {
        fetchPendingLeaveRequests();
        fetchApprovedLeaveRequests();   
        fetchRejectedLeaveRequests();
    }, []);

    async function fetchPendingLeaveRequests() {
        try {
            const requests = await getPendingLeaveRequests();
            setLeaveRequests(requests);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    }

    async function fetchApprovedLeaveRequests() {
        try {
            const requests = await getApprovedLeaveRequests();
            setApprovedLeaveRequests(requests);
        } catch (error) {
            console.error('Error fetching approved leave requests:', error);
        }
    }

    async function fetchRejectedLeaveRequests() {
        try {
            const requests = await getRejectedLeaveRequests();
            setRejectedLeaveRequests(requests);
        } catch (error) {
            console.error('Error fetching rejected leave requests:', error);
        }
    }

    async function approveLeaveRequest(request) {
        const updatedRequest = {
            ...request,
            status: "approved"
        }
        try {
            await updateLeveRequestStatus(request.id, updatedRequest)
            fetchPendingLeaveRequests();
            fetchApprovedLeaveRequests();
        }
        catch(error) {
            console.error('Error updating leave request status to approved:', error);
        }
    }

    async function rejectLeaveRequest(request) {
        const updatedRequest = {
            ...request,
            status: "rejected"
        }
        try {
            await updateLeveRequestStatus(request.id, updatedRequest)
            fetchPendingLeaveRequests();
            fetchRejectedLeaveRequests();
        }
        catch(error) {
            console.error('Error updating leave request status to rejected:', error);
        }   
    }

    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> Leave Requests</h1>
            <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md">

                <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>

                {leaveRequests.length === 0 && (
                    <p className="text-center">No pending leave requests.</p>
                )}
                {leaveRequests.length > 0 && (
                
                <div className="rounded-sm border border-gray-300 overflow-hidden">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-[#f2f3f7] h-12 w-full">
                                <th className=" px-4 py-2">Employee Name</th>
                                <th className=" px-4 py-2">Leave Type</th>
                                <th className=" px-4 py-2">Start Date</th>
                                <th className=" px-4 py-2">End Date</th>
                                <th className=" px-4 py-2">Status</th>
                                <th className=" px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                    
                        <tbody className="text-center w-full ">
                      
            
                            {/* Sample Row */}
                            {leaveRequests.map((request) => (
                                <tr key={request.id} className="border-t border-gray-300">
                                    <td className="px-4 py-2">{request.employeeName}</td>
                                    <td className="px-4 py-2">{request.leaveTypeId}</td>
                                    <td className="px-4 py-2">{request.fromDate}</td>
                                    <td className="px-4 py-2">{request.toDate}</td>
                                    <td className="px-4 py-2">{request.status.toUpperCase()}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => approveLeaveRequest(request)} className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">Approve</button>
                                        <button onClick={() => rejectLeaveRequest(request)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}

                <h2 className="text-lg mt-8 font-semibold mb-4">Approved Requests</h2>

                {approvedLeaveRequests.length === 0 && (
                    <p className="text-center">No approved leave requests.</p>
                )}
                {approvedLeaveRequests.length > 0 && (
                
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
                            {approvedLeaveRequests.map((request) => (
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

                <h2 className="text-lg mt-8 font-semibold mb-4">Rejected Requests</h2>

                {rejectedLeaveRequests.length === 0 && (
                    <p className="text-center">No rejected leave requests.</p>
                )}
                {rejectedLeaveRequests.length > 0 && (
                
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
                            {rejectedLeaveRequests.map((request) => (
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