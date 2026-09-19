import React from "react";
import { ArrowRight } from "lucide-react";

const RoleCard = ({icon, title, description,}) =>{
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                {icon}
            </div>

            <h3 className="mt-6 text-lg font-black text-slate-900">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
            </p>

            <div className="mt-5 flex items-center gap-1 text-xs font-bold text-blue-600">
                Dedicated dashboard
                <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                />
            </div>

        </div>
    );
}
export default RoleCard;