const BASE_URL = 'http://localhost:3000';

// Fetch pending leave requests
export const getPendingLeaveRequests = async() => {
    const response = await fetch(`${BASE_URL}/leaveRequests?status=pending`);
    if (!response.ok) {
        throw new Error('Failed to fetch pending leave requests');
    }
    return response.json();
};

// Fetch approved leave requests
export const getApprovedLeaveRequests = async() => {
    const response = await fetch(`${BASE_URL}/leaveRequests?status=approved`);
    if (!response.ok) {
        throw new Error('Failed to fetch approved leave requests');
    }
    return response.json();
};

// Fetch rejected leave requests
export const getRejectedLeaveRequests = async() => {
    const response = await fetch(`${BASE_URL}/leaveRequests?status=rejected`);
    if (!response.ok) {
        throw new Error('Failed to fetch rejected leave requests');
    }
    return response.json();
};

// Get new leave request ID
export const getNewLeaveRequestId = async() => {
    const response = await fetch(`${BASE_URL}/leaveRequests`);
    if (!response.ok) {
        throw new Error('Failed to fetch leave requests for ID generation');
    }
    const leaveRequests = await response.json();
    if (leaveRequests.length === 0) {
        return 1;
    }
    else {
        return leaveRequests[leaveRequests.length - 1].id + 1;
    }
}

// Post a new leave request
export const postLeaveRequest = async(leaveRequestData) => {
    const response = await fetch(`${BASE_URL}/leaveRequests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveRequestData),
    });
    if (!response.ok) {
        throw new Error('Failed to submit leave request');
    }
    return response.json();
};

// Get Pending leave requests for an employee id
export const getPendingLeaveRequestsById = async(employeeId) => {
    const response = await fetch(`${BASE_URL}/leaveRequests?status=pending&employeeId=${employeeId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pending leave requests');
    }
    return response.json();

}

// Get Pending leave requests for an employee id
export const getOlderLeaveRequestsById = async(employeeId) => {
    const response = await fetch(`${BASE_URL}/leaveRequests?status=approved&rejected&employeeId=${employeeId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pending leave requests');
    }
    return response.json();

}

// Update leave request status
export const updateLeveRequestStatus = async(id, updatedStatus) => {
    const response = await fetch(`${BASE_URL}/leaveRequests/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStatus),
    });
    
    if (!response.ok) {
        throw new Error(`Failed to update leave request with id: ${id}`);
    }
    return response.json();
}


