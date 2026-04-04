import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendanceAdmin = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState("2026-01-16");
  const [member, setMember] = useState("All Members");
  const [filteredData, setFilteredData] = useState([]);

  const attendanceData = [
    {
      id: 1,
      name: "Rahul Kumar",
      username: "rahul",
      date: "2026-01-16",
      timeIn: "08:30",
    },
    {
      id: 2,
      name: "Arjun",
      username: "arjun",
      date: "2026-01-16",
      timeIn: "09:10",
    },
  ];

  // ✅ FILTER LOGIC
  const handleFilter = () => {
    let data = attendanceData;

    if (date) {
      data = data.filter((item) => item.date === date);
    }

    if (member !== "All Members") {
      data = data.filter((item) => item.name === member);
    }

    setFilteredData(data);
  };

  // ✅ RESET LOGIC
  const handleReset = () => {
    setDate("2026-01-16");
    setMember("All Members");
    setFilteredData([]);
  };

  const displayData = filteredData.length ? filteredData : attendanceData;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold">
              Attendance <span className="text-gray-500">({date})</span>
            </h2>
            <p className="text-sm text-gray-500">
              View and filter daily check-ins by date and member.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/mark-attendance")}
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            + Mark Attendance
          </button>
        </div>

        {/* FILTER SECTION */}
        <div className="flex items-end gap-6 flex-wrap mb-6">

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded-lg w-56"  // 🔥 wider
            />
          </div>

          {/* Member */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Member</label>
            <select
              value={member}
              onChange={(e) => setMember(e.target.value)}
              className="border p-2 rounded-lg w-72" // 🔥 more wide like screenshot
            >
              <option>All Members</option>
              <option>Rahul Kumar</option>
              <option>Arjun</option>
            </select>
          </div>

          {/* Buttons (Right aligned like your UI) */}
          <div className="ml-auto flex gap-3">
            <button
              onClick={handleFilter}
              className="border px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100"
            >
              🔽 Filter
            </button>

            <button
              onClick={handleReset}
              className="border px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Member</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time In</th>
            </tr>
          </thead>

          <tbody>
            {displayData.map((item, index) => (
              <tr key={item.id} className="text-center border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.username}
                  </div>
                </td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {item.timeIn}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AttendanceAdmin;