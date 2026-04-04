import React, { useState } from "react";
import {
  FaCrown,
  FaClock,
  FaEdit,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaRupeeSign,
  FaList,
} from "react-icons/fa";

const ManagePlans = () => {
  const [plans, setPlans] = useState([
    {
      name: "Monthly",
      duration: "1",
      fee: "1200",
      description: "Strength training + cardio",
    },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    fee: "",
    description: "",
  });

  const handleDelete = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const handleEdit = (plan, index) => {
    setEditingIndex(index);
    setFormData(plan);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.duration || !formData.fee) return;

    const updated = [...plans];
    updated[editingIndex] = formData;
    setPlans(updated);
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setEditingIndex("new");
    setFormData({ name: "", duration: "", fee: "", description: "" });
  };

  const handleSaveNew = () => {
    if (!formData.name || !formData.duration || !formData.fee) return;
    setPlans([...plans, formData]);
    setEditingIndex(null);
  };

  // ================= FORM =================
  if (editingIndex !== null) {
    const isNew = editingIndex === "new";

    return (
      <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-6">

        <div className="w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-200">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {isNew ? <FaPlus /> : <FaEdit />}
                {isNew ? "Add Plan" : "Edit Plan"}
              </h2>
              <p className="text-gray-600 text-sm">
                Define membership duration, fee and features.
              </p>
            </div>

            <button
              onClick={() => setEditingIndex(null)}
              className="bg-gray-200 px-5 py-2 rounded-full hover:bg-gray-300 transition"
            >
              <FaArrowLeft /> Back
            </button>
          </div>

          {/* FORM CARD */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl space-y-6">

            <div className="grid md:grid-cols-3 gap-5">

              <div>
                <label className="text-sm">Plan Name *</label>
                <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                  <FaCrown className="text-gray-400" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm">Duration *</label>
                <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                  <FaClock className="text-gray-400" />
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="p-2 w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm">Fee *</label>
                <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                  <FaRupeeSign className="text-gray-400" />
                  <input
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    className="p-2 w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm">Description</label>
              <div className="flex items-start border rounded-lg px-3 mt-1 bg-white">
                <FaList className="text-gray-400 mt-3" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="p-2 w-full bg-transparent outline-none h-24"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={isNew ? handleSaveNew : handleUpdate}
                className="bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition"
              >
                💾 Save
              </button>

              <button
                onClick={() => setEditingIndex(null)}
                className="border px-5 py-2 rounded-full hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= TABLE =================
  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8 py-6">

      <div className="w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-200">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <FaCrown className="text-gray-700" /> Membership Plans
            </h2>
            <p className="text-gray-600 text-sm">
              Manage gym membership packages.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
          >
            <FaPlus /> Add Plan
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Plan</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Fee</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((plan, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{i + 1}</td>

                  <td className="p-4">
                    <div className="font-semibold flex items-center gap-2">
                      <FaCrown className="text-gray-500" />
                      {plan.name}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
                      <FaClock /> {plan.duration} month
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-gray-800">
                    ₹ {plan.fee}
                  </td>

                  <td className="p-4 text-gray-600 text-sm">
                    {plan.description || "—"}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
  onClick={() => handleEdit(plan, i)}
  className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 hover:bg-gray-200 flex items-center gap-1 transition"
>
  <FaEdit /> Edit
</button>

<button
  onClick={() => handleDelete(i)}
  className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 hover:bg-gray-200 flex items-center gap-1 transition"
>
  <FaTrash /> Delete
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManagePlans;