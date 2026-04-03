import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const result = await authService.login(username, password);
        if (result.success) {
            setUser(result.user);
        }
        return result;
    };

    // ✅ FIXED LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null); // ✅ THIS IS IMPORTANT
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user, // ✅ FIXED (based on state)
        isAdmin: user?.role === "admin", // adjust if needed
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};