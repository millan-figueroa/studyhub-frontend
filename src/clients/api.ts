import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3001",
});

// add token to every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // or wherever you store it
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

