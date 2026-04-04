import api from './api';

const memberService = {
    // Dashboard
    getDashboard: async () => {
        const response = await api.get('/member/dashboard');
        return response.data;
    },

    // Profile
    getProfile: async () => {
        const response = await api.get('/member/profile');
        return response.data;
    },
    updateProfile: async (profileData) => {
        const response = await api.put('/member/profile', profileData);
        return response.data;
    },

    // Membership
    getMembership: async () => {
        const response = await api.get('/member/membership');
        return response.data;
    },

    // Attendance
    getAttendance: async () => {
        const response = await api.get('/member/attendance');
        return response.data;
    },
    checkIn: async () => {
        const response = await api.post('/member/attendance/checkin');
        return response.data;
    },

    // Payments
    getPayments: async () => {
        const response = await api.get('/member/payments');
        return response.data;
    },

    // Workout Plans
    getWorkoutPlans: async () => {
        const response = await api.get('/member/workout-plans');
        return response.data;
    },

    // Feedback
    submitFeedback: async (feedback) => {
        const response = await api.post('/member/feedback', feedback);
        return response.data;
    },
};

export default memberService;