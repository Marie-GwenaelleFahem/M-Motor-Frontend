//Pour gérer les requêtes vers le backend.
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  //  // URL de backend
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },

});

export default api;
