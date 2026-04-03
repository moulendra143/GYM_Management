import React, { useState, useEffect } from "react";
import {
  FaDumbbell,
  FaUser,
  FaCalendarAlt,
  FaEye,
  FaTimes
} from "react-icons/fa";
import adminService from "../../services/adminService";
import memberService from "../../services/memberService";

const TrainerWorkoutPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    member: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const planData = await adminService.getAllWorkoutPlans();
        setPlans(planData);
        const memberData = await adminService.getMembers();
        setMembers(memberData || []);
      } catch (error) {
        console.error("Error loading workout plans/members", error);
      }
    };
    loadData();
  }, []);

  // ✅ CREATE PLAN
  const handleCreate = async () => {
    if (!form.title || !form.description || !form.member) return;

    const member = members.find((m) => m.user?.name === form.member);
    const memberId = member ? member.id : null;

    try {
      const created = await adminService.addWorkoutPlan({
        title: form.title,
        description: form.description,
        memberId: memberId,
      });
      setPlans((prev) => [created, ...prev]);
      setForm({ title: "", description: "", member: "" });
    } catch (error) {
      console.error("Failed to create workout plan", error);
      alert("Could not create plan");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🏋️ Trainer Workout Plans
          </h2>
          <p className="text-sm text-gray-500">
            Create and assign workout/diet plans to members.
          </p>
        </div>

        {/* ================= CREATE FORM ================= */}
        <div className="border rounded-2xl overflow-hidden mb-6">

          <div className="bg-[#0f172a] text-white px-4 py-2 font-semibold">
            ➕ Create Plan
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* TITLE */}
            <input
              placeholder="Plan Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="border p-2 rounded"
            />

            {/* MEMBER */}
            <select
              value={form.member}
              onChange={(e) =>
                setForm({ ...form, member: e.target.value })
              }
              className="border p-2 rounded"
            >
              <option value="">Select Member</option>
              {members.map((m) => (
                <option key={m.id}>{m.user?.name || `Member ${m.id}`}</option>
              ))}
            </select>

            {/* CREATE BUTTON */}
            <button
              onClick={handleCreate}
              className="bg-black text-white rounded px-4 py-2"
            >
              Create
            </button>

            {/* DESCRIPTION */}
            <textarea
              placeholder="Plan Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded col-span-full h-24"
            />

          </div>
        </div>

        {/* ================= PLAN LIST ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-2xl shadow">

              {/* HEADER */}
              <div className="bg-[#0f172a] text-white px-4 py-2 flex justify-between items-center rounded-t-2xl">
                <span className="flex items-center gap-2">
                  <FaDumbbell /> {plan.title}
                </span>

                <span className="bg-white text-black text-xs px-2 py-1 rounded">
                  {plan.date}
                </span>
              </div>

              {/* BODY */}
              <div className="p-4 text-sm text-gray-600">

                <p className="flex items-center gap-2 mb-2">
                  <FaUser /> {plan.member}
                </p>

                <p className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt /> {plan.date} {plan.time}
                </p>

                <p className="mb-4">{plan.description}</p>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="border px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <FaEye /> View Full
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>

      {/* ================= MODAL ================= */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

          <div className="bg-white w-[600px] rounded-2xl">

            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">{selectedPlan.title}</h3>
              <button onClick={() => setSelectedPlan(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="p-4 text-sm">
              <p><b>Member:</b> {selectedPlan.member}</p>
              <p><b>Date:</b> {selectedPlan.date}</p>
              <p><b>Time:</b> {selectedPlan.time}</p>
              <hr className="my-2" />
              <p>{selectedPlan.description}</p>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedPlan(null)}
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

export default TrainerWorkoutPlans;