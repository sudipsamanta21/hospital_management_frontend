import React, { useEffect, useState } from "react";
import {
    Search,
    Stethoscope,
    RefreshCw,
    Plus,
    Pencil,
    Trash2,
    Power,
    X,
} from "lucide-react";

import doctorService from "../../services/doctorService";
import departmentService from "../../services/departmentService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const Doctors = () =>{
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        specialization: "",
        phone: "",
        email: "",
        departmentId: "",
    });

    const load = async () => {
        setLoading(true);

        try {
            const response = await doctorService.getAll();
            setDoctors(response.data || []);
        } catch (e) {
            console.error("Failed to load doctors:", e);
            alert("Failed to load doctors");
        } finally {
            setLoading(false);
        }
    };

    const loadDepartments = async () => {
        try {
            const response = await departmentService.getAll();
            setDepartments(response.data || []);
        } catch (e) {
            console.error("Failed to load departments:", e);
        }
    };

    useEffect(() => {
        load();
        loadDepartments();
    }, []);

    const openAddForm = () => {
        setEditingId(null);

        setForm({
            name: "",
            specialization: "",
            phone: "",
            email: "",
            departmentId: "",
        });

        setShowForm(true);
    };

    const openEditForm = (doctor) => {
        setEditingId(doctor.id);

        setForm({
            name: doctor.name || "",
            specialization: doctor.specialization || "",
            phone: doctor.phone || "",
            email: doctor.email || "",
            departmentId: doctor.department?.id || "",
        });

        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                name: form.name,
                specialization: form.specialization,
                phone: form.phone,
                email: form.email,
                departmentId: form.departmentId
                    ? Number(form.departmentId)
                    : null,
            };

            if (editingId) {
                await doctorService.update(editingId, data);
                alert("Doctor updated successfully!");
            } else {
                await doctorService.create(data);
                alert("Doctor added successfully!");
            }

            setShowForm(false);
            setEditingId(null);

            setForm({
                name: "",
                specialization: "",
                phone: "",
                email: "",
                departmentId: "",
            });

            await load();
        } catch (e) {
            console.error("Failed to save doctor:", e);

            const message =
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to save doctor";

            alert(message);
        }
    };

    const changeStatus = async (doctor) => {
        const isActive = doctor.status === "ACTIVE";

        const action = isActive ? "disable" : "enable";

        const confirmed = window.confirm(
            `Are you sure you want to ${action} ${doctor.name}?`
        );

        if (!confirmed) return;

        try {
            if (isActive) {
                await doctorService.disable(doctor.id);
            } else {
                await doctorService.enable(doctor.id);
            }

            alert(
                `Doctor ${isActive ? "disabled" : "enabled"} successfully!`
            );

            await load();
        } catch (e) {
            console.error("Failed to change doctor status:", e);

            const message =
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to change doctor status";

            alert(message);
        }
    };

    const deleteDoctor = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmed) return;

        try {
            await doctorService.delete(id);

            alert("Doctor deleted successfully!");

            await load();
        } catch (e) {
            console.error("Failed to delete doctor:", e);

            const message =
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to delete doctor";

            alert(message);
        }
    };

    if (loading) return <Loading />;

    const filtered = doctors.filter((d) => {
        const search = q.toLowerCase();

        return (
            (d.name || "").toLowerCase().includes(search) ||
            (d.specialization || "")
                .toLowerCase()
                .includes(search) ||
            (d.email || "").toLowerCase().includes(search) ||
            (d.department?.name || "")
                .toLowerCase()
                .includes(search)
        );
    });

    return (
        <div>
            <PageHeader
                eyebrow="Receptionist Portal"
                title="Doctors"
                description="Add, edit, manage and view hospital doctors."
            />

            <div className="panel">

                {/* Header */}
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl bg-slate-100 px-4 py-3">
                        <Search size={18} />

                        <input
                            className="w-full bg-transparent outline-none"
                            placeholder="Search doctors..."
                            value={q}
                            onChange={(e) =>
                                setQ(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex gap-2">

                        <button
                            onClick={openAddForm}
                            className="primary-button"
                        >
                            <Plus size={16} />
                            Add Doctor
                        </button>

                        <button
                            onClick={load}
                            className="secondary-button"
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>

                    </div>
                </div>

                {/* Table */}
                <div className="table-wrap">
                    <table>

                        <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Specialization</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>

                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-8 text-center text-slate-400"
                                >
                                    No doctors found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((d) => {

                                const isActive =
                                    d.status === "ACTIVE";

                                return (
                                    <tr key={d.id}>

                                        {/* Doctor */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <Stethoscope size={17} />
                                                <b>{d.name}</b>
                                            </div>
                                        </td>

                                        {/* Specialization */}
                                        <td>
                                            {d.specialization || "-"}
                                        </td>

                                        {/* Department */}
                                        <td>
                                            {d.department?.name || "-"}
                                        </td>

                                        {/* Phone */}
                                        <td>
                                            {d.phone || "-"}
                                        </td>

                                        {/* Email */}
                                        <td>
                                            {d.email || "-"}
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                    isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {d.status || "ACTIVE"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td>
                                            <div className="flex items-center gap-2">

                                                {/* Edit */}
                                                <button
                                                    onClick={() =>
                                                        openEditForm(d)
                                                    }
                                                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                                    title="Edit Doctor"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                {/* Enable / Disable */}
                                                <button
                                                    onClick={() =>
                                                        changeStatus(d)
                                                    }
                                                    className={`rounded-lg p-2 ${
                                                        isActive
                                                            ? "text-orange-600 hover:bg-orange-50"
                                                            : "text-green-600 hover:bg-green-50"
                                                    }`}
                                                    title={
                                                        isActive
                                                            ? "Disable Doctor"
                                                            : "Enable Doctor"
                                                    }
                                                >
                                                    <Power size={17} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() =>
                                                        deleteDoctor(d.id)
                                                    }
                                                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                                    title="Delete Doctor"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })
                        )}

                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Doctor Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                        {/* Modal Header */}
                        <div className="mb-5 flex items-center justify-between">

                            <div>
                                <h2 className="text-lg font-semibold">
                                    {editingId
                                        ? "Edit Doctor"
                                        : "Add Doctor"}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    {editingId
                                        ? "Update doctor information."
                                        : "Create a new doctor profile."}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setShowForm(false)
                                }
                                className="rounded-lg p-2 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >

                            {/* Name */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Doctor Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter doctor name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                    required
                                />
                            </div>

                            {/* Specialization */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Specialization
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Cardiologist"
                                    value={form.specialization}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            specialization:
                                            e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                />
                            </div>

                            {/* Department */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Department
                                </label>

                                <select
                                    value={form.departmentId}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            departmentId:
                                            e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                >
                                    <option value="">
                                        Select Department
                                    </option>

                                    {departments.map(
                                        (department) => (
                                            <option
                                                key={department.id}
                                                value={department.id}
                                            >
                                                {department.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                    className="secondary-button"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                    {editingId
                                        ? "Update Doctor"
                                        : "Add Doctor"}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Doctors;