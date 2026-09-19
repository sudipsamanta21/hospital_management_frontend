import api from "./api";

const roomService = {
    getAll: () => api.get("/rooms"),

    getById: (id) =>
        api.get(`/rooms/${id}`),

    create: (data) =>
        api.post("/rooms", data),

    update: (id, data) =>
        api.put(`/rooms/${id}`, data),

    updateStatus: (id, status) =>
        api.put(`/rooms/${id}/status?status=${status}`),

    delete: (id) =>
        api.delete(`/rooms/${id}`),
};

export default roomService;