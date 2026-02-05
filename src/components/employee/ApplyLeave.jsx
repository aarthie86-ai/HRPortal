import { postLeaveRequest, getNewLeaveRequestId } from "../../api/leaveRequests";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ApplyLeave() {  
    let id = null;
    let leaveTypeId = null;
    let fromDate = null;
    let toDate = null;
    let reason = "";

    const error_msg = document.getElementById("error-message");
    const {user} = useAuth();
    const employeeId = user ? user.employeeId : null;
    const navigate = useNavigate();
    
    
    const fetchLeaveId = async () => {
        try {
            id = await getNewLeaveRequestId();
        } catch (error) {
            console.error("Error generating leave ID:", error);
        }
    };
    fetchLeaveId();
    
        

    const handleSubmit = async (e) => { 
        e.preventDefault();
        // Handle form submission logic here
        const leaveRequest = {
            id: id,
            employeeId: employeeId,
            employeeName: user ? `${user.firstName} ${user.lastName}` : "",
            leaveTypeId: leaveTypeId,
            fromDate: fromDate,
            toDate: toDate,
            reason: reason,
            status: "pending",
            appliedAt: new Date().toISOString()
        };

        try {
            const response = await postLeaveRequest(leaveRequest);
            console.log('Leave request submitted:', response);
            navigate('/employee/apply-leave-confirmation');
        } catch (error) {
            console.error('Error submitting leave request:', error);
        }
    }

    function handleLeaveTypeChange(event) {
        // Handle leave type change
        leaveTypeId = event.target.selectedOptions[0].id;
    }

    function handleFromDateChange(event) {
        // Handle from date change
        fromDate = event.target.value;
    }

    function handleToDateChange(event) {
        // Handle to date change
        toDate = event.target.value;
    }

    function handleReasonChange(event) {
        // Handle reason change
        reason = event.target.value.trim();
    }
    return (
         <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)] flex flex-col">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> Apply for Leave</h1>
                <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md w-1/2 self-center">
                    <p className="mb-6 text-gray-700">Please fill out the form below to apply for leave.</p>
                    <p id="error-message" className="hidden text-red-500 mb-4"></p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveType">
                                Leave Type
                            </label>
                            <select
                                id="leaveType"
                                onChange={handleLeaveTypeChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Leave Type</option>
                                <option id="1"value="sick">Sick Leave</option>
                                <option id="2" value="casual">Vacation</option>
                                <option id="3" value="earned">Earned Leave</option>
                                <option id="6" value="travel">Travel</option>
                                <option id="4" value="maternity">Maternity Leave</option>
                                <option id="5" value="paternity">Paternity Leave</option>
                                <option id="7" value="unpaid">Unpaid Leave</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromDate">
                                From Date
                            </label>
                            <input
                                id="fromDate"
                                type="date"
                                onChange={handleFromDateChange}    
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toDate">
                                To Date
                            </label>
                            <input
                                id="toDate"
                                type="date"
                                onChange={handleToDateChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">  
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
                                Reason
                            </label>
                            <textarea
                                id="reason"
                                onChange={handleReasonChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                placeholder="Enter reason for leave"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#315a94] float-right text-white py-2 px-4 rounded-lg hover:bg-[#1f406d] transition duration-300"
                        >
                            Submit Leave Request
                        </button>
                    </form>
                </div>
        </main>
    );
}