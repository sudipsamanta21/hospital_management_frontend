import React, { useEffect, useState } from "react";
import {
    Building2,
    RefreshCw,
    Plus,
    Pencil,
    Trash2,
    X,
} from "lucide-react";

import departmentService from "../../services/departmentService";
import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const Departments = () =>{
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const load = async () => {
        setLoading(true);

        try {
            const response =
                await departmentService.getAll();

            setDepartments(response.data || []);
        } catch (e) {
            console.error(e);
            alert("Failed to load departments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const openAdd = () => {
        setEditingId(null);

        setForm({
            name: "",
            description: "",
        });

        setShowForm(true);
    };

    const openEdit = (department) => {
        setEditingId(department.id);

        setForm({
            name: department.name || "",
            description: department.description || "",
        });

        setShowForm(true);
    };

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingId) {
                await departmentService.update(
                    editingId,
                    form
                );

                alert("Department updated successfully");
            } else {
                await departmentService.create(form);

                alert("Department added successfully");
            }

            setShowForm(false);
            setEditingId(null);

            await load();
        } catch (e) {
            console.error(e);

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to save department"
            );
        } finally {
            setSaving(false);
        }
    };

    const remove = async (id) => {
        if (!window.confirm("Delete this department?")) {
            return;
        }

        try {
            await departmentService.delete(id);

            alert("Department deleted successfully");

            await load();
        } catch (e) {
            console.error(e);

            alert(
                e.response?.data?.message ||
                "Cannot delete department"
            );
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <PageHeader
                eyebrow="Receptionist Portal"
                title="Departments"
                description="Add, edit and remove hospital departments."
            />

            <div className="mb-5 flex justify-end">
                <button
                    onClick={openAdd}
                    className="primary-button"
                >
                    <Plus size={17} />
                    Add Department
                </button>
            </div>

            {showForm && (
                <div className="panel mb-6">
                    <div className="mb-5 flex justify-between">
                        <h3 className="font-semibold">
                            {editingId
                                ? "Edit Department"
                                : "Add Department"}
                        </h3>

                        <button
                            onClick={() => setShowForm(false)}
                        >
                            <X />
                        </button>
                    </div>

                    <form
                        onSubmit={save}
                        className="form-grid"
                    >
                        <input
                            required
                            className="input"
                            placeholder="Department Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />

                        <textarea
                            className="input min-h-24"
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
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
                                    ? "Update Department"
                                    : "Add Department"}
                        </button>
                    </form>
                </div>
            )}

            <div className="panel">
                <div className="mb-5 flex justify-between">
                    <h3 className="font-semibold">
                        Department List
                    </h3>

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
                            <th>Department</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {departments.map((d) => (
                            <tr key={d.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <Building2 size={17} />
                                        <b>{d.name}</b>
                                    </div>
                                </td>

                                <td>
                                    {d.description || "-"}
                                </td>

                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                openEdit(d)
                                            }
                                            className="rounded-lg bg-blue-50 p-2 text-blue-600"
                                        >
                                            <Pencil size={15} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                remove(d.id)
                                            }
                                            className="rounded-lg bg-red-50 p-2 text-red-600"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {departments.length === 0 && (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="py-8 text-center text-slate-400"
                                >
                                    No departments found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Departments;