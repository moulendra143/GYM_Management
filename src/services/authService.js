import api from './api';

const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        if (response.data.success) {
            const { token, user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: response.data.message };
    },

    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.success) {
            return { success: true, user: response.data.data.user, member: response.data.data.member };
        }
        return { success: false, message: response.data.message };
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    isAdmin: () => {
        const user = authService.getCurrentUser();
        return user && user.role === 'Admin';
    },
};

export default authService;