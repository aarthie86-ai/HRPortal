import addEmployeeImg from '../../assets/images/add-employee.png';
import addPayrollImg from '../../assets/images/add-payroll.png';
import assignTasksImg from '../../assets/images/assign-tasks.png';
import {useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';



export default function AdminOnboarding() {
    const navigate = useNavigate();

    function goToAddEmployeePage() {
         navigate('/admin/employees/add-employee');
    }

    function goToAddPayrollPage() {
         navigate('/admin/add-payroll');
    }

    function goToAssignTasksPage() {
         navigate('/admin/assign-tasks');
    }

    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <div className="flex justify-between mt-6 mb-4">
                <h1 className="text-2xl  ml-10 mt-4 font-bold mb-4"> Onboarding Management</h1>
                <Link to="/admin/dashboard" className="text-md text-blue-600 mt-5 mr-10 hover:underline">
                     Back to Dashboard
                </Link>   
            </div>
            <div className="flex">
                <div onClick={goToAddEmployeePage} className="mx-8 mb-8 p-4 bg-white w-1/3 rounded-lg shadow-md hover:bg-gray-100">
                    <div className="flex justify-around">
                        <img src={addEmployeeImg} alt="Total Employees" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Add Employees</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4"></h1>
                        </div>
                    </div>
                </div>
                 <div onClick={goToAddPayrollPage} className="mx-8 mb-8 p-4 bg-white w-1/3 rounded-lg shadow-md hover:bg-gray-100">
                    <div className="flex justify-around">
                        <img src={addPayrollImg} alt="Total Employees" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Add Payroll</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4"></h1>
                        </div>
                    </div>
                </div>
                 <div onClick={goToAssignTasksPage} className="mx-8 mb-8 p-4 bg-white w-1/3 rounded-lg shadow-md hover:bg-gray-100">
                    <div className="flex justify-around">
                        <img src={assignTasksImg} alt="Total Employees" className="h-30 w-30"></img>
                        <div className="flex flex-col">
                            <h2 className="text-lg text-center font-semibold mt-5 mb-4">Assign Tasks</h2>
                            <h1 className="text-2xl text-center font-semibold mt-5 mb-4"></h1>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}