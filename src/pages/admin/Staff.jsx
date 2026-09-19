import React from "react";
import { UserCog, ShieldCheck, Clock } from "lucide-react";
import PageHeader from "../../components/PageHeader";
const Staff = () => {
  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Staff"
        description="Hospital staff and access overview."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Administrators", "ADMIN", ShieldCheck, "Full system access"],
          [
            "Receptionists",
            "RECEPTIONIST",
            UserCog,
            "Appointments and patient operations",
          ],
          ["Support Staff", "STAFF", Clock, "Operational support"],
        ].map(([n, r, I, x]) => (
          <div key={r} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="rounded-xl bg-slate-100 p-3 w-fit">
              <I />
            </div>
            <h3 className="mt-5 font-semibold">{n}</h3>
            <p className="mt-1 text-xs font-bold text-blue-600">{r}</p>
            <p className="mt-3 text-sm text-slate-500">{x}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Staff;