import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarCheck,
    Users,
    FileText,
    Clock,
    Stethoscope,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import PageHeader from "../../components/PageHeader";
import api from "../../services/api";

const DoctorDashboard = () =>{

    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                // Get logged-in doctor
                const doctorResponse = await api.get("/doctors/me");

                const doctorData = doctorResponse.data;

                console.log("Logged-in Doctor:", doctorData);

                setDoctor(doctorData);

                // Get doctor's appointments
                const appointmentResponse =
                    await api.get(`/appointments/doctor/${doctorData.id}`);

                // Get doctor's prescriptions
                const prescriptionResponse =
                    await api.get(`/prescriptions/doctor/${doctorData.id}`);

                setAppointments(appointmentResponse.data || []);
                setPrescriptions(prescriptionResponse.data || []);

                console.log(
                    "Doctor Appointments:",
                    appointmentResponse.data
                );

                console.log(
                    "Doctor Prescriptions:",
                    prescriptionResponse.data
                );

            } catch (err) {

                console.error("Doctor Dashboard Error:", err);

                setError(
                    err.response?.data?.message ||
                    err.response?.data ||
                    err.message ||
                    "Failed to load doctor dashboard."
                );

            } finally {

                setLoading(false);

            }
        };

        loadDashboard();

    }, []);


    // ==========================================
    // TODAY'S APPOINTMENTS
    // ==========================================

    const todayAppointments = useMemo(() => {

        const today = new Date();

        return appointments.filter((appointment) => {

            if (!appointment.appointmentTime) {
                return false;
            }

            const date = new Date(
                appointment.appointmentTime
            );

            return (
                date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()
            );

        });

    }, [appointments]);


    // ==========================================
    // REMAINING TODAY
    // ==========================================

    const remainingAppointments = useMemo(() => {

        const now = new Date();

        return todayAppointments.filter((appointment) => {

            const appointmentDate =
                new Date(appointment.appointmentTime);

            return (
                appointmentDate >= now &&
                appointment.status !== "CANCELLED"
            );

        });

    }, [todayAppointments]);


    // ==========================================
    // UNIQUE PATIENTS
    // ==========================================

    const uniquePatients = useMemo(() => {

        const patientIds = new Set();

        appointments.forEach((appointment) => {

            if (appointment.patient?.id) {
                patientIds.add(appointment.patient.id);
            }

        });

        return patientIds.size;

    }, [appointments]);


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatAppointmentTime = (value) => {

        if (!value) {
            return "Time not available";
        }

        const date = new Date(value);

        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        });

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="space-y-8">

                <PageHeader
                    eyebrow="Doctor Portal"
                    title="Doctor Dashboard"
                    description="Loading your clinical workspace..."
                />

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                    {[1, 2, 3].map((item) => (

                        <div
                            key={item}
                            className="h-32 animate-pulse rounded-2xl bg-slate-100"
                        />

                    ))}

                </div>

            </div>

        );

    }


    return (

        <div className="space-y-8">

            <PageHeader
                eyebrow="Doctor Portal"
                title="Doctor Dashboard"
                description={
                    doctor
                        ? `Welcome Dr. ${doctor.name}`
                        : "Your clinical workspace at a glance."
                }
            />


            {/* ERROR */}

            {error && (

                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>

            )}


            {/* ========================================
          STAT CARDS
      ======================================== */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                <StatCard
                    title="Today's Appointments"
                    value={todayAppointments.length}
                    description={`${remainingAppointments.length} remaining`}
                    icon={CalendarCheck}
                />

                <StatCard
                    title="My Patients"
                    value={uniquePatients}
                    description="Patients with appointments"
                    icon={Users}
                    iconClass="bg-emerald-50 text-emerald-600"
                />

                <StatCard
                    title="Prescriptions"
                    value={prescriptions.length}
                    description="Total prescriptions"
                    icon={FileText}
                    iconClass="bg-violet-50 text-violet-600"
                />

            </div>


            {/* ========================================
          DOCTOR INFORMATION
      ======================================== */}

            {doctor && (

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                            <Stethoscope size={24} />
                        </div>

                        <div>

                            <h3 className="font-semibold">
                                Dr. {doctor.name}
                            </h3>

                            <p className="text-sm text-slate-500">
                                {doctor.specialization || "Medical Specialist"}
                            </p>

                            {doctor.department?.name && (

                                <p className="mt-1 text-xs text-slate-400">
                                    Department: {doctor.department.name}
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            )}


            {/* ========================================
          TODAY'S SCHEDULE
      ======================================== */}

            <div className="panel">

                <div className="mb-4">

                    <h3 className="font-semibold">
                        Today's Schedule
                    </h3>

                    <p className="text-xs text-slate-400">
                        Appointments scheduled for today
                    </p>

                </div>


                {todayAppointments.length === 0 ? (

                    <div className="border-t py-8 text-center">

                        <CalendarCheck
                            className="mx-auto text-slate-300"
                            size={32}
                        />

                        <p className="mt-3 text-sm text-slate-400">
                            No appointments scheduled for today
                        </p>

                    </div>

                ) : (

                    todayAppointments
                        .sort(
                            (a, b) =>
                                new Date(a.appointmentTime) -
                                new Date(b.appointmentTime)
                        )
                        .map((appointment) => (

                            <div
                                key={appointment.id}
                                className="flex items-center gap-4 border-t py-4"
                            >

                                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                                    <Clock size={18} />
                                </div>

                                <div className="flex-1">

                                    <p className="text-sm font-medium">

                                        {appointment.patient?.name ||
                                            "Patient"}

                                    </p>

                                    <p className="text-xs text-slate-400">

                                        {appointment.reason ||
                                            "General consultation"}

                                    </p>

                                </div>

                                <div className="text-right">

                                    <p className="text-sm font-medium">

                                        {new Date(
                                            appointment.appointmentTime
                                        ).toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}

                                    </p>

                                    <p className="text-xs text-slate-400">

                                        {appointment.status}

                                    </p>

                                </div>

                            </div>

                        ))

                )}

            </div>


            {/* ========================================
          RECENT APPOINTMENTS
      ======================================== */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

                <h3 className="font-semibold">
                    Recent Appointments
                </h3>

                <p className="text-xs text-slate-400">
                    Your latest patient appointments
                </p>


                <div className="mt-5 space-y-3">

                    {appointments.length === 0 ? (

                        <p className="py-6 text-center text-sm text-slate-400">
                            No appointments found.
                        </p>

                    ) : (

                        appointments
                            .slice()
                            .sort(
                                (a, b) =>
                                    new Date(b.appointmentTime) -
                                    new Date(a.appointmentTime)
                            )
                            .slice(0, 5)
                            .map((appointment) => (

                                <div
                                    key={appointment.id}
                                    className="flex items-center gap-4 rounded-xl border p-4"
                                >

                                    <CalendarCheck
                                        size={20}
                                        className="text-blue-600"
                                    />

                                    <div className="flex-1">

                                        <p className="text-sm font-medium">

                                            {appointment.patient?.name ||
                                                "Patient"}

                                        </p>

                                        <p className="text-xs text-slate-400">

                                            {appointment.reason ||
                                                "Consultation"}

                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-xs font-medium">
                                            {formatAppointmentTime(
                                                appointment.appointmentTime
                                            )}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {appointment.status}
                                        </p>

                                    </div>

                                </div>

                            ))

                    )}

                </div>

            </div>

        </div>

    );
}
export default DoctorDashboard;