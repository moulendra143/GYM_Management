import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCheck,
  FaTimes,
  FaEye,
  FaCalendarAlt,
  FaClock
} from "react-icons/fa";
import memberService from "../../services/memberService";

const TrainerAttendance = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const data = await memberService.getAttendance();
        const formatted = data.map((a) => ({
          id: a.id,
          name: a.memberName || `Member ${a.memberId}`,
          username: a.memberUsername || "",
          status: null,
          history: [{ date: a.date || new Date(a.createdAt).toLocaleDateString(), time: new Date(a.checkedInAt || a.createdAt).toLocaleTimeString() }],
        }));
        setMembers(formatted);
      } catch (error) {
        console.error("Could not load attendance", error);
      }
    };
    loadAttendance();
  }, []);

  // MARK
  const markAttendance = (id, value) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: value } : m
      )
    );
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            📅 Attendance Management
          </h2>
          <p className="text-sm text-gray-500">
            View sessions and mark attendance.
          </p>
        </div>

        {/* TABLE */}
        <div className="border rounded-xl overflow-hidden">

          <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-sm font-medium">
            <div>#</div>
            <div>Member</div>
            <div>Status</div>
            <div>Mark</div>
            <div>View</div>
          </div>

          {members.map((m, index) => (
            <div
              key={m.id}
              className="grid grid-cols-5 px-4 py-3 items-center border-t text-sm"
            >
              <div>{index + 1}</div>

              <div className="flex items-center gap-2">
                <FaUser />
                {m.name}
              </div>

              <div>
                {m.status === "present" && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Present
                  </span>
                )}
                {m.status === "absent" && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                    Absent
                  </span>
                )}
                {!m.status && <span className="text-gray-400">Not Marked</span>}
              </div>

              {/* MARK */}
              <div className="flex gap-2">
                <button
                  onClick={() => markAttendance(m.id, "present")}
                  className="bg-green-500 text-white px-2 py-1 rounded-full text-xs"
                >
                  <FaCheck />
                </button>

                <button
                  onClick={() => markAttendance(m.id, "absent")}
                  className="bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                >
                  <FaTimes />
                </button>
              </div>

              {/* VIEW BUTTON */}
              <div>
                <button
                  onClick={() => setSelectedMember(m)}
                  className="border px-3 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  <FaEye /> View
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* 🔥 MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white w-[500px] rounded-2xl shadow-lg">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">
                {selectedMember.name} - Attendance
              </h3>

              <button onClick={() => setSelectedMember(null)}>✖</button>
            </div>

            {/* BODY */}
            <div className="p-4 text-sm">

              {selectedMember.history.length === 0 ? (
                <p className="text-gray-500">No attendance records</p>
              ) : (
                selectedMember.history.map((h, i) => (
                  <div key={i} className="flex justify-between border-b py-2">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt /> {h.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaClock /> {h.time}
                    </span>
                  </div>
                ))
              )}

            </div>

            {/* FOOTER */}
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="border px-4 py-1 rounded-full"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default TrainerAttendance;