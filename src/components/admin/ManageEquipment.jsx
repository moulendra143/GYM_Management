import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTools, FaBox, FaRupeeSign } from "react-icons/fa";
import adminService from "../../services/adminService";

const ManageEquipment = () => {
  const navigate = useNavigate();

  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const data = await adminService.getEquipment();
        setEquipmentData(data);
      } catch (error) {
        console.error("Failed to fetch equipment", error);
      }
    };
    loadEquipment();
  }, []);

  // ✅ DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await adminService.deleteEquipment(id);
      setEquipmentData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete equipment", error);
      alert("Delete failed");
    }
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
              <th className="p-3">Quantity</th>
              <th className="p-3">Description</th>
              <th className="p-3">Equipment ID</th>
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

                <td className="p-3">{item.quantity}</td>

                <td className="p-3">{item.description || "—"}</td>

                <td className="p-3">{item.id || "—"}</td>

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