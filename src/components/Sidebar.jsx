import React from "react";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  FileText,
  CreditCard,
  Building2,
  UserCog,
  HeartPulse,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menus = {
  ADMIN: [
    ["Dashboard", "/admin", LayoutDashboard],
    ["Doctors", "/admin/doctors", Stethoscope],
    ["Patients", "/admin/patients", Users],
    ["Departments", "/admin/departments", Building2],
    ["Staff", "/admin/staff", UserCog],
  ],

  DOCTOR: [
    ["Dashboard", "/doctor", LayoutDashboard],
    ["Appointments", "/doctor/appointments", CalendarDays],
    ["Patient History", "/doctor/patients", Users],
    ["Prescriptions", "/doctor/prescriptions", FileText],
  ],

  PATIENT: [
    ["Dashboard", "/patient", LayoutDashboard],
    ["Book Appointment", "/patient/book-appointment", CalendarDays],
    ["My Appointments", "/patient/appointments", CalendarDays],
    ["Medical History", "/patient/history", HeartPulse],
    ["Bills", "/patient/bills", CreditCard],
  ],

  // =========================
  // RECEPTIONIST
  // =========================
  RECEPTIONIST: [
    ["Dashboard", "/receptionist", LayoutDashboard],
    ["Appointments", "/receptionist/appointments", CalendarDays],
    ["Patients", "/receptionist/patients", Users],
    ["Doctors", "/receptionist/doctors", Stethoscope],
    ["Departments", "/receptionist/departments", Building2],
    ["Billing", "/receptionist/billing", CreditCard],
  ],
};

const Sidebar = ({ open, onClose }) => {
  const { user } = useAuth();

  const items = menus[user?.role] || menus.PATIENT;

  return (
      <>
        {/* Mobile overlay */}
        <div
            className={`fixed inset-0 z-40 bg-slate-950/40 lg:hidden ${
                open ? "block" : "hidden"
            }`}
            onClick={onClose}
        />

        {/* Sidebar */}
        <aside
            className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
                open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex h-20 items-center justify-between border-b px-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-3 text-white">
                <HeartPulse />
              </div>

              <div>
                <b>MediCare</b>

                <p className="text-[11px] text-slate-400">
                  Hospital Management
                </p>
              </div>
            </div>

            <button
                onClick={onClose}
                className="lg:hidden"
            >
              <X />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 p-4">
            {items.map(([name, path, Icon]) => (
                <NavLink
                    key={path}
                    to={path}
                    onClick={onClose}
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                            isActive
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50"
                        }`
                    }
                >
                  <Icon size={19} />
                  {name}
                </NavLink>
            ))}
          </nav>

          {/* Bottom Card */}
          <div className="mt-auto p-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-5 text-white">
              <HeartPulse />

              <p className="mt-4 font-semibold">
                Healthcare made simple
              </p>

              <p className="mt-1 text-xs text-blue-100">
                Manage your hospital from one place.
              </p>
            </div>
          </div>
        </aside>
      </>
  );
}

export default Sidebar;