import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllPayroll } from "../../api/payrollDetails.js";

export default function Payroll() {
    const { user } = useAuth();
    const [payrollData, setPayrollData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPayrollData();
    }, [user]);

    const fetchPayrollData = async () => {
        try {
            setIsLoading(true);
            const allPayroll = await getAllPayroll();
            console.log(allPayroll);
            console.log(user.employeeId);
            // Find payroll record for the logged-in employee
            const employeePayroll = allPayroll.find(
                (record) => record.employeeId === user.employeeId
            );
            
            if (employeePayroll) {
                setPayrollData(employeePayroll);
                setError(null);
            } else {
                setPayrollData(null);
                setError("No payroll information available.");
            }
        } catch (err) {
            console.error("Error fetching payroll data:", err);
            setError("Failed to load payroll information.");
            setPayrollData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
         <main className="h-[calc(100vh-6rem)] mt-8  overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">

            {isLoading && (
                <div className="flex items-center justify-center h-96">
                    <p className="text-lg text-gray-600">Loading payroll information...</p>
                </div>
            )}

            {error && !isLoading && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {payrollData && !isLoading && (
                <div className="flex justify-center items-center mt-5 ">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-3/4">
                    {/* Header Section */}
                    <div className="bg-[#315a94] text-white px-6 py-4">
                        <h2 className="text-2xl font-bold">
                            Payroll Details - {payrollData.employeeId}
                        </h2>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Banking Information */}
                            <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                                <h3 className="text-xl font-bold text-[#315a94] mb-4">Banking Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">Bank Name</label>
                                        <p className="text-gray-800">{payrollData.bankName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">Account Number</label>
                                        <p className="text-gray-800">{payrollData.accountNumber}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">Currency</label>
                                        <p className="text-gray-800">{payrollData.currency}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">Payment Frequency</label>
                                        <p className="text-gray-800">{payrollData.paymentFrequency}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Salary Information */}
                            <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                                <h3 className="text-xl font-bold text-[#315a94] mb-4">Salary Information</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <label className="text-sm font-semibold text-gray-700">Basic Salary</label>
                                        <p className="text-gray-800 font-medium">
                                            {payrollData.currency} {payrollData.basicSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <label className="text-sm font-semibold text-gray-700">Housing Allowance</label>
                                        <p className="text-gray-800 font-medium">
                                            {payrollData.currency} {payrollData.housingAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <label className="text-sm font-semibold text-gray-700">Transport Allowance</label>
                                        <p className="text-gray-800 font-medium">
                                            {payrollData.currency} {payrollData.transportAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b">
                                        <label className="text-sm font-semibold text-gray-700">Other Allowance</label>
                                        <p className="text-gray-800 font-medium">
                                            {payrollData.currency} {payrollData.otherAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 bg-[#315a94] text-white px-3 py-2 rounded">
                                        <label className="font-bold">Gross Salary</label>
                                        <p className="font-bold">
                                            {payrollData.currency} {payrollData.grossSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown Table */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-[#315a94] mb-4">Salary Breakdown</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#f2f3f7]">
                                            <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Component</th>
                                            <th className="border border-gray-300 px-4 py-2 text-right font-semibold">Amount ({payrollData.currency})</th>
                                            <th className="border border-gray-300 px-4 py-2 text-right font-semibold">Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">Basic Salary</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {payrollData.basicSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {((payrollData.basicSalary / payrollData.grossSalary) * 100).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">Housing Allowance</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {payrollData.housingAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {((payrollData.housingAllowance / payrollData.grossSalary) * 100).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">Transport Allowance</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {payrollData.transportAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {((payrollData.transportAllowance / payrollData.grossSalary) * 100).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">Other Allowance</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {payrollData.otherAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {((payrollData.otherAllowance / payrollData.grossSalary) * 100).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr className="bg-[#315a94] text-white font-bold">
                                            <td className="border border-gray-300 px-4 py-2">Gross Salary</td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">
                                                {payrollData.grossSalary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-right">100.00%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )}

            {!payrollData && !isLoading && !error && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    No payroll information available for your account.
                </div>
            )}
        </main>
    );
}
