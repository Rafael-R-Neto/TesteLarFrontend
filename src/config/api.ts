import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:5000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor opcional para tratar erros globais
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response) {
      console.error("Erro de API:", error.response.data);
    } else {
      console.error("Erro de conexão:", error.message);
    }
    return Promise.reject(error);
  }
);
