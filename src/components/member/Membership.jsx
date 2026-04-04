import React from "react";
import { FaCrown, FaClock, FaWallet, FaCalendarAlt } from "react-icons/fa";

const Membership = () => {
  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            👑 My Membership
          </h2>
          <p className="text-sm text-gray-500">
            Your current plan, validity dates and payment summary.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* PLAN */}
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <h3 className="font-semibold flex items-center gap-2">
                <FaCrown /> Monthly
              </h3>
              <p className="text-sm text-gray-500">
                Duration: 1 month(s)
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaCrown className="text-green-600" />
            </div>
          </div>

          {/* DAYS REMAINING */}
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Days Remaining</p>
              <h3 className="font-semibold">31 day(s)</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaClock className="text-blue-600" />
            </div>
          </div>

          {/* AMOUNT */}
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Remaining Amount</p>
              <h3 className="font-semibold">₹ 600.0</h3>
              <p className="text-sm text-gray-500">Paid: ₹ 600</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <FaWallet className="text-red-600" />
            </div>
          </div>

        </div>

        {/* MEMBERSHIP DETAILS */}
        <div className="border rounded-xl overflow-hidden">

          {/* HEADER BAR */}
          <div className="bg-[#0f172a] text-white px-4 py-2 font-semibold">
            ℹ Membership Details
          </div>

          {/* TABLE */}
          <div className="divide-y text-sm">

            <div className="flex justify-between p-3">
              <span className="font-medium">Plan Name</span>
              <span>Monthly</span>
            </div>

            <div className="flex justify-between p-3">
              <span className="font-medium">Duration (months)</span>
              <span>1</span>
            </div>

            <div className="flex justify-between p-3">
              <span className="font-medium">Plan Fee</span>
              <span>₹ 1200.00</span>
            </div>

            <div className="flex justify-between p-3">
              <span className="font-medium">Total Paid</span>
              <span>₹ 600</span>
            </div>

            <div className="flex justify-between p-3">
              <span className="font-medium">Remaining Amount</span>
              <span>₹ 600.0</span>
            </div>

            <div className="flex justify-between p-3">
              <span className="font-medium">Start Date</span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt /> 17 Jan 2026
              </span>
            </div>

            <div className="flex justify-between p-3">
              <span className="font-medium">End Date</span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt /> 16 Feb 2026
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Membership;