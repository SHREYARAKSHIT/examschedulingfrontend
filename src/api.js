import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust to the backend URL
  withCredentials: true, // Enable sending cookies with requests (for authentication)
});

export default api;
