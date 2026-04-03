import React from "react";
import { FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

const Payments = () => {
  const payments = [
    {
      id: 1,
      plan: "Monthly",
      amount: "₹ 600.00",
      date: "17 Jan 2026",
      mode: "Cash",
      status: "Paid",
      notes: "half paid",
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            💳 My Payments
          </h2>
          <p className="text-sm text-gray-500">
            Your payment history, modes, and status.
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden border rounded-xl">

          {/* HEADER ROW */}
          <div className="grid grid-cols-7 bg-gray-50 px-4 py-3 text-sm font-medium">
            <div>#</div>
            <div>Plan</div>
            <div>Amount</div>
            <div>Payment Date</div>
            <div>Mode</div>
            <div>Status</div>
            <div>Notes</div>
          </div>

          {/* DATA */}
          {payments.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-7 px-4 py-3 items-center border-t text-sm"
            >
              {/* INDEX */}
              <div>{item.id}</div>

              {/* PLAN */}
              <div>
                <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                  👑 {item.plan}
                </span>
              </div>

              {/* AMOUNT */}
              <div>{item.amount}</div>

              {/* DATE */}
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                {item.date}
              </div>

              {/* MODE */}
              <div>
                <span className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                  <FaMoneyBillWave /> {item.mode}
                </span>
              </div>

              {/* STATUS */}
              <div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md w-fit">
                  {item.status}
                </span>
              </div>

              {/* NOTES */}
              <div className="text-gray-600">
                💬 {item.notes}
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Payments;