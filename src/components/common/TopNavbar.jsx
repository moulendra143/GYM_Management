import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FaTachometerAlt,
  FaUser,
  FaDumbbell,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClipboardList,
  FaComment,
  FaSignOutAlt
} from "react-icons/fa";

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { path: "/member/dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { path: "/member/profile", icon: FaUser, label: "My Profile" },
    { path: "/member/membership", icon: FaDumbbell, label: "Membership" },
    { path: "/member/attendance", icon: FaCalendarCheck, label: "Attendance" },
    { path: "/member/payments", icon: FaMoneyBillWave, label: "Payments" },
    { path: "/member/workout-plans", icon: FaClipboardList, label: "Workout Plans" },
    { path: "/member/feedback", icon: FaComment, label: "Feedback" },
  ];

  return (
    <div className="bg-[#0f172a] text-white px-6 py-3 flex items-center justify-between shadow">

      {/* LEFT LOGO */}
      <div className="flex items-center gap-2 font-bold text-lg">
        🏋️ My Gym
      </div>

      {/* CENTER NAV LINKS */}
      <div className="flex items-center gap-6 text-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* RIGHT LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded-lg flex items-center gap-2 text-sm"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default TopNavbar;