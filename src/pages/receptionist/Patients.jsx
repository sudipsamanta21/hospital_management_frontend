import React, { useEffect, useState } from "react";
import {
    Search,
    Users,
    RefreshCw,
    Plus,
    Pencil,
    Trash2,
    X,
} from "lucide-react";

import patientService from "../../services/patientService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const emptyForm = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    bloodGroup: "",
};

const Patients = () =>{
    const [patients, setPatients] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState(emptyForm);

    const load = async () => {
        setLoading(true);

        try {
            const response = await patientService.getAll();
            setPatients(response.data || []);
        } catch (e) {
            console.error(e);
            alert("Failed to load patients");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const openAdd = () => {
        setEditingId(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (patient) => {
        setEditingId(patient.id);

        setForm({
            name: patient.name || "",
            age: patient.age ?? "",
            gender: patient.gender || "",
            phone: patient.phone || "",
            email: patient.email || "",
            address: patient.address || "",
            bloodGroup: patient.bloodGroup || "",
        });

        setShowForm(true);
    };

    const savePatient = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = {
                name: form.name,
                age: Number(form.age),
                gender: form.gender,
                phone: form.phone,
                email: form.email,
                address: form.address,
                bloodGroup: form.bloodGroup,
            };

            if (editingId) {
                await patientService.update(
                    editingId,
                    data
                );
                alert("Patient updated successfully");
            } else {
                await patientService.create(data);
                alert("Patient added successfully");
            }

            setShowForm(false);
            setEditingId(null);
            setForm(emptyForm);

            await load();
        } catch (e) {
            console.error(e);

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to save patient"
            );
        } finally {
            setSaving(false);
        }
    };

    const deletePatient = async (id) => {
        if (!window.confirm("Delete this patient?")) {
            return;
        }

        try {
            await patientService.delete(id);

            alert("Patient deleted successfully");

            await load();
        } catch (e) {
            console.error(e);

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Cannot delete patient"
            );
        }
    };

    if (loading) return <Loading />;

    const filtered = patients.filter((p) => {
        const search = q.toLowerCase();

        return (
            (p.name || "").toLowerCase().includes(search) ||
            (p.phone || "").toLowerCase().includes(search) ||
            (p.email || "").toLowerCase().includes(search)
        );
    });

    return (
        <div>
            <PageHeader
                eyebrow="Receptionist Portal"
                title="Patients"
                description="Add, edit, search and remove patient records."
            />

            {/* ADD BUTTON */}
            <div className="mb-5 flex justify-end">
                <button
                    onClick={openAdd}
                    className="primary-button"
                >
                    <Plus size={17} />
                    Add Patient
                </button>
            </div>

            {/* FORM */}
            {showForm && (
                <div className="panel mb-6">
                    <div className="mb-5 flex justify-between">
                        <h3 className="font-semibold">
                            {editingId
                                ? "Edit Patient"
                                : "Add Patient"}
                        </h3>

                        <button
                            onClick={() => setShowForm(false)}
                        >
                            <X />
                        </button>
                    </div>

                    <form
                        onSubmit={savePatient}
                        className="form-grid"
                    >
                        <input
                            required
                            className="input"
                            placeholder="Patient Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />

                        <input
                            required
                            type="number"
                            className="input"
                            placeholder="Age"
                            value={form.age}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    age: e.target.value,
                                })
                            }
                        />

                        <select
                            required
                            className="input"
                            value={form.gender}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    gender: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <input
                            required
                            className="input"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                })
                            }
                        />

                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                        />

                        <select
                            required
                            className="input"
                            value={form.bloodGroup}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    bloodGroup: e.target.value,
                                })
                            }
                        >
                            <option value="">
                                Select Blood Group
                            </option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        <textarea
                            className="input min-h-24"
                            placeholder="Address"
                            value={form.address}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    address: e.target.value,
                                })
                            }
                        />

                        <button
                            disabled={saving}
                            className="primary-button"
                        >
                            <Plus size={17} />
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Update Patient"
                                    : "Add Patient"}
                        </button>
                    </form>
                </div>
            )}

            {/* PATIENT LIST */}
            <div className="panel">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex max-w-md flex-1 items-center gap-3 rounded-xl bg-slate-100 px-4 py-3">
                        <Search size={18} />

                        <input
                            className="w-full bg-transparent outline-none"
                            placeholder="Search patients..."
                            value={q}
                            onChange={(e) =>
                                setQ(e.target.value)
                            }
                        />
                    </div>

                    <button
                        onClick={load}
                        className="secondary-button"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>

                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Blood Group</th>
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
                                    No patients found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Users size={17} />
                                            <b>{p.name}</b>
                                        </div>
                                    </td>

                                    <td>{p.age ?? "-"}</td>
                                    <td>{p.phone || "-"}</td>
                                    <td>{p.email || "-"}</td>
                                    <td>{p.gender || "-"}</td>
                                    <td>{p.bloodGroup || "-"}</td>

                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    openEdit(p)
                                                }
                                                className="rounded-lg bg-blue-50 p-2 text-blue-600"
                                            >
                                                <Pencil size={15} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deletePatient(p.id)
                                                }
                                                className="rounded-lg bg-red-50 p-2 text-red-600"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Patients;