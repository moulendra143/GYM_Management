import React, { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaTimes } from "react-icons/fa";

const TrainerMembers = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const members = [
    {
      id: 1,
      name: "John Doe",
      username: "john",
      phone: "98765*****",
      email: "john@example.com",
      plan: "Monthly",
      age: 25,
      gender: "Male",
      address: "Hyderabad",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            👥 My Members
          </h2>
          <p className="text-sm text-gray-500">
            View and manage members assigned to you.
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden border rounded-xl">

          <div className="grid grid-cols-6 bg-gray-50 px-4 py-3 text-sm font-medium">
            <div>#</div>
            <div>Member</div>
            <div>Phone</div>
            <div>Email</div>
            <div>Plan</div>
            <div>Action</div>
          </div>

          {members.map((m, index) => (
            <div
              key={m.id}
              className="grid grid-cols-6 px-4 py-3 items-center border-t text-sm"
            >
              <div>{index + 1}</div>

              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400" />
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.username}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                {m.phone}
              </div>

              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                {m.email}
              </div>

              <div>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {m.plan}
                </span>
              </div>

              {/* ✅ FIXED BUTTON */}
              <div>
                <button
                  onClick={() => setSelectedMember(m)}
                  className="border px-3 py-1 rounded-full text-sm"
                >
                  View
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
              <h3 className="font-semibold text-lg">
                {selectedMember.name}
              </h3>

              <button onClick={() => setSelectedMember(null)}>
                <FaTimes />
              </button>
            </div>

            {/* BODY */}
            <div className="p-4 text-sm space-y-2">

              <p><b>Username:</b> {selectedMember.username}</p>
              <p><b>Phone:</b> {selectedMember.phone}</p>
              <p><b>Email:</b> {selectedMember.email}</p>
              <p><b>Plan:</b> {selectedMember.plan}</p>
              <p><b>Age:</b> {selectedMember.age}</p>
              <p><b>Gender:</b> {selectedMember.gender}</p>
              <p><b>Address:</b> {selectedMember.address}</p>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end p-4 border-t">
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

export default TrainerMembers;