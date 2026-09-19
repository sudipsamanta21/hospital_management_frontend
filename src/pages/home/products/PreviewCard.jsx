import React from "react";

const PreviewCard = ({icon, title, value,}) =>{
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-white">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                {icon}
            </div>

            <p className="mt-3 text-xs font-bold text-slate-800">
                {title}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
                {value}
            </p>

        </div>
    );
}
export default PreviewCard;