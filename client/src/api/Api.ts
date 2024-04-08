import axios from "axios";

type tokenFunction = () => Promise<string | null>;

export const apiClient = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://stat-tracker-server.onrender.com/api",
});

export default apiClient;
