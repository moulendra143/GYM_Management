import React, { useState, useEffect } from "react";
import {
  FaUserTie,
  FaPhone,
  FaClock,
  FaEdit,
  FaTrash,
  FaPlus,
  FaArrowLeft,
  FaUser,
  FaSave,
} from "react-icons/fa";
import adminService from "../../services/adminService";

const ManageTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const data = await adminService.getTrainers();
        setTrainers(data);
      } catch (error) {
        console.error("Could not load trainers", error);
      }
    };
    loadTrainers();
  }, []);

  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    mobile: "",
    specialization: "",
    shift: "",
  });

  // ================= DELETE =================
  const handleDelete = async (index) => {
    const trainer = trainers[index];
    if (!trainer?.id) {
      setTrainers((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    try {
      await adminService.deleteTrainer(trainer.id);
      setTrainers((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Failed to delete trainer", error);
      alert("Could not delete trainer");
    }
  };

  // ================= ADD =================
  const handleAdd = () => {
    setEditingIndex("new");
    setFormData({
      id: null,
      name: "",
      mobile: "",
      specialization: "",
      shift: "",
    });
  };

  // ================= EDIT =================
  const handleEdit = (trainer, index) => {
    setEditingIndex(index);
    setFormData({
      id: trainer.id || null,
      name: trainer.name || "",
      mobile: trainer.mobile || "",
      specialization: trainer.specialization || trainer.specialty || "",
      shift: trainer.shift || "",
    });
  };

  // ================= CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= SAVE NEW =================
  const handleSaveNew = async () => {
    if (!formData.name) {
      alert("Name is required");
      return;
    }

    try {
      const created = await adminService.addTrainer({
        specialty: formData.specialization,
      });

      setTrainers((prev) => [
        ...prev,
        {
          ...formData,
          id: created?.id || Date.now(),
        },
      ]);

      setEditingIndex(null);
    } catch (error) {
      console.error("Failed to add trainer", error);
      alert("Could not add trainer");
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    if (!formData.name) {
      alert("Name is required");
      return;
    }

    try {
      if (formData.id) {
        await adminService.updateTrainer(formData.id, {
          specialty: formData.specialization,
        });
      }

      const updated = [...trainers];
      updated[editingIndex] = formData;
      setTrainers(updated);
      setEditingIndex(null);
    } catch (error) {
      console.error("Failed to update trainer", error);
      alert("Could not update trainer");
    }
  };

  // ================= FORM VIEW =================
  if (editingIndex !== null) {
    const isNew = editingIndex === "new";

    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {isNew ? "➕ Add Trainer" : "✏️ Edit Trainer"}
              </h2>
              <p className="text-gray-500 text-sm">
                Add or update trainer details, specialization and shift timing.
              </p>
            </div>

            <button
              onClick={() => setEditingIndex(null)}
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
                    placeholder="e.g. Amith Verma"
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

              {/* SHIFT */}
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
                onClick={isNew ? handleSaveNew : handleUpdate}
                className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
              >
                <FaSave /> {isNew ? "Save Trainer" : "Update Trainer"}
              </button>

              <button
                onClick={() => setEditingIndex(null)}
                className="border px-4 py-2 rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Fields marked with * are mandatory.
            </p>

          </div>
        </div>
      </div>
    );
  }

  // ================= TABLE VIEW =================
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaUserTie /> Trainers
            </h2>
            <p className="text-gray-500 text-sm">
              Manage trainers, specializations and shift timings.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-black text-white px-5 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
          >
            <FaPlus /> Add Trainer
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Specialization</th>
                <th className="p-3 text-left">Shift Timing</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {trainers.length > 0 ? (
                trainers.map((t, i) => (
                  <tr key={t.id || i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{i + 1}</td>

                    <td className="p-3">
                      <div className="font-medium">{t.name || t.user?.name}</div>
                      <div className="text-xs text-gray-500">👤 Trainer</div>
                    </td>

                    <td className="p-3 flex items-center gap-2">
                      <FaPhone /> {t.mobile || t.user?.phone}
                    </td>

                    <td className="p-3">
                      <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                        {t.specialization || t.specialty}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <FaClock /> {t.shift}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(t, i)}
                        className="border px-3 py-1 rounded-full text-yellow-600 flex items-center gap-1 hover:bg-yellow-50"
                      >
                        <FaEdit /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(i)}
                        className="border px-3 py-1 rounded-full text-red-500 flex items-center gap-1 hover:bg-red-50"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    🚫 No trainers available
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

export default ManageTrainers;