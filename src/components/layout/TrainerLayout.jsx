import React from "react";
import { Outlet } from "react-router-dom";
import TrainerNavbar from "../common/TrainerNavbar";

const TrainerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 TOP NAVBAR */}
      <TrainerNavbar />

      {/* 🔥 PAGE CONTENT */}
      <main className="p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default TrainerLayout;