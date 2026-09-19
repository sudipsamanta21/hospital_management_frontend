import React, { useEffect, useState } from "react";
import { Trash2, UserRound, RefreshCw } from "lucide-react";
import patientService from "../../services/patientService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const Patients = () => {


  const [a, setA] = useState([]),
    [loading, setLoading] = useState(true);


  const load = () => {
    setLoading(true);
    patientService
      .getAll()
      .then((r) => setA(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  const del = async (id) => {
    if (!confirm("Delete this patient? Related records may prevent deletion."))
      return;
    try {
      await patientService.remove(id);
      load();
    } catch (e) {
      alert(
        e.response?.data ||
          "Cannot delete patient. This patient may have related records.",
      );
    }
  };

  if (loading) return <Loading />;
  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Patients"
        description="View and manage registered patients."
      />
      <div className="panel">
        <div className="mb-5 flex justify-between">
          <h3 className="font-semibold">Patient Directory</h3>
          <button onClick={load} className="secondary-button">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {a.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600">
                        <UserRound size={17} />
                      </div>
                      <b>{p.name}</b>
                    </div>
                  </td>
                  <td>{p.gender || "-"}</td>
                  <td>{p.age ?? "-"}</td>
                  <td>{p.phone || "-"}</td>
                  <td>{p.email || "-"}</td>
                  <td>
                    <button onClick={() => del(p.id)} className="danger-button">
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Patients;