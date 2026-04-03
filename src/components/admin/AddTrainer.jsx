import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaClock,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

const AddTrainer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    specialization: "",
    shift: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name) {
      alert("Name is required");
      return;
    }

    console.log("Trainer Data:", formData);

    // 👉 later send to backend
    navigate("/admin/trainers");
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              ➕ Add Trainer
            </h2>
            <p className="text-gray-500 text-sm">
              Add or update trainer details, specialization and shift timing.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/trainers")}
            className="border px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100"
          >
            <FaArrowLeft /> Back to Trainers
          </button>
        </div>

        {/* FORM */}
        <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">

          <div className="grid md:grid-cols-2 gap-4">

            {/* NAME */}
            <div>
              <label className="text-sm font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <FaUser className="text-gray-400" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Amit Verma"
                  className="p-2 w-full outline-none"
                />
              </div>
            </div>

            {/* MOBILE */}
            <div>
              <label className="text-sm font-medium">Mobile</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <FaPhone className="text-gray-400" />
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="e.g. 4324******"
                  className="p-2 w-full outline-none"
                />
              </div>
            </div>

            {/* SPECIALIZATION */}
            <div>
              <label className="text-sm font-medium">Specialization</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <FaUser className="text-gray-400" />
                <input
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Strength Training, Yoga, Cardio"
                  className="p-2 w-full outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Optional, but helps members select the right trainer.
              </p>
            </div>

            {/* SHIFT TIMING */}
            <div>
              <label className="text-sm font-medium">Shift Timing</label>
              <div className="flex items-center border rounded-lg px-3 mt-1">
                <FaClock className="text-gray-400" />
                <input
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  placeholder="e.g. 6 AM - 10 AM"
                  className="p-2 w-full outline-none"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Example: 6 AM - 10 AM / 5 PM - 9 PM
              </p>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
            >
              <FaSave /> Save Trainer
            </button>

            <button
              onClick={() => navigate("/admin/trainers")}
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

export default AddTrainer;