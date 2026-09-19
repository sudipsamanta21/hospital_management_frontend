import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  HeartPulse,
  LockKeyhole,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("Please enter your username.");
      return;
    }

    if (!form.password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // LOGIN API
      // =========================
      const response = await authService.login(
          form.username.trim(),
          form.password
      );

      console.log(
          "LOGIN RESPONSE:",
          response
      );

      // =========================
      // UPDATE AUTH CONTEXT
      // =========================
      const user = login(response);

      console.log(
          "LOGGED IN USER:",
          user
      );

      const role = String(
          user?.role || ""
      ).toUpperCase();

      console.log(
          "USER ROLE:",
          role
      );

      if (!role) {
        toast.error(
            "User role not found."
        );
        return;
      }

      toast.success(
          "Login successful!"
      );

      // =========================
      // REDIRECT
      // =========================
      if (role === "ADMIN") {
        navigate("/admin", {
          replace: true,
        });
      } else if (role === "DOCTOR") {
        navigate("/doctor", {
          replace: true,
        });
      } else if (role === "PATIENT") {
        navigate("/patient", {
          replace: true,
        });
      } else if (role === "RECEPTIONIST") {
        navigate("/receptionist", {
          replace: true,
        });
      } else {
        toast.error(
            `Unknown role: ${role}`
        );

        navigate("/dashboard", {
          replace: true,
        });
      }

    } catch (error) {
      console.error(
          "LOGIN ERROR:",
          error
      );

      const data =
          error?.response?.data;

      const message =
          data?.message ||
          data?.error ||
          (
              typeof data === "string"
                  ? data
                  : null
          ) ||
          error?.message ||
          "Invalid username or password.";

      toast.error(
          String(message)
      );

    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-[#f5f8fc]">
        <div className="grid min-h-screen lg:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT - BRAND PANEL */}
          {/* ================================================= */}

          <section className="relative hidden overflow-hidden bg-[#071a35] lg:block">

            {/* Background shapes */}
            <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="absolute right-20 top-32 h-40 w-40 rounded-full border border-white/10" />

            <div className="absolute right-28 top-40 h-24 w-24 rounded-full border border-white/10" />

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
              <div className="relative max-w-xl">

                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
                  <Activity size={15} />
                  SMART HEALTHCARE PLATFORM
                </div>

                <h2 className="text-5xl font-black leading-[1.08] tracking-tight text-white xl:text-6xl">
                  Healthcare
                  <span className="block text-blue-400">
                                    made smarter.
                                </span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
                  A secure and modern hospital management
                  platform designed to connect patients,
                  doctors and hospital staff in one place.
                </p>

                {/* Feature cards */}
                <div className="mt-10 grid grid-cols-2 gap-4">

                  <Feature
                      icon={<ShieldCheck size={21} />}
                      title="Secure"
                      text="Role-based protected access"
                  />

                  <Feature
                      icon={<Stethoscope size={21} />}
                      title="Complete"
                      text="Manage your hospital easily"
                  />

                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={15} />
                Secure healthcare management
              </div>
            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT - LOGIN */}
          {/* ================================================= */}

          <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

            <div className="w-full max-w-md">

              {/* Mobile logo */}
              <div className="mb-10 flex items-center justify-between lg:hidden">

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
                    to="/register"
                    className="text-sm font-semibold text-blue-600"
                >
                  Register
                </Link>
              </div>

              {/* Login card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-9">

                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <HeartPulse size={27} />
                </div>

                {/* Heading */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    Welcome back
                  </p>

                  <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                    Sign in to MediCare
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Access your hospital management
                    dashboard securely.
                  </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="mt-8 space-y-5"
                >

                  {/* Username */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Username
                    </label>

                    <div className="group relative">
                      <User
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-blue-600"
                      />

                      <input
                          type="text"
                          required
                          value={form.username}
                          onChange={(e) =>
                              setForm({
                                ...form,
                                username:
                                e.target.value,
                              })
                          }
                          placeholder="Enter your username"
                          className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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
                          type={
                            showPassword
                                ? "text"
                                : "password"
                          }
                          required
                          value={form.password}
                          onChange={(e) =>
                              setForm({
                                ...form,
                                password:
                                e.target.value,
                              })
                          }
                          placeholder="Enter your password"
                          className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
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

                  {/* Security */}
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                    <ShieldCheck
                        size={16}
                        className="text-emerald-500"
                    />

                    Your connection is protected
                    with secure authentication.
                  </div>

                  {/* Submit */}
                  <button
                      type="submit"
                      disabled={loading}
                      className="group flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Signing in...
                        </>
                    ) : (
                        <>
                          Sign In
                          <ArrowRight
                              size={18}
                              className="transition group-hover:translate-x-1"
                          />
                        </>
                    )}
                  </button>
                </form>

                {/* Register */}
                <div className="mt-7 border-t border-slate-100 pt-7 text-center">

                  <p className="text-sm text-slate-500">
                    Don't have an account?
                  </p>

                  <Link
                      to="/register"
                      className="mt-1 inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700"
                  >
                    Create a new account
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} MediCare
                Hospital Management System
              </p>
            </div>
          </section>
        </div>
      </div>
  );
}

const Feature = ({ icon, title, text }) => {
  return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
          {icon}
        </div>

        <p className="font-bold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>
      </div>
  );
}

export default Login;