import api from './api';

const adminService = {
    // Dashboard
    getDashboardStats: async () => {
        const response = await api.get('/admin/dashboard');
        return response.data;
    },

    // Members
    getMembers: async () => {
        const response = await api.get('/admin/members');
        return response.data;
    },
    addMember: async (memberData) => {
        const response = await api.post('/admin/members', memberData);
        return response.data;
    },
    updateMember: async (id, memberData) => {
        const response = await api.put(`/admin/members/${id}`, memberData);
        return response.data;
    },
    deleteMember: async (id) => {
        const response = await api.delete(`/admin/members/${id}`);
        return response.data;
    },
    assignMembership: async (assignmentData) => {
        const response = await api.post('/admin/memberships/assign', assignmentData);
        return response.data;
    },

    // Membership Plans
    getPlans: async () => {
        const response = await api.get('/admin/membership-plans');
        return response.data;
    },
    addPlan: async (planData) => {
        const response = await api.post('/admin/membership-plans', planData);
        return response.data;
    },
    updatePlan: async (id, planData) => {
        const response = await api.put(`/admin/membership-plans/${id}`, planData);
        return response.data;
    },
    deletePlan: async (id) => {
        const response = await api.delete(`/admin/membership-plans/${id}`);
        return response.data;
    },

    // Trainers
    getTrainers: async () => {
        const response = await api.get('/admin/trainers');
        return response.data;
    },
    addTrainer: async (trainerData) => {
        const response = await api.post('/admin/trainers', trainerData);
        return response.data;
    },
    updateTrainer: async (id, trainerData) => {
        const response = await api.put(`/admin/trainers/${id}`, trainerData);
        return response.data;
    },
    deleteTrainer: async (id) => {
        const response = await api.delete(`/admin/trainers/${id}`);
        return response.data;
    },

    // Payments
    getAllPayments: async (memberFilter = '') => {
        const response = await api.get(`/admin/payments?memberFilter=${memberFilter}`);
        return response.data;
    },
    recordPayment: async (paymentData) => {
        const response = await api.post('/admin/payments', paymentData);
        return response.data;
    },

    // Workout Plans
    getAllWorkoutPlans: async (memberId = null) => {
        const url = memberId ? `/admin/workout-plans?memberId=${memberId}` : '/admin/workout-plans';
        const response = await api.get(url);
        return response.data;
    },
    addWorkoutPlan: async (planData) => {
        const response = await api.post('/admin/workout-plans', planData);
        return response.data;
    },

    // Enquiries
    getEnquiries: async () => {
        const response = await api.get('/admin/enquiries');
        return response.data;
    },
    resolveEnquiry: async (id) => {
        const response = await api.put(`/admin/enquiries/${id}/resolve`);
        return response.data;
    },

    // Equipment
    getEquipment: async () => {
        const response = await api.get('/admin/equipment');
        return response.data;
    },
    addEquipment: async (equipmentData) => {
        const response = await api.post('/admin/equipment', equipmentData);
        return response.data;
    },
    updateEquipment: async (id, equipmentData) => {
        const response = await api.put(`/admin/equipment/${id}`, equipmentData);
        return response.data;
    },
    deleteEquipment: async (id) => {
        const response = await api.delete(`/admin/equipment/${id}`);
        return response.data;
    },
};

export default adminService;