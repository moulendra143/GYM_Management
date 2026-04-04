import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      mobile: "4433******",
      message: "Send exact location of the gym",
      date: "10 Dec 2025",
      time: "10:27",
      status: "Resolved",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = enquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setEnquiries(updated);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-5">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            ❓ Enquiries
          </h2>
          <p className="text-sm text-gray-500">
            Track incoming enquiries and update their status.
          </p>
        </div>

        {/* SCROLL CONTAINER (IMPORTANT) */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">

          <table className="min-w-[1200px] w-full">

            <thead className="text-left border-b bg-gray-50">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Message</th>
                <th className="p-3">Created</th>
                <th className="p-3">Status</th>
                <th className="p-3">Update</th>
              </tr>
            </thead>
<tbody>
  {enquiries.map((item) => (
    <tr key={item.id} className="border-b">

      {/* NAME */}
      <td className="p-3 whitespace-nowrap">
        <span className="inline-flex items-center gap-2">
          <FaUser className="text-gray-400" />
          {item.name}
        </span>
      </td>

      {/* EMAIL */}
      <td className="p-3 whitespace-nowrap">
        <span className="inline-flex items-center gap-2">
          <FaEnvelope className="text-gray-400" />
          {item.email}
        </span>
      </td>

      {/* MOBILE */}
      <td className="p-3 whitespace-nowrap">
        <span className="inline-flex items-center gap-2">
          <FaPhone className="text-gray-400" />
          {item.mobile}
        </span>
      </td>

      {/* MESSAGE */}
      <td className="p-3 whitespace-nowrap text-gray-600">
        {item.message}
      </td>

      {/* CREATED */}
      <td className="p-3 whitespace-nowrap">
        <span className="inline-flex items-center gap-2">
          <FaCalendarAlt className="text-gray-400" />
          <span>
            {item.date}
            <span className="block text-sm text-gray-500">
              {item.time}
            </span>
          </span>
        </span>
      </td>

      {/* STATUS */}
      <td className="p-3 whitespace-nowrap">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {item.status.toUpperCase()}
        </span>
      </td>

      {/* UPDATE */}
      <td className="p-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <select
            value={item.status}
            onChange={(e) =>
              handleStatusChange(item.id, e.target.value)
            }
            className="border px-2 py-1 rounded"
          >
            <option>Pending</option>
            <option>Resolved</option>
          </select>

          <button className="bg-black text-white px-3 py-1 rounded">
            Update
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

export default ManageEnquiries;