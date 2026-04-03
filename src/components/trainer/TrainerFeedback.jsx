import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaTimes
} from "react-icons/fa";

const TrainerFeedback = () => {
  const [selected, setSelected] = useState(null);

  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      username: "john",
      message: "Gym equipment is very good and well maintained.",
      date: "20 Jan 2026",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      username: "ravi",
      message: "Need more cardio machines.",
      date: "19 Jan 2026",
      time: "09:15 AM",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            💬 Member Feedback
          </h2>
          <p className="text-sm text-gray-500">
            View feedback submitted by members.
          </p>
        </div>

        {/* TABLE */}
        <div className="border rounded-xl overflow-hidden">

          {/* HEADER */}
          <div className="grid grid-cols-5 bg-gray-50 px-4 py-3 text-sm font-medium">
            <div>#</div>
            <div>Member</div>
            <div>Message</div>
            <div>Date</div>
            <div>Action</div>
          </div>

          {/* DATA */}
          {feedbacks.map((f, index) => (
            <div
              key={f.id}
              className="grid grid-cols-5 px-4 py-3 items-center border-t text-sm"
            >
              {/* INDEX */}
              <div>{index + 1}</div>

              {/* MEMBER */}
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400" />
                <div>
                  <div className="font-medium">{f.name}</div>
                  <div className="text-xs text-gray-500">
                    {f.username}
                  </div>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="truncate">{f.message}</div>

              {/* DATE */}
              <div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" />
                  {f.date}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <FaClock /> {f.time}
                </div>
              </div>

              {/* ACTION */}
              <div>
                <button
                  onClick={() => setSelected(f)}
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
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white w-[500px] rounded-2xl shadow-lg">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">
                {selected.name}'s Feedback
              </h3>

              <button onClick={() => setSelected(null)}>
                <FaTimes />
              </button>
            </div>

            {/* BODY */}
            <div className="p-4 text-sm space-y-2">

              <p><b>Member:</b> {selected.name}</p>
              <p><b>Username:</b> {selected.username}</p>

              <p className="flex items-center gap-2">
                <FaCalendarAlt /> {selected.date}
              </p>

              <p className="flex items-center gap-2">
                <FaClock /> {selected.time}
              </p>

              <hr />

              <p>{selected.message}</p>

            </div>

            {/* FOOTER */}
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setSelected(null)}
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

export default TrainerFeedback;