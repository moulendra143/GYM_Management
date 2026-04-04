import React, { useState } from "react";
import {
  FaMoneyBill,
  FaUser,
  FaFilter,
  FaCalendarAlt,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ManagePayments = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState("All Members");
  const [status, setStatus] = useState("All Status");

  const payments = [
    {
      name: "Rahul Kumar",
      username: "rahul",
      plan: "Monthly",
      amount: 1200,
      date: "16 Jan 2026",
      mode: "Cash",
      status: "Paid",
      notes: "full paid",
    },
    {
      name: "ABCD",
      username: "abcd",
      plan: "Monthly",
      amount: 500,
      date: "10 Dec 2025",
      mode: "Cash",
      status: "Paid",
      notes: "700 remaining",
    },
  ];

  const filtered = payments.filter((p) => {
    return (
      (member === "All Members" || p.name === member) &&
      (status === "All Status" || p.status === status)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 w-full px-2 md:px-4 py-6">
      <div className="w-full bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaMoneyBill /> Payments
            </h2>
            <p className="text-gray-500 text-sm">
              View and filter payments by member and status.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/record-payment")}
            className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Record Payment
          </button>
        </div>

        {/* FILTER SECTION */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          {/* MEMBER */}
          <div>
            <label className="text-sm text-gray-500">Member</label>
            <select
              value={member}
              onChange={(e) => setMember(e.target.value)}
              className="w-full border p-2 rounded-lg mt-1"
            >
              <option>All Members</option>
              <option>Rahul Kumar</option>
              <option>ABCD</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm text-gray-500">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded-lg mt-1"
            >
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>

          {/* FILTER BUTTON */}
          <div className="flex items-end">
            <button className="w-full border rounded-lg flex items-center justify-center gap-2 h-[42px]">
              <FaFilter /> Filter
            </button>
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Member</th>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Mode</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Notes</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500 flex gap-1">
                      <FaUser /> {p.username}
                    </div>
                  </td>

                  <td className="p-3">
                    <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                      {p.plan}
                    </span>
                  </td>

                  <td className="p-3 font-semibold">₹ {p.amount}</td>

                  <td className="p-3 flex items-center gap-2">
                    <FaCalendarAlt /> {p.date}
                  </td>

                  <td className="p-3">
                    <span className="bg-gray-300 px-2 py-1 rounded-full text-xs">
                      {p.mode}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      {p.status}
                    </span>
                  </td>

                  <td className="p-3 text-gray-500">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManagePayments;