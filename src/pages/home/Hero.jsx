import React from "react";
import { Link } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    CreditCard,
    HeartPulse,
    ShieldCheck,
    Stethoscope,
    Users,
} from "lucide-react";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-slate-50">

            {/* Background */}
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[120px]" />

            <div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-cyan-200/30 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">

                <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">

                    {/* ================================================= */}
                    {/* LEFT */}
                    {/* ================================================= */}

                    <div>

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-blue-700 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            SMART HEALTHCARE PLATFORM
                        </div>

                        <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl xl:text-7xl">
                            Healthcare
                            <span className="block text-blue-600">
                                made simpler.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                            Manage patients, doctors, appointments,
                            prescriptions and billing from one secure
                            hospital management platform.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-3">

                            <Link
                                to="/register"
                                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                Create Account

                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                            >
                                Sign In
                            </Link>

                        </div>

                        {/* Trust */}
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

                            <Trust
                                icon={<ShieldCheck size={17} />}
                                text="Secure"
                            />

                            <Trust
                                icon={<Clock3 size={17} />}
                                text="Easy to use"
                            />

                            <Trust
                                icon={<Activity size={17} />}
                                text="Centralized"
                            />

                        </div>

                    </div>

                    {/* ================================================= */}
                    {/* DASHBOARD PREVIEW */}
                    {/* ================================================= */}

                    <div className="relative">

                        <div className="absolute -inset-5 rounded-[35px] bg-blue-500/10 blur-2xl" />

                        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">

                            {/* Fake browser header */}
                            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">

                                <div className="flex gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                                </div>

                                <div className="rounded-lg bg-white px-4 py-1.5 text-[10px] text-slate-400 shadow-sm">
                                    medicare / dashboard
                                </div>

                                <div className="w-8" />
                            </div>

                            <div className="p-5 sm:p-7">

                                {/* Dashboard heading */}
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-xs font-medium text-slate-400">
                                            Hospital Overview
                                        </p>

                                        <h2 className="mt-1 text-xl font-black text-slate-900">
                                            Dashboard
                                        </h2>
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <HeartPulse size={20} />
                                    </div>

                                </div>

                                {/* Stats */}
                                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                                    <MiniStat
                                        icon={<Users size={16} />}
                                        title="Patients"
                                        value="1,248"
                                    />

                                    <MiniStat
                                        icon={<Stethoscope size={16} />}
                                        title="Doctors"
                                        value="86"
                                    />

                                    <MiniStat
                                        icon={<CalendarDays size={16} />}
                                        title="Today"
                                        value="42"
                                    />

                                    <MiniStat
                                        icon={<CreditCard size={16} />}
                                        title="Billing"
                                        value="₹48K"
                                    />

                                </div>

                                {/* Main dashboard */}
                                <div className="mt-4 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">

                                    {/* Appointment */}
                                    <div className="rounded-2xl border border-slate-200 p-4">

                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Schedule
                                                </p>

                                                <h3 className="font-bold text-slate-900">
                                                    Today's Appointments
                                                </h3>
                                            </div>

                                            <CalendarDays
                                                size={18}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div className="space-y-2.5">

                                            <Appointment
                                                name="Patient A"
                                                doctor="Dr. Sharma"
                                                time="10:00 AM"
                                                status="Confirmed"
                                            />

                                            <Appointment
                                                name="Patient B"
                                                doctor="Dr. Roy"
                                                time="11:30 AM"
                                                status="Waiting"
                                            />

                                            <Appointment
                                                name="Patient C"
                                                doctor="Dr. Das"
                                                time="02:00 PM"
                                                status="Confirmed"
                                            />

                                        </div>

                                    </div>

                                    {/* Activity */}
                                    <div className="rounded-2xl border border-slate-200 p-4">

                                        <div className="mb-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Overview
                                                </p>

                                                <h3 className="font-bold">
                                                    Activity
                                                </h3>
                                            </div>

                                            <Activity
                                                size={18}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div className="space-y-4">

                                            <ActivityItem
                                                title="New patient"
                                                text="Registration completed"
                                            />

                                            <ActivityItem
                                                title="Appointment"
                                                text="Schedule updated"
                                            />

                                            <ActivityItem
                                                title="Prescription"
                                                text="Medicine added"
                                            />

                                        </div>

                                    </div>

                                </div>

                                {/* Bottom badge */}
                                <div className="mt-4 flex items-center justify-between rounded-2xl bg-blue-600 px-4 py-3 text-white">

                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={17} />

                                        <span className="text-xs font-semibold">
                                            All systems operational
                                        </span>
                                    </div>

                                    <ChevronRight size={17} />

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ========================================================= */
/* TRUST */
/* ========================================================= */

function Trust({ icon, text }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-blue-600">
                {icon}
            </span>
            {text}
        </div>
    );
}

/* ========================================================= */
/* MINI STAT */
/* ========================================================= */

function MiniStat({ icon, title, value }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                {icon}
            </div>

            <p className="mt-2 text-[10px] text-slate-400">
                {title}
            </p>

            <p className="mt-0.5 text-sm font-black text-slate-900">
                {value}
            </p>
        </div>
    );
}

/* ========================================================= */
/* APPOINTMENT */
/* ========================================================= */

function Appointment({
                         name,
                         doctor,
                         time,
                         status,
                     }) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {name.slice(-1)}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-800">
                    {name}
                </p>

                <p className="truncate text-[10px] text-slate-400">
                    {doctor}
                </p>
            </div>

            <div className="text-right">
                <p className="text-[10px] font-bold text-slate-700">
                    {time}
                </p>

                <p className="text-[9px] text-emerald-600">
                    {status}
                </p>
            </div>
        </div>
    );
}

/* ========================================================= */
/* ACTIVITY ITEM */
/* ========================================================= */

function ActivityItem({ title, text }) {
    return (
        <div className="flex gap-3">

            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />

            <div>
                <p className="text-xs font-bold text-slate-800">
                    {title}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                    {text}
                </p>
            </div>
        </div>
    );
}
export default Hero;