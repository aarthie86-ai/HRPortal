// API calls related to employee details
const BASE_URL = 'http://localhost:3000';

// Fetch employee details by ID
export const getEmployeeDetailsById = async(employeeId) => {
    const response = await fetch(`${BASE_URL}/employees?employeeId=${employeeId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch employee details with id: ${employeeId}`);
    }
    return response.json();
};

// Update employee details
export const updateEmployeeDetails = async(employeeId, updatedStatus) => {
    const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStatus),
    });
    
    if (!response.ok) {
        throw new Error(`Failed to update employee details with id: ${employeeId}`);
    }
    return response.json();
}

// Get all employees
export const getAllEmployees = async() => {
    const response = await fetch(`${BASE_URL}/employees`);
    if (!response.ok) {
        throw new Error(`Failed to fetch all employee details`);
    }
    return response.json();
};

// Delete an employee by ID
export const deleteEmployee = async(employeeId) => {
    const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete the employee');
    }
    return response.json();
};

// Add new employee
export const addEmployee = async(employee) => {
    const response = await fetch(`${BASE_URL}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });
    if (!response.ok) {
        throw new Error('Failed to add employee');
    }
    return response.json();
};
