import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaSearch,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import adminService from "../../services/adminService";

const ManageMembers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await adminService.getMembers();
        setMembers(data);
      } catch (error) {
        console.error("Unable to fetch members", error);
      }
    };
    loadMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await adminService.deleteMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Failed to delete member", error);
      alert("Could not delete member.");
    }
  };

  const handleEdit = (member) => {
    navigate("/admin/add-member", { state: { member } });
  };

  const filteredMembers = members.filter(
    (m) =>
      m.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.user?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaUsers /> Members
            </h2>
            <p className="text-gray-500 text-sm">
              Manage gym members, plans, and profiles.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-member")}
            className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
          >
            👤 + Add Member
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center bg-gray-100 px-4 rounded-xl w-full">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent p-3 outline-none w-full"
            />
          </div>

          <button className="border px-6 rounded-xl flex items-center gap-2 hover:bg-gray-100">
            🔍 Search
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Username</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-left">Join Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{i + 1}</td>

                    <td className="p-3">
                      <div className="font-medium">{m.user?.name || "-"}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FaUser /> Member
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                        {m.user?.username || "-"}
                      </span>
                    </td>

                    <td className="p-3 flex items-center gap-2">
                      <FaPhone className="text-gray-500" />
                      {m.phone || "-"}
                    </td>

                    <td className="p-3">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                        {m.membershipPlan?.name || "No Plan"}
                      </span>
                    </td>

                    <td className="p-3 flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-500" />
                      {m.joinDate || "-"}
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(m)}
                        className="border px-3 py-1 rounded-full text-yellow-600 flex items-center gap-1 hover:bg-yellow-50"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="border px-3 py-1 rounded-full text-red-500 flex items-center gap-1 hover:bg-red-50"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-500">
                    🚫 No data fetched from database
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManageMembers;