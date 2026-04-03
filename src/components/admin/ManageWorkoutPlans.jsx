import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaFilter } from "react-icons/fa";
import adminService from "../../services/adminService";

const ManageWorkoutPlans = () => {
  const navigate = useNavigate();

  const [selectedMember, setSelectedMember] = useState("All Members");
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await adminService.getAllWorkoutPlans();
        setPlans(data);
      } catch (error) {
        console.error("Could not load workout plans", error);
      }
    };

    const loadMembers = async () => {
      try {
        const data = await adminService.getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Could not load members", error);
      }
    };

    loadPlans();
    loadMembers();
  }, []);

  // ✅ FILTER LOGIC (FIXED)
  const filteredPlans =
    selectedMember === "All Members"
      ? plans
      : plans.filter(
          (p) =>
            (p.memberName || p.member) === selectedMember
        );

  // ✅ DELETE (with backend call)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this plan?");
    if (!confirmDelete) return;

    try {
      await adminService.deleteWorkoutPlan(id); // backend call
      setPlans(plans.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-2xl font-semibold">
              Workout / Diet Plans
            </h2>
            <p className="text-sm text-gray-500">
              Create, view and manage personalized workout or diet instructions for members.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-workout-plan")}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Workout / Diet Plan
          </button>
        </div>

        {/* FILTER */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">

          <div className="flex flex-col w-[350px]">
            <label className="text-sm text-gray-600 mb-1">Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="border p-2 rounded-lg"
            >
              <option>All Members</option>
              {members.map((m) => (
                <option
                  key={m.id}
                  value={m.user?.name || `Member ${m.id}`}
                >
                  {m.user?.name || `Member ${m.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-auto">
            <button className="border px-6 py-2 rounded-lg flex items-center gap-2">
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredPlans.map((plan) => (
            <div key={plan.id} className="rounded-xl overflow-hidden border">

              {/* HEADER */}
              <div className="bg-[#0f172a] text-white p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm">{plan.title}</h3>
                  <div className="text-xs flex flex-col gap-1 mt-1 opacity-80">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> {plan.date || "N/A"}
                    </span>
                    <span>{plan.time || ""}</span>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="flex items-center gap-1 justify-end">
                    <FaUser /> {plan.memberName || plan.member || "Unknown"}
                  </div>
                </div>
              </div>

              {/* BODY */}
              <div className="p-4">

                <p className="text-sm text-gray-500 mb-2">
                  ℹ Plan details (preview)
                </p>

                <p className="text-sm mb-3">
                  Goal: {plan.description || "-"}
                </p>

                {plan.details && (
                  <div className="text-sm text-gray-700 space-y-1 mb-4">
                    {plan.details.slice(0, 2).map((d, i) => (
                      <div key={i}>• {d}</div>
                    ))}
                  </div>
                )}

                {/* ACTIONS */}
                <div className="flex gap-3">

                  {/* VIEW */}
                  <button
                    onClick={() =>
                      navigate("/admin/view-workout-plan", {
                        state: { plan },
                      })
                    }
                    className="border px-4 py-1 rounded-full text-sm"
                  >
                    👁 View Full
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="border px-4 py-1 rounded-full text-sm text-red-500"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default ManageWorkoutPlans;