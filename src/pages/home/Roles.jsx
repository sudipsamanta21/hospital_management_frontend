import React from "react";
import {
    ArrowRight,
    CalendarDays,
    ShieldCheck,
    Stethoscope,
    Users,
} from "lucide-react";

const Roles = () =>{
    const roles = [
        {
            icon: <ShieldCheck size={23} />,
            title: "Administrator",
            tag: "CONTROL",
            description:
                "Manage users, doctors, patients, departments and hospital operations.",
        },
        {
            icon: <Stethoscope size={23} />,
            title: "Doctor",
            tag: "CLINICAL",
            description:
                "View appointments, patient information and manage prescriptions.",
        },
        {
            icon: <Users size={23} />,
            title: "Patient",
            tag: "CARE",
            description:
                "Book appointments and access medical history, prescriptions and bills.",
        },
        {
            icon: <CalendarDays size={23} />,
            title: "Receptionist",
            tag: "OPERATIONS",
            description:
                "Manage patients, doctors, appointments, departments and billing.",
        },
    ];

    return (
        <section className="bg-slate-50 py-24">

            <div className="mx-auto max-w-7xl px-5 sm:px-6">

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

                    <div className="max-w-2xl">

                        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                            Role Based Access
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            Designed around your role.
                        </h2>

                        <p className="mt-4 leading-7 text-slate-500">
                            Every user gets a focused experience with
                            the tools they need.
                        </p>
                    </div>

                    <ShieldCheck
                        size={35}
                        className="text-blue-600"
                    />
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                    {roles.map((role) => (
                        <RoleCard
                            key={role.title}
                            {...role}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
}

function RoleCard({
                      icon,
                      title,
                      tag,
                      description,
                  }) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

            <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    {icon}
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black tracking-wider text-slate-400">
                    {tag}
                </span>

            </div>

            <h3 className="mt-6 text-lg font-black text-slate-900">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
            </p>

            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-blue-600">
                Dedicated dashboard
                <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                />
            </div>

        </div>
    );
}
export default Roles;