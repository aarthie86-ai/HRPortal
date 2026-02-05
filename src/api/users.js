// API calls related to employee details
const BASE_URL = 'http://localhost:3000';

// Add new user
export const addNewUser = async(userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to add employee');
    }
    return response.json();
};
