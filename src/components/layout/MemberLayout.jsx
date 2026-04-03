import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../common/TopNavbar";

const MemberLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* ✅ TOP NAVBAR */}
      <TopNavbar />

      {/* ✅ PAGE CONTENT */}
      <main className="p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default MemberLayout;