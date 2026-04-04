import React from "react";
import {
  FaUsers,
  FaMoneyBill,
  FaCalendarAlt,
  FaDumbbell,
  FaArrowRight,
  FaClipboardList,
  FaUserTie,
  FaTools,
  FaEnvelope,
  FaFire,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-indigo-100 to-purple-200">

      {/* MAIN CONTENT */}
      <div className="px-4 md:px-8 py-6">
        <div className="w-full bg-white/60 backdrop-blur-xl rounded-3xl p-6 space-y-8 shadow-xl">

          {/* HERO */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 rounded-2xl text-white flex justify-between items-center shadow-lg">
            <div>
              <div className="flex items-center gap-3">
                <FaFire className="text-4xl" />
                <h2 className="text-4xl font-bold">Overview & Controls</h2>
              </div>
              <p className="text-sm mt-2 opacity-90">
                Manage members, payments, plans and track performance 🚀
              </p>
            </div>

            {/* FIXED: Add Member navigation */}
            <Link
              to="/admin/add-member"
              className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition"
            >
              ➕ Add Member
            </Link>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6">

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
                className={`relative bg-gradient-to-br ${card.color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition`}
              >
                <div className="absolute top-4 right-4 bg-white/20 p-3 rounded-full text-xl backdrop-blur">
                  {card.icon}
                </div>

                <h4 className="text-sm opacity-90">{card.title}</h4>
                <h2 className="text-4xl font-bold mt-2">{card.value}</h2>

                <p className="text-sm mt-2 opacity-90">{card.desc}</p>

                <Link
                  to={card.link}
                  className="mt-5 inline-flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium shadow hover:bg-gray-100 transition"
                >
                  {card.btn} <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>

          {/* QUICK ACCESS */}
          <div>
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              ⚡ Quick Access
            </h3>

            <div className="grid md:grid-cols-4 gap-6">

              {[
                {
                  title: "Manage Members",
                  desc: "Add, edit, search",
                  icon: <FaUsers />,
                  bg: "bg-blue-100",
                  link: "/admin/members",
                },
                {
                  title: "Membership Plans",
                  desc: "Fee, duration",
                  icon: <FaClipboardList />,
                  bg: "bg-green-100",
                  link: "/admin/plans",
                },
                {
                  title: "Trainers",
                  desc: "Profiles, shifts",
                  icon: <FaUserTie />,
                  bg: "bg-purple-100",
                  link: "/admin/trainers",
                },
                {
                  title: "Payments",
                  desc: "Paid / Pending",
                  icon: <FaMoneyBill />,
                  bg: "bg-orange-100",
                  link: "/admin/payments",
                },
                {
                  title: "Attendance",
                  desc: "Daily check-ins",
                  icon: <FaCalendarAlt />,
                  bg: "bg-indigo-100",
                  link: "/admin/attendance",
                },
                {
                  title: "Equipment",
                  desc: "Inventory",
                  icon: <FaTools />,
                  bg: "bg-teal-100",
                  link: "/admin/equipment",
                },
                {
                  title: "Enquiries",
                  desc: "New / resolved",
                  icon: <FaEnvelope />,
                  bg: "bg-pink-100",
                  link: "/admin/enquiries",
                },
                {
                  title: "Workout Plans",
                  desc: "Create & manage",
                  icon: <FaDumbbell />,
                  bg: "bg-yellow-100",
                  link: "/admin/workouts",
                },
              ].map((item, i) => (
                <Link
                  to={item.link}
                  key={i}
                  className={`${item.bg} p-5 rounded-2xl shadow hover:shadow-lg hover:scale-105 transition flex justify-between items-center`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-3 rounded-full shadow text-gray-700 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                  </div>

                  <FaArrowRight className="text-gray-600" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;