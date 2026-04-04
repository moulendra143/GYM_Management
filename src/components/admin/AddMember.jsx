import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import {
  FaUser, FaLock, FaPhone, FaCalendarAlt, FaMapMarkerAlt
} from "react-icons/fa";

const AddMember = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    mobile: "",
    age: "",
    gender: "",
    joinDate: "",
    address: "",
    plan: "",
    trainer: "",
    weight: "",
    height: ""
  });

  // ✅ PREFILL DATA
  useEffect(() => {
    if (editData) {
      setFormData({
        username: editData.username || "",
        password: editData.password || "",
        fullName: editData.fullName || "",
        mobile: editData.phone || "",
        age: editData.age || "",
        gender: editData.gender || "",
        joinDate: editData.startDate
          ? editData.startDate.split("T")[0]
          : "",
        address: editData.address || "",
        plan: editData.membershipPlanId || "",
        trainer: editData.trainerId || "",
        weight: editData.weight || "",
        height: editData.height || ""
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.fullName) {
      alert("Fill required fields");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        gender: formData.gender,
        phone: formData.mobile,
        address: formData.address,
        age: formData.age ? parseInt(formData.age) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        height: formData.height ? parseFloat(formData.height) : null,
        membershipPlanId: Number(formData.plan) || null,
        trainerId: Number(formData.trainer) || null,
        startDate: formData.joinDate || null,
      };

      console.log("🚀 Payload:", payload);

      if (editData) {
        // ✅ UPDATE
        await api.put(`/admin/members/${editData.id}`, payload);
        alert("Member updated successfully");
      } else {
        // ✅ CREATE
        await api.post("/admin/members", payload);
        alert("Member added successfully");
      }

      navigate("/admin/members");

    } catch (error) {
      console.error("❌ ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 p-6">

    <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-lg space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">
            {editData ? "Edit Member" : "Add Member"}
          </h2>
          <p className="text-gray-500 text-sm">
            Create a new member profile and assign plan/trainer if needed.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/members")}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to Members
        </button>
      </div>

      {/* LOGIN CREDENTIALS */}
      <div className="bg-gray-50 p-6 rounded-xl border">
        <h3 className="font-semibold mb-4">Login Credentials</h3>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-600">Username *</label>
            <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
              <FaUser className="text-gray-400" />
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. rahul123"
                className="p-2 w-full outline-none"
              />
            </div>
            <p className="text-xs text-gray-400">Username must be unique.</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Password *</label>
            <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="p-2 w-full outline-none"
              />
            </div>
          </div>

        </div>
      </div>

      {/* BASIC INFO */}
      <div className="bg-gray-50 p-6 rounded-xl border">
        <h3 className="font-semibold mb-4">Basic Information</h3>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            className="border p-3 rounded-lg"
          />

          <div className="flex items-center border rounded-lg px-3 bg-white">
            <FaPhone />
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="e.g. 1234******"
              className="p-2 w-full outline-none"
            />
          </div>

          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border p-3 rounded-lg"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <div className="flex items-center border rounded-lg px-3 bg-white">
            <FaMapMarkerAlt />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House no, area, city..."
              className="p-2 w-full outline-none"
            />
          </div>

          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            className="border p-3 rounded-lg"
          />

          <input
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            className="border p-3 rounded-lg"
          />

        </div>
      </div>

      {/* MEMBERSHIP */}
      <div className="bg-gray-50 p-6 rounded-xl border">
        <h3 className="font-semibold mb-4">Membership & Trainer</h3>

        <div className="grid md:grid-cols-2 gap-5">

          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">No Plan</option>
            <option value="1">Monthly</option>
            <option value="2">Yearly</option>
          </select>

          <select
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">No Trainer</option>
            <option value="1">Trainer A</option>
            <option value="2">Trainer B</option>
          </select>

        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          {editData ? "Update Member" : "Save Member"}
        </button>
      </div>

    </div>
  </div>
);
};

export default AddMember;