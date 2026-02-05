import { createContext, useContext, useState } from "react";

// Create AuthContext for managing authentication state
const AuthContext = createContext(null);

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
    const stored = (() => {
        try {
            return JSON.parse(localStorage.getItem('auth'));
        } catch (e) {
            return null;
        }
    })();

    const [user, setUser] = useState(stored?.user ?? null);
    const [isLoggedIn, setIsLoggedIn] = useState(stored?.isLoggedIn ?? false);
    const [role, setRole] = useState(stored?.role ?? null);

    // Function to log in a user
    const login = (userData) => {

        setUser(userData);
        setIsLoggedIn(true);
        setRole(userData.role);
        try {
            localStorage.setItem('auth', JSON.stringify({ user: userData, isLoggedIn: true, role: userData.role }));
        } catch (e) {
            console.warn('Failed to persist auth to localStorage', e);
        }
    };

    // Function to log out a user
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setRole(null);
        console.log("User logged out");
        try {
            localStorage.removeItem('auth');
        } catch (e) {
            console.warn('Failed to remove auth from localStorage', e);
        }
    };

    // Provide the auth state and functions to children components
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};