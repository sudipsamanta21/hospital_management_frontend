import React, { useEffect, useState } from "react";
import { FileText, Plus, RefreshCw } from "lucide-react";

import doctorService from "../../services/doctorService";
import patientService from "../../services/patientService";
import prescriptionService from "../../services/prescriptionService";

import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const Prescriptions = () => {
  const [i, setI] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [p, setP] = useState([]);
  const [l, setL] = useState(true);
  const [saving, setSaving] = useState(false);

  const [f, setF] = useState({
    patientId: "",
    diagnosis: "",
    instructions: "",
    medicinesText: "",
  });

  const load = async () => {
    setL(true);

    try {
      // Get logged-in doctor
      const doctorResponse = await doctorService.getMe();
      const currentDoctor = doctorResponse.data;

      setDoctor(currentDoctor);

      // Get only this doctor's prescriptions
      const prescriptionResponse =
          await prescriptionService.getMy();

      setI(prescriptionResponse.data);

      // Get patients
      const patientResponse = await patientService.getAll();
      setP(patientResponse.data);
    } catch (e) {
      console.error("Failed to load prescriptions:", e);
    } finally {
      setL(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();

    if (!doctor?.id) {
      alert("Doctor profile not found");
      return;
    }

    setSaving(true);

    try {
      await prescriptionService.create(
          doctor.id,
          f.patientId,
          {
            diagnosis: f.diagnosis,
            instructions: f.instructions,
            medicines: f.medicinesText
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
          }
      );

      alert("Prescription created successfully");

      setF({
        patientId: "",
        diagnosis: "",
        instructions: "",
        medicinesText: "",
      });

      await load();
    } catch (e) {
      console.error("Create prescription error:", e);

      alert(
          e.response?.data?.message ||
          e.response?.data ||
          "Failed to create prescription"
      );
    } finally {
      setSaving(false);
    }
  };

  if (l) return <Loading />;

  return (
      <div>
        <PageHeader
            eyebrow="Doctor Portal"
            title="Prescriptions"
            description="Create and view prescriptions for your patients."
        />

        {/* CREATE PRESCRIPTION */}
        <div className="panel mb-6">
          <div className="mb-5 flex justify-between">
            <div>
              <h3 className="font-semibold">Create Prescription</h3>

              <p className="text-xs text-slate-400">
                Doctor:{" "}
                <span className="font-semibold text-slate-600">
                {doctor?.name || "-"}
              </span>
              </p>
            </div>

            <FileText className="text-blue-500" />
          </div>

          <form onSubmit={create} className="form-grid">
            {/* PATIENT */}
            <select
                required
                className="input"
                value={f.patientId}
                onChange={(e) =>
                    setF({
                      ...f,
                      patientId: e.target.value,
                    })
                }
            >
              <option value="">Select Patient</option>

              {p.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
              ))}
            </select>

            {/* DIAGNOSIS */}
            <input
                className="input"
                placeholder="Diagnosis"
                value={f.diagnosis}
                onChange={(e) =>
                    setF({
                      ...f,
                      diagnosis: e.target.value,
                    })
                }
            />

            {/* MEDICINES */}
            <input
                className="input"
                placeholder="Medicines separated by commas"
                value={f.medicinesText}
                onChange={(e) =>
                    setF({
                      ...f,
                      medicinesText: e.target.value,
                    })
                }
            />

            {/* INSTRUCTIONS */}
            <textarea
                className="input min-h-28"
                placeholder="Instructions"
                value={f.instructions}
                onChange={(e) =>
                    setF({
                      ...f,
                      instructions: e.target.value,
                    })
                }
            />

            <button
                type="submit"
                disabled={saving}
                className="primary-button"
            >
              <Plus size={17} />

              {saving
                  ? "Creating..."
                  : "Create Prescription"}
            </button>
          </form>
        </div>

        {/* PRESCRIPTION HISTORY */}
        <div className="panel">
          <div className="mb-5 flex justify-between">
            <div>
              <h3 className="font-semibold">
                My Prescription History
              </h3>

              <p className="text-xs text-slate-400">
                Prescriptions created by you
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
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Medicines</th>
                <th>Instructions</th>
              </tr>
              </thead>

              <tbody>
              {i.length === 0 ? (
                  <tr>
                    <td
                        colSpan="6"
                        className="py-8 text-center text-slate-400"
                    >
                      No prescriptions found
                    </td>
                  </tr>
              ) : (
                  i.map((x) => (
                      <tr key={x.id}>
                        <td>
                          {x.patient?.name || "-"}
                        </td>

                        <td>
                          {x.doctor?.name || "-"}
                        </td>

                        <td>
                          {x.prescribedAt
                              ? new Date(
                                  x.prescribedAt
                              ).toLocaleString()
                              : "-"}
                        </td>

                        <td>
                          {x.diagnosis || "-"}
                        </td>

                        <td>
                          {x.medicines?.join(", ") || "-"}
                        </td>

                        <td>
                          {x.instructions || "-"}
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

export default Prescriptions;