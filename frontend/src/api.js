import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const fetchConsultings = (q) =>
  api.get("/consultings", { params: { q } });

export const fetchConsulting = (id) => api.get(`/consultings/${id}`);

export const createConsulting = (payload) =>
  api.post("/consultings", payload);

export const updateConsulting = (id, payload) =>
  api.put(`/consultings/${id}`, payload);

export const deleteConsulting = (id) =>
  api.delete(`/consultings/${id}`);

export const fetchOptions = () => api.get("/options");

export const createOption = (payload) => api.post("/options", payload);

export const deleteOption = (id) => api.delete(`/options/${id}`);

export const uploadExcel = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/excel/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
