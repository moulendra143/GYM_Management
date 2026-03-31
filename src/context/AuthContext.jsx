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

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: authService.isAuthenticated(),
        isAdmin: authService.isAdmin(),
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};