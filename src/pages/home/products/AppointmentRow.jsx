import React from "react";

const AppointmentRow =({name, doctor, time,}) => {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {name?.charAt(0) || "P"}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-800">
                    {name}
                </p>

                <p className="truncate text-[10px] text-slate-400">
                    {doctor}
                </p>
            </div>

            <p className="text-[10px] font-bold text-slate-600">
                {time}
            </p>

        </div>
    );
}
export default AppointmentRow;