import React, { useEffect, useState } from "react";
import {
    CalendarDays,
    Users,
    Stethoscope,
    Building2,
    Receipt,
    RefreshCw,
} from "lucide-react";

import appointmentService from "../../services/appointmentService";
import patientService from "../../services/patientService";
import doctorService from "../../services/doctorService";
import departmentService from "../../services/departmentService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const ReceptionistDashboard = () => {
    const [stats, setStats] = useState({
        appointments: 0,
        patients: 0,
        doctors: 0,
        departments: 0,
    });

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);

        try {
            const [
                appointmentsResponse,
                patientsResponse,
                doctorsResponse,
                departmentsResponse,
            ] = await Promise.all([
                appointmentService.getAll(),
                patientService.getAll(),
                doctorService.getAll(),
                departmentService.getAll(),
            ]);

            const appointmentData = appointmentsResponse.data || [];

            setStats({
                appointments: appointmentData.length,
                patients: (patientsResponse.data || []).length,
                doctors: (doctorsResponse.data || []).length,
                departments: (departmentsResponse.data || []).length,
            });

            setAppointments(
                appointmentData.slice(0, 5)
            );
        } catch (e) {
            console.error(
                "Failed to load receptionist dashboard:",
                e
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <PageHeader
                eyebrow="Receptionist Portal"
                title="Receptionist Dashboard"
                description="Manage appointments, patients, doctors, departments and billing."
            />

            {/* STAT CARDS */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-6">

                <div className="panel">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Appointments
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stats.appointments}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                            <CalendarDays size={24} />
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Patients
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stats.patients}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-green-50 p-3 text-green-600">
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Doctors
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stats.doctors}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                            <Stethoscope size={24} />
                        </div>
                    </div>
                </div>

                <div className="panel">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Departments
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {stats.departments}
                            </h2>
                        </div>

                        <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                            <Building2 size={24} />
                        </div>
                    </div>
                </div>

            </div>

            {/* RECENT APPOINTMENTS */}
            <div className="panel">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">
                            Recent Appointments
                        </h3>

                        <p className="text-xs text-slate-400">
                            Latest scheduled appointments
                        </p>
                    </div>

                    <button
                        onClick={load}
                        className="secondary-button"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        {appointments.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="py-8 text-center text-slate-400"
                                >
                                    No appointments found
                                </td>
                            </tr>
                        ) : (
                            appointments.map((x) => (
                                <tr key={x.id}>
                                    <td>
                                        {x.appointmentTime
                                            ? new Date(
                                                x.appointmentTime
                                            ).toLocaleString()
                                            : "-"}
                                    </td>

                                    <td>
                                        {x.patient?.name || "-"}
                                    </td>

                                    <td>
                                        {x.doctor?.name || "-"}
                                    </td>

                                    <td>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {x.status || "SCHEDULED"}
                      </span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ReceptionistDashboard;