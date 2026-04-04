import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaDumbbell,
  FaClipboardList,
  FaCommentDots
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* TOP CARD */}
      <div
        className="rounded-2xl p-6 text-white mb-6"
        style={{
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ef4444)"
        }}
      >
        <p className="text-sm opacity-90">Member Dashboard</p>
        <h2 className="text-2xl font-bold mt-1">
          Welcome, ravi kumar
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Track your attendance, payments, membership, and workout plans in one place.
        </p>

        <div className="flex gap-2 mt-4 justify-end">
          <button className="bg-white text-black px-3 py-1 rounded-full text-sm">
            ravi
          </button>
          <button
            onClick={() => navigate("/member/profile")}
            className="bg-white text-black px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            <FaUser /> My Profile
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* ATTENDANCE */}
        <div
          className="relative rounded-2xl p-5 text-white"
          style={{ background: "linear-gradient(90deg, #0ea5e9, #3b82f6)" }}
        >
          <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-lg">
            <FaCalendarCheck />
          </div>

          <p className="text-sm opacity-90">Total Attendance</p>
          <h2 className="text-3xl font-bold mt-1">1</h2>
          <p className="text-sm mt-1 opacity-90">Check-in history</p>

          <button
            onClick={() => navigate("/member/attendance")}
            className="mt-4 bg-white text-black px-3 py-1 rounded-full text-sm"
          >
            → View Attendance
          </button>
        </div>

        {/* PAYMENTS */}
        <div
          className="relative rounded-2xl p-5 text-white"
          style={{ background: "linear-gradient(90deg, #22c55e, #16a34a)" }}
        >
          <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-lg">
            <FaMoneyBillWave />
          </div>

          <p className="text-sm opacity-90">Total Payments</p>
          <h2 className="text-3xl font-bold mt-1">1</h2>
          <p className="text-sm mt-1 opacity-90">Payment records</p>

          <button
            onClick={() => navigate("/member/payments")}
            className="mt-4 bg-white text-black px-3 py-1 rounded-full text-sm"
          >
            → View Payments
          </button>
        </div>

        {/* WORKOUT */}
        <div
          className="relative rounded-2xl p-5 text-white"
          style={{ background: "linear-gradient(90deg, #f97316, #ef4444)" }}
        >
          <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-lg">
            <FaDumbbell />
          </div>

          <p className="text-sm opacity-90">Workout Plans</p>
          <h2 className="text-3xl font-bold mt-1">1</h2>
          <p className="text-sm mt-1 opacity-90">Plans assigned</p>

          <button
            onClick={() => navigate("/member/workout-plans")}
            className="mt-4 bg-white text-black px-3 py-1 rounded-full text-sm"
          >
            → View Plans
          </button>
        </div>

      </div>

      {/* QUICK ACTIONS HEADER */}
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          ⚡ Quick Actions
        </h3>
        <p className="text-sm text-gray-500">
          Open your common pages quickly.
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* MEMBERSHIP */}
        <div
          onClick={() => navigate("/member/membership")}
          className="cursor-pointer rounded-2xl p-4 shadow hover:shadow-md flex items-center justify-between"
          style={{ background: "#eff6ff" }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-200 p-3 rounded-lg">
              <FaDumbbell className="text-blue-700" />
            </div>
            <div>
              <h4 className="font-semibold">My Membership</h4>
              <p className="text-sm text-gray-600">
                View plan details & validity
              </p>
            </div>
          </div>
          →
        </div>

        {/* PROFILE */}
        <div
          onClick={() => navigate("/member/profile")}
          className="cursor-pointer rounded-2xl p-4 shadow hover:shadow-md flex items-center justify-between"
          style={{ background: "#ecfdf5" }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-200 p-3 rounded-lg">
              <FaUser className="text-green-700" />
            </div>
            <div>
              <h4 className="font-semibold">My Profile</h4>
              <p className="text-sm text-gray-600">
                Manage personal details
              </p>
            </div>
          </div>
          →
        </div>

        {/* FEEDBACK */}
        <div
          onClick={() => navigate("/member/feedback")}
          className="cursor-pointer rounded-2xl p-4 shadow hover:shadow-md flex items-center justify-between"
          style={{ background: "#faf5ff" }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-200 p-3 rounded-lg">
              <FaCommentDots className="text-purple-700" />
            </div>
            <div>
              <h4 className="font-semibold">Feedback</h4>
              <p className="text-sm text-gray-600">
                Share your experience
              </p>
            </div>
          </div>
          →
        </div>

        {/* ATTENDANCE */}
        <div
          onClick={() => navigate("/member/attendance")}
          className="cursor-pointer rounded-2xl p-4 shadow hover:shadow-md flex items-center justify-between"
          style={{ background: "#fefce8" }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-yellow-200 p-3 rounded-lg">
              <FaCalendarCheck className="text-yellow-700" />
            </div>
            <div>
              <h4 className="font-semibold">Attendance</h4>
              <p className="text-sm text-gray-600">
                Check attendance logs
              </p>
            </div>
          </div>
          →
        </div>

        {/* PAYMENTS */}
        <div
          onClick={() => navigate("/member/payments")}
          className="cursor-pointer rounded-2xl p-4 shadow hover:shadow-md flex items-center justify-between"
          style={{ background: "#f0fdf4" }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-300 p-3 rounded-lg">
              <FaMoneyBillWave className="text-green-800" />
            </div>
            <div>
              <h4 className="font-semibold">Payments</h4>
              <p className="text-sm text-gray-600">
                View payment history
              </p>
            </div>
          </div>
          →
        </div>

        {/* WORKOUT */}
        <div
          onClick={() => navigate("/member/workout-plans")}
          className="cursor-pointer rounded-2xl p-4 shadow hover:shadow-md flex items-center justify-between"
          style={{ background: "#fff7ed" }}
        >
          <div className="flex items-center gap-3">
            <div className="bg-orange-200 p-3 rounded-lg">
              <FaClipboardList className="text-orange-700" />
            </div>
            <div>
              <h4 className="font-semibold">Workout Plans</h4>
              <p className="text-sm text-gray-600">
                View assigned plans
              </p>
            </div>
          </div>
          →
        </div>

      </div>

    </div>
  );
};

export default Dashboard;