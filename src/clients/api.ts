import axios from "axios"; export const apiClient = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL, });

// interceptor for protected routes
// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
//     }
//     return config;
// });
