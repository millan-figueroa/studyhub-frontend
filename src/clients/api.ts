import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// interceptor for protected routes
apiClient.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        const token = JSON.parse(storedToken);
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

