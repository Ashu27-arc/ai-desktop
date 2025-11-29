import axios from "axios";

// Use localhost for desktop app since it runs on same machine as backend
export const API = axios.create({
    baseURL: "http://localhost:5000",
});