import React from "react";
import {Navigate, useLocation,} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children, roles,}) => {
  const {user, loading,} = useAuth();

  const location = useLocation();

  const token =
      localStorage.getItem("token");

  // Wait for AuthContext to restore user
  if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading dashboard...
            </p>

          </div>
        </div>
    );
  }

  // Not logged in
  if (!token || !user) {
    return (
        <Navigate
            to="/login"
            state={{
              from: location,
            }}
            replace
        />
    );
  }

  // Role protection
  if (
      roles &&
      !roles.includes(user.role)
  ) {
    return (
        <Navigate
            to="/dashboard"
            replace
        />
    );
  }

  return children;
}

export default ProtectedRoute;