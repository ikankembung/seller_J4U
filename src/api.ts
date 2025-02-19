import axios from "axios";

const API_URL = "http://localhost:5000"; // Sesuaikan dengan backend lokal

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request API Login
export const loginUser = async (nis: string, password: string) => {
  return api.post("/api/login", { nis, password });
};
