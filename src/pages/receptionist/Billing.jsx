import React, { useEffect, useState } from "react";
import {
    Receipt,
    RefreshCw,
    Plus,
    Trash2,
    X,
} from "lucide-react";

import toast from "react-hot-toast";

import billService from "../../services/billService";
import patientService from "../../services/patientService";

import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const  Billing = () =>{
    // =========================================================
    // STATE
    // =========================================================

    const [bills, setBills] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Delete modal
    const [deleteId, setDeleteId] = useState(null);

    // Form
    const [form, setForm] = useState({
        patientId: "",
        amount: "",
        description: "",
    });

    // =========================================================
    // LOAD BILLS
    // =========================================================

    const loadBills = async () => {
        try {
            setLoading(true);

            const response = await billService.getAll();

            setBills(response.data || []);
        } catch (error) {
            console.error("Failed to load bills:", error);

            toast.error("Failed to load billing records!");
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // LOAD PATIENTS
    // =========================================================

    const loadPatients = async () => {
        try {
            const response = await patientService.getAll();

            setPatients(response.data || []);
        } catch (error) {
            console.error("Failed to load patients:", error);

            toast.error("Failed to load patients.");
        }
    };

    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {
        loadBills();
        loadPatients();
    }, []);

    // =========================================================
    // CREATE BILL
    // =========================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Patient validation
        if (!form.patientId) {
            toast.error("Please select a patient.");
            return;
        }

        // Amount validation
        if (!form.amount || Number(form.amount) <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        try {
            await billService.create({
                patient: {
                    id: Number(form.patientId),
                },
                amount: Number(form.amount),
                description: form.description,
            });

            // Success toast
            toast.success("Billing created successfully.");

            // Reset form
            setForm({
                patientId: "",
                amount: "",
                description: "",
            });

            // Close modal
            setShowForm(false);

            // Reload bills
            await loadBills();
        } catch (error) {
            console.error("Failed to create bill:", error);

            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to create bill";

            toast.error(
                typeof message === "string"
                    ? message
                    : "Failed to create bill"
            );
        }
    };

    // =========================================================
    // UPDATE BILL STATUS
    // =========================================================

    const updateStatus = async (id, status) => {
        try {
            await billService.updateStatus(id, status);

            toast.success("Bill status updated successfully!");

            await loadBills();
        } catch (error) {
            console.error(
                "Failed to update bill status:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to update bill status";

            toast.error(
                typeof message === "string"
                    ? message
                    : "Failed to update bill status"
            );
        }
    };

    // =========================================================
    // DELETE BILL
    // =========================================================

    const deleteBill = (id) => {
        setDeleteId(id);
    };

    // =========================================================
    // CONFIRM DELETE BILL
    // =========================================================

    const confirmDeleteBill = async () => {
        if (!deleteId) {
            return;
        }

        try {
            await billService.delete(deleteId);

            toast.success("Bill deleted successfully!");

            setDeleteId(null);

            await loadBills();
        } catch (error) {
            console.error(
                "Failed to delete bill:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Failed to delete bill";

            toast.error(
                typeof message === "string"
                    ? message
                    : "Failed to delete bill"
            );

            setDeleteId(null);
        }
    };

    // =========================================================
    // REFRESH
    // =========================================================

    const load = async () => {
        await loadBills();
        await loadPatients();
    };

    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {
        return <Loading />;
    }

    // =========================================================
    // UI
    // =========================================================

    return (
        <>
            {/* ================================================= */}
            {/* PAGE */}
            {/* ================================================= */}

            <div>
                {/* Page Header */}
                <PageHeader
                    eyebrow="Receptionist Portal"
                    title="Billing"
                    description="View and manage patient billing records."
                />

                {/* ================================================= */}
                {/* BILLING RECORDS */}
                {/* ================================================= */}

                <div className="panel">
                    {/* Header */}
                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="font-semibold text-slate-900">
                                Billing Records
                            </h3>

                            <p className="text-xs text-slate-400">
                                Patient invoices and payment status.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                            {/* Add Bill */}
                            <button
                                onClick={() =>
                                    setShowForm(true)
                                }
                                className="primary-button"
                            >
                                <Plus size={16} />
                                Add Bill
                            </button>

                            {/* Refresh */}
                            <button
                                onClick={load}
                                className="secondary-button"
                            >
                                <RefreshCw size={16} />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* ================================================= */}
                    {/* TABLE */}
                    {/* ================================================= */}

                    <div className="table-wrap">
                        <table>
                            <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Patient</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {bills.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="py-8 text-center text-slate-400"
                                    >
                                        No billing records found
                                    </td>
                                </tr>
                            ) : (
                                bills.map((bill) => (
                                    <tr key={bill.id}>
                                        {/* Invoice */}
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <Receipt size={16} />

                                                <b>
                                                    {bill.invoiceNumber ||
                                                        "-"}
                                                </b>
                                            </div>
                                        </td>

                                        {/* Patient */}
                                        <td>
                                            {bill.patient?.name ||
                                                "-"}
                                        </td>

                                        {/* Amount */}
                                        <td>
                                            ₹
                                            {Number(
                                                bill.amount || 0
                                            ).toFixed(2)}
                                        </td>

                                        {/* Date */}
                                        <td>
                                            {bill.billDate || "-"}
                                        </td>

                                        {/* Description */}
                                        <td>
                                            {bill.description || "-"}
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <select
                                                className="rounded-lg border border-slate-300 px-2 py-1 text-xs outline-none focus:border-blue-500"
                                                value={
                                                    bill.status ||
                                                    "PENDING"
                                                }
                                                onChange={(e) =>
                                                    updateStatus(
                                                        bill.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="PENDING">
                                                    PENDING
                                                </option>

                                                <option value="PAID">
                                                    PAID
                                                </option>

                                                <option value="CANCELLED">
                                                    CANCELLED
                                                </option>
                                            </select>
                                        </td>

                                        {/* Delete */}
                                        <td>
                                            <button
                                                onClick={() =>
                                                    deleteBill(
                                                        bill.id
                                                    )
                                                }
                                                className="text-red-500 transition hover:text-red-700"
                                                title="Delete Bill"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================================================= */}
                {/* ADD BILL MODAL */}
                {/* ================================================= */}

                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                            {/* Modal Header */}
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Add New Bill
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Create a billing record for a patient.
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                    className="rounded-lg p-2 transition hover:bg-slate-100"
                                    title="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {/* Patient */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Patient
                                    </label>

                                    <select
                                        value={form.patientId}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                patientId:
                                                e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                                        required
                                    >
                                        <option value="">
                                            Select Patient
                                        </option>

                                        {patients.map((patient) => (
                                            <option
                                                key={patient.id}
                                                value={patient.id}
                                            >
                                                {patient.name}
                                                {" — ID: "}
                                                {patient.id}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Amount */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        placeholder="Enter amount"
                                        value={form.amount}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                amount:
                                                e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-slate-700">
                                        Description
                                    </label>

                                    <textarea
                                        placeholder="Enter bill description"
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                description:
                                                e.target.value,
                                            })
                                        }
                                        rows="4"
                                        className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
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
                                        <Plus size={16} />
                                        Create Bill
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ================================================= */}
                {/* DELETE CONFIRMATION MODAL */}
                {/* ================================================= */}

                {deleteId && (
                    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                            {/* Icon */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                <Trash2 size={22} />
                            </div>

                            {/* Content */}
                            <div className="mt-5">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Delete Bill?
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Are you sure you want to delete this
                                    bill? This action cannot be undone.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="mt-7 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setDeleteId(null)
                                    }
                                    className="secondary-button"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={confirmDeleteBill}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                                >
                                    <Trash2 size={16} />
                                    Delete Bill
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default Billing;