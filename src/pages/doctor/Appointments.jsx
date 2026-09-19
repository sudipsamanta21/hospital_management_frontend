import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import appointmentService from "../../services/appointmentService";
import api from "../../services/api";

import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const Appointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {

    setLoading(true);
    setError("");

    try {

      // 1. Get currently logged-in doctor
      const doctorResponse = await api.get("/doctors/me");

      const doctor = doctorResponse.data;

      console.log("Logged-in Doctor:", doctor);

      if (!doctor?.id) {
        throw new Error("Doctor profile not found.");
      }

      // 2. Get ONLY this doctor's appointments
      const response =
          await appointmentService.getByDoctorId(doctor.id);

      console.log(
          "Doctor Appointments:",
          response.data
      );

      setAppointments(response.data || []);

    } catch (err) {

      console.error(
          "Failed to load doctor appointments:",
          err
      );

      setError(
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Failed to load appointments."
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
            eyebrow="Doctor Portal"
            title="Appointments"
            description="View your scheduled patient appointments."
        />


        {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {typeof error === "string"
                  ? error
                  : "Failed to load appointments."}
            </div>
        )}


        <div className="panel">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h3 className="font-semibold">
                My Appointments
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Appointments assigned to you.
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
                <th>Date & Time</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>

              </thead>


              <tbody>

              {appointments.length === 0 ? (

                  <tr>

                    <td
                        colSpan="5"
                        className="py-10 text-center text-slate-500"
                    >
                      No appointments found.
                    </td>

                  </tr>

              ) : (

                  appointments.map((appointment) => (

                      <tr key={appointment.id}>

                        <td>
                          {appointment.appointmentTime
                              ? new Date(
                                  appointment.appointmentTime
                              ).toLocaleString()
                              : "-"}
                        </td>


                        <td>
                          {appointment.patient?.name || "-"}
                        </td>


                        <td>
                          {appointment.doctor?.name || "-"}
                        </td>


                        <td>
                          {appointment.reason || "-"}
                        </td>


                        <td>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {appointment.status || "SCHEDULED"}
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

export default Appointments;