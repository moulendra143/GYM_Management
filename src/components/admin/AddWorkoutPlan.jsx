import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaClipboardList } from "react-icons/fa";
import adminService from "../../services/adminService";

const AddWorkoutPlan = () => {
  const navigate = useNavigate();

  const [member, setMember] = useState("");
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [details, setDetails] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await adminService.getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Could not load members", error);
      }
    };
    loadMembers();
  }, []);

  const handleSave = async () => {
    if (!member || !title || !goal || !details) {
      alert("Please fill all required fields.");
      return;
    }

    const foundMember = members.find((m) => m.user?.name === member);
    const memberId = foundMember ? foundMember.id : null;

    try {
      await adminService.addWorkoutPlan({
        memberId,
        title,
        description: goal + "\n" + details,
      });
      alert("Workout Plan saved successfully!");
      navigate("/admin/workout-plans");
    } catch (error) {
      console.error("Failed to save workout plan", error);
      alert("Could not save workout plan");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaClipboardList /> Add Workout / Diet Plan
            </h2>
            <p className="text-sm text-gray-500">
              Create personalized workout or diet plan for members.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/workout-plans")}
            className="border px-4 py-2 rounded-full"
          >
            ← Back to Plans
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-6">

          {/* MEMBER */}
          <div>
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
                {members.map((m) => (
                  <option key={m.id} value={m.user?.name || `Member ${m.id}`}>
                    {m.user?.name || `Member ${m.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TITLE */}
          <div>
            <label className="text-sm font-medium">
              Plan Title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"
              placeholder="Enter plan title"
            />
          </div>

        </div>

        {/* GOAL */}
        <div className="mt-5">
          <label className="text-sm font-medium">
            Goal <span className="text-red-500">*</span>
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows="2"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter goal..."
          />
        </div>

        {/* PLAN DETAILS */}
        <div className="mt-5">
          <label className="text-sm font-medium">
            Plan Details <span className="text-red-500">*</span>
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="5"
            className="w-full border rounded-lg p-2 mt-1"
            placeholder="Enter full workout/diet plan..."
          />
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-black text-white px-5 py-2 rounded-full"
          >
            💾 Save Plan
          </button>

          <button
            onClick={() => navigate("/admin/workout-plans")}
            className="border px-5 py-2 rounded-full"
          >
            ✕ Cancel
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Fields marked with <span className="text-red-500">*</span> are mandatory.
        </p>

      </div>
    </div>
  );
};

export default AddWorkoutPlan;