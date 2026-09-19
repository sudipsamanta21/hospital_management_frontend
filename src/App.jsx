import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Home
import Home from "./pages/home/Home";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Doctors from "./pages/admin/Doctors";
import Patients from "./pages/admin/Patients";
import Departments from "./pages/admin/Departments";
import Staff from "./pages/admin/Staff";

// Doctor
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import PatientHistory from "./pages/doctor/PatientHistory";
import DoctorPrescriptions from "./pages/doctor/Prescriptions";

// Patient
import PatientDashboard from "./pages/patient/PatientDashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import MedicalHistory from "./pages/patient/MedicalHistory";
import Bills from "./pages/patient/Bills";

// Receptionist
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import ReceptionistAppointments from "./pages/receptionist/Appointments";
import ReceptionistPatients from "./pages/receptionist/Patients";
import ReceptionistDoctors from "./pages/receptionist/Doctors";
import ReceptionistDepartments from "./pages/receptionist/Departments";
import ReceptionistBilling from "./pages/receptionist/Billing";

// =========================================================
// Protected Route + Dashboard Layout
// =========================================================

const W = ({ children, roles }) => (
    <ProtectedRoute roles={roles}>
        <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
);

// =========================================================
// APP
// =========================================================

export default function App() {
    return (
        <>
            {/* ================================================= */}
            {/* GLOBAL TOAST */}
            {/* ================================================= */}

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "12px",
                        padding: "14px 16px",
                        fontSize: "14px",
                    },
                }}
            />

            {/* ================================================= */}
            {/* ROUTES */}
            {/* ================================================= */}

            <Routes>
                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* ================= COMMON DASHBOARD ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={
                        <W roles={["ADMIN"]}>
                            <AdminDashboard />
                        </W>
                    }
                />

                <Route
                    path="/admin/doctors"
                    element={
                        <W roles={["ADMIN"]}>
                            <Doctors />
                        </W>
                    }
                />

                <Route
                    path="/admin/patients"
                    element={
                        <W roles={["ADMIN"]}>
                            <Patients />
                        </W>
                    }
                />

                <Route
                    path="/admin/departments"
                    element={
                        <W roles={["ADMIN"]}>
                            <Departments />
                        </W>
                    }
                />

                <Route
                    path="/admin/staff"
                    element={
                        <W roles={["ADMIN"]}>
                            <Staff />
                        </W>
                    }
                />

                {/* ================= DOCTOR ================= */}

                <Route
                    path="/doctor"
                    element={
                        <W roles={["DOCTOR"]}>
                            <DoctorDashboard />
                        </W>
                    }
                />

                <Route
                    path="/doctor/appointments"
                    element={
                        <W roles={["DOCTOR"]}>
                            <DoctorAppointments />
                        </W>
                    }
                />

                <Route
                    path="/doctor/patients"
                    element={
                        <W roles={["DOCTOR"]}>
                            <PatientHistory />
                        </W>
                    }
                />

                <Route
                    path="/doctor/prescriptions"
                    element={
                        <W roles={["DOCTOR"]}>
                            <DoctorPrescriptions />
                        </W>
                    }
                />

                {/* ================= PATIENT ================= */}

                <Route
                    path="/patient"
                    element={
                        <W roles={["PATIENT"]}>
                            <PatientDashboard />
                        </W>
                    }
                />

                <Route
                    path="/patient/book-appointment"
                    element={
                        <W roles={["PATIENT"]}>
                            <BookAppointment />
                        </W>
                    }
                />

                <Route
                    path="/patient/appointments"
                    element={
                        <W roles={["PATIENT"]}>
                            <MyAppointments />
                        </W>
                    }
                />

                <Route
                    path="/patient/history"
                    element={
                        <W roles={["PATIENT"]}>
                            <MedicalHistory />
                        </W>
                    }
                />

                <Route
                    path="/patient/bills"
                    element={
                        <W roles={["PATIENT"]}>
                            <Bills />
                        </W>
                    }
                />

                {/* ================= RECEPTIONIST ================= */}

                <Route
                    path="/receptionist"
                    element={
                        <W roles={["RECEPTIONIST"]}>
                            <ReceptionistDashboard />
                        </W>
                    }
                />

                <Route
                    path="/receptionist/appointments"
                    element={
                        <W roles={["RECEPTIONIST"]}>
                            <ReceptionistAppointments />
                        </W>
                    }
                />

                <Route
                    path="/receptionist/patients"
                    element={
                        <W roles={["RECEPTIONIST"]}>
                            <ReceptionistPatients />
                        </W>
                    }
                />

                <Route
                    path="/receptionist/doctors"
                    element={
                        <W roles={["RECEPTIONIST"]}>
                            <ReceptionistDoctors />
                        </W>
                    }
                />

                <Route
                    path="/receptionist/departments"
                    element={
                        <W roles={["RECEPTIONIST"]}>
                            <ReceptionistDepartments />
                        </W>
                    }
                />

                <Route
                    path="/receptionist/billing"
                    element={
                        <W roles={["RECEPTIONIST"]}>
                            <ReceptionistBilling />
                        </W>
                    }
                />

                {/* ================= FALLBACK ================= */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </>
    );
}