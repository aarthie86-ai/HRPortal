import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPayroll } from "../../api/payrollDetails.js";
import { getAllEmployees } from "../../api/employeeDetails.js";
import { useEffect } from "react";

export default function AddPayroll() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employeeId: "",
        bankName: "",
        accountNumber: "",
        currency: "USD",
        basicSalary: "",
        housingAllowance: "",
        transportAllowance: "",
        otherAllowance: "",
        paymentFrequency: "MONTHLY"
    });
    const [errors, setErrors] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const calculateGrossSalary = () => {
        const basic = parseFloat(formData.basicSalary) || 0;
        const housing = parseFloat(formData.housingAllowance) || 0;
        const transport = parseFloat(formData.transportAllowance) || 0;
        const other = parseFloat(formData.otherAllowance) || 0;
        return basic + housing + transport + other;
    };

    const validateField = (fieldName, value) => {
        let newErrors = { ...errors };

        switch (fieldName) {
            case "employeeId":
                if (!value || value.trim().length === 0) {
                    newErrors.employeeId = "Employee ID is required";
                } else {
                    delete newErrors.employeeId;
                }
                break;

            case "bankName":
                if (!value || value.trim().length === 0) {
                    newErrors.bankName = "Bank Name is required";
                } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                    newErrors.bankName = "Bank Name can only contain letters, spaces, hyphens, and apostrophes";
                } else {
                    delete newErrors.bankName;
                }
                break;

            case "accountNumber":
                if (!value || value.trim().length === 0) {
                    newErrors.accountNumber = "Account Number is required";
                } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    newErrors.accountNumber = "Account Number can only contain letters and numbers";
                } else if (value.length < 8) {
                    newErrors.accountNumber = "Account Number must be at least 8 characters";
                } else {
                    delete newErrors.accountNumber;
                }
                break;

            case "currency":
                if (!value || value.trim().length === 0) {
                    newErrors.currency = "Currency is required";
                } else {
                    delete newErrors.currency;
                }
                break;

            case "basicSalary":
                if (!value) {
                    newErrors.basicSalary = "Basic Salary is required";
                } else if (isNaN(value) || parseFloat(value) <= 0) {
                    newErrors.basicSalary = "Basic Salary must be a positive number";
                } else {
                    delete newErrors.basicSalary;
                }
                break;

            case "housingAllowance":
                if (!value) {
                    newErrors.housingAllowance = "Housing Allowance is required";
                } else if (isNaN(value) || parseFloat(value) < 0) {
                    newErrors.housingAllowance = "Housing Allowance must be a non-negative number";
                } else {
                    delete newErrors.housingAllowance;
                }
                break;

            case "transportAllowance":
                if (!value) {
                    newErrors.transportAllowance = "Transport Allowance is required";
                } else if (isNaN(value) || parseFloat(value) < 0) {
                    newErrors.transportAllowance = "Transport Allowance must be a non-negative number";
                } else {
                    delete newErrors.transportAllowance;
                }
                break;

            case "otherAllowance":
                if (!value) {
                    newErrors.otherAllowance = "Other Allowance is required";
                } else if (isNaN(value) || parseFloat(value) < 0) {
                    newErrors.otherAllowance = "Other Allowance must be a non-negative number";
                } else {
                    delete newErrors.otherAllowance;
                }
                break;

            case "paymentFrequency":
                if (!value || value.trim().length === 0) {
                    newErrors.paymentFrequency = "Payment Frequency is required";
                } else {
                    delete newErrors.paymentFrequency;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const fieldsToValidate = [
            "employeeId", "bankName", "accountNumber", "currency",
            "basicSalary", "housingAllowance", "transportAllowance",
            "otherAllowance", "paymentFrequency"
        ];

        fieldsToValidate.forEach(field => {
            validateField(field, formData[field]);
        });

        if (Object.keys(errors).length === 0) {
            setShowConfirmModal(true);
        }
    };

    const handleConfirmSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payrollData = {
                ...formData,
                basicSalary: parseFloat(formData.basicSalary),
                housingAllowance: parseFloat(formData.housingAllowance),
                transportAllowance: parseFloat(formData.transportAllowance),
                otherAllowance: parseFloat(formData.otherAllowance),
                grossSalary: calculateGrossSalary()
            };
            await addPayroll(payrollData);
            setShowConfirmModal(false);
            setIsSubmitting(false);
            navigate("/admin/view-all-payroll");
        } catch (error) {
            console.error("Error adding payroll:", error);
            setIsSubmitting(false);
        }
    };

    const handleCancelConfirm = () => {
        setShowConfirmModal(false);
    };

    const grossSalary = calculateGrossSalary();

    return (
        <main className="h-[calc(100vh-6rem)] mt-8 overflow-auto bg-[#eaebf3] w-[calc(100vw-16rem)]">
            <h1 className="text-2xl text-center mt-4 font-bold mb-4">Add Payroll</h1>

            {/* Smaller + Centered Form Container */}
            <div className="max-w-4xl mx-auto mb-8 p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Employee ID */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Employee ID *
                        </label>
                        <select
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.employeeId ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        >
                            <option value="">Select an Employee</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.employeeId}>
                                    {emp.employeeId} - {emp.firstName} {emp.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
                    </div>

                    {/* Bank Name */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Bank Name *
                        </label>
                        <input
                            name="bankName"
                            type="text"
                            required
                            value={formData.bankName}
                            onChange={handleChange}
                            placeholder="Bank Name"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.bankName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        />
                        {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                    </div>

                    {/* Account Number */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Account Number *
                        </label>
                        <input
                            name="accountNumber"
                            type="text"
                            required
                            value={formData.accountNumber}
                            onChange={handleChange}
                            placeholder="Account Number"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.accountNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        />
                        {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                    </div>

                    {/* Currency */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Currency *
                        </label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.currency ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="INR">INR</option>
                            <option value="AED">AED</option>
                        </select>
                        {errors.currency && <p className="text-red-500 text-xs mt-1">{errors.currency}</p>}
                    </div>

                    {/* Basic Salary */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Basic Salary *
                        </label>
                        <input
                            name="basicSalary"
                            type="number"
                            required
                            value={formData.basicSalary}
                            onChange={handleChange}
                            placeholder="Basic Salary"
                            min="0"
                            step="0.01"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.basicSalary ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        />
                        {errors.basicSalary && <p className="text-red-500 text-xs mt-1">{errors.basicSalary}</p>}
                    </div>

                    {/* Housing Allowance */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Housing Allowance *
                        </label>
                        <input
                            name="housingAllowance"
                            type="number"
                            required
                            value={formData.housingAllowance}
                            onChange={handleChange}
                            placeholder="Housing Allowance"
                            min="0"
                            step="0.01"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.housingAllowance ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        />
                        {errors.housingAllowance && <p className="text-red-500 text-xs mt-1">{errors.housingAllowance}</p>}
                    </div>

                    {/* Transport Allowance */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Transport Allowance *
                        </label>
                        <input
                            name="transportAllowance"
                            type="number"
                            required
                            value={formData.transportAllowance}
                            onChange={handleChange}
                            placeholder="Transport Allowance"
                            min="0"
                            step="0.01"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.transportAllowance ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        />
                        {errors.transportAllowance && <p className="text-red-500 text-xs mt-1">{errors.transportAllowance}</p>}
                    </div>

                    {/* Other Allowance */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Other Allowance *
                        </label>
                        <input
                            name="otherAllowance"
                            type="number"
                            required
                            value={formData.otherAllowance}
                            onChange={handleChange}
                            placeholder="Other Allowance"
                            min="0"
                            step="0.01"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.otherAllowance ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        />
                        {errors.otherAllowance && <p className="text-red-500 text-xs mt-1">{errors.otherAllowance}</p>}
                    </div>

                    {/* Gross Salary */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Gross Salary
                        </label>
                        <input
                            type="number"
                            value={grossSalary.toFixed(2)}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
                        />
                        <p className="text-gray-500 text-xs mt-1">
                            Auto-calculated: Basic + Housing + Transport + Other
                        </p>
                    </div>

                    {/* Payment Frequency */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Payment Frequency *
                        </label>
                        <select
                            name="paymentFrequency"
                            value={formData.paymentFrequency}
                            onChange={handleChange}
                            required
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.paymentFrequency ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                                }`}
                        >
                            <option value="MONTHLY">Monthly</option>
                            <option value="BIWEEKLY">Bi-weekly</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="ANNUAL">Annual</option>
                        </select>
                        {errors.paymentFrequency && <p className="text-red-500 text-xs mt-1">{errors.paymentFrequency}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className={`w-1/3 text-center py-2 px-4 rounded-lg transition duration-300 text-white font-bold ${Object.keys(errors).length > 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#315a94] hover:bg-[#1f406d]'
                                }`}
                        >
                            Add Payroll
                        </button>
                    </div>

                </form>
            </div>
            {/* Delete Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 overflow-hidden">
                        <h2 className="text-xl bg-[#315a94] text-white text-center font-bold py-4 px-6">Confirm Submission</h2>
                        <div className="p-6">
                            <p className="text-center text-gray-600 mb-6">
                                Are you sure you want to submit the payroll details?
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleConfirmSubmit}
                                    disabled={isSubmitting}
                                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
                                >
                                    {isSubmitting ? "Submitting..." : "Yes"}
                                </button>
                                <button
                                    onClick={handleCancelConfirm}
                                    disabled={isSubmitting}
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

