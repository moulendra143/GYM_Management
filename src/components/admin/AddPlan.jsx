import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaArrowLeft,
  FaCrown,
  FaClock,
  FaRupeeSign,
  FaList,
} from "react-icons/fa";

const AddPlan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    fee: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.duration || !formData.fee) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Plan Saved:", formData);
    navigate("/admin/plans");
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaPlus /> Add Plan
            </h2>
            <p className="text-gray-500 text-sm">
              Define membership duration, fee and plan features.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/plans")}
            className="border px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100"
          >
            <FaArrowLeft /> Back to Plans
          </button>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">

          {/* TOP ROW */}
          <div className="grid md:grid-cols-3 gap-4">

            {/* PLAN NAME */}
            <div>
              <label className="text-sm font-medium">
                Plan Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <FaCrown className="text-gray-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Student Plan"
                  className="p-2 w-full outline-none"
                />
              </div>
            </div>

            {/* DURATION */}
            <div>
              <label className="text-sm font-medium">
                Duration (months) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <FaClock className="text-gray-400" />
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="6"
                  className="p-2 w-full outline-none"
                />
              </div>
            </div>

            {/* FEE */}
            <div>
              <label className="text-sm font-medium">
                Fee <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <FaRupeeSign className="text-gray-400" />
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  placeholder="1500"
                  className="p-2 w-full outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Enter total plan fee (in INR).
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">
              Description / Features
            </label>
            <div className="flex items-start border rounded-lg px-3 mt-1">
              <FaList className="text-gray-400 mt-3" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Example: Access to gym + cardio, diet guidance, trainer support..."
                className="p-2 w-full outline-none resize-none h-24"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
            >
              💾 Save Plan
            </button>

            <button
              onClick={() => navigate("/admin/plans")}
              className="border px-4 py-2 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

          {/* FOOTNOTE */}
          <p className="text-xs text-gray-400">
            Fields marked with * are mandatory.
          </p>

        </div>
      </div>
    </div>
  );
};

export default AddPlan;