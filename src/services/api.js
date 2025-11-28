import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.1.23:5000", // Your WiFi IP - accessible from mobile and desktop
});