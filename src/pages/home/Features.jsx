import React from "react";
import {
    CalendarDays,
    CreditCard,
    FileText,
    HeartPulse,
    ShieldCheck,
    Stethoscope,
    Users,
} from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: <Users size={22} />,
            number: "01",
            title: "Patient Management",
            description:
                "Keep patient profiles, personal information and medical records organized.",
        },
        {
            icon: <Stethoscope size={22} />,
            number: "02",
            title: "Doctor Management",
            description:
                "Manage doctors, specializations, departments and availability.",
        },
        {
            icon: <CalendarDays size={22} />,
            number: "03",
            title: "Appointments",
            description:
                "Schedule, track and manage appointments with a simple workflow.",
        },
        {
            icon: <FileText size={22} />,
            number: "04",
            title: "Prescriptions",
            description:
                "Manage diagnoses, medicines and prescription information.",
        },
        {
            icon: <CreditCard size={22} />,
            number: "05",
            title: "Billing",
            description:
                "Create invoices and track payment status from one place.",
        },
        {
            icon: <ShieldCheck size={22} />,
            number: "06",
            title: "Secure Access",
            description:
                "Role-based access keeps each dashboard focused and protected.",
        },
    ];

    return (
        <section className="bg-white py-24">

            <div className="mx-auto max-w-7xl px-5 sm:px-6">

                {/* Heading */}
                <div className="max-w-2xl">

                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                        Platform Features
                    </p>

                    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        Everything your hospital needs.
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-slate-500">
                        One connected platform for managing the
                        essential day-to-day operations of your hospital.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature) => (
                        <FeatureCard
                            key={feature.number}
                            {...feature}
                        />
                    ))}

                </div>

                {/* Bottom banner */}
                <div className="mt-6 flex flex-col gap-5 rounded-3xl bg-slate-950 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <HeartPulse size={23} />
                        </div>

                        <div>
                            <h3 className="font-bold text-white">
                                One system. Every workflow.
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Designed for modern hospital operations.
                            </p>
                        </div>

                    </div>

                    <ShieldCheck
                        size={28}
                        className="text-blue-400"
                    />
                </div>

            </div>
        </section>
    );
}

function FeatureCard({
                         icon,
                         number,
                         title,
                         description,
                     }) {
    return (
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50">

            <div className="flex items-start justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    {icon}
                </div>

                <span className="text-xs font-black text-slate-300">
                    {number}
                </span>
            </div>

            <h3 className="mt-6 font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}

export default FeatureCard;