import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaCalendarCheck,
  FaCommentDots,
  FaSignOutAlt
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const TrainerNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-[#0f172a] text-white px-6 py-3 flex items-center justify-between shadow">

      {/* LOGO */}
      <div className="flex items-center gap-2 font-bold text-lg">
        🏋️ My Gym
      </div>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6 text-sm">

        <Link to="/trainer/dashboard" className="flex items-center gap-2">
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link to="/trainer/members" className="flex items-center gap-2">
          <FaUsers /> Members
        </Link>

        <Link to="/trainer/workout-plans" className="flex items-center gap-2">
          <FaClipboardList /> Workout Plans
        </Link>

        <Link to="/trainer/attendance" className="flex items-center gap-2">
          <FaCalendarCheck /> Attendance
        </Link>

        <Link to="/trainer/feedback" className="flex items-center gap-2">
          <FaCommentDots /> Feedback
        </Link>

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded-lg flex items-center gap-2 text-sm"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default TrainerNavbar;