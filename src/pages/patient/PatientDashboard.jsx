import React, { useEffect, useState } from "react";
import {
    CalendarCheck,
    FileText,
    CreditCard,
    HeartPulse,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";


const  PatientDashboard = () =>{

    const { user } = useAuth();

    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [bills, setBills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                console.log("Dashboard User:", user);

                // =================================
                // GET LOGGED-IN PATIENT
                // =================================

                const patientResponse = await api.get("/patients/me");

                const patient = patientResponse.data;

                console.log("Current Patient:", patient);

                const patientId = patient.id;

                console.log("Dashboard Patient ID:", patientId);


                // =================================
                // GET PATIENT APPOINTMENTS
                // =================================

                const appointmentsResponse = await api.get(
                    `/appointments/patient/${patientId}`
                );

                console.log(
                    "Dashboard Appointments:",
                    appointmentsResponse.data
                );


                // =================================
                // GET PATIENT PRESCRIPTIONS
                // =================================

                const prescriptionsResponse = await api.get(
                    `/prescriptions/patient/${patientId}`
                );

                console.log(
                    "Dashboard Prescriptions:",
                    prescriptionsResponse.data
                );


                // =================================
                // GET PATIENT BILLS
                // =================================

                const billsResponse = await api.get(
                    `/bills/patient/${patientId}`
                );

                console.log(
                    "Dashboard Bills:",
                    billsResponse.data
                );


                // =================================
                // SAVE DATA
                // =================================

                setAppointments(
                    Array.isArray(appointmentsResponse.data)
                        ? appointmentsResponse.data
                        : []
                );

                setPrescriptions(
                    Array.isArray(prescriptionsResponse.data)
                        ? prescriptionsResponse.data
                        : []
                );

                setBills(
                    Array.isArray(billsResponse.data)
                        ? billsResponse.data
                        : []
                );

            } catch (err) {

                console.error(
                    "Dashboard API Error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    err.response?.data ||
                    err.message ||
                    "Failed to load dashboard data."
                );

            } finally {

                setLoading(false);
            }
        };


        if (user) {
            loadDashboard();
        }

    }, [user]);


    // ============================
    // COUNTS
    // ============================

    const appointmentCount = appointments.length;

    const prescriptionCount = prescriptions.length;

    const pendingBillCount = bills.filter(
        (bill) =>
            String(bill.status).toUpperCase() === "PENDING"
    ).length;


    return (

        <div className="space-y-8">

            {/* HEADER */}

            <PageHeader
                eyebrow="Patient Portal"
                title={`Welcome, ${user?.username || "Patient"}`}
                description="Manage appointments, prescriptions and healthcare information."
            />


            {/* ERROR */}

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}


            {/* CARDS */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Appointments"
                    value={loading ? "..." : appointmentCount}
                    description="Your appointments"
                    icon={CalendarCheck}
                />


                <StatCard
                    title="Medical Records"
                    value={loading ? "..." : prescriptionCount}
                    description="Available records"
                    icon={HeartPulse}
                    iconClass="bg-emerald-50 text-emerald-600"
                />


                <StatCard
                    title="Prescriptions"
                    value={loading ? "..." : prescriptionCount}
                    description="Your prescriptions"
                    icon={FileText}
                    iconClass="bg-violet-50 text-violet-600"
                />


                <StatCard
                    title="Pending Bills"
                    value={loading ? "..." : pendingBillCount}
                    description="Requires attention"
                    icon={CreditCard}
                    iconClass="bg-amber-50 text-amber-600"
                />

            </div>


            {/* HEALTH SECTION */}

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-7 text-white shadow-xl">

                <HeartPulse size={30} />

                <h3 className="mt-5 text-2xl font-bold">
                    Your health, organized.
                </h3>

                <p className="mt-2 max-w-xl text-sm text-blue-100">
                    Book appointments and keep track of your healthcare
                    journey from one secure dashboard.
                </p>

            </div>


            {/* UPCOMING APPOINTMENTS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Upcoming Appointments
                        </h2>

                        <p className="text-sm text-slate-500">
                            Your scheduled appointments
                        </p>
                    </div>

                    <CalendarCheck
                        className="text-blue-600"
                        size={24}
                    />

                </div>


                {loading ? (

                    <p className="text-sm text-slate-500">
                        Loading appointments...
                    </p>

                ) : appointmentCount === 0 ? (

                    <p className="text-sm text-slate-500">
                        No appointments found.
                    </p>

                ) : (

                    <div className="space-y-3">

                        {appointments
                            .slice(0, 5)
                            .map((appointment) => (

                                <div
                                    key={appointment.id}
                                    className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                                >

                                    <div>

                                        <p className="font-semibold text-slate-900">
                                            Dr.{" "}
                                            {appointment.doctor?.name ||
                                                "Doctor"}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            {appointment.doctor
                                                    ?.specialization ||
                                                "Medical Specialist"}
                                        </p>

                                    </div>


                                    <div className="text-right">

                                        <p className="text-sm font-medium text-slate-700">
                                            {appointment.appointmentTime
                                                ? new Date(
                                                    appointment.appointmentTime
                                                ).toLocaleString()
                                                : "Date not available"}
                                        </p>

                                        <span className="text-xs font-semibold text-blue-600">
                                            {appointment.status}
                                        </span>

                                    </div>

                                </div>

                            ))}

                    </div>
                )}

            </div>


            {/* PRESCRIPTIONS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Recent Prescriptions
                        </h2>

                        <p className="text-sm text-slate-500">
                            Your latest prescriptions
                        </p>
                    </div>

                    <FileText
                        className="text-violet-600"
                        size={24}
                    />

                </div>


                {loading ? (

                    <p className="text-sm text-slate-500">
                        Loading prescriptions...
                    </p>

                ) : prescriptions.length === 0 ? (

                    <p className="text-sm text-slate-500">
                        No prescriptions found.
                    </p>

                ) : (

                    <div className="space-y-3">

                        {prescriptions
                            .slice(0, 5)
                            .map((prescription) => (

                                <div
                                    key={prescription.id}
                                    className="rounded-xl bg-slate-50 p-4"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <p className="font-semibold text-slate-900">
                                                {prescription.diagnosis ||
                                                    "Medical Prescription"}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Dr.{" "}
                                                {prescription.doctor?.name ||
                                                    "Doctor"}
                                            </p>

                                        </div>

                                        <span className="text-xs text-slate-500">
                                            {prescription.prescribedAt
                                                ? new Date(
                                                    prescription.prescribedAt
                                                ).toLocaleDateString()
                                                : ""}
                                        </span>

                                    </div>

                                </div>

                            ))}

                    </div>

                )}

            </div>


            {/* BILLS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Pending Bills
                        </h2>

                        <p className="text-sm text-slate-500">
                            Bills requiring your attention
                        </p>
                    </div>

                    <CreditCard
                        className="text-amber-600"
                        size={24}
                    />

                </div>


                {loading ? (

                    <p className="text-sm text-slate-500">
                        Loading bills...
                    </p>

                ) : pendingBillCount === 0 ? (

                    <p className="text-sm text-emerald-600">
                        No pending bills.
                    </p>

                ) : (

                    <div className="space-y-3">

                        {bills
                            .filter(
                                (bill) =>
                                    String(bill.status).toUpperCase() ===
                                    "PENDING"
                            )
                            .slice(0, 5)
                            .map((bill) => (

                                <div
                                    key={bill.id}
                                    className="flex items-center justify-between rounded-xl bg-amber-50 p-4"
                                >

                                    <div>

                                        <p className="font-semibold text-slate-900">
                                            {bill.invoiceNumber ||
                                                `Bill #${bill.id}`}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            {bill.description ||
                                                "Hospital service"}
                                        </p>

                                    </div>


                                    <div className="text-right">

                                        <p className="font-bold text-slate-900">
                                            ₹
                                            {Number(
                                                bill.amount || 0
                                            ).toLocaleString("en-IN")}
                                        </p>

                                        <span className="text-xs font-semibold text-amber-600">
                                            PENDING
                                        </span>

                                    </div>

                                </div>

                            ))}

                    </div>

                )}

            </div>

        </div>
    );
}
export default PatientDashboard;