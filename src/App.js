import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Landing Page
import LandingPage from './components/LandingPage';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TrainerLogin from './components/auth/TrainerLogin';
import MemberLogin from './components/auth/MemberLogin';
import ForgetPassword from './components/auth/ForgetPassword';

// Member Components
import MemberLayout from './components/layout/MemberLayout';
import MemberDashboard from './components/member/Dashboard';  
import MemberProfile from './components/member/Profile';
import MemberMembership from './components/member/Membership';
import MemberAttendance from './components/member/Attendance';
import MemberPayments from './components/member/Payments';
import MemberWorkoutPlans from './components/member/WorkoutPlans';
import MemberFeedback from './components/member/Feedback';

// Admin Components
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageMembers from './components/admin/ManageMembers';
import ManagePlans from './components/admin/ManagePlans';
import ManageTrainers from './components/admin/ManageTrainers';
import ManagePayments from './components/admin/ManagePayments';
import ManageWorkoutPlans from './components/admin/ManageWorkoutPlans';
import ManageEnquiries from './components/admin/ManageEnquiries';
import ManageEquipment from './components/admin/ManageEquipment';



const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/member/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trainer/login" element={<TrainerLogin />} />
            <Route path="/member/login" element={<MemberLogin />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />

            {/* Member Routes */}
            <Route
              path="/member"
              element={
                <ProtectedRoute>
                  <MemberLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<MemberDashboard />} />
              <Route path="profile" element={<MemberProfile />} />
              <Route path="membership" element={<MemberMembership />} />
              <Route path="attendance" element={<MemberAttendance />} />
              <Route path="payments" element={<MemberPayments />} />
              <Route path="workout-plans" element={<MemberWorkoutPlans />} />
              <Route path="feedback" element={<MemberFeedback />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
            <Route path="/test" element={<AdminDashboard />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="members" element={<ManageMembers />} />
              <Route path="plans" element={<ManagePlans />} />
              <Route path="trainers" element={<ManageTrainers />} />
              <Route path="payments" element={<ManagePayments />} />
              <Route path="workout-plans" element={<ManageWorkoutPlans />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="equipment" element={<ManageEquipment />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;