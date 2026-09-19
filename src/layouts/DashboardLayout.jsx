import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-72">
        <Navbar onMenuClick={() => setOpen(true)} />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
export default DashboardLayout;
