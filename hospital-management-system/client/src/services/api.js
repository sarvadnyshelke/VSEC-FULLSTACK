import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' });

// Turn any axios error into a readable message.
export const errorMessage = (err) =>
  err.response?.data?.message || (err.request ? 'Cannot reach the server. Is the backend running?' : err.message);

export const api = (resource) => ({
  list: () => http.get(`/${resource}`).then((r) => r.data),
  create: (data) => http.post(`/${resource}`, data).then((r) => r.data),
  update: (id, data) => http.put(`/${resource}/${id}`, data).then((r) => r.data),
  remove: (id) => http.delete(`/${resource}/${id}`).then((r) => r.data),
});

export const patientsApi = api('patients');
export const doctorsApi = api('doctors');
export const appointmentsApi = api('appointments');
export const getDashboard = () => http.get('/dashboard').then((r) => r.data);
