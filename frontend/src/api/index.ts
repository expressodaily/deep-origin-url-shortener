import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = axios.create({ baseURL: `${API_BASE_URL}/api/auth` });

export const login = (data: { email: string; password: string }) => API.post('/login', data);
export const register = (data: { username: string; email: string; password: string }) => API.post('/register', data);
