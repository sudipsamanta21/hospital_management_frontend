import React from "react";
const StatCard =({
  title,
  value,
  description,
  icon: Icon,
  iconClass = "bg-blue-50 text-blue-600",
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
          <p className="mt-2 text-xs text-slate-400">{description}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
export default StatCard;
