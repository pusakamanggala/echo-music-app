import React from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-black p-4">
      {/* Sidebar component */}
      <Sidebar />
      <div className="flex-grow bg-gradient-to-t from-black to-sky-700 rounded-lg p-4 overflow-y-scroll h-full">
        {/* Content */}
        {/* Main content */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
