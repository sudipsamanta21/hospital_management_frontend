import React from "react";
import {
  Building2,
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Eye,
  Ear,
  Stethoscope,
  Sparkles,
  Activity,
} from "lucide-react";
import PageHeader from "../../components/PageHeader";

const d = [
  ["Cardiology", "Heart and cardiovascular care", HeartPulse],
  ["Neurology", "Brain and nervous system care", Brain],
  ["Orthopedics", "Bone and joint treatment", Bone],
  ["Pediatrics", "Medical care for children", Baby],
  ["Dermatology", "Skin and hair treatment", Sparkles],
  ["ENT", "Ear, nose and throat treatment", Ear],
  ["Ophthalmology", "Eye care and treatment", Eye],
  ["General Medicine", "General medical treatment", Stethoscope],
  ["Gynecology", "Women health and reproductive care", Activity],
  ["Psychiatry", "Mental health and behavioral care", Brain],
];
const Departments = () => {
  return (
    <div>
      <PageHeader
        eyebrow="Administration"
        title="Departments"
        description="Hospital departments and clinical specialties."
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {d.map(([n, x, I]) => (
          <div
            key={n}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="rounded-2xl bg-blue-50 p-3 w-fit text-blue-600">
              <I />
            </div>
            <h3 className="mt-5 font-bold">{n}</h3>
            <p className="mt-2 text-sm text-slate-500">{x}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Departments;