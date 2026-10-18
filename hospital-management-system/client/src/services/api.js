import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api' });

export const getAll = (resource) => api.get(`/${resource}`).then((r) => r.data);
export const createItem = (resource, data) => api.post(`/${resource}`, data).then((r) => r.data);
export const updateItem = (resource, id, data) => api.put(`/${resource}/${id}`, data).then((r) => r.data);
export const deleteItem = (resource, id) => api.delete(`/${resource}/${id}`).then((r) => r.data);
export const getDashboard = () => api.get('/dashboard').then((r) => r.data);

// Gets a readable message from an error
export const errorText = (err) =>
  err.response?.data?.message || 'Cannot connect to the server. Is the backend running?';
