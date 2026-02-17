import axios from "axios"


export const axiosInstance = axios.create({
    // baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",     (made a frontend env)
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
}); 