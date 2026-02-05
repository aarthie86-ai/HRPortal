import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllPayroll } from "../../api/payrollDetails.js";

export default function Payroll() {
    const { user } = useAuth();
    const [payrollData, setPayrollData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPayrollData();
    }, [user]);

    const fetchPayrollData = async () => {
        try {
            setIsLoading(true);
            const allPayroll = await getAllPayroll();
            setPayrollData(allPayroll);
            setIsLoading(false);
        } catch (err) {
            console.error("Error fetching payroll data:", err);
            setPayrollData(null);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!payrollData) {
        return <div>No payroll data found.</div>;
    }
    return (
        <main className="h-[calc(100vh-6rem)] mt-8 overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4"> Payroll Details</h1>
            <div className="mx-8 mb-8 p-4 bg-white rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold mb-4">Click on an employee to view full payroll of employee</h2>
                </div>

                <div className="rounded-sm border border-gray-300 overflow-hidden">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-[#f2f3f7] h-12 w-full">
                                <th className=" px-4 py-2">Employee ID</th>
                                <th className=" px-4 py-2">Bank Name</th>
                                <th className=" px-4 py-2">Salary</th>
                                <th className=" px-4 py-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-center w-full ">


                            {/* Sample Row */}
                            {payrollData.map((payroll) => (
                                <tr key={payroll.employeeId} className="border-t border-gray-300">
                                    <td className="px-4 py-2">{payroll.employeeId}</td>
                                    <td className="px-4 py-2">{payroll.bankName} </td>
                                    <td className="px-4 py-2">{payroll.basicSalary}</td>
                                    <td className="px-4 py-2 text-red-500">
                                        <button  className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">View</button>
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">Edit</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>

    );
}
