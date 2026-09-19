import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    HeartPulse,
    ShieldCheck,
} from "lucide-react";

const CTA = () => {
    return (
        <section className="bg-white px-5 py-24 sm:px-6">

            <div className="mx-auto max-w-7xl">

                <div className="relative overflow-hidden rounded-[32px] bg-blue-600 px-7 py-16 text-center shadow-2xl shadow-blue-600/20 sm:px-12">

                    {/* Decorative shapes */}
                    <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

                    <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-300/10 blur-2xl" />

                    <div className="relative">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                            <HeartPulse size={27} />
                        </div>

                        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
                            Get Started
                        </p>

                        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-5xl">
                            A simpler way to manage healthcare.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
                            Bring your hospital workflows together
                            with one modern and secure platform.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3">

                            <Link
                                to="/register"
                                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-600 transition hover:bg-slate-100"
                            >
                                Create Account

                                <ArrowRight
                                    size={17}
                                    className="transition group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                to="/login"
                                className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                            >
                                Sign In
                            </Link>

                        </div>

                        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-blue-100">
                            <ShieldCheck size={15} />
                            Secure role-based access
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
export default CTA;