import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () =>{
  const { user } = useAuth();

   if (!user) {
     return <Navigate to="/login" replace />;
   }

   if (user.role === "ADMIN") {
     return <Navigate to="/admin" replace />;
   }

   if (user.role === "DOCTOR") {
     return <Navigate to="/doctor" replace />;
   }

   if (user.role === "PATIENT") {
     return <Navigate to="/patient" replace />;
   }

   if (user.role === "RECEPTIONIST") {
     return <Navigate to="/receptionist" replace />;
   }

   return <Navigate to="/login" replace />;
}
export default Dashboard;