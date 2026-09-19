import api from "./api";
export default {
  getAll: () => api.get("/patients"),
  getById: (id) => api.get(`/patients/${id}`),
  create: (d) => api.post("/patients", d),
  update: (id, d) => api.put(`/patients/${id}`, d),
  remove: (id) => api.delete(`/patients/${id}`),
};
