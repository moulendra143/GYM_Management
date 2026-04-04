import {
  FaUsers,
  FaUserTie,
  FaMoneyBill,
  FaCalendarAlt,
  FaTools,
  FaEnvelope,
  FaDumbbell,
  FaChartBar,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ added

  const handleLogout = () => {
    localStorage.removeItem("token"); // or your auth key
    navigate("/"); // redirect
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaChartBar /> },
    { name: "Members", path: "/admin/members", icon: <FaUsers /> },
    { name: "Plans", path: "/admin/plans", icon: <FaClipboardList /> },
    { name: "Trainers", path: "/admin/trainers", icon: <FaUserTie /> },
    { name: "Payments", path: "/admin/payments", icon: <FaMoneyBill /> },
    { name: "Attendance", path: "/admin/attendance", icon: <FaCalendarAlt /> },
    { name: "Equipment", path: "/admin/equipment", icon: <FaTools /> },
    { name: "Enquiries", path: "/admin/enquiries", icon: <FaEnvelope /> },
    { name: "Workout Plans", path: "/admin/workout-plans", icon: <FaDumbbell /> },
    { name: "Feedback", path: "/admin/feedback", icon: <FaUsers /> },
  ];

  return (
    <div className="bg-slate-900 text-gray-200 shadow-md px-6 py-3 flex justify-between items-center">

      {/* LOGO */}
      <h1 className="text-lg font-bold text-white flex items-center gap-2">
        🏋️ My Gym
      </h1>

      {/* NAV ITEMS */}
      <div className="hidden md:flex gap-4 text-sm">
        {navItems.map((item, i) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition 
              ${
                active
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* ✅ FIXED LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-white flex items-center gap-2"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default Navbar;