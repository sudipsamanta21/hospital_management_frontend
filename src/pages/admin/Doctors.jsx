import React, { useEffect, useState } from "react";
import { Trash2, Stethoscope, RefreshCw } from "lucide-react";
import doctorService from "../../services/doctorService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";


const Doctors = () => {

  const [a, setA] = useState([]),
    [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    doctorService
      .getAll()
      .then((r) => setA(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);
  const del = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    try {
      await doctorService.remove(id);
      load();
    } catch (e) {
      alert(e.response?.data || "Cannot delete doctor");
    }
  };


  if (loading) return <Loading />;
  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Doctors"
        description="Manage doctors and departments."
      />
      <div className="panel">
        <div className="mb-5 flex justify-between">
          <h3 className="font-semibold">Doctor Directory</h3>
          <button onClick={load} className="secondary-button">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {a.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                        <Stethoscope size={17} />
                      </div>
                      <b>{d.name}</b>
                    </div>
                  </td>
                  <td>{d.specialization || "-"}</td>
                  <td>{d.department?.name || "-"}</td>
                  <td>{d.phone || "-"}</td>
                  <td>{d.email || "-"}</td>
                  <td>
                    <button onClick={() => del(d.id)} className="danger-button">
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

export default Doctors;
