import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Load user from localStorage on refresh
    useEffect(() => {
        const currentUser = authService.getCurrentUser();

        if (currentUser) {
            console.log("🔁 Loaded user from localStorage:", currentUser);
            setUser(currentUser);
        }

        setLoading(false);
    }, []);

    // ✅ LOGIN (FIXED + DEBUG)
    const login = async (username, password) => {
        try {
            const result = await authService.login(username, password);

            console.log("🔥 FULL LOGIN RESPONSE:", result);

            if (result.success) {
                // ✅ FIX: correct backend structure
                const userData = result.data.user;
                const token = result.data.token;

                console.log("✅ Extracted User:", userData);
                console.log("🎭 Role from backend:", userData.role);

                // ✅ Save in localStorage
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", token);

                setUser(userData);

                // return normalized response
                return {
                    success: true,
                    user: userData,
                    token
                };
            }

            return result;

        } catch (error) {
            console.error("❌ LOGIN ERROR:", error);
            return { success: false, message: "Login failed" };
        }
    };

    // ✅ LOGOUT
    const logout = () => {
        console.log("🚪 Logging out user");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,

        // ✅ FIXED ROLE CHECK (case insensitive)
        isAdmin: user?.role?.toLowerCase().trim() === "admin",

        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};