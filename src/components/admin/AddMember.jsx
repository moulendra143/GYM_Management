import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaLock, FaPhone, FaCalendarAlt, FaMapMarkerAlt
} from "react-icons/fa";
import authService from "../../services/authService";
import adminService from "../../services/adminService";

const AddMember = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    mobile: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    joinDate: "",
    address: "",
    plan: "",
    trainer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.fullName) {
      alert("Fill required fields");
      return;
    }

    try {
      const planId = formData.plan === "Monthly" ? 1 : formData.plan === "Yearly" ? 2 : null;
      const trainerId = formData.trainer === "Trainer A" ? 1 : formData.trainer === "Trainer B" ? 2 : null;

      const memberData = {
        username: formData.username,
        password: formData.password,
        name: formData.fullName,
        email: formData.email,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        height: formData.height ? parseInt(formData.height) : null,
        phone: formData.mobile,
        address: formData.address,
        membershipPlanId: planId,
        trainerId: trainerId,
      };

      const result = await adminService.addMember(memberData);

      if (result.success) {
        alert("Member added successfully");
        navigate("/admin/members");
      } else {
        alert(result.message || "Failed to add member");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create member profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-indigo-200 to-purple-300 px-4 md:px-8 py-6">

      {/* MAIN CARD */}
      <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Add Member</h2>
            <p className="text-gray-600 text-sm mt-1">
              Create a new member profile and assign plan/trainer if needed.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/members")}
            className="border px-5 py-2 rounded-full hover:bg-gray-100 transition"
          >
            ← Back to Members
          </button>
        </div>

        {/* LOGIN */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4 text-gray-700">Login Credentials</h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm">Username *</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
                <FaUser className="text-gray-500" />
                <input
                  name="username"
                  placeholder="e.g. rahul123"
                  onChange={handleChange}
                  className="p-2 w-full outline-none bg-transparent"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Username must be unique.
              </p>
            </div>

            <div>
              <label className="text-sm">Password *</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
                <FaLock className="text-gray-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  onChange={handleChange}
                  className="p-2 w-full outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4 text-gray-700">Basic Information</h3>

          <div className="grid md:grid-cols-3 gap-5">
            <input
              name="fullName"
              placeholder="e.g. Rahul Sharma"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <div className="flex items-center border rounded-lg px-3 bg-gray-50">
              <FaPhone className="text-gray-500" />
              <input
                name="mobile"
                placeholder="e.g. 1234******"
                onChange={handleChange}
                className="p-2 w-full outline-none bg-transparent"
              />
            </div>

            <input
              name="age"
              placeholder="Age"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              name="weight"
              placeholder="Weight (kg)"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <select name="gender" onChange={handleChange} className="border p-3 rounded-lg">
              <option>Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <div className="flex items-center border rounded-lg px-3 bg-gray-50">
              <FaCalendarAlt className="text-gray-500" />
              <input
                type="date"
                name="joinDate"
                onChange={handleChange}
                className="p-2 w-full outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded-lg px-3 bg-gray-50">
              <FaMapMarkerAlt className="text-gray-500" />
              <input
                name="address"
                placeholder="House no, area, city..."
                onChange={handleChange}
                className="p-2 w-full outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* MEMBERSHIP */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h3 className="font-semibold mb-4 text-gray-700">
            Membership & Trainer Assignment
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <select name="plan" onChange={handleChange} className="border p-3 rounded-lg">
              <option>No Plan</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>

            <select name="trainer" onChange={handleChange} className="border p-3 rounded-lg">
              <option>No Trainer</option>
              <option>Trainer A</option>
              <option>Trainer B</option>
            </select>
          </div>
        </div>

        {/* SAVE */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-8 py-2 rounded-full hover:scale-105 transition shadow-lg"
          >
            Save Member
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddMember;