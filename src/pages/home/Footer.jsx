import React from "react";
import { Link } from "react-router-dom";
import {
    Activity,
    ArrowUpRight,
    CalendarDays,
    HeartPulse,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#071a35] text-slate-300">

            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1fr_1fr]">

                    {/* Brand */}
                    <div>

                        <Link
                            to="/"
                            className="flex w-fit items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <HeartPulse size={23} />
                            </div>

                            <div>
                                <p className="font-black text-white">
                                    MediCare
                                </p>

                                <p className="text-[10px] text-slate-500">
                                    Hospital Management
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            A modern platform for managing hospital
                            operations, patients, doctors, appointments,
                            prescriptions and billing.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                            <ShieldCheck
                                size={15}
                                className="text-blue-400"
                            />
                            Secure healthcare platform
                        </div>

                    </div>

                    {/* Links */}
                    <div>

                        <h3 className="font-bold text-white">
                            Navigation
                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-sm">

                            <Link
                                to="/"
                                className="transition hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                to="/login"
                                className="transition hover:text-white"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/register"
                                className="transition hover:text-white"
                            >
                                Register
                            </Link>

                        </div>
                    </div>

                    {/* Services */}
                    <div>

                        <h3 className="font-bold text-white">
                            Platform
                        </h3>

                        <div className="mt-5 space-y-4 text-sm text-slate-400">

                            <div className="flex items-center gap-3">
                                <CalendarDays
                                    size={16}
                                    className="text-blue-400"
                                />
                                Appointment Management
                            </div>

                            <div className="flex items-center gap-3">
                                <HeartPulse
                                    size={16}
                                    className="text-blue-400"
                                />
                                Patient Management
                            </div>

                            <div className="flex items-center gap-3">
                                <Activity
                                    size={16}
                                    className="text-blue-400"
                                />
                                Hospital Operations
                            </div>

                        </div>
                    </div>

                    {/* Contact */}
                    <div>

                        <h3 className="font-bold text-white">
                            Contact
                        </h3>

                        <div className="mt-5 space-y-4 text-sm text-slate-400">

                            <div className="flex gap-3">
                                <MapPin
                                    size={17}
                                    className="mt-0.5 shrink-0 text-blue-400"
                                />

                                <span>
                                    Hospital Management Center
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone
                                    size={17}
                                    className="text-blue-400"
                                />

                                <span>
                                    +91 00000 00000
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail
                                    size={17}
                                    className="text-blue-400"
                                />

                                <span>
                                    support@medicare.com
                                </span>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 md:flex-row">

                    <p>
                        © {new Date().getFullYear()} MediCare Hospital Management System.
                        All rights reserved.
                    </p>

                    <div className="flex items-center gap-1">
                        Built with React + Tailwind CSS
                        <ArrowUpRight size={13} />
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;