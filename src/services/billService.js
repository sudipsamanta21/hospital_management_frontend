import api from "./api";

const billService = {
    getAll: () => api.get("/bills"),

    getById: (id) =>
        api.get(`/bills/${id}`),

    getByPatientId: (patientId) =>
        api.get(`/bills/patient/${patientId}`),

    create: (data) =>
        api.post("/bills", data),

    updateStatus: (id, status) =>
        api.put(`/bills/${id}/status?status=${status}`),

    delete: (id) =>
        api.delete(`/bills/${id}`),
};

export default billService;