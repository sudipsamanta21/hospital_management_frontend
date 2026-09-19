import React, { useEffect, useState } from "react";
import { Search, Users, RefreshCw } from "lucide-react";

import doctorService from "../../services/doctorService";
import appointmentService from "../../services/appointmentService";

import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const PatientHistory = () => {
  const [a, setA] = useState([]);
  const [q, setQ] = useState("");
  const [l, setL] = useState(true);

  const load = async () => {
    setL(true);

    try {
      // Get logged-in doctor
      const doctorResponse = await doctorService.getMe();
      const doctor = doctorResponse.data;

      // Get only this doctor's appointments
      const appointmentResponse =
          await appointmentService.getByDoctorId(doctor.id);

      const appointments = appointmentResponse.data;

      // Get unique patients from doctor's appointments
      const patientMap = new Map();

      appointments.forEach((appointment) => {
        const patient = appointment.patient;

        if (patient?.id) {
          patientMap.set(patient.id, patient);
        }
      });

      setA(Array.from(patientMap.values()));
    } catch (e) {
      console.error("Failed to load patient history:", e);
      setA([]);
    } finally {
      setL(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (l) return <Loading />;

  const f = a.filter((x) => {
    const search = q.toLowerCase();

    return (
        (x.name || "").toLowerCase().includes(search) ||
        (x.phone || "").toLowerCase().includes(search) ||
        (x.email || "").toLowerCase().includes(search)
    );
  });

  return (
      <div>
        <PageHeader
            eyebrow="Doctor Portal"
            title="Patient History"
            description="View patients who have appointments with you."
        />

        <div className="panel">
          {/* SEARCH + REFRESH */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl bg-slate-100 px-4 py-3">
              <Search size={18} />

              <input
                  className="w-full bg-transparent outline-none"
                  placeholder="Search patients..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <button
                onClick={load}
                className="secondary-button"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {/* PATIENT TABLE */}
          <div className="table-wrap">
            <table>
              <thead>
              <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Blood Group</th>
              </tr>
              </thead>

              <tbody>
              {f.length === 0 ? (
                  <tr>
                    <td
                        colSpan="6"
                        className="py-8 text-center text-slate-400"
                    >
                      No patients found
                    </td>
                  </tr>
              ) : (
                  f.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <Users size={17} />
                            <b>{p.name}</b>
                          </div>
                        </td>

                        <td>{p.age ?? "-"}</td>

                        <td>{p.phone || "-"}</td>

                        <td>{p.email || "-"}</td>

                        <td>{p.gender || "-"}</td>

                        <td>{p.bloodGroup || "-"}</td>
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
export default PatientHistory;