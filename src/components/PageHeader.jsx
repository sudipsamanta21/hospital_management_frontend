import React from "react";
const PageHeader = ({ eyebrow, title, description, action }) =>{
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {eyebrow && (
          <p className="text-sm font-semibold text-blue-600">{eyebrow}</p>
        )}
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}
export default PageHeader;
