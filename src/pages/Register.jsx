import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  HeartPulse,
  Info,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Stethoscope,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../services/authService";

const Register = () =>{
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "PATIENT",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("Please enter a username.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (form.password.length < 6) {
      toast.error(
          "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      toast.success(
          "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 900);
    } catch (error) {
      console.error("Registration error:", error);

      const data = error.response?.data;

      const message =
          data?.message ||
          data?.error ||
          (typeof data === "string"
              ? data
              : null) ||
          error.message ||
          "Registration failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#f5f8fc]">

        <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

          {/* ================================================= */}
          {/* LEFT BRAND PANEL */}
          {/* ================================================= */}

          <section className="relative hidden overflow-hidden bg-[#071a35] lg:block">

            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative flex min-h-screen flex-col justify-between p-10 xl:p-16">

              {/* Logo */}
              <Link
                  to="/"
                  className="flex w-fit items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
                  <HeartPulse size={26} />
                </div>

                <div>
                  <h1 className="text-xl font-bold text-white">
                    MediCare
                  </h1>

                  <p className="text-xs text-slate-400">
                    Hospital Management System
                  </p>
                </div>
              </Link>

              {/* Main */}
              <div className="max-w-xl">

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-400/20">
                  <UserPlus size={27} />
                </div>

                <p className="text-sm font-bold uppercase tracking-wider text-blue-400">
                  Join MediCare
                </p>

                <h2 className="mt-3 text-5xl font-black leading-[1.08] tracking-tight text-white xl:text-6xl">
                  One platform.
                  <span className="block text-blue-400">
                                    Better care.
                                </span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                  Create your account and access a modern
                  hospital management platform built for
                  patients, doctors and healthcare staff.
                </p>

                {/* Benefits */}
                <div className="mt-10 space-y-5">

                  <Benefit
                      icon={<ShieldCheck size={19} />}
                      title="Secure Access"
                      text="Protected authentication and role-based access."
                  />

                  <Benefit
                      icon={<Users size={19} />}
                      title="Connected Healthcare"
                      text="Bring patients, doctors and staff together."
                  />

                  <Benefit
                      icon={<Stethoscope size={19} />}
                      title="Easy Management"
                      text="Manage hospital operations from one platform."
                  />

                </div>
              </div>

              <p className="text-xs text-slate-500">
                Secure Hospital Management Platform
              </p>
            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT REGISTER PANEL */}
          {/* ================================================= */}

          <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

            <div className="w-full max-w-2xl">

              {/* Mobile Header */}
              <div className="mb-8 flex items-center justify-between lg:hidden">

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                    <HeartPulse size={23} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      MediCare
                    </p>

                    <p className="text-[10px] text-slate-500">
                      Hospital Management
                    </p>
                  </div>
                </Link>

                <Link
                    to="/login"
                    className="text-sm font-semibold text-blue-600"
                >
                  Login
                </Link>
              </div>

              {/* Register Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-9">

                {/* Header */}
                <div className="mb-8">

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <UserPlus size={27} />
                  </div>

                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Get started
                  </p>

                  <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                    Create your account
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Register for the MediCare hospital
                    management portal.
                  </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="space-y-5"
                >

                  {/* Username + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <Input
                        label="Username"
                        icon={<User size={18} />}
                        value={form.username}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              username:
                              e.target.value,
                            })
                        }
                        placeholder="Enter username"
                    />

                    <Input
                        label="Email"
                        type="email"
                        icon={<Mail size={18} />}
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                              ...form,
                              email:
                              e.target.value,
                            })
                        }
                        placeholder="Enter email address"
                    />

                  </div>

                  {/* Account Type */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Account Type
                    </label>

                    <div className="grid grid-cols-3 gap-3">

                      <RoleButton
                          active={
                              form.role ===
                              "PATIENT"
                          }
                          icon={<User size={19} />}
                          label="Patient"
                          onClick={() =>
                              setForm({
                                ...form,
                                role: "PATIENT",
                              })
                          }
                      />

                      <RoleButton
                          active={
                              form.role ===
                              "DOCTOR"
                          }
                          icon={
                            <Stethoscope
                                size={19}
                            />
                          }
                          label="Doctor"
                          onClick={() =>
                              setForm({
                                ...form,
                                role: "DOCTOR",
                              })
                          }
                      />

                      <RoleButton
                          active={
                              form.role ===
                              "RECEPTIONIST"
                          }
                          icon={
                            <Users size={19} />
                          }
                          label="Receptionist"
                          onClick={() =>
                              setForm({
                                ...form,
                                role: "RECEPTIONIST",
                              })
                          }
                      />

                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <div className="group relative">

                      <LockKeyhole
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-blue-600"
                      />

                      <input
                          required
                          minLength={6}
                          type={
                            showPassword
                                ? "text"
                                : "password"
                          }
                          value={form.password}
                          onChange={(e) =>
                              setForm({
                                ...form,
                                password:
                                e.target.value,
                              })
                          }
                          placeholder="Minimum 6 characters"
                          className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />

                      <button
                          type="button"
                          onClick={() =>
                              setShowPassword(
                                  !showPassword
                              )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                      >
                        {showPassword ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}
                      </button>

                    </div>
                  </div>

                  {/* Role Info */}
                  <RoleInfo role={form.role} />

                  {/* Submit */}
                  <button
                      type="submit"
                      disabled={loading}
                      className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Creating account...
                        </>
                    ) : (
                        <>
                          Create Account
                          <ArrowRight
                              size={18}
                              className="transition group-hover:translate-x-1"
                          />
                        </>
                    )}
                  </button>
                </form>

                {/* Login */}
                <div className="mt-7 border-t border-slate-100 pt-7 text-center">

                  <p className="text-sm text-slate-500">
                    Already have an account?
                  </p>

                  <Link
                      to="/login"
                      className="mt-1 inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
                  >
                    Sign in to your account
                    <ArrowRight size={15} />
                  </Link>
                </div>

              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} />
                Secure authentication
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}

/* ========================================================= */
/* INPUT */
/* ========================================================= */

function Input({
                 label,
                 type = "text",
                 icon,
                 value,
                 onChange,
                 placeholder,
               }) {
  return (
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </label>

        <div className="group relative">

          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-blue-600">
            {icon}
          </div>

          <input
              required
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>
  );
}

/* ========================================================= */
/* ROLE BUTTON */
/* ========================================================= */

function RoleButton({
                      active,
                      icon,
                      label,
                      onClick,
                    }) {
  return (
      <button
          type="button"
          onClick={onClick}
          className={`flex min-h-[78px] flex-col items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition ${
              active
                  ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/10"
                  : "border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-200 hover:bg-white hover:text-blue-600"
          }`}
      >
        {icon}
        {label}
      </button>
  );
}

/* ========================================================= */
/* ROLE INFORMATION */
/* ========================================================= */

function RoleInfo({ role }) {
  if (role === "DOCTOR") {
    return (
        <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
          <Info
              size={18}
              className="mt-0.5 shrink-0"
          />

          <p>
            Doctor registration requires your email
            to already exist in the hospital's doctor
            database.
          </p>
        </div>
    );
  }

  if (role === "RECEPTIONIST") {
    return (
        <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
          <Info
              size={18}
              className="mt-0.5 shrink-0"
          />

          <p>
            Receptionist registration requires your
            email to already exist in the hospital's
            receptionist database.
          </p>
        </div>
    );
  }

  return (
      <div className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-700">
        <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
        />

        <p>
          Patient accounts can be created directly from
          this registration form.
        </p>
      </div>
  );
}

/* ========================================================= */
/* BENEFIT */
/* ========================================================= */

function Benefit({
                   icon,
                   title,
                   text,
                 }) {
  return (
      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
          {icon}
        </div>

        <div>
          <p className="font-semibold text-white">
            {title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {text}
          </p>
        </div>
      </div>
  );
}

export default Register;