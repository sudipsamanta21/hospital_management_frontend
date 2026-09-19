import React, { useEffect, useState } from "react";
import { HeartPulse, FileText } from "lucide-react";
import prescriptionService from "../../services/prescriptionService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";


const MedicalHistory = () => {

  const [a, setA] = useState([]),
    [l, setL] = useState(true);

  useEffect(() => {
    prescriptionService
      .getAll()
      .then((r) => setA(r.data))
      .catch(() => {})
      .finally(() => setL(false));
  }, []);


  if (l) return <Loading />;
  return (
    <div>
      <PageHeader
        eyebrow="Patient Portal"
        title="Medical History"
        description="Review prescriptions and clinical information."
      />
      <div className="space-y-4">
        {a.map((x) => (
          <div key={x.id} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <HeartPulse />
              </div>
              <div>
                <h3 className="font-semibold">
                  {x.diagnosis || "Medical record"}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Doctor: {x.doctor?.name || "-"} •{" "}
                  {x.prescribedAt
                    ? new Date(x.prescribedAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
              <FileText className="ml-auto text-slate-300" />
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {x.instructions || "No instructions available."}
            </p>
            <p className="mt-3 text-sm font-medium">
              Medicines: {x.medicines?.join(", ") || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicalHistory;