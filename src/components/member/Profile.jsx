import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaHashtag,
  FaVenusMars,
  FaCalendarAlt,
  FaEdit,
  FaKey,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

const Profile = () => {
  const [mode, setMode] = useState("view"); // view | edit | password

  const [profile, setProfile] = useState({
    name: "ravi kumar",
    username: "ravi",
    mobile: "5435******",
    age: 28,
    gender: "Male",
    address: "aaa zzz",
    joinDate: "17 Jan 2026",
  });

  const [form, setForm] = useState(profile);

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const handleEditSave = () => {
    setProfile(form);
    setMode("view");
  };

  const handlePasswordUpdate = () => {
    if (passwords.newPass !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }
    alert("Password Updated!");
    setMode("view");
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <p className="text-sm text-gray-500">
              View and manage your personal details.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setMode("edit")}
              className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>

            <button
              onClick={() => setMode("password")}
              className="border px-4 py-2 rounded-full flex items-center gap-2"
            >
              <FaKey /> Change Password
            </button>
          </div>
        </div>

        {/* ================= VIEW MODE ================= */}
        {mode === "view" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LEFT CARD */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-200 p-4 rounded-full">
                  <FaUser />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-sm text-gray-500">{profile.username}</p>
                </div>
              </div>

              <div className="text-sm space-y-2 text-gray-600">
                <p><FaPhone className="inline mr-2" /> {profile.mobile}</p>
                <p><FaHashtag className="inline mr-2" /> {profile.age}</p>
                <p><FaVenusMars className="inline mr-2" /> {profile.gender}</p>
                <p><FaCalendarAlt className="inline mr-2" /> {profile.joinDate}</p>
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className="border rounded-2xl overflow-hidden">
              <div className="bg-[#0f172a] text-white px-4 py-2 font-semibold">
                Profile Details
              </div>

              <div className="divide-y text-sm">
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3">
                    <span className="capitalize font-medium">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= EDIT MODE ================= */}
        {mode === "edit" && (
          <div className="grid grid-cols-2 gap-6">

            {Object.keys(profile).map((key) => (
              key !== "joinDate" && (
                <div key={key}>
                  <label className="text-sm capitalize">{key}</label>
                  <input
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className="w-full border p-2 rounded mt-1"
                  />
                </div>
              )
            ))}

            <div className="col-span-2 flex gap-3 mt-4">
              <button
                onClick={handleEditSave}
                className="bg-black text-white px-5 py-2 rounded-full"
              >
                Save Changes
              </button>

              <button
                onClick={() => setMode("view")}
                className="border px-5 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>

          </div>
        )}

        {/* ================= PASSWORD MODE ================= */}
        {mode === "password" && (
          <div className="max-w-md">

            {["current", "newPass", "confirm"].map((field, i) => (
              <div key={i} className="mb-4">
                <label className="text-sm capitalize">
                  {field === "newPass"
                    ? "New Password"
                    : field === "confirm"
                    ? "Confirm Password"
                    : "Current Password"}
                </label>

                <div className="flex items-center border rounded mt-1 px-2">
                  <input
                    type={show[field] ? "text" : "password"}
                    value={passwords[field]}
                    onChange={(e) =>
                      setPasswords({ ...passwords, [field]: e.target.value })
                    }
                    className="w-full p-2 outline-none"
                  />
                  <button onClick={() =>
                    setShow({ ...show, [field]: !show[field] })
                  }>
                    {show[field] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handlePasswordUpdate}
              className="bg-black text-white px-5 py-2 rounded-full"
            >
              Update Password
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;