import React from "react";
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
  FaArrowRight,
  FaFire,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();

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
    { name: "Feedbacks", path: "/admin/feedbacks", icon: <FaUsers /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-200 via-indigo-100 to-purple-200">

      {/* NAVBAR */}
      <div className="bg-slate-900 text-gray-200 px-6 py-3 flex justify-between items-center">
        <h1 className="text-white font-bold flex gap-2">🏋️ My Gym</h1>

        <div className="hidden md:flex gap-3 text-sm">
          {navItems.map((item, i) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        <button className="bg-red-500 px-3 py-2 rounded-md text-white flex items-center gap-2">
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-grow p-6">
        <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 space-y-6 shadow-lg">

          {/* HERO */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 rounded-2xl text-white flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3">
                <FaFire className="text-4xl" />
                <h2 className="text-4xl font-bold">Overview & Controls</h2>
              </div>
              <p className="text-sm mt-2 opacity-90">
                Manage members, payments, plans and track performance 🚀
              </p>
            </div>

            <button className="bg-white text-black px-5 py-2 rounded-md font-semibold shadow">
              ➕ Add Member
            </button>
          </div>

          {/* STATS (LONG STYLE) */}
          <div className="grid md:grid-cols-4 gap-5">

            {[
              {
                title: "Total Members",
                value: "4",
                desc: "All registered members",
                color: "from-blue-500 to-cyan-500",
                link: "/admin/members",
                btn: "Manage",
                icon: <FaUsers />,
              },
              {
                title: "Active Memberships",
                value: "1",
                desc: "Currently active plans",
                color: "from-green-500 to-emerald-500",
                link: "/admin/plans",
                btn: "Plans",
                icon: <FaDumbbell />,
              },
              {
                title: "Today Registrations",
                value: "0",
                desc: "New signups today",
                color: "from-purple-500 to-indigo-500",
                link: "/admin/members",
                btn: "View",
                icon: <FaCalendarAlt />,
              },
              {
                title: "Pending Payments",
                value: "1",
                desc: "Require follow-up",
                color: "from-orange-500 to-amber-500",
                link: "/admin/payments",
                btn: "Payments",
                icon: <FaMoneyBill />,
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${card.color} text-white p-6 rounded-2xl shadow relative`}
              >
                {/* ICON */}
                <div className="absolute top-4 right-4 bg-white/20 p-3 rounded-full text-xl">
                  {card.icon}
                </div>

                <h4 className="text-sm font-medium">{card.title}</h4>
                <h2 className="text-4xl font-bold mt-2">{card.value}</h2>

                <p className="text-sm mt-2 flex items-center gap-2 opacity-90">
                  {card.desc}
                </p>

                {/* SMALL BUTTON */}
                <Link
                  to={card.link}
                  className="mt-4 inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-full text-xs font-medium shadow"
                >
                  → {card.btn}
                </Link>
              </div>
            ))}
          </div>

          {/* QUICK ACCESS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              ⚡ Quick Access
            </h3>

            <div className="grid md:grid-cols-4 gap-5">

              {[
                { title: "Manage Members", desc: "Add, edit, search", icon: <FaUsers />, color: "bg-blue-100" },
                { title: "Membership Plans", desc: "Fee, duration", icon: <FaClipboardList />, color: "bg-green-100" },
                { title: "Trainers", desc: "Profiles, shifts", icon: <FaUserTie />, color: "bg-purple-100" },
                { title: "Payments", desc: "Paid / Pending", icon: <FaMoneyBill />, color: "bg-orange-100" },
                { title: "Attendance", desc: "Daily check-ins", icon: <FaCalendarAlt />, color: "bg-indigo-100" },
                { title: "Equipment", desc: "Inventory", icon: <FaTools />, color: "bg-teal-100" },
                { title: "Enquiries", desc: "New / resolved", icon: <FaEnvelope />, color: "bg-pink-100" },
                { title: "Workout Plans", desc: "Create & manage", icon: <FaDumbbell />, color: "bg-yellow-100" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${item.color} p-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full shadow text-gray-700">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  </div>

                  <div className="text-gray-600">
                    <FaArrowRight />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-400 text-center py-4">
        © 2024 My Gym
      </footer>
    </div>
  );
};

export default AdminDashboard;