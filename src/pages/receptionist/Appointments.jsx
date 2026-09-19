import React, { useEffect, useState } from "react";
import {
    CalendarDays,
    RefreshCw,
    Edit2,
    Trash2,
    X,
} from "lucide-react";

import appointmentService from "../../services/appointmentService";
import doctorService from "../../services/doctorService";
import patientService from "../../services/patientService";

import PageHeader from "../../components/PageHeader";
import Loading from "../../components/Loading";

const Appointments = () => {


    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Create appointment form
    const [form, setForm] = useState({
        doctorId: "",
        patientId: "",
        roomNumber: "",
        appointmentTime: "",
        reason: "",
    });

    // Edit appointment
    const [editingId, setEditingId] = useState(null);

    const [editForm, setEditForm] = useState({
        doctorId: "",
        patientId: "",
        roomNumber: "",
        appointmentTime: "",
        reason: "",
    });

    // =========================
    // LOAD DATA
    // =========================

    const load = async () => {
        setLoading(true);

        try {
            const [
                appointmentsResponse,
                doctorsResponse,
                patientsResponse,
            ] = await Promise.all([
                appointmentService.getAll(),
                doctorService.getAll(),
                patientService.getAll(),
            ]);

            setAppointments(
                appointmentsResponse.data || []
            );

            setDoctors(
                doctorsResponse.data || []
            );

            setPatients(
                patientsResponse.data || []
            );
        } catch (e) {
            console.error(
                "Failed to load appointment data:",
                e
            );

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to load appointment data"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    // =========================
    // CREATE APPOINTMENT
    // =========================

    const createAppointment = async (e) => {
        e.preventDefault();

        if (!form.patientId) {
            alert("Please select a patient");
            return;
        }

        if (!form.doctorId) {
            alert("Please select a doctor");
            return;
        }

        if (!form.roomNumber.trim()) {
            alert("Please enter room number");
            return;
        }

        if (!form.appointmentTime) {
            alert(
                "Please select appointment date and time"
            );
            return;
        }

        setSaving(true);

        try {
            await appointmentService.create({
                doctorId: Number(form.doctorId),
                patientId: Number(form.patientId),
                roomNumber: form.roomNumber.trim(),
                appointmentTime:
                form.appointmentTime,
                reason: form.reason,
            });

            alert(
                "Appointment created successfully"
            );

            setForm({
                doctorId: "",
                patientId: "",
                roomNumber: "",
                appointmentTime: "",
                reason: "",
            });

            await load();
        } catch (e) {
            console.error(
                "Failed to create appointment:",
                e
            );

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to create appointment"
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================
    // UPDATE STATUS
    // =========================

    const updateStatus = async (id, status) => {
        try {
            await appointmentService.updateStatus(
                id,
                status
            );

            await load();
        } catch (e) {
            console.error(
                "Failed to update appointment status:",
                e
            );

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to update appointment status"
            );
        }
    };

    // =========================
    // START EDIT
    // =========================

    const startEdit = (appointment) => {
        setEditingId(appointment.id);

        setEditForm({
            doctorId: appointment.doctor?.id
                ? String(appointment.doctor.id)
                : "",

            patientId: appointment.patient?.id
                ? String(appointment.patient.id)
                : "",

            roomNumber:
                appointment.room?.roomNumber || "",

            appointmentTime:
                appointment.appointmentTime
                    ? appointment.appointmentTime.slice(
                        0,
                        16
                    )
                    : "",

            reason:
                appointment.reason || "",
        });

        // Scroll to appointment list
        setTimeout(() => {
            document
                .getElementById("appointment-list")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }, 100);
    };

    // =========================
    // CANCEL EDIT
    // =========================

    const cancelEdit = () => {
        setEditingId(null);

        setEditForm({
            doctorId: "",
            patientId: "",
            roomNumber: "",
            appointmentTime: "",
            reason: "",
        });
    };

    // =========================
    // UPDATE APPOINTMENT
    // =========================

    const updateAppointment = async () => {
        if (!editingId) {
            return;
        }

        if (!editForm.patientId) {
            alert("Please select a patient");
            return;
        }

        if (!editForm.doctorId) {
            alert("Please select a doctor");
            return;
        }

        if (!editForm.roomNumber.trim()) {
            alert("Please enter room number");
            return;
        }

        if (!editForm.appointmentTime) {
            alert(
                "Please select appointment date and time"
            );
            return;
        }

        setSaving(true);

        try {
            await appointmentService.update(
                editingId,
                {
                    doctorId: Number(
                        editForm.doctorId
                    ),

                    patientId: Number(
                        editForm.patientId
                    ),

                    roomNumber:
                        editForm.roomNumber.trim(),

                    appointmentTime:
                    editForm.appointmentTime,

                    reason: editForm.reason,
                }
            );

            alert(
                "Appointment updated successfully"
            );

            cancelEdit();

            await load();
        } catch (e) {
            console.error(
                "Failed to update appointment:",
                e
            );

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to update appointment"
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================
    // DELETE APPOINTMENT
    // =========================

    const deleteAppointment = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this appointment?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await appointmentService.delete(id);

            alert(
                "Appointment deleted successfully"
            );

            await load();
        } catch (e) {
            console.error(
                "Failed to delete appointment:",
                e
            );

            alert(
                e.response?.data?.message ||
                e.response?.data ||
                "Failed to delete appointment"
            );
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return <Loading />;
    }

    // =========================
    // UI
    // =========================

    return (
        <div>
            <PageHeader
                eyebrow="Receptionist Portal"
                title="Appointments"
                description="Schedule and manage patient appointments."
            />

            {/* =========================
                CREATE APPOINTMENT
            ========================== */}

            <div className="panel mb-6">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">
                            Schedule Appointment
                        </h3>

                        <p className="text-xs text-slate-400">
                            Assign a patient, doctor and
                            room number.
                        </p>
                    </div>

                    <CalendarDays className="text-blue-500" />
                </div>

                <form
                    onSubmit={createAppointment}
                    className="form-grid"
                >
                    {/* PATIENT */}

                    <select
                        required
                        className="input"
                        value={form.patientId}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                patientId:
                                e.target.value,
                            })
                        }
                    >
                        <option value="">
                            Select Patient
                        </option>

                        {patients.map((patient) => (
                            <option
                                key={patient.id}
                                value={patient.id}
                            >
                                ID {patient.id} -{" "}
                                {patient.name}
                            </option>
                        ))}
                    </select>

                    {/* DOCTOR */}

                    <select
                        required
                        className="input"
                        value={form.doctorId}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                doctorId:
                                e.target.value,
                            })
                        }
                    >
                        <option value="">
                            Select Doctor
                        </option>

                        {doctors
                            .filter(
                                (doctor) =>
                                    !doctor.status ||
                                    doctor.status ===
                                    "ACTIVE"
                            )
                            .map((doctor) => (
                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >
                                    {doctor.name}

                                    {doctor.specialization
                                        ? ` - ${doctor.specialization}`
                                        : ""}
                                </option>
                            ))}
                    </select>

                    {/* ROOM */}

                    <input
                        required
                        type="text"
                        className="input"
                        placeholder="Enter Room Number"
                        value={form.roomNumber}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                roomNumber:
                                e.target.value,
                            })
                        }
                    />

                    {/* DATE/TIME */}

                    <input
                        required
                        type="datetime-local"
                        className="input"
                        value={
                            form.appointmentTime
                        }
                        onChange={(e) =>
                            setForm({
                                ...form,
                                appointmentTime:
                                e.target.value,
                            })
                        }
                    />

                    {/* REASON */}

                    <input
                        type="text"
                        className="input"
                        placeholder="Reason"
                        value={form.reason}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                reason:
                                e.target.value,
                            })
                        }
                    />

                    {/* CREATE BUTTON */}

                    <button
                        type="submit"
                        disabled={saving}
                        className="primary-button"
                    >
                        <CalendarDays size={17} />

                        {saving
                            ? "Scheduling..."
                            : "Schedule Appointment"}
                    </button>
                </form>
            </div>

            {/* =========================
                APPOINTMENT LIST
            ========================== */}

            <div
                id="appointment-list"
                className="panel"
            >
                <div className="mb-5 flex justify-between">
                    <div>
                        <h3 className="font-semibold">
                            Appointment List
                        </h3>

                        <p className="text-xs text-slate-400">
                            View and manage all
                            appointments.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={load}
                        className="secondary-button"
                    >
                        <RefreshCw size={16} />

                        Refresh
                    </button>
                </div>

                {/* =========================
                    UPDATE FORM
                    ONLY SHOWS AFTER EDIT
                ========================== */}

                {editingId && (
                    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    Update Appointment
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Update appointment
                                    details.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    cancelEdit
                                }
                                className="secondary-button"
                            >
                                <X size={16} />

                                Cancel
                            </button>
                        </div>

                        <div className="form-grid">
                            {/* PATIENT */}

                            <select
                                className="input"
                                value={
                                    editForm.patientId
                                }
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        patientId:
                                        e.target
                                            .value,
                                    })
                                }
                            >
                                <option value="">
                                    Select Patient
                                </option>

                                {patients.map(
                                    (patient) => (
                                        <option
                                            key={
                                                patient.id
                                            }
                                            value={
                                                patient.id
                                            }
                                        >
                                            ID{" "}
                                            {
                                                patient.id
                                            }{" "}
                                            -{" "}
                                            {
                                                patient.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {/* DOCTOR */}

                            <select
                                className="input"
                                value={
                                    editForm.doctorId
                                }
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        doctorId:
                                        e.target
                                            .value,
                                    })
                                }
                            >
                                <option value="">
                                    Select Doctor
                                </option>

                                {doctors
                                    .filter(
                                        (doctor) =>
                                            !doctor.status ||
                                            doctor.status ===
                                            "ACTIVE"
                                    )
                                    .map(
                                        (doctor) => (
                                            <option
                                                key={
                                                    doctor.id
                                                }
                                                value={
                                                    doctor.id
                                                }
                                            >
                                                {
                                                    doctor.name
                                                }

                                                {doctor.specialization
                                                    ? ` - ${doctor.specialization}`
                                                    : ""}
                                            </option>
                                        )
                                    )}
                            </select>

                            {/* ROOM */}

                            <input
                                type="text"
                                className="input"
                                placeholder="Room Number"
                                value={
                                    editForm.roomNumber
                                }
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        roomNumber:
                                        e.target
                                            .value,
                                    })
                                }
                            />

                            {/* DATE/TIME */}

                            <input
                                type="datetime-local"
                                className="input"
                                value={
                                    editForm.appointmentTime
                                }
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        appointmentTime:
                                        e.target
                                            .value,
                                    })
                                }
                            />

                            {/* REASON */}

                            <input
                                type="text"
                                className="input"
                                placeholder="Reason"
                                value={
                                    editForm.reason
                                }
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        reason:
                                        e.target
                                            .value,
                                    })
                                }
                            />

                            {/* UPDATE BUTTON */}

                            <button
                                type="button"
                                disabled={saving}
                                onClick={
                                    updateAppointment
                                }
                                className="primary-button"
                            >
                                <Edit2 size={17} />

                                {saving
                                    ? "Updating..."
                                    : "Update Appointment"}
                            </button>
                        </div>
                    </div>
                )}

                {/* =========================
                    TABLE
                ========================== */}

                <div className="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Room</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {appointments.length ===
                        0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-8 text-center text-slate-400"
                                >
                                    No appointments
                                    found
                                </td>
                            </tr>
                        ) : (
                            appointments.map(
                                (appointment) => (
                                    <tr
                                        key={
                                            appointment.id
                                        }
                                    >
                                        {/* DATE */}

                                        <td>
                                            {appointment.appointmentTime
                                                ? new Date(
                                                    appointment.appointmentTime
                                                ).toLocaleString(
                                                    "en-IN",
                                                    {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    }
                                                )
                                                : "-"}
                                        </td>

                                        {/* PATIENT */}

                                        <td>
                                            <div className="font-medium">
                                                {appointment
                                                        .patient
                                                        ?.name ||
                                                    "-"}
                                            </div>

                                            {appointment
                                                .patient
                                                ?.id && (
                                                <div className="text-xs text-slate-500">
                                                    ID{" "}
                                                    {
                                                        appointment
                                                            .patient
                                                            .id
                                                    }
                                                </div>
                                            )}
                                        </td>

                                        {/* DOCTOR */}

                                        <td>
                                            <div className="font-medium">
                                                {appointment
                                                        .doctor
                                                        ?.name ||
                                                    "-"}
                                            </div>

                                            <div className="text-xs text-slate-500">
                                                {appointment
                                                        .doctor
                                                        ?.specialization ||
                                                    ""}
                                            </div>
                                        </td>

                                        {/* ROOM */}

                                        <td>
                                            {appointment
                                                .room
                                                ?.roomNumber ? (
                                                <span className="font-semibold text-slate-800">
                                                        Room{" "}
                                                    {
                                                        appointment
                                                            .room
                                                            .roomNumber
                                                    }
                                                    </span>
                                            ) : (
                                                <span className="text-slate-400">
                                                        Not
                                                        Assigned
                                                    </span>
                                            )}
                                        </td>

                                        {/* REASON */}

                                        <td>
                                            {appointment.reason ||
                                                "-"}
                                        </td>

                                        {/* STATUS */}

                                        <td>
                                            <select
                                                className="rounded-lg border px-2 py-1 text-xs"
                                                value={
                                                    appointment.status ||
                                                    "SCHEDULED"
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    updateStatus(
                                                        appointment.id,
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                            >
                                                <option value="SCHEDULED">
                                                    SCHEDULED
                                                </option>

                                                <option value="CONFIRMED">
                                                    CONFIRMED
                                                </option>

                                                <option value="COMPLETED">
                                                    COMPLETED
                                                </option>

                                                <option value="CANCELLED">
                                                    CANCELLED
                                                </option>
                                            </select>
                                        </td>

                                        {/* ACTION */}

                                        <td>
                                            <div className="flex gap-2">
                                                {/* EDIT */}

                                                <button
                                                    type="button"
                                                    className="secondary-button"
                                                    onClick={() =>
                                                        startEdit(
                                                            appointment
                                                        )
                                                    }
                                                >
                                                    <Edit2
                                                        size={
                                                            15
                                                        }
                                                    />

                                                    Edit
                                                </button>

                                                {/* DELETE */}

                                                <button
                                                    type="button"
                                                    className="secondary-button"
                                                    onClick={() =>
                                                        deleteAppointment(
                                                            appointment.id
                                                        )
                                                    }
                                                >
                                                    <Trash2
                                                        size={
                                                            15
                                                        }
                                                    />

                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Appointments;