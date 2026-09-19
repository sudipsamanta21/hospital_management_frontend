import React, { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";

import doctorService from "../../services/doctorService";
import patientService from "../../services/patientService";
import appointmentService from "../../services/appointmentService";
import PageHeader from "../../components/PageHeader";

const BookAppointment = () =>{
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [form, setForm] = useState({
    doctorId: "",
    patientId: "",
    appointmentTime: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [doctorsResponse, patientsResponse] = await Promise.all([
          doctorService.getAll(),
          patientService.getAll(),
        ]);

        setDoctors(doctorsResponse.data);
        setPatients(patientsResponse.data);
      } catch (error) {
        console.error("Failed to load doctors/patients:", error);
        alert("Failed to load doctors or patients");
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.doctorId || !form.patientId || !form.appointmentTime) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await appointmentService.create({
        doctorId: Number(form.doctorId),
        patientId: Number(form.patientId),
        appointmentTime: form.appointmentTime,
        reason: form.reason,
      });

      alert("Appointment booked successfully");

      setForm({
        doctorId: "",
        patientId: "",
        appointmentTime: "",
        reason: "",
      });
    } catch (error) {
      console.error("Appointment booking error:", error);

      const message =
          error.response?.data?.message ||
          error.response?.data ||
          "Failed to book appointment";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <PageHeader
            eyebrow="Patient Portal"
            title="Book Appointment"
            description="Choose a doctor and appointment time."
        />

        <div className="panel max-w-3xl">
          <form onSubmit={submit} className="form-grid">
            {/* Doctor */}
            <select
                required
                name="doctorId"
                className="input"
                value={form.doctorId}
                onChange={handleChange}
            >
              <option value="">Select Doctor</option>

              {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} —{" "}
                    {doctor.specialization || "Specialist"}
                  </option>
              ))}
            </select>

            {/* Patient */}
            <select
                required
                name="patientId"
                className="input"
                value={form.patientId}
                onChange={handleChange}
            >
              <option value="">Select Patient</option>

              {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
              ))}
            </select>

            {/* Appointment Time */}
            <input
                required
                type="datetime-local"
                name="appointmentTime"
                className="input"
                value={form.appointmentTime}
                onChange={handleChange}
            />

            {/* Reason */}
            <input
                type="text"
                name="reason"
                className="input"
                placeholder="Reason for visit"
                value={form.reason}
                onChange={handleChange}
            />

            {/* Submit */}
            <button
                type="submit"
                className="primary-button"
                disabled={loading}
            >
              <CalendarPlus size={17} />

              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
  );
}
export default BookAppointment;