import React, { useState } from "react";
import { FaDumbbell, FaCalendarAlt, FaClock, FaEye, FaTimes } from "react-icons/fa";

const WorkoutPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      title: "4 week Diet Plan",
      date: "16 Jan 2026",
      time: "19:16",
      description: "aaaaaa",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🏋️ My Workout / Diet Plans
          </h2>
          <p className="text-sm text-gray-500">
            Workout and diet instructions assigned to you by the gym trainer/admin.
          </p>
        </div>

        {/* CARD */}
        <div className="max-w-md">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white border rounded-2xl shadow overflow-hidden">

              {/* CARD HEADER */}
              <div className="bg-[#0f172a] text-white px-4 py-2 flex justify-between items-center rounded-t-2xl">
                <span className="flex items-center gap-2">
                  <FaDumbbell /> {plan.title}
                </span>

                <span className="bg-white text-black text-xs px-2 py-1 rounded">
                  {plan.date}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="p-4 text-sm text-gray-600">

                <p className="flex items-center gap-2 mb-2">
                  <FaCalendarAlt /> Created at: {plan.date} {plan.time}
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white w-[600px] rounded-2xl shadow-lg">

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FaDumbbell /> {selectedPlan.title}
              </h3>

              <button onClick={() => setSelectedPlan(null)}>
                <FaTimes />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 text-sm text-gray-600">

              <p className="flex items-center gap-2 mb-2">
                <FaCalendarAlt /> {selectedPlan.date}
              </p>

              <p className="flex items-center gap-2 mb-3">
                <FaClock /> {selectedPlan.time}
              </p>

              <hr className="mb-3" />

              <p>{selectedPlan.description}</p>

            </div>

            {/* FOOTER */}
            <div className="flex justify-end p-4 border-t">
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

export default WorkoutPlans;