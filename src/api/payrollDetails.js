// API calls related to payroll details
const BASE_URL = 'http://localhost:3000';

// Get all payroll records
export const getAllPayroll = async () => {
    const response = await fetch(`${BASE_URL}/payroll`);
    if (!response.ok) {
        throw new Error('Failed to fetch payroll records');
    }
    return response.json();
};

// Get payroll by ID
export const getPayrollById = async (employeeId) => {
    const response = await fetch(`${BASE_URL}/payroll?employeeId=${employeeId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch payroll record with id: ${employeeId}`);
    }
    return response.json();
};

// Add new payroll record
export const addPayroll = async (payrollData) => {
    const response = await fetch(`${BASE_URL}/payroll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payrollData),
    });
    if (!response.ok) {
        throw new Error('Failed to add payroll record');
    }
    return response.json();
};

// Update payroll record
export const updatePayroll = async (payrollId, updatedPayroll) => {
    const response = await fetch(`${BASE_URL}/payroll/${payrollId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPayroll),
    });
    if (!response.ok) {
        throw new Error(`Failed to update payroll record with id: ${payrollId}`);
    }
    return response.json();
};

// Delete payroll record
export const deletePayroll = async (payrollId) => {
    const response = await fetch(`${BASE_URL}/payroll/${payrollId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete payroll record');
    }
    return response.json();
};
