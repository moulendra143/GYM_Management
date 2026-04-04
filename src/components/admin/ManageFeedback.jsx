import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaClock, FaFilter } from "react-icons/fa";

const ManageFeedback = () => {
  const [selectedMember, setSelectedMember] = useState("All Members");

  const feedbackData = [
    {
      id: 1,
      name: "ABCD",
      username: "abcd",
      message: "Superb Gym",
      date: "10 Dec 2025",
      time: "06:28",
    },
  ];

  // ✅ FILTER LOGIC
  const filteredData =
    selectedMember === "All Members"
      ? feedbackData
      : feedbackData.filter((f) => f.name === selectedMember);

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            ⭐ Members Feedback
          </h2>
          <p className="text-sm text-gray-500">
            Review member feedback and filter by member.
          </p>
        </div>

        {/* FILTER SECTION */}
        <div className="flex items-end gap-4 mb-6 flex-wrap">

          {/* MEMBER DROPDOWN */}
          <div className="flex flex-col w-[400px]">
            <label className="text-sm text-gray-600 mb-1">Member</label>

            <div className="flex items-center border rounded-lg px-2">
              <FaUser className="text-gray-400 mr-2" />
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full p-2 outline-none bg-transparent"
              >
                <option>All Members</option>
                <option>ABCD</option>
              </select>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Choose a member to view only their feedback.
            </p>
          </div>

          {/* FILTER BUTTON */}
          <div className="ml-auto">
            <button className="border px-6 py-2 rounded-lg flex items-center gap-2">
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full">
          <thead className="border-b text-left bg-gray-50">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Member</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} className="border-b">

                {/* INDEX */}
                <td className="p-3">{index + 1}</td>

                {/* MEMBER */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.username}
                      </div>
                    </div>
                  </div>
                </td>

                {/* MESSAGE */}
                <td className="p-3 text-gray-700">
                  {item.message}
                </td>

                {/* DATE */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <div>
                      <div>{item.date}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <FaClock /> {item.time}
                      </div>
                    </div>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ManageFeedback;