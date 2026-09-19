import api from "./api";

const appointmentService = {


  getAll: () =>
      api.get("/appointments"),


  getById: (id) =>
      api.get(`/appointments/${id}`),

  getMy: () =>
      api.get("/appointments/my"),

  getByDoctorId: (doctorId) =>
      api.get(`/appointments/doctor/${doctorId}`),

  update: (id, data) =>
      api.put(`/appointments/${id}`, data),


  updateStatus: (id, status) =>
      api.put(`/appointments/${id}/status?value=${status}`),

  delete: (id) =>
      api.delete(`/appointments/${id}`),

  getMyPatient: () =>
      api.get("/appointments/patient/my"),

  getByPatientId: (patientId) =>
      api.get(`/appointments/patient/${patientId}`),

  create: (data) =>
      api.post("/appointments", data),



};

export default appointmentService;