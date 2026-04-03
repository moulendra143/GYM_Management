import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTools, FaBox, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";
import adminService from "../../services/adminService";

const AddEquipment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editItem = state?.equipment;

  const [name, setName] = useState(editItem?.name || "");
  const [units, setUnits] = useState(editItem?.units || "");
  const [price, setPrice] = useState(editItem?.price || "");
  const [date, setDate] = useState(editItem?.date || "");

  const handleSave = async () => {
    if (!name || !units || !price) {
      alert("Please fill required fields.");
      return;
    }

    const payload = {
      name,
      description: "",
      quantity: parseInt(units, 10),
    };

    try {
      if (editItem?.id) {
        await adminService.updateEquipment(editItem.id, payload);
      } else {
        await adminService.addEquipment(payload);
      }
      alert("Equipment saved successfully!");
      navigate("/admin/equipment");
    } catch (error) {
      console.error(error);
      alert("Failed to save equipment.");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6 max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaTools /> Add Equipment
            </h2>
            <p className="text-sm text-gray-500">
              Maintain gym equipment inventory and purchase details.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/equipment")}
            className="border px-4 py-2 rounded-full"
          >
            ← Back to Equipment
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">

          <div>
            <label className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg mt-1 px-2">
              <FaTools className="text-gray-400 mr-2" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Units <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg mt-1 px-2">
              <FaBox className="text-gray-400 mr-2" />
              <input
                type="number"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-lg mt-1 px-2">
              <FaRupeeSign className="text-gray-400 mr-2" />
              <input
                type="number"
                placeholder="e.g. 25000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter purchase price (in INR).
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Purchase Date</label>
            <div className="flex items-center border rounded-lg mt-1 px-2">
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-black text-white px-5 py-2 rounded-full"
          >
            💾 Save Equipment
          </button>

          <button
            onClick={() => navigate("/admin/equipment")}
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

export default AddEquipment;