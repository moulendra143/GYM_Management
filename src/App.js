import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import MemberLayout from './layouts/MemberLayout';
import TrainerLayout from './layouts/TrainerLayout';

// Public
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import MemberLogin from './pages/auth/MemberLogin';
import TrainerLogin from './pages/auth/TrainerLogin';
import ForgotPassword from './pages/auth/ForgetPassword';
import Register from './pages/auth/Register';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageMembers from './pages/admin/ManageMembers';
import AddMember from './pages/admin/AddMember';
import ManagePlans from './pages/admin/ManagePlans';
import AddPlan from './pages/admin/AddPlan';
import ManageTrainers from './pages/admin/ManageTrainers';
import AddTrainer from './pages/admin/AddTrainer';
import ManagePayments from './pages/admin/ManagePayments';
import RecordPayment from './pages/admin/RecordPayment';
import AttendanceAdmin from './pages/admin/AttendanceAdmin';
import MarkAttendance from './pages/admin/MarkAttendance';
import ManageEquipment from './pages/admin/ManageEquipment';
import AddEquipment from './pages/admin/AddEquipment';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageFeedback from './pages/admin/ManageFeedback';
import ManageWorkoutPlans from './pages/admin/ManageWorkoutPlans';
import AddWorkoutPlan from './pages/admin/AddWorkoutPlan';
import ViewWorkoutPlan from './pages/admin/ViewWorkoutPlans';

// Member
import Dashboard from './pages/member/Dashboard';
import Profile from './pages/member/Profile';
import Membership from './pages/member/Membership';
import Attendance from './pages/member/Attendance';
import Payments from './pages/member/Payments';
import WorkoutPlans from './pages/member/WorkoutPlans';
import Feedback from './pages/member/Feedback';

// Trainer
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerMembers from './pages/trainer/TrainerMembers';
import TrainerAttendance from './pages/trainer/TrainerAttendance';
import TrainerWorkoutPlans from './pages/trainer/TrainerWorkoutPlans';
import TrainerFeedback from './pages/trainer/TrainerFeedback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member/login" element={<MemberLogin />} />
        <Route path="/trainer/login" element={<TrainerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<ManageMembers />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="plans" element={<ManagePlans />} />
          <Route path="add-plan" element={<AddPlan />} />
          <Route path="trainers" element={<ManageTrainers />} />
          <Route path="add-trainer" element={<AddTrainer />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="record-payment" element={<RecordPayment />} />
          <Route path="attendance" element={<AttendanceAdmin />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="equipment" element={<ManageEquipment />} />
          <Route path="add-equipment" element={<AddEquipment />} />
          <Route path="enquiries" element={<ManageEnquiries />} />
          <Route path="feedback" element={<ManageFeedback />} />
          <Route path="workout-plans" element={<ManageWorkoutPlans />} />
          <Route path="add-workout-plan" element={<AddWorkoutPlan />} />
          <Route path="view-workout-plan/:id" element={<ViewWorkoutPlan />} />
        </Route>

        <Route path="/member" element={<MemberLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="membership" element={<Membership />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payments" element={<Payments />} />
          <Route path="workout-plans" element={<WorkoutPlans />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>

        <Route path="/trainer" element={<TrainerLayout />}>
          <Route path="dashboard" element={<TrainerDashboard />} />
          <Route path="members" element={<TrainerMembers />} />
          <Route path="attendance" element={<TrainerAttendance />} />
          <Route path="workout-plans" element={<TrainerWorkoutPlans />} />
          <Route path="feedback" element={<TrainerFeedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;