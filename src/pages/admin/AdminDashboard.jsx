import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Stethoscope,
  CalendarCheck,
  Building2,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import PageHeader from "../../components/PageHeader";

import doctorService from "../../services/doctorService";
import patientService from "../../services/patientService";
import appointmentService from "../../services/appointmentService";

import api from "../../services/api";

const AdminDashboard = () => {

  const [data, setData] = useState({
    doctors: [],
    patients: [],
    appointments: [],
    departments: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadDashboard = async () => {

      setLoading(true);
      setError("");

      try {

        const [
          doctorsResponse,
          patientsResponse,
          appointmentsResponse,
          departmentsResponse,
        ] = await Promise.all([
          doctorService.getAll(),
          patientService.getAll(),
          appointmentService.getAll(),
          api.get("/departments"),
        ]);

        const doctors = doctorsResponse.data || [];
        const patients = patientsResponse.data || [];
        const appointments = appointmentsResponse.data || [];
        const departments = departmentsResponse.data || [];

        console.log("ADMIN DASHBOARD DATA");
        console.log("Doctors:", doctors);
        console.log("Patients:", patients);
        console.log("Appointments:", appointments);
        console.log("Departments:", departments);

        setData({
          doctors,
          patients,
          appointments,
          departments,
        });

      } catch (err) {

        console.error("Admin Dashboard Error:", err);

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

    loadDashboard();

  }, []);



  const weeklyActivity = useMemo(() => {

    const days = [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ];

    const counts = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    data.appointments.forEach((appointment) => {

      if (!appointment.appointmentTime) {
        return;
      }

      const date = new Date(appointment.appointmentTime);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const day = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (counts[day] !== undefined) {
        counts[day]++;
      }
    });

    return days.map((day) => ({
      day,
      count: counts[day],
    }));

  }, [data.appointments]);


  // ==========================================
  // MAX VALUE FOR CHART
  // ==========================================
  const maxActivity = Math.max(
      ...weeklyActivity.map((item) => item.count),
      1
  );


  // ==========================================
  // RECENT APPOINTMENTS
  // ==========================================
  const recentAppointments = useMemo(() => {

    return [...data.appointments]
        .sort((a, b) => {

          const dateA = new Date(a.appointmentTime || 0);
          const dateB = new Date(b.appointmentTime || 0);

          return dateB - dateA;
        })
        .slice(0, 4);

  }, [data.appointments]);


  // ==========================================
  // TIME FORMAT
  // ==========================================
  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "Unknown date";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

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
              eyebrow="Admin Overview"
              title="Hospital Dashboard"
              description="Loading hospital information..."
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
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
            eyebrow="Admin Overview"
            title="Hospital Dashboard"
            description="Monitor hospital activity and manage healthcare operations."
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
              title="Total Patients"
              value={data.patients.length}
              description="Registered patients"
              icon={Users}
          />

          <StatCard
              title="Total Doctors"
              value={data.doctors.length}
              description="Active doctors"
              icon={Stethoscope}
              iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
              title="Appointments"
              value={data.appointments.length}
              description="All appointments"
              icon={CalendarCheck}
              iconClass="bg-violet-50 text-violet-600"
          />

          <StatCard
              title="Departments"
              value={data.departments.length}
              description="Hospital departments"
              icon={Building2}
              iconClass="bg-amber-50 text-amber-600"
          />

        </div>


        {/* ========================================
          CHART + RECENT ACTIVITY
      ======================================== */}

        <div className="grid gap-6 xl:grid-cols-3">


          {/* ======================================
            WEEKLY ACTIVITY
        ====================================== */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold">
                  Weekly Appointment Activity
                </h3>

                <p className="text-xs text-slate-400">
                  Based on real appointment data
                </p>

              </div>

              <TrendingUp className="text-emerald-500" />

            </div>


            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-6">

              {weeklyActivity.map((item) => {

                const height =
                    item.count === 0
                        ? 3
                        : Math.max(
                            (item.count / maxActivity) * 100,
                            8
                        );

                return (

                    <div
                        key={item.day}
                        className="flex flex-1 flex-col items-center gap-2"
                    >

                      <div className="flex h-52 w-full items-end">

                        <div
                            className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500"
                            style={{
                              height: `${height}%`,
                            }}
                            title={`${item.count} appointment${
                                item.count !== 1 ? "s" : ""
                            }`}
                        />

                      </div>

                      <span className="text-xs text-slate-400">
                    {item.day}
                  </span>

                      <span className="text-xs font-medium text-slate-600">
                    {item.count}
                  </span>

                    </div>

                );

              })}

            </div>

          </div>


          {/* ======================================
            RECENT ACTIVITY
        ====================================== */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Activity />
              </div>

              <div>

                <h3 className="font-semibold">
                  Recent Activity
                </h3>

                <p className="text-xs text-slate-400">
                  Latest appointments
                </p>

              </div>

            </div>


            <div className="mt-6 space-y-5">

              {recentAppointments.length === 0 ? (

                  <div className="py-8 text-center">

                    <CalendarCheck
                        className="mx-auto text-slate-300"
                        size={32}
                    />

                    <p className="mt-3 text-sm text-slate-400">
                      No appointments yet
                    </p>

                  </div>

              ) : (

                  recentAppointments.map((appointment) => (

                      <div
                          key={appointment.id}
                          className="flex gap-3"
                      >

                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />

                        <div className="min-w-0">

                          <p className="truncate text-sm font-medium text-slate-700">

                            {appointment.patient?.name
                                ? `Appointment for ${appointment.patient.name}`
                                : "New appointment"}

                          </p>

                          <p className="mt-1 text-xs text-slate-500">

                            {appointment.doctor?.name
                                ? `Dr. ${appointment.doctor.name}`
                                : "Doctor assigned"}

                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">

                            <Clock size={12} />

                            {formatDate(
                                appointment.appointmentTime
                            )}

                          </p>

                        </div>

                      </div>

                  ))

              )}

            </div>

          </div>

        </div>


        {/* ========================================
          DEPARTMENT LIST
      ======================================== */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold">
                Hospital Departments
              </h3>

              <p className="text-xs text-slate-400">
                Departments currently registered in the system
              </p>

            </div>

            <Building2 className="text-amber-500" />

          </div>


          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {data.departments.map((department) => (

                <div
                    key={department.id}
                    className="rounded-xl border bg-slate-50 p-4"
                >

                  <h4 className="font-medium text-slate-700">
                    {department.name}
                  </h4>

                  {department.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                        {department.description}
                      </p>
                  )}

                </div>

            ))}

          </div>

        </div>

      </div>
  );
}
export default AdminDashboard;