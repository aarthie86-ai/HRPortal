import { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "../../api/employeeDetails.js";
import { useNavigate } from "react-router-dom";

export default function Employees() {
    const [employeeList, setEmployeeList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    // Fetch and set profile data here if needed
    const fetchAllEmployees = async () => {
        try {
            const requests = await getAllEmployees();
            setEmployeeList(requests);
        } catch (error) {
            console.error("Error getting employees:", error);
        }
    };

    function viewEmployeeDetails(id) {
        const url = `/admin/employees/${id}`;
        navigate(url);
    }

    function editEmployeeDetails(id) {
        const url = `/admin/employees/${id}/edit-employee`;
        navigate(url);
    }

    async function performDeleteEmployee(employee) {
        try {
            // Use the 'id' field for deletion as that's the primary key in JSON Server
            await deleteEmployee(employee.id);
            console.log("Deleted employee");
            setEmployeeList(employeeList.filter(emp => emp.id !== employee.id));
            setShowDeleteModal(false);
            setEmployeeToDelete(null);
            setIsDeleting(false);
        }
        catch (error) {
            console.error("Error deleting employee:", error);
            setIsDeleting(false);
        }
    }

    function openDeleteModal(employee) {
        setEmployeeToDelete(employee);
        setShowDeleteModal(true);
    }

    function handleDeleteConfirm() {
        if (employeeToDelete) {
            setIsDeleting(true);
            performDeleteEmployee(employeeToDelete);
        }
    }

    function handleDeleteCancel() {
        setShowDeleteModal(false);
        setEmployeeToDelete(null);
    }

    function addNewEmployee() {
         navigate('/admin/employees/add-employee');

    }

    return (
        <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> Employee List</h1>
            <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold mb-4">Click on an employee to view details or add new employee</h2>
                    <button onClick={addNewEmployee} className="bg-[#315a94]  text-white px-3 py-1 rounded mr-2 hover:bg-[#1f406d]">+ Add Employee</button>
                </div>
                {employeeList.length === 0 && (
                    <p className="text-center">No employees added yet.</p>
                )}
                {employeeList.length > 0 && (

                    <div className="rounded-sm border border-gray-300 overflow-hidden">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-[#f2f3f7] h-12 w-full">
                                    <th className=" px-4 py-2">Employee ID</th>
                                    <th className=" px-4 py-2">Employee Name</th>
                                    <th className=" px-4 py-2">Department</th>
                                    <th className=" px-4 py-2">Role</th>
                                    <th className=" px-4 py-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="text-center w-full ">


                                {/* Sample Row */}
                                {employeeList.map((employee) => (
                                    <tr key={employee.employeeId} className="border-t border-gray-300">
                                        <td className="px-4 py-2">{employee.employeeId}</td>
                                        <td className="px-4 py-2">{employee.firstName} {employee.lastName}</td>
                                        <td className="px-4 py-2">{employee.department}</td>
                                        <td className="px-4 py-2">{employee.designation}</td>
                                        <td className="px-4 py-2 text-red-500">
                                            <button onClick={() => viewEmployeeDetails(employee.employeeId)} className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">View</button>
                                             <button onClick={() => editEmployeeDetails(employee.employeeId)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
                                            <button onClick={() => openDeleteModal(employee)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 overflow-hidden">
                        <h2 className="text-xl bg-[#315a94] text-white text-center font-bold py-4 px-6">Confirm Delete</h2>
                        <div className="p-6">
                            <p className="text-center text-gray-600 mb-6">
                                Are you sure you want to delete the employee?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleDeleteConfirm}
                                    disabled={isDeleting}
                                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    {isDeleting ? "Deleting..." : "Yes"}
                                </button>
                                <button
                                    onClick={handleDeleteCancel}
                                    disabled={isDeleting}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>

    );
}
