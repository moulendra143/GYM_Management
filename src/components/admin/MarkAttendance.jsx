import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaClock, FaBolt } from "react-icons/fa";

const MarkAttendance = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-2xl font-semibold">Mark Attendance</h2>
            <p className="text-sm text-gray-500">
              Record member check-in details for a specific date and time.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/attendance")}
            className="border px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100"
          >
            ← Back to Attendance
          </button>
        </div>

        {/* FORM ROW */}
        <div className="grid grid-cols-3 gap-6 items-start">

          {/* MEMBER */}
          <div className="col-span-1">
            <label className="text-sm font-medium">
              Member <span className="text-red-500">*</span>
            </label>

            <div className="flex items-center border rounded-lg mt-1 px-2">
              <FaUser className="text-gray-400 mr-2" />
              <select
                value={member}
                onChange={(e) => setMember(e.target.value)}
                className="w-full p-2 outline-none bg-transparent"
              >
                <option value="">Select Member</option>
                <option>Rahul Kumar</option>
                <option>Arjun</option>
              </select>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Choose the member who is checking in.
            </p>
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm font-medium">Date</label>

            <div className="flex items-center border rounded-lg mt-1 px-2">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 outline-none"
              />
              <FaBolt className="text-gray-400 ml-2 cursor-pointer" />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Leave empty if your backend sets today by default.
            </p>
          </div>

          {/* TIME */}
          <div>
            <label className="text-sm font-medium">Time In</label>

            <div className="flex items-center border rounded-lg mt-1 px-2">
              <FaClock className="text-gray-400 mr-2" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 outline-none"
              />
              <FaBolt className="text-gray-400 ml-2 cursor-pointer" />
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Leave empty if your backend sets current time by default.
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex items-center gap-3">
          <button className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2">
            💾 Save Attendance
          </button>

          <button
            onClick={() => navigate("/admin/attendance")}
            className="border px-5 py-2 rounded-full flex items-center gap-2"
          >
            ✕ Cancel
          </button>
        </div>

        <p className="text-xs text-red-500 mt-2">
          * Required field.
        </p>

      </div>
    </div>
  );
};

export default MarkAttendance;