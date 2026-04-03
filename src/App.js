import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Landing Page
import LandingPage from './components/LandingPage';

// Auth Components
import Login from './components/auth/Login';
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
import AddMember from './components/admin/AddMember';
import ManagePlans from './components/admin/ManagePlans';
import AddPlan from './components/admin/AddPlan';
import ManageTrainers from './components/admin/ManageTrainers';
import AddTrainer from './components/admin/AddTrainer';
import ManagePayments from './components/admin/ManagePayments';
import RecordPayment from './components/admin/RecordPayment';
import Attendance from "./components/admin/AttendanceAdmin";
import MarkAttendance from "./components/admin/MarkAttendance";
import ManageWorkoutPlans from './components/admin/ManageWorkoutPlans';
import ViewWorkoutPlans from './components/admin/ViewWorkoutPlans';
import AddWorkoutPlan from "./components/admin/AddWorkoutPlan";
import ManageEnquiries from './components/admin/ManageEnquiries';
import ManageEquipment from './components/admin/ManageEquipment';
import AddEquipment from './components/admin/AddEquipment';
import ManageFeedback from "./components/admin/ManageFeedback";

// Trainer Components
import TrainerLayout from "./components/layout/TrainerLayout";
import TrainerDashboard from "./components/trainer/TrainerDashboard";
import TrainerMembers from "./components/trainer/TrainerMembers";
import TrainerWorkoutPlans from "./components/trainer/TrainerWorkoutPlans";
import TrainerAttendance from "./components/trainer/TrainerAttendance";
import TrainerFeedback from "./components/trainer/TrainerFeedback";

// ✅ FIXED Protected Route
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // ✅ CHANGED (landing page instead of login)
  }

  if (adminOnly && !isAdmin) {
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

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trainer/login" element={<TrainerLogin />} />
            <Route path="/member/login" element={<MemberLogin />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />

            {/* MEMBER ROUTES */}
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

            {/* ADMIN ROUTES */}
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
              <Route path="add-member" element={<AddMember />} />
              <Route path="plans" element={<ManagePlans />} />
              <Route path="add-plan" element={<AddPlan />} />
              <Route path="trainers" element={<ManageTrainers />} />
              <Route path="add-trainer" element={<AddTrainer />} />
              <Route path="payments" element={<ManagePayments />} />
              <Route path="record-payment" element={<RecordPayment />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="mark-attendance" element={<MarkAttendance />} />
              <Route path="workout-plans" element={<ManageWorkoutPlans />} />
              <Route path="view-workout-plan/:id" element={<ViewWorkoutPlans />} />
              <Route path="add-workout-plan" element={<AddWorkoutPlan />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="equipment" element={<ManageEquipment />} />
              <Route path="add-equipment" element={<AddEquipment />} />
              <Route path="feedback" element={<ManageFeedback />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* TRAINER ROUTES */}
            <Route
              path="/trainer"
              element={
                <ProtectedRoute>
                  <TrainerLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<TrainerDashboard />} />
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="members" element={<TrainerMembers />} />
              <Route path="workout-plans" element={<TrainerWorkoutPlans />} />
              <Route path="attendance" element={<TrainerAttendance />} />
              <Route path="feedback" element={<TrainerFeedback />} />
            </Route>

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;