import api from "./api";

const prescriptionService = {
  // Get all prescriptions
  getAll: () =>
      api.get("/prescriptions"),

  // Get one prescription
  getById: (id) =>
      api.get(`/prescriptions/${id}`),

  // Get prescriptions for a patient
  getByPatientId: (patientId) =>
      api.get(`/prescriptions/patient/${patientId}`),

  // Get prescriptions for a specific doctor
  getByDoctorId: (doctorId) =>
      api.get(`/prescriptions/doctor/${doctorId}`),

  // ⭐ Get prescriptions of logged-in doctor
  getMy: () =>
      api.get("/prescriptions/my"),

  // Create prescription
  create: (doctorId, patientId, data) =>
      api.post(
          `/prescriptions?doctorId=${doctorId}&patientId=${patientId}`,
          data
      ),

  // Delete prescription
  delete: (id) =>
      api.delete(`/prescriptions/${id}`),
};

export default prescriptionService;