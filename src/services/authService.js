import api from './api';

const authService = {

    // ✅ FIXED LOGIN
    login: async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });

            console.log("📦 BACKEND RESPONSE:", response.data);

            if (response.data.success) {
                const { token, user } = response.data.data;

                // ✅ Store in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // ✅ IMPORTANT: return FULL structure
                return {
                    success: true,
                    data: {
                        token,
                        user
                    }
                };
            }

            return {
                success: false,
                message: response.data.message
            };

        } catch (error) {
            console.error("❌ LOGIN API ERROR:", error.response?.data || error.message);

            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    },

    // REGISTER
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);

        if (response.data.success) {
            return {
                success: true,
                data: response.data.data
            };
        }

        return {
            success: false,
            message: response.data.message
        };
    },

    // LOGOUT
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // GET USER
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // AUTH CHECK
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // ✅ FIXED ROLE CHECK (case safe)
    isAdmin: () => {
        const user = authService.getCurrentUser();
        return user?.role?.toLowerCase().trim() === 'admin';
    },
};

export default authService;