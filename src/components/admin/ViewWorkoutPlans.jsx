import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const ViewWorkoutPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const plan = location.state?.plan;

  if (!plan) return <div>No Data Found</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

      {/* MODAL BOX */}
      <div className="bg-white w-[700px] max-h-[80vh] rounded-xl shadow-lg flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">{plan.title}</h2>

          <button onClick={() => navigate(-1)}>
            <FaTimes />
          </button>
        </div>

        {/* CONTENT (SCROLLABLE) */}
        <div className="p-4 overflow-y-auto flex-1">

          <p className="mb-3">
            <strong>Goal:</strong> {plan.goal}
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            {plan.details.map((d, i) => (
              <div key={i}>• {d}</div>
            ))}
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-4 border-t">

          <button
            onClick={() => navigate(-1)}
            className="border px-4 py-1 rounded-full"
          >
            Close
          </button>

          <button
            className="bg-red-500 text-white px-4 py-1 rounded-full"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default ViewWorkoutPlan;