import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

// User login
export const loginUser = async (credentials) => {
    // http://localhost:3000/users?email=alice@example.com&password=alice123
    try {
        const response = await axios.get(`${BASE_URL}/users?email=${credentials.email}&password=${credentials.password}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.data.length === 0) {
            return Promise.reject(new Error('Invalid email or password'));
        }
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }   
};

// User registration
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

