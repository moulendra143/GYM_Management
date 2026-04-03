import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const Attendance = () => {
  const attendanceData = [
    {
      id: 1,
      date: "17 Jan 2026",
      time: "12:43 a.m.",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            📅 My Attendance
          </h2>
          <p className="text-sm text-gray-500">
            Your daily check-ins and time-in history.
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border">

          {/* HEADER ROW */}
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-3 text-sm font-medium">
            <div>#</div>
            <div>Date</div>
            <div>Time In</div>
          </div>

          {/* DATA */}
          {attendanceData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-3 px-4 py-3 items-center border-t"
            >
              {/* INDEX */}
              <div>{item.id}</div>

              {/* DATE */}
              <div className="flex items-center gap-2 text-sm">
                <FaCalendarAlt className="text-gray-400" />
                {item.date}
              </div>

              {/* TIME */}
              <div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit">
                  <FaClock /> {item.time}
                </span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Attendance;