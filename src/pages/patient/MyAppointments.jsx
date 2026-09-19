import React, { useEffect, useState } from "react";
import { RefreshCw, CalendarDays } from "lucide-react";

import appointmentService from "../../services/appointmentService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const MyAppointments = () =>{

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const response = await appointmentService.getMyPatient();

      console.log("Appointments API response:", response.data);

      setAppointments(response.data || []);
    } catch (error) {
      console.error("Failed to load appointments:", error);

      alert(
          error.response?.data?.message ||
          error.response?.data ||
          "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDoctorName = (appointment) => {
    return appointment.doctor?.name || "Unknown Doctor";
  };

  const getSpecialization = (appointment) => {
    return appointment.doctor?.specialization || "Specialist";
  };

  const getStatus = (appointment) => {
    return appointment.status || "SCHEDULED";
  };

  if (loading) {
    return <Loading />;
  }

  return (
      <div>
        <PageHeader
            eyebrow="Patient Portal"
            title="My Appointments"
            description="Track your scheduled and previous appointments."
        />

        <div className="panel">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Appointments
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {appointments.length} appointment
                {appointments.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
                type="button"
                onClick={loadAppointments}
                className="secondary-button flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {appointments.length === 0 ? (
              <div className="py-12 text-center">
                <CalendarDays
                    size={42}
                    className="mx-auto text-slate-300 mb-3"
                />

                <h3 className="text-lg font-semibold text-slate-700">
                  No appointments
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  You don't have any appointments yet.
                </p>
              </div>
          ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                  <tr>
                    <th>DATE</th>
                    <th>DOCTOR</th>
                    <th>SPECIALIZATION</th>
                    <th>REASON</th>
                    <th>ROOM NUMBER</th>
                    <th>STATUS</th>
                  </tr>
                  </thead>

                  <tbody>
                  {appointments.map((appointment) => (
                      <tr key={appointment.id}>

                        {/* DATE */}
                        <td>
                          {appointment.appointmentTime
                              ? new Date(
                                  appointment.appointmentTime
                              ).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                              : "-"}
                        </td>

                        {/* DOCTOR */}
                        <td>
                          <div className="font-medium text-slate-800">
                            {appointment.doctor?.name || "Unknown Doctor"}
                          </div>

                          <div className="text-xs text-slate-500 mt-1">
                            {appointment.doctor?.department?.name || ""}
                          </div>
                        </td>

                        {/* SPECIALIZATION */}
                        <td>
                          {appointment.doctor?.specialization || "Specialist"}
                        </td>

                        {/* REASON */}
                        <td>
                          {appointment.reason || "-"}
                        </td>

                        {/* ROOM NUMBER */}
                        <td>
                          {appointment.status === "CONFIRMED"
                              ? appointment.room?.roomNumber || "Not Assigned"
                              : "-"}
                        </td>

                        {/* STATUS */}
                        <td>
                <span className="badge">
                    {appointment.status || "SCHEDULED"}
                </span>
                        </td>

                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
        </div>
      </div>
  );
}
export default MyAppointments;