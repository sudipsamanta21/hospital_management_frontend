import api from "./api";

const authService = {

    // =========================
    // LOGIN
    // =========================
    login: async (username, password) => {
        const response = await api.post("/auth/login", {
            username,
            password,
        });

        const data = response.data;

        console.log("LOGIN RESPONSE:", data);

        const token =
            data.token ||
            data.accessToken ||
            data.jwt;

        const user = {
            id: data.userId,
            patientId: data.patientId,
            username: data.username || username,
            role: data.role,
        };

        if (token) {
            localStorage.setItem("token", token);
        }

        localStorage.setItem("user", JSON.stringify(user));

        return {
            token,
            user,
        };
    },


    // =========================
    // REGISTER
    // =========================
    register: async (userData) => {
        console.log("REGISTER REQUEST:", userData);

        const response = await api.post("/auth/register", {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role,
        });

        console.log("REGISTER RESPONSE:", response.data);

        return response.data;
    },


    // =========================
    // GET USER
    // =========================
    getUser: () => {
        const user = localStorage.getItem("user");

        if (!user) {
            return null;
        }

        try {
            return JSON.parse(user);
        } catch (error) {
            console.error("Invalid user data:", error);
            localStorage.removeItem("user");
            return null;
        }
    },


    // =========================
    // GET CURRENT USER
    // =========================
    getCurrentUser: () => {
        const user = localStorage.getItem("user");

        if (!user) {
            return null;
        }

        try {
            return JSON.parse(user);
        } catch (error) {
            console.error("Invalid user data:", error);
            localStorage.removeItem("user");
            return null;
        }
    },


    // =========================
    // GET TOKEN
    // =========================
    getToken: () => {
        return localStorage.getItem("token");
    },


    // =========================
    // AUTHENTICATED
    // =========================
    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },


    // =========================
    // LOGOUT
    // =========================
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};

export default authService;