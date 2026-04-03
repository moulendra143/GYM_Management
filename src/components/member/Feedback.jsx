import React, { useState } from "react";
import { FaPaperPlane, FaLock, FaHistory, FaSmile } from "react-icons/fa";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = () => {
    if (!feedback.trim()) return;

    const newFeedback = {
      id: Date.now(),
      text: feedback,
    };

    setList([newFeedback, ...list]);
    setFeedback("");
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            💬 Feedback / Suggestions
          </h2>
          <p className="text-sm text-gray-500">
            Share your feedback to help improve gym services and experience.
          </p>
        </div>

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ================= LEFT: SUBMIT ================= */}
          <div className="border rounded-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-[#0f172a] text-white px-4 py-2 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <FaPaperPlane /> Submit Feedback
              </span>

              <span className="bg-white text-black text-xs px-2 py-1 rounded flex items-center gap-1">
                <FaLock /> Private
              </span>
            </div>

            {/* BODY */}
            <div className="p-4">

              <label className="text-sm font-medium">
                Your Feedback *
              </label>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your suggestion...

Example:
- Gym equipment maintenance
- New timings"
                className="w-full border rounded-lg p-3 mt-2 h-32 resize-none"
              />

              <p className="text-xs text-gray-500 mt-2">
                Please keep it short and clear. Your message will be visible to admin.
              </p>

              <button
                onClick={handleSubmit}
                className="mt-4 bg-black text-white px-4 py-2 rounded-full flex items-center gap-2"
              >
                <FaPaperPlane /> Submit
              </button>

            </div>
          </div>

          {/* ================= RIGHT: PREVIOUS ================= */}
          <div className="border rounded-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-[#0f172a] text-white px-4 py-2 flex items-center gap-2">
              <FaHistory /> My Previous Feedback
            </div>

            {/* BODY */}
            <div className="p-4 min-h-[220px] flex flex-col justify-center items-center text-center">

              {list.length === 0 ? (
                <>
                  <FaSmile className="text-3xl text-gray-400 mb-2" />
                  <p className="font-medium text-gray-600">
                    No feedback submitted yet
                  </p>
                  <p className="text-sm text-gray-400">
                    Your submitted feedback will appear here.
                  </p>
                </>
              ) : (
                <div className="w-full space-y-3">
                  {list.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 text-left text-sm"
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Feedback;