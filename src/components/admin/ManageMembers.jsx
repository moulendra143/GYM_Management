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
import api from "../../services/api";

const ManageMembers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null); // ✅ highlight edit

  // ✅ FETCH MEMBERS
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get("/admin/members");
        setMembers(res.data.data);
      } catch (error) {
        console.error("❌ ERROR FETCHING MEMBERS:", error);
      }
    };

    fetchMembers();
  }, []);

  // ✅ SEARCH FILTER
  const filteredMembers = members.filter(
    (m) =>
      m.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      m.username?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/admin/members/${id}`);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  // ✅ EDIT (IMPROVED UX)
  const handleEdit = (member) => {
    setEditingId(member.id); // highlight row
    navigate("/admin/add-member", { state: member });
  };

  return (
    <div className="p-6">
      <div className="w-full bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

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
            className="bg-black text-white px-5 py-2 rounded-full hover:scale-105"
          >
            👤 + Add Member
          </button>
        </div>

        {/* SEARCH */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center bg-gray-100 px-4 rounded-xl w-full">
            <FaSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent p-3 w-full outline-none"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
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
              {filteredMembers.map((m, i) => (
                <tr
                  key={i}
                  className={`border-t transition ${
                    editingId === m.id
                      ? "bg-yellow-100 border-l-4 border-yellow-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3">
                    <div className="font-medium">{m.fullName}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <FaUser /> Member
                    </div>
                  </td>

                  <td className="p-3">{m.username}</td>

                  <td className="p-3 flex items-center gap-2">
                    <FaPhone /> {m.phone}
                  </td>

                  <td className="p-3">
                    {m.membershipPlanId || "No Plan"}
                  </td>

                  <td className="p-3 flex items-center gap-2">
                    <FaCalendarAlt />
                    {m.startDate
                      ? new Date(m.startDate).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex gap-2">

                      <button
                        onClick={() => handleEdit(m)}
                        className="border px-3 py-1 rounded-full text-yellow-600 hover:bg-yellow-50"
                      >
                        <FaEdit /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(m.id)}
                        className="border px-3 py-1 rounded-full text-red-500 hover:bg-red-50"
                      >
                        <FaTrash /> Delete
                      </button>

                    </div>
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

export default ManageMembers;