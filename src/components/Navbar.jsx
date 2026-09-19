import React from "react";
import { Bell, Search, Menu, LogOut, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="rounded-xl p-2 lg:hidden">
            <Menu />
          </button>
          <div className="hidden items-center gap-3 rounded-xl bg-slate-100 px-4 py-2.5 md:flex">
            <Search size={18} className="text-slate-400" />
            <input
              className="w-52 bg-transparent outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-xl p-2.5 text-slate-500">
            <Bell size={21} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
              <UserRound size={19} />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-slate-500">{user?.role || "User"}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-xl p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
