import api from "./api";

const doctorService = {
  getAll: () => api.get("/doctors"),

  getById: (id) =>
      api.get(`/doctors/${id}`),

  getMe: () =>
      api.get("/doctors/me"),

  create: (data) =>
      api.post("/doctors", data),

  update: (id, data) =>
      api.put(`/doctors/${id}`, data),

  enable: (id) =>
      api.put(`/doctors/${id}/enable`),

  disable: (id) =>
      api.put(`/doctors/${id}/disable`),

  delete: (id) =>
      api.delete(`/doctors/${id}`),
};

export default doctorService;