import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const RecordPayment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    member: "",
    plan: "",
    amount: "",
    date: "",
    mode: "Cash",
    status: "Paid",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.member || !form.amount) {
      alert("Required fields missing");
      return;
    }

    console.log(form);
    navigate("/admin/payments");
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Record Payment</h2>
            <p className="text-gray-500 text-sm">
              Record member payment, mode, status and optional membership update.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/payments")}
            className="border px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Payments
          </button>
        </div>

        {/* FORM */}
        <div className="bg-gray-50 p-6 rounded-2xl border space-y-6">

          <div className="grid md:grid-cols-2 gap-4">

            {/* MEMBER */}
            <div>
              <label>Member *</label>
              <input
                name="member"
                placeholder="Select Member"
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
            </div>

            {/* PLAN */}
            <div>
              <label>Plan</label>
              <input
                name="plan"
                placeholder="No Plan"
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
              <p className="text-xs text-gray-400">
                Plan is optional. Choose it if payment is for a specific membership plan.
              </p>
            </div>

            {/* AMOUNT */}
            <div>
              <label>Amount *</label>
              <input
                name="amount"
                placeholder="e.g. 999"
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
            </div>

            {/* DATE */}
            <div>
              <label>Payment Date</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              />
              <p className="text-xs text-gray-400">
                Leave empty if your backend sets today by default.
              </p>
            </div>

            {/* MODE */}
            <div>
              <label>Mode</label>
              <select
                name="mode"
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              >
                <option>Cash</option>
                <option>Online</option>
              </select>
            </div>

            {/* STATUS */}
            <div>
              <label>Status</label>
              <select
                name="status"
                onChange={handleChange}
                className="border p-2 rounded-lg w-full mt-1"
              >
                <option>Paid</option>
                <option>Pending</option>
              </select>
            </div>

          </div>

          {/* NOTES */}
          <div>
            <label>Notes</label>
            <textarea
              name="notes"
              placeholder="Optional notes: transaction ref, remarks, etc."
              onChange={handleChange}
              className="border p-2 rounded-lg w-full mt-1"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-5 py-2 rounded-full"
          >
            Save Payment
          </button>

        </div>
      </div>
    </div>
  );
};

export default RecordPayment;