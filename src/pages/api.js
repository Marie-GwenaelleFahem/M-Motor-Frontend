//Pour gérer les requêtes vers le backend.
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // URL de backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
