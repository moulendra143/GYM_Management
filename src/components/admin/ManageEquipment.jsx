import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTools, FaBox, FaRupeeSign } from "react-icons/fa";

const ManageEquipment = () => {
  const navigate = useNavigate();

  const [equipmentData, setEquipmentData] = useState([
    {
      id: 1,
      name: "Bench Press",
      units: 4,
      price: 30000,
      date: "2026-01-15",
    },
  ]);

  // ✅ DELETE FUNCTION
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const updated = equipmentData.filter((item) => item.id !== id);
    setEquipmentData(updated);
  };

  // ✅ EDIT FUNCTION
  const handleEdit = (item) => {
    navigate("/admin/add-equipment", {
      state: { equipment: item },
    });
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaTools /> Equipment
            </h2>
            <p className="text-sm text-gray-500">
              Track equipment inventory, units and purchase details.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-equipment")}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Equipment
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Units</th>
              <th className="p-3">Price</th>
              <th className="p-3">Purchase Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {equipmentData.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{index + 1}</td>

                <td className="p-3">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">Equipment</div>
                </td>

                <td className="p-3">{item.units}</td>

                <td className="p-3">₹ {item.price}.00</td>

                <td className="p-3">{item.date}</td>

                <td className="p-3 text-right">
                  {/* ✅ EDIT */}
                  <button
                    onClick={() => handleEdit(item)}
                    className="border px-3 py-1 rounded-lg mr-2 text-yellow-600"
                  >
                    Edit
                  </button>

                  {/* ✅ DELETE */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border px-3 py-1 rounded-lg text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ManageEquipment;