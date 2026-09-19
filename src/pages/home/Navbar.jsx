import React, { useState } from "react";
import {
  ArrowRight,
  HeartPulse,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          {/* Logo */}
          <Link
              to="/"
              className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <HeartPulse size={24} />
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-slate-900">
                MediCare
              </p>

              <p className="text-[10px] font-medium text-slate-500">
                Hospital Management
              </p>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-3 md:flex">

            <Link
                to="/login"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Sign In
            </Link>

            <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>

          </div>

          {/* Mobile */}
          <button
              type="button"
              onClick={() => setOpen(!open)}
              className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {open ? (
                <X size={25} />
            ) : (
                <Menu size={25} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
            <div className="border-t border-slate-200 bg-white px-5 py-5 md:hidden">

              <div className="flex flex-col gap-2">

                <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Sign In
                </Link>

                <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Get Started
                </Link>

              </div>
            </div>
        )}
      </nav>
  );
}
export default Navbar;