import { useNavigate } from 'react-router-dom';

export default function ApplyLeaveConfirmation() {
    const navigate = useNavigate();

    const goBackToDashboard = () => {
        navigate('/employee/employee-dashboard');
    };
    return (
         <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)] flex items-center justify-center">
             <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center self-center">
                <h2 className="text-2xl font-semibold mb-4">Leave Application Submitted</h2>
                <p className="mb-6">Your leave application has been successfully submitted and is pending approval.</p>
                <button 
                    onClick={goBackToDashboard}
                    className="bg-[#315a94] text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Back to Dashboard
                </button>
            </div>
        </main> 
    );
}